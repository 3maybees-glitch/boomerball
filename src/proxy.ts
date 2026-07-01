import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAliasHost, isPrimaryHost, PRIMARY_DOMAIN } from "@/lib/domains";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";

  if (!host || isPrimaryHost(host) || host.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  if (isAliasHost(host)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = PRIMARY_DOMAIN;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo/|backgrounds/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
