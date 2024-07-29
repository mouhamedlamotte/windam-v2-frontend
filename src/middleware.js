// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL(`/auth/login?next=${request.nextUrl.pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ["/","/feed", "/chats", "/friends"],
};
