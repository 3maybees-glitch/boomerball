/** Premium tier branding — display name vs URL route */
export const PREMIUM_TIER_NAME = "The Locker Room";
export const PREMIUM_TIER_TAGLINE = "Advanced Sooners analytics for die-hards";
export const PREMIUM_ROUTE = "/locker-room";

export const PREMIUM_COOKIE = "boomerball_premium";
export const PREMIUM_TOKEN_COOKIE = "boomerball_premium_token";
export const PREMIUM_PRICE_DISPLAY = "$9.99";
export const PREMIUM_PRODUCT_NAME = "Boomer Ball — The Locker Room (Lifetime Access)";
export const PREMIUM_STRIPE_LOOKUP = {
  app: "boomerball",
  tier: "locker_room",
} as const;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_ID);
}

export function isDemoUnlockAllowed(): boolean {
  return !isStripeConfigured() && process.env.NODE_ENV !== "production";
}
