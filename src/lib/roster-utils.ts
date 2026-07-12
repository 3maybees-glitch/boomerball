import { cfb27Ratings } from "@/data/cfb27-ratings";
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
  const ratings = cfb27Ratings[player.id];
  return {
    ...player,
    recruitStars: extra?.recruitStars ?? player.recruitStars,
    transferFrom: extra?.transferFrom ?? player.transferFrom,
    cfb27: ratings ?? player.cfb27,
  };
}

export function enrichRoster(players: Player[]): Player[] {
  return players.map(enrichPlayer);
}

export function formatRecruitStars(stars: number): string {
  return "⭐".repeat(stars);
}

/** Color class for CFB 27 overall rating badges */
export function cfb27OvrTone(ovr: number): string {
  if (ovr >= 90) return "bg-crimson text-cream";
  if (ovr >= 85) return "bg-crimson/85 text-cream";
  if (ovr >= 80) return "bg-crimson/15 text-crimson";
  if (ovr >= 75) return "bg-cream-dark text-ink";
  return "bg-cream text-ink/70";
}
