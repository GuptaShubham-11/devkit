import { NextResponse } from "next/server";

import { downloadTemplateSchema } from "@repo/shared";

import { collectFiles } from "@/lib/collect-files";
import { connectToDatabase } from "@/lib/db";
import { serverEnv } from "@/lib/server-env";
import { ITemplate, Template } from "@/models/template";
import { Transaction } from "@/models/transaction";
import { User } from "@/models/user";

export async function POST(request: Request) {
  try {
    const reqData = await request.json();

    const validatedData = downloadTemplateSchema.safeParse(reqData);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const { templateId, shortLivedToken, userId } = validatedData.data;

    await connectToDatabase();

    const template: ITemplate | null = await Template.findOne({
      _id: templateId,
    });

    if (!template || !template.isPublished || template.isDeleted) {
      return NextResponse.json(
        { error: "Template does not exist!" },
        { status: 404 }
      );
    }

    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist!" },
        { status: 404 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: "User is not verified!" },
        { status: 401 }
      );
    }

    if (
      !user.shortLivedToken ||
      user.shortLivedToken !== shortLivedToken ||
      user.shortLivedTokenExpiry < new Date()
    ) {
      return NextResponse.json(
        { error: "Invalid or expired token!" },
        { status: 401 }
      );
    }

    user.shortLivedToken = undefined;
    user.shortLivedTokenExpiry = undefined;

    const files = await collectFiles(template.repoUrl);
    if (!files.length) {
      return NextResponse.json({ error: "Template is empty" }, { status: 404 });
    }

    user.creditBalance -= template.creditCost;
    await user.save();

    template.downloads += 1;
    await template.save();

    await Transaction.create({
      userId: user._id,
      amount: template.creditCost,
      type: "debit",
      reason: `Install`,
      templateId,
    });

    return NextResponse.json(
      {
        files,
        message: "Files fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error('Download Template error:', error);
    return NextResponse.json(
      {
        error: "Error downloading template",
        details: serverEnv.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
