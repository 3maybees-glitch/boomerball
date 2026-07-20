import { schedule2026 } from "@/data/schedule-2026";
import type { ScheduleGame } from "@/data/types";

const CT_TZ = "America/Chicago";

/** Calendar YYYY-MM-DD in America/Chicago. */
export function chicagoDateString(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CT_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function addChicagoDays(yyyyMmDd: string, days: number): string {
  const [y, m, d] = yyyyMmDd.split("-").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d + days, 12, 0, 0));
  return chicagoDateString(utc);
}

export type GameDayAlert = {
  kind: "gameday" | "eve";
  game: ScheduleGame;
  title: string;
  body: string;
  url: string;
};

function venueLine(game: ScheduleGame): string {
  if (game.isNeutral) return "neutral site";
  return game.isHome ? "home" : "away";
}

export function buildGameDayAlerts(today = chicagoDateString()): GameDayAlert[] {
  const tomorrow = addChicagoDays(today, 1);
  const alerts: GameDayAlert[] = [];

  for (const game of schedule2026) {
    if (game.date === today) {
      const kick = game.time && game.time !== "TBD" ? ` Kickoff ${game.time}.` : "";
      alerts.push({
        kind: "gameday",
        game,
        title: `Game day vs ${game.opponent}`,
        body: `Sooners are ${venueLine(game)} today.${kick} Open the schedule for the full slate.`,
        url: "/schedule",
      });
    } else if (game.date === tomorrow) {
      const kick = game.time && game.time !== "TBD" ? ` Listed ${game.time}.` : "";
      alerts.push({
        kind: "eve",
        game,
        title: `Tomorrow: OU vs ${game.opponent}`,
        body: `${venueLine(game).replace(/^./, (c) => c.toUpperCase())} matchup is set.${kick} Review the Game-u-lator before kickoff.`,
        url: "/gameulator",
      });
    }
  }

  return alerts;
}
