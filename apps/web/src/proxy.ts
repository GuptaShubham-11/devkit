import { NextRequest, NextResponse } from "next/server";

import { serverEnv } from "./lib/server-env";

const IS_DEVELOPMENT = serverEnv.NODE_ENV === "development";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (IS_DEVELOPMENT) {
    return NextResponse.next();
  }

  const allowedPaths = ["/", "/favicon.ico", "/robots.txt", "/sitemap.xml"];

  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|txt|xml|json)$/i);

  if (allowedPaths.includes(pathname) || isPublicAsset) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api).*)"],
};
