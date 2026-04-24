import { NextRequest, NextResponse } from "next/server";

import { isValidObjectId } from "mongoose";

import { proAccessSchema } from "@repo/shared";

import { connectToDatabase } from "@/lib/db";
import { generateRandom } from "@/lib/generate-random";
import { Template } from "@/models/template";
import { User } from "@/models/user";

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();

    const validated = proAccessSchema.safeParse(reqData);
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, privateKey, templateId } = validated.data;

    if (!isValidObjectId(templateId)) {
      return NextResponse.json(
        { allowed: false, error: "Invalid template ID" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const [user, template] = await Promise.all([
      User.findOne({ email }),
      Template.findById(templateId).lean(),
    ]);

    if (!user || user.isDeleted) {
      return NextResponse.json(
        { allowed: false, error: "User does not exist!" },
        { status: 404 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { allowed: false, error: "User is not verified!" },
        { status: 401 }
      );
    }

    if (user.lockedUntil && user.lockedUntil < new Date()) user.lockedUntil = 0;
    if (user.loginAttempts >= 5)
      user.lockedUntil = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return NextResponse.json(
        {
          allowed: false,
          error: "Account is temporarily locked! Please try after some time",
        },
        { status: 401 }
      );
    }

    if (user.privateKey !== privateKey) {
      user.loginAttempts += 1;
      return NextResponse.json(
        { allowed: false, error: "Invalid private key!" },
        { status: 401 }
      );
    }

    if (!template || template.isDeleted || !template.isPublished) {
      return NextResponse.json(
        { allowed: false, error: "Template not found!" },
        { status: 404 }
      );
    }

    if (template.isPro && user.currentPlan !== "pro") {
      return NextResponse.json(
        {
          allowed: false,
          error: "You need to upgrade to access this template",
        },
        { status: 402 }
      );
    }

    if (user.creditBalance < template.creditCost) {
      return NextResponse.json(
        {
          allowed: false,
          error: "Insufficient credits",
        },
        { status: 402 }
      );
    }

    const token = generateRandom({
      length: 11,
      characters: true,
      symbols: true,
      numbers: true,
    });

    await User.updateOne(
      {
        _id: user._id,
        creditBalance: { $gte: template.creditCost },
      },
      {
        $inc: { creditBalance: -template.creditCost },
        $set: {
          shortLivedToken: token,
          shortLivedTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
        },
      }
    );

    return NextResponse.json(
      {
        allowed: true,
        token,
        userId: user._id,
        message: "Access Granted",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        allowed: false,
        error: "Error fetching pro access",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
