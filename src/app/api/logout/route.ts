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
// This will clear the auth_token cookie, effectively logging the user out.
