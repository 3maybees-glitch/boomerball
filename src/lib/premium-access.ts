import { cookies } from "next/headers";
import { PREMIUM_COOKIE, PREMIUM_TOKEN_COOKIE } from "@/lib/premium";

export async function hasPremiumAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  return (
    cookieStore.get(PREMIUM_COOKIE)?.value === "1" ||
    !!cookieStore.get(PREMIUM_TOKEN_COOKIE)?.value
  );
}
