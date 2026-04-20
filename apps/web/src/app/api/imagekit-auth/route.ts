import { NextResponse } from "next/server";

import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    if (
      !process.env.IMAGEKIT_PRIVATE_KEY ||
      !process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
    ) {
      throw new Error(
        "Imagekit keys are not set in environment variables at apps/web/.env!"
      );
    }

    const authenticationParameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    });

    return NextResponse.json({
      authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Authentication for Imagekit failed",
      },
      { status: 500 }
    );
  }
}
