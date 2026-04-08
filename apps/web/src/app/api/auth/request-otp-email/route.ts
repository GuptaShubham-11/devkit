import { NextRequest, NextResponse } from "next/server";

import { requestOtpSchema } from "@repo/shared";

import { emailResetPasswordHtml } from "@/emails/reset-password";
import { emailVerificationHtml } from "@/emails/verification";
import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { generateRandom } from "@/lib/generate-random";
import { User } from "@/models/user";

export async function PATCH(request: NextRequest) {
  try {
    const reqData = await request.json();

    const validatedData = requestOtpSchema.safeParse(reqData);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, type } = validatedData.data;
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message:
            "If an account with that email exists, an OTP has been sent.",
        },
        { status: 200 }
      );
    }

    const otp = generateRandom({ length: 6 });
    const isReseting = type === "resetPassword";

    // Save OTP and expiration
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry
    await user.save({ validateBeforeSave: false });

    await sendEmail({
      emailAddress: email,
      emailSubject: isReseting
        ? "Devkit - OTP for Password Reset"
        : "Devkit - OTP for Email Verification",
      htmlText: isReseting
        ? emailResetPasswordHtml(otp)
        : emailVerificationHtml(otp),
    });

    return NextResponse.json(
      {
        message: "If an account with that email exists, an OTP has been sent.",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error('Error during forgot password process:', error);
    return NextResponse.json(
      {
        error: "Forgot password process failed!",
        details: process.env.NODE_ENV === "development" ? error : null,
      },
      { status: 500 }
    );
  }
}
