import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { serverEnv } from "@/lib/server-env";

const ADMIN_ROUTES = ["/api/admin"];

const matchRoute = (pathname: string, routes: string[]) => {
  return routes.some((route) => pathname.startsWith(route));
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: serverEnv.NEXTAUTH_SECRET,
  });

  const role = token?.isRole;

  // Protect dashboard/account
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/account")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Prevent logged-in users
  // from auth pages
  if (
    pathname === "/" ||
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/forgot-password") ||
    pathname.startsWith("/auth/verify-email")
  ) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Admin protection
  if (matchRoute(pathname, ADMIN_ROUTES)) {
    if (!token || role !== serverEnv.ROLE) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/dashboard/:path*",
    "/account/:path*",
    "/api/admin/:path*",
  ],
};
