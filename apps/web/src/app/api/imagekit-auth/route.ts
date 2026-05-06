import { NextResponse } from "next/server";

import { getUploadAuthParams } from "@imagekit/next/server";

import { serverEnv } from "@/lib/server-env";

export async function GET() {
  try {
    const authenticationParameters = getUploadAuthParams({
      privateKey: serverEnv.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: serverEnv.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    });

    return NextResponse.json({
      authenticationParameters,
      publicKey: serverEnv.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
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
