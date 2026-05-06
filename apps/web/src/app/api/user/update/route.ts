import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { updateProfileSchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { serverEnv } from "@/lib/server-env";
import { User } from "@/models/user";

export async function PATCH(request: NextRequest) {
  try {
    const reqData = await request.json();

    const validatedData = updateProfileSchema.safeParse(reqData);
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

    const { name, bio, githubUsername, website, privateKey, profileImage } =
      validatedData.data;
    await connectToDatabase();

    const updateData: any = {
      bio,
      githubUsername,
      website,
      privateKey,
      profileImage,
    };

    if (name) {
      updateData["oAuth?.profile?.name"] = name;
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
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
        user,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error update user:", error);
    return NextResponse.json(
      {
        error:
          serverEnv.NODE_ENV === "development"
            ? error
            : "failed to update user",
      },
      { status: 500 }
    );
  }
}
