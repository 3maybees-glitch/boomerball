/** Canonical production domain for Boomer Ball */
export const PRIMARY_DOMAIN = "boomerball.app";

export const PRIMARY_URL = `https://${PRIMARY_DOMAIN}`;

/** Alternate domains that should 301 to the primary */
export const ALIAS_DOMAINS = [
  "www.boomerball.app",
  "boomerballstats.com",
  "www.boomerballstats.com",
] as const;

export function isPrimaryHost(host: string): boolean {
  return host.toLowerCase() === PRIMARY_DOMAIN;
}

export function isAliasHost(host: string): boolean {
  const normalized = host.toLowerCase();
  return ALIAS_DOMAINS.some((domain) => domain === normalized);
}
