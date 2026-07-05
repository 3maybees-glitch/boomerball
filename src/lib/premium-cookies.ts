import { NextResponse } from "next/server";
import { PREMIUM_COOKIE, PREMIUM_TOKEN_COOKIE } from "@/lib/premium";
import { createPremiumSessionToken } from "@/lib/premium-token";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 10;

export function setPremiumCookies(response: NextResponse, sessionId: string) {
  const signedToken = createPremiumSessionToken(sessionId);

  response.cookies.set(PREMIUM_COOKIE, "1", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  if (signedToken) {
    response.cookies.set(PREMIUM_TOKEN_COOKIE, signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }
}
