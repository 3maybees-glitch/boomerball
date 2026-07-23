import { X_HANDLE, X_PROFILE_URL } from "@/lib/brand";

export interface XPost {
  id: string;
  /** Post body text shown on the News page */
  text: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  /** Full URL to the post on X */
  url: string;
}

/**
 * Featured posts highlighted on News (latest first).
 * Swap the top entry when you publish a new post you want pinned here.
 */
export const featuredXPosts: XPost[] = [
  {
    id: "2078534336056381607",
    text: "Xavier Robinson and Isaiah Sategna III are elite — both cracked Bleacher Report's Top 10 fastest in college football for 2026 with tracked peaks of 22.2 mph and 22.1 mph. OU's speed is a major weapon heading into the season! For more check out boomerball.app",
    date: "2026-07-18",
    url: "https://x.com/boomerballapp/status/2078534336056381607",
  },
];

export const xFeedMeta = {
  handle: X_HANDLE,
  profileUrl: X_PROFILE_URL,
  displayName: "Boomer Ball",
} as const;
