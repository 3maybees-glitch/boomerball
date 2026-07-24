import { NextResponse } from "next/server";
import { WAR_MAP_COOKIE, WAR_MAP_TOKEN_COOKIE } from "@/lib/war-map";
import { createPremiumSessionToken } from "@/lib/premium-token";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 10;

export function setWarMapCookies(response: NextResponse, sessionId: string) {
  const signedToken = createPremiumSessionToken(sessionId);

  response.cookies.set(WAR_MAP_COOKIE, "1", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  if (signedToken) {
    response.cookies.set(WAR_MAP_TOKEN_COOKIE, signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }
}
