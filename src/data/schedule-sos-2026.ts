import type { OpponentStrength } from "@/lib/schedule-sos";

/**
 * 2026 opponent strength ratings — compiled from Sooners Wire, Oklahoman,
 * SI Sooners tiering, and ESPN SP+ returning-production context (May–Jun 2026).
 * Scores are fan estimates, not official FBS SOS metrics.
 */
export const opponentStrength2026: Record<string, OpponentStrength> = {
  UTEP: {
    score: 14,
    label: "Powder Puff",
    tier: "cupcake",
    note: "Sun Belt minnow — classic season opener tune-up in Norman.",
  },
  Michigan: {
    score: 88,
    label: "Big House Blues",
    tier: "beast",
    note: "Marquee non-con road test at the Big House; top-10 caliber foe.",
  },
  "New Mexico": {
    score: 18,
    label: "Lobo Lob",
    tier: "cupcake",
    note: "Mountain West visitor — lowest-resistance home date on the slate.",
  },
  Georgia: {
    score: 98,
    label: "Nightmare Fuel",
    tier: "nightmare",
    note: "Road SEC opener vs. national-title contender Kirby Smart built.",
  },
  Texas: {
    score: 95,
    label: "Red River Rumble",
    tier: "nightmare",
    note: "Neutral-site rivalry — likely top-5 talent on both sidelines.",
  },
  Kentucky: {
    score: 44,
    label: "Bluegrass Breeze",
    tier: "workable",
    note: "Most winnable home SEC draw; Wildcats rebuilding in 2026.",
  },
  "Mississippi State": {
    score: 52,
    label: "Cowbell Chaos",
    tier: "grinder",
    note: "Rowdy road environment in Starkville with returning SEC talent.",
  },
  "South Carolina": {
    score: 56,
    label: "Gamecock Gauntlet",
    tier: "grinder",
    note: "Physical home test — Gamecocks return heavy production.",
  },
  Florida: {
    score: 74,
    label: "Swamp Stomp",
    tier: "beast",
    note: "Road trip to The Swamp — elite roster talent, hostile atmosphere.",
  },
  "Ole Miss": {
    score: 79,
    label: "Rebel Yell",
    tier: "beast",
    note: "High-powered offense at home; top-30 returning production.",
  },
  "Texas A&M": {
    score: 83,
    label: "Aggie Aggro",
    tier: "beast",
    note: "Late-season playoff-caliber clash — Jimbo-era talent still loaded.",
  },
  Missouri: {
    score: 61,
    label: "Tiger Trap",
    tier: "grinder",
    note: "Season finale road test — Mizzou has given OU trouble recently.",
  },
};

export function getOpponentStrength(opponent: string): OpponentStrength | undefined {
  return opponentStrength2026[opponent];
}
