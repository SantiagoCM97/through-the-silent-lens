/*
 * =====================================================================================
 *
 * --- FILE 3 of 5 ---
 * Path: /src/app/api/login/route.ts (Corrected)
 * Description: The secure backend API route that verifies the password. If it
 * matches the one in your environment variables, it creates a secure,
 * HttpOnly cookie to authenticate the user.
 *
 * =====================================================================================
 */

import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-key-that-is-long-and-secure"
);
const AUTH_COOKIE_NAME = "auth_token";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  // Compare the submitted password with your secret password
  if (password === process.env.UPLOAD_PASSWORD) {
    // Correct password. Create a JWT token.
    const token = await new SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h") // Token expires in 24 hours
      .sign(JWT_SECRET);

    // Create a response object to set the cookie on
    const response = NextResponse.json({ success: true });

    // Set the token in a secure, HttpOnly cookie on the response
    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  }

  // Incorrect password
  return NextResponse.json({ success: false }, { status: 401 });
}
