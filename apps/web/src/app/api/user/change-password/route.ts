import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { changePasswordSchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";

export async function PATCH(request: NextRequest) {
  try {
    const reqData = await request.json();

    const validatedData = changePasswordSchema.safeParse(reqData);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          error: "Authentication required!",
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        {
          error: "User ID not found",
        },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = validatedData.data;
    await connectToDatabase();

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const isMatch = await user.isPasswordCorrect(currentPassword);

    if (!isMatch) {
      return NextResponse.json(
        {
          error: "Current password is incorrect",
        },
        { status: 400 }
      );
    }

    user.password = newPassword;
    await user.save();

    return NextResponse.json(
      {
        user,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error change password:", error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "failed to change password",
      },
      { status: 500 }
    );
  }
}
