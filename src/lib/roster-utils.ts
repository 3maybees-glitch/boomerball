import { rosterEnrichment } from "@/data/roster-enrichment";
import type { Player } from "@/data/types";

const NAME_SUFFIXES = new Set(["Jr", "Sr", "II", "III", "IV", "V"]);

export function getSortableLastName(name: string): string {
  const parts = name.replace(/\./g, "").trim().split(/\s+/);
  const filtered = parts.filter((part) => !NAME_SUFFIXES.has(part));
  return (filtered[filtered.length - 1] ?? name).toLowerCase();
}

export function sortPlayersByLastName(players: Player[]): Player[] {
  return [...players].sort((a, b) => {
    const last = getSortableLastName(a.name).localeCompare(getSortableLastName(b.name));
    if (last !== 0) return last;
    return a.name.localeCompare(b.name);
  });
}

export function enrichPlayer(player: Player): Player {
  const extra = rosterEnrichment[player.id];
  if (!extra) return player;
  return {
    ...player,
    recruitStars: extra.recruitStars ?? player.recruitStars,
    transferFrom: extra.transferFrom ?? player.transferFrom,
  };
}

export function enrichRoster(players: Player[]): Player[] {
  return players.map(enrichPlayer);
}

export function formatRecruitStars(stars: number): string {
  return "⭐".repeat(stars);
}
