import { NextRequest, NextResponse } from "next/server";

import { resetPasswordSchema } from "@repo/shared";

import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";

export async function PUT(request: NextRequest) {
  try {
    const reqData = await request.json();

    const validatedData = resetPasswordSchema.safeParse(reqData);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }
    const { email, otp, newPassword } = validatedData.data;
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Email does not exist!" },
        { status: 404 }
      );
    }

    // Check OTP expiration
    const now = new Date();
    if (!user.otp || !user.otpExpiry || user.otpExpiry < now) {
      return NextResponse.json(
        { error: "OTP expired or invalid. Please request a new one." },
        { status: 400 }
      );
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    user.password = newPassword;

    // Clear OTP and expiry
    user.otp = undefined;
    user.otpExpiry = undefined;

    // Reset login attempts and locks for security
    user.loginAttempts = 0;
    user.lockedUntil = undefined;

    await user.save({ validateBeforeSave: false });

    return NextResponse.json(
      { message: "Password has been reset successfully." },
      { status: 200 }
    );
  } catch (error) {
    // console.error('Error resetting password:', error);
    return NextResponse.json(
      {
        error: "Failed to reset password. Please try again.",
        details: process.env.NODE_ENV === "development" ? error : null,
      },
      { status: 500 }
    );
  }
}
