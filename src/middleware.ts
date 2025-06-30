import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const AUTH_COOKIE_NAME = "auth_token";

export async function middleware(request: NextRequest) {
  // Diagnostic log to confirm the middleware is running
  console.log(`Middleware running for path: ${request.nextUrl.pathname}`);

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
    const response = NextResponse.redirect(new URL("/login", request.url));
    // Clear the invalid cookie
    response.cookies.set(AUTH_COOKIE_NAME, "", { expires: new Date(0) });
    return response;
  }
}

// This specifies that the middleware should only run on requests to /upload
// and any of its sub-paths.
export const config = {
  matcher: ["/upload/:path*", "/upload"],
};
