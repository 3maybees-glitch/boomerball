/** 2026 WAR MAP — $1 digital season preview product */

export const WAR_MAP_ROUTE = "/war-map";
export const WAR_MAP_PRICE_CENTS = 100;
export const WAR_MAP_PRICE_DISPLAY = "$1";
export const WAR_MAP_PRODUCT_NAME = "Boomer Ball — 2026 WAR MAP";
export const WAR_MAP_PRODUCT_DESCRIPTION =
  "One-page Oklahoma Sooners super master season preview — roster depth, unit grades, projected scores, draft board, freshman hopefuls & bowl placement.";

export const WAR_MAP_COOKIE = "boomerball_war_map";
export const WAR_MAP_TOKEN_COOKIE = "boomerball_war_map_token";

export const WAR_MAP_STRIPE_LOOKUP = {
  app: "boomerball",
  tier: "war_map",
} as const;

/** War Map checkout only needs the secret key (uses price_data for $1). */
export function isWarMapStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function isWarMapDemoUnlockAllowed(): boolean {
  return !isWarMapStripeConfigured() && process.env.NODE_ENV !== "production";
}
