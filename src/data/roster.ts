import type { Player } from "./types";
import roster2026Data from "./roster-2026.json";

export const ROSTER_SOURCE =
  "https://soonersports.com/sports/football/roster/2026";

/** Full 2026 spring roster — parsed from soonersports.com */
export const roster2026: Player[] = roster2026Data as Player[];

export function getPlayerHeadshotUrl(espnId?: number): string | null {
  if (!espnId) return null;
  return `https://a.espncdn.com/i/headshots/college-football/players/full/${espnId}.png`;
}

export function getCoachInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Featured players with 2025 stat context for highlight cards */
export const featuredPlayers2025 = [
  "john-mateer-10",
  "tory-blaylock-6",
  "isaiah-sategna-iii-1",
  "kip-lewis-10",
  "peyton-bowen-22",
  "xavier-robinson-24",
];
