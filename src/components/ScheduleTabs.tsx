"use client";

import { useState } from "react";
import { ScheduleCard } from "@/components/ScheduleCard";
import { SourceAttribution } from "@/components/SourceAttribution";
import { WesternDivider } from "@/components/WesternDivider";
import {
  schedule2025,
  SEASON_RECORD,
  CONFERENCE_RECORD,
  DATA_SOURCE_SCHEDULE,
} from "@/data/schedule";
import {
  schedule2026,
  DATA_SOURCE_SCHEDULE_2026,
} from "@/data/schedule-2026";
import { SCHEDULE_SOS_2026 } from "@/lib/schedule-sos";

export function ScheduleTabs() {
  const [season, setSeason] = useState<"2026" | "2025">("2026");
  const is2026 = season === "2026";
  const games = is2026 ? schedule2026 : schedule2025;
  const wins = schedule2025.filter((g) => g.result === "W").length;
  const losses = schedule2025.filter((g) => g.result === "L").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-crimson">Football Schedule</h1>
      <p className="mt-2 text-ink/70">
        {is2026
          ? "2026 SEC schedule — season opens September 5 vs UTEP."
          : `2025 results — ${SEASON_RECORD} overall, ${CONFERENCE_RECORD}.`}
      </p>

      <div className="mt-6 flex gap-2">
        {(["2026", "2025"] as const).map((y) => (
          <button
            key={y}
            onClick={() => setSeason(y)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              season === y
                ? "bg-crimson text-cream"
                : "border-2 border-crimson/20 bg-white text-crimson hover:border-crimson"
            }`}
          >
            {y} {y === "2026" ? "Upcoming" : "Results"}
          </button>
        ))}
      </div>

      {!is2026 && (
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="rounded-xl border-2 border-green-300 bg-green-50 px-6 py-3 text-center">
            <p className="text-3xl font-bold text-green-800">{wins}</p>
            <p className="text-xs font-semibold uppercase text-green-700">Wins</p>
          </div>
          <div className="rounded-xl border-2 border-red-300 bg-red-50 px-6 py-3 text-center">
            <p className="text-3xl font-bold text-red-800">{losses}</p>
            <p className="text-xs font-semibold uppercase text-red-700">Losses</p>
          </div>
        </div>
      )}

      {is2026 && (
        <>
          <div className="mt-6 rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-sm text-blue-900">
            <strong>2026 Season:</strong> 12 games — 6 home, 5 away, 1 neutral (Texas at
            Dallas). Times marked TBD will be announced by the SEC network.
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border-2 border-crimson/20 bg-white/95 p-4 text-center backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase text-ink/55">
                National SOS Rank
              </p>
              <p className="font-display text-3xl font-bold text-crimson">
                #{SCHEDULE_SOS_2026.nationalRank}
              </p>
              <p className="mt-1 text-sm font-medium text-ink/70">
                {SCHEDULE_SOS_2026.label}
              </p>
            </div>
            <div className="rounded-xl border-2 border-crimson/20 bg-white/95 p-4 text-center backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase text-ink/55">
                Avg Opponent Strength
              </p>
              <p className="font-display text-3xl font-bold text-crimson">
                {SCHEDULE_SOS_2026.avgScore}
                <span className="text-lg font-normal text-ink/50">/100</span>
              </p>
              <p className="mt-1 text-xs text-ink/60">Across all 12 games</p>
            </div>
            <div className="rounded-xl border-2 border-crimson bg-crimson p-4 text-center text-cream">
              <p className="text-xs font-semibold uppercase text-cream/80">
                Ranked-Level Foes
              </p>
              <p className="font-display text-3xl font-bold">
                {SCHEDULE_SOS_2026.rankedOpponents}
              </p>
              <p className="mt-1 text-xs text-cream/75">Projected top-25 caliber</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-ink/50">
            {SCHEDULE_SOS_2026.note} Each game below includes a fun strength label and
            0–100 opponent difficulty score.
          </p>
        </>
      )}

      <WesternDivider />

      <div className="space-y-4">
        {games.map((game) => (
          <ScheduleCard key={game.date + game.opponent} game={game} />
        ))}
      </div>

      <SourceAttribution
        className="mt-10"
        sources={[
          {
            label: "soonersports.com",
            url: is2026 ? DATA_SOURCE_SCHEDULE_2026 : DATA_SOURCE_SCHEDULE,
          },
          ...(is2026
            ? [
                {
                  label: "Sooners Wire (SOS rank)",
                  url: "https://soonerswire.usatoday.com/story/sports/college/sooners/football/2026/05/15/oklahoma-football-schedule-rankings-sec-brent-venables/90097221007/",
                },
              ]
            : []),
        ]}
      />
    </div>
  );
}
