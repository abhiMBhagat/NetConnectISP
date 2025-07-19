import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isDashboard =
    (request.nextUrl.pathname.startsWith("/customer") &&
      request.nextUrl.pathname !== "/customer/dispute") ||
    request.nextUrl.pathname.startsWith("/staff");
  const session = request.cookies.get("session")?.value;

  if (!session && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/staff/:path*"],
};
