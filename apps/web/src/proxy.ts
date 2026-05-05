import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { secretVariables } from "./lib/secret-variables";

const ADMIN_ROUTES = ["/api/admin"];

const matchRoute = (pathname: string, routes: string[]) => {
  return routes.some((route) => pathname.startsWith(route));
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { NEXTAUTH_SECRET, ROLE } = secretVariables();

  const token = await getToken({
    req: request,
    secret: NEXTAUTH_SECRET,
  });

  const role = token?.isRole;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/account")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (matchRoute(pathname, ADMIN_ROUTES)) {
    if (!token || role !== ROLE) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*", "/api/admin/:path*"],
};
