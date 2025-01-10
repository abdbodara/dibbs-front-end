import Cookies from "js-cookie";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req) {

  const token = cookies().get("authToken");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
