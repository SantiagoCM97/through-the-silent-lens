/*
 * =====================================================================================
 *
 * --- FILE 4 of 5 ---
 * Path: /src/app/api/logout/route.ts (New)
 * Description: This API route handles logging out by clearing the
 * authentication cookie from the user's browser.
 *
 * =====================================================================================
 */
import { NextResponse as LogoutNextResponse } from "next/server";

export async function POST() {
  // Create a response object
  const response = LogoutNextResponse.json({ success: true });

  // Set the cookie with an immediate expiration date to effectively delete it
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
