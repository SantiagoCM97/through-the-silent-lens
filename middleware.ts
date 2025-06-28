import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-key-that-is-long-and-secure"
);
const AUTH_COOKIE_NAME = "auth_token";

export async function middleware(request: NextRequest) {
  // We only want to protect the /upload route
  if (request.nextUrl.pathname.startsWith("/upload")) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      // If no token, redirect to the login page
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verify the token is valid
      await jwtVerify(token, JWT_SECRET);
      // If valid, let the user proceed to the upload page
      return NextResponse.next();
    } catch (err) {
      // If token is invalid (expired, tampered), redirect to login
      console.log("JWT Verification failed:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}

// This specifies that the middleware should only run on the /upload path.
export const config = {
  matcher: "/upload",
};
