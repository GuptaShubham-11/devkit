import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { serverEnv } from "@/lib/server-env";
import { User } from "@/models/user";

export async function PATCH() {
  try {
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
    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      },
      { new: true }
    );
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Account deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error delete user:", error);
    return NextResponse.json(
      {
        error:
          serverEnv.NODE_ENV === "development"
            ? error
            : "failed to delete user",
      },
      { status: 500 }
    );
  }
}
