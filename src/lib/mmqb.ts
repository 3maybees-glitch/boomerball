import { weeklyRecaps, MMQB_PUBLISH_SCHEDULE } from "@/data/weekly-recaps";
import type { WeeklyRecap } from "@/data/types";
import { SEASON_2026 } from "@/data/schedule-2026";

export function getAllRecaps(): WeeklyRecap[] {
  return [...weeklyRecaps].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );
}

export function getRecapBySlug(slug: string): WeeklyRecap | undefined {
  return weeklyRecaps.find((recap) => recap.slug === slug);
}

export function getLatestRecap(): WeeklyRecap | undefined {
  return getAllRecaps()[0];
}

export function getRecapSlugs(): string[] {
  return weeklyRecaps.map((recap) => recap.slug);
}

export function formatRecapMatchup(recap: WeeklyRecap): string {
  const prefix = recap.isHome ? "vs." : "at";
  return `${prefix} ${recap.opponent}`;
}

export function formatRecapScore(recap: WeeklyRecap): string {
  const ouScore = recap.result === "W" ? recap.score.split("-")[0] : recap.score.split("-")[1];
  const oppScore = recap.result === "W" ? recap.score.split("-")[1] : recap.score.split("-")[0];
  return `OU ${ouScore}, ${recap.opponent.split(" ")[0]} ${oppScore}`;
}

/** True when the active season has no published recaps yet (offseason) */
export function isMmkbOffseason(): boolean {
  return weeklyRecaps.every((recap) => recap.isArchive);
}

export function getMmkbSeasonMessage(): string {
  if (isMmkbOffseason()) {
    return `New Monday Morning Quarterback issues publish ${MMQB_PUBLISH_SCHEDULE.toLowerCase()} starting with the ${SEASON_2026} opener.`;
  }
  return MMQB_PUBLISH_SCHEDULE;
}
