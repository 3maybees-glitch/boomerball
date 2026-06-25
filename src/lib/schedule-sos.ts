/** Opponent strength-of-schedule rating for a single game (0–100, higher = tougher). */
export interface OpponentStrength {
  /** 0–100 difficulty score for this opponent */
  score: number;
  /** Fun fan-facing label for this matchup */
  label: string;
  /** Short tier name for grouping */
  tier: "cupcake" | "warmup" | "workable" | "grinder" | "beast" | "nightmare";
  /** One-line context from preseason analysis */
  note: string;
}

export interface ScheduleStrengthSummary {
  nationalRank: number;
  rankedOpponents: number;
  avgScore: number;
  label: string;
  note: string;
}

export const SCHEDULE_SOS_2026: ScheduleStrengthSummary = {
  nationalRank: 2,
  rankedOpponents: 7,
  avgScore: 64,
  label: "SEC Gauntlet",
  note:
    "College Football News ranked OU's 2026 slate the No. 2 toughest in FBS. CBS Sports projects seven top-25 caliber opponents.",
};

/** Fun tier styling — western / crimson palette */
export const SOS_TIER_STYLES: Record<
  OpponentStrength["tier"],
  { badge: string; bar: string }
> = {
  cupcake: {
    badge: "bg-green-100 text-green-800 border-green-200",
    bar: "bg-green-500",
  },
  warmup: {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    bar: "bg-emerald-500",
  },
  workable: {
    badge: "bg-amber-100 text-amber-900 border-amber-200",
    bar: "bg-amber-500",
  },
  grinder: {
    badge: "bg-orange-100 text-orange-900 border-orange-200",
    bar: "bg-orange-500",
  },
  beast: {
    badge: "bg-red-100 text-red-900 border-red-200",
    bar: "bg-red-600",
  },
  nightmare: {
    badge: "bg-crimson/15 text-crimson border-crimson/30",
    bar: "bg-crimson",
  },
};

export function getTierFromScore(score: number): OpponentStrength["tier"] {
  if (score >= 90) return "nightmare";
  if (score >= 75) return "beast";
  if (score >= 55) return "grinder";
  if (score >= 40) return "workable";
  if (score >= 25) return "warmup";
  return "cupcake";
}
