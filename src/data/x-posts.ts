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
 * Optional featured posts highlighted above the live timeline.
 * Add new items at the top when you want a specific post pinned on News.
 *
 * Example:
 * {
 *   id: "opening-week",
 *   text: "Kickoff week notes…",
 *   date: "2026-08-30",
 *   url: "https://x.com/boomerballapp/status/…",
 * }
 */
export const featuredXPosts: XPost[] = [];

export const xFeedMeta = {
  handle: X_HANDLE,
  profileUrl: X_PROFILE_URL,
  displayName: "Boomer Ball",
} as const;
