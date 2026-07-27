/** Premium tier branding — display name vs URL route */
export const PREMIUM_TIER_NAME = "The Locker Room";
export const PREMIUM_TIER_TAGLINE = "Advanced Sooners analytics for die-hards";
export const PREMIUM_ROUTE = "/locker-room";
export const PREMIUM_RECRUIT_ROUTE = "/join";

export const PREMIUM_COOKIE = "boomerball_premium";
export const PREMIUM_TOKEN_COOKIE = "boomerball_premium_token";

/** 2026 season one-time price (charged via Stripe price_data) */
export const PREMIUM_PRICE_CENTS = 2499;
export const PREMIUM_PRICE_DISPLAY = "$24.99";
export const PREMIUM_ACCESS_LABEL = "2026 season access";
export const PREMIUM_PRODUCT_NAME = "Boomer Ball — The Locker Room (2026 Season)";
export const PREMIUM_PRODUCT_DESCRIPTION =
  "2026 season access to The Locker Room — SP+ analytics, PFF-style grades, NFL Comp Machine, The Game-u-lator, scheme guides, 2027 recruiting board, and the 2026 WAR MAP.";

export const PREMIUM_STRIPE_LOOKUP = {
  app: "boomerball",
  tier: "locker_room",
} as const;

/** Locker Room checkout uses price_data — only the secret key is required. */
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function isDemoUnlockAllowed(): boolean {
  return !isStripeConfigured() && process.env.NODE_ENV !== "production";
}
