import { NextRequest, NextResponse } from "next/server";

import { registerSchema } from "@repo/shared";

import { emailVerificationHtml } from "@/emails/verification";
import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { generateRandom } from "@/lib/generate-random";
import { serverEnv } from "@/lib/server-env";
import { User } from "@/models/user";

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();

    const validatedData = registerSchema.safeParse(reqData);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validatedData.data;
    await connectToDatabase();

    const existing = await User.findOne({ email: email.toLowerCase() });

    // If user deleted, stop
    if (existing?.isDeleted) {
      return NextResponse.json(
        {
          error:
            "Account with this email deleted! Register with another email.",
        },
        { status: 409 }
      );
    }

    // If verified user exists, stop
    if (existing?.isVerified) {
      return NextResponse.json(
        { error: "Email already in use!" },
        { status: 409 }
      );
    }

    // Generate OTP and expiry (15 minutes)
    const otp = generateRandom({ length: 6 });
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const privateKey = generateRandom({
      length: Number(serverEnv.PRIVATE_KEY_LENGTH),
      characters: true,
      symbols: true,
      numbers: true,
    });

    // If user exists but not verified, update OTP
    if (existing) {
      existing.otp = otp;
      existing.otpExpiry = otpExpiry;
      existing.emailVerifiedAt = null; // reset
      await existing.save({ validateBeforeSave: false });
    } else {
      await User.create({
        email: email.toLowerCase(),
        creditBalance: 20,
        privateKey,
        password,
        otp,
        otpExpiry,
        isVerified: false,
      });
    }

    sendEmail({
      emailAddress: email.toLowerCase(),
      emailSubject: "Devkit - Verify Your Account",
      htmlText: emailVerificationHtml(otp),
    });

    return NextResponse.json(
      { message: "Verification code sent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: "Registration failed. Please try again.",
        details: serverEnv.NODE_ENV === "development" ? error : null,
      },
      { status: 500 }
    );
  }
}
