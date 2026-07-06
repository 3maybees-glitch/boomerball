import { PREMIUM_PRICE_DISPLAY, PREMIUM_TIER_NAME } from "@/lib/premium";

export type LockerRoomFeatureIcon =
  | "analytics"
  | "grades"
  | "comps"
  | "simulator"
  | "scheme"
  | "recruiting"
  | "updates"
  | "lifetime"
  | "magic";

export type LockerRoomFeature = {
  icon: LockerRoomFeatureIcon;
  title: string;
  desc: string;
  href?: string;
  badge?: string;
  featured?: boolean;
};

/** Canonical marketing copy for every Locker Room benefit */
export const LOCKER_ROOM_FEATURES: LockerRoomFeature[] = [
  {
    icon: "analytics",
    title: "Advanced analytics",
    desc: "SP+-inspired offense, defense, and overall ratings plus EPA/play, havoc rate, pressure rate, and success rate.",
    href: "/locker-room",
    badge: "Film room",
    featured: true,
  },
  {
    icon: "grades",
    title: "PFF-style player grades",
    desc: "0–100 production grades for every key Sooner — Mateer, Bowen, Stone, and the full two-deep.",
    href: "/locker-room",
    badge: "Roster intel",
  },
  {
    icon: "comps",
    title: "NFL Comp Machine",
    desc: "Every Sooner's closest NFL twin graded out of 100 — plus a scouting tool for any college player in the country.",
    href: "/nfl-comps",
    badge: "Scouting",
    featured: true,
  },
  {
    icon: "simulator",
    title: "The Game-u-lator",
    desc: "Simulate OU vs. every 2026 opponent. Grade all 13 units, get three predicted scores, win odds, and estimated box scores.",
    href: "/gameulator",
    badge: "Matchup lab",
    featured: true,
  },
  {
    icon: "scheme",
    title: "Scheme intel",
    desc: "Formation guides, personnel packages, and chess-match breakdowns for Arbuckle and Venables.",
    href: "/locker-room",
    badge: "Playbook",
  },
  {
    icon: "recruiting",
    title: "2027 recruiting board",
    desc: "Cross-service class rankings, commit board, and blue-chip tracking from On3, 247Sports, and ESPN.",
    href: "/locker-room",
    badge: "War room",
  },
  {
    icon: "updates",
    title: "Weekly season updates",
    desc: "Metrics recalculate every week during the season so your intel stays current.",
    href: "/locker-room",
    badge: "In season",
  },
  {
    icon: "magic",
    title: "Magic link restore",
    desc: "Already purchased? Enter your checkout email and get a sign-in link — no second charge, no password.",
    href: "/locker-room",
    badge: "Members",
  },
  {
    icon: "lifetime",
    title: "Lifetime access",
    desc: `One payment (${PREMIUM_PRICE_DISPLAY}), no subscription. Your locker stays open forever.`,
    href: "/join",
    badge: "One-time",
  },
];

export const LOCKER_ROOM_TAGLINE =
  "Advanced Sooners analytics, interactive scouting tools, and matchup sims for die-hards.";

export const LOCKER_ROOM_PITCH = `${PREMIUM_TIER_NAME} unlocks every premium tool on Boomer Ball — SP+ dashboards, PFF-style grades, the NFL Comp Machine, The Game-u-lator, scheme guides, and the 2027 recruiting board — for ${PREMIUM_PRICE_DISPLAY} lifetime.`;

export const LOCKER_ROOM_TOOL_HIGHLIGHTS = [
  {
    title: "NFL Comp Machine",
    href: "/nfl-comps",
    teaser: "John Mateer → closest NFL twin",
    sample: "88/100 similarity",
    detail:
      "Eight measurables normalized against NFL benchmarks at each position — height, weight, 40, strength, jumps, agility, and talent.",
  },
  {
    title: "The Game-u-lator",
    href: "/gameulator",
    teaser: "OU vs Texas · Red River",
    sample: "44% win probability",
    detail:
      "Grade QB through coaching for both teams, run three sims plus a consensus score, and pull estimated player stat lines.",
  },
] as const;
