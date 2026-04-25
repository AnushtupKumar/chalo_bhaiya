import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.ADMIN_PASSWORD || "chalo-secret-key-2024");

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only protect /admin routes, but ignore /admin/login
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const session = request.cookies.get("admin_session")?.value;

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(session, SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
