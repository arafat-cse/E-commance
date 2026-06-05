import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "gb_admin_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const isAdmin = request.cookies.get("gb_admin_role")?.value === "admin";
  const isLoginPage = pathname === "/admin/login";

  if ((!hasSession || !isAdmin) && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (hasSession && isAdmin && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
