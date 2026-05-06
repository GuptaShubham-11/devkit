import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { createInstallSchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { clientIp } from "@/lib/client-ip";
import { connectToDatabase } from "@/lib/db";
import { serverEnv } from "@/lib/server-env";
import { Install } from "@/models/install";

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();

    const validatedData = createInstallSchema.safeParse(reqData);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const { duration, status, templateId, userId, installedAt, failedReason } =
      validatedData.data;
    const ipAddress = clientIp(request);

    const install = await Install.create({
      duration,
      ipAddress,
      status,
      templateId,
      userId,
      installedAt,
      failedReason,
    });

    return NextResponse.json(
      {
        message: "Install added successfully",
        install,
      },
      { status: 201 }
    );
  } catch (error) {
    // console.error('Error creating install:', error);
    return NextResponse.json(
      {
        error: "Error creating install",
        details: serverEnv.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
