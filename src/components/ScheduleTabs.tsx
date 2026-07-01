"use client";

import { useState } from "react";
import { ScheduleCard } from "@/components/ScheduleCard";
import { SourceAttribution } from "@/components/SourceAttribution";
import { Callout } from "@/components/Callout";
import { EditorialSection } from "@/components/EditorialSection";
import { MotionReveal } from "@/components/motion/MotionReveal";
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
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {(["2026", "2025"] as const).map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setSeason(y)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson ${
              season === y
                ? "bg-crimson text-cream shadow-[0_4px_16px_rgba(132,22,23,0.25)]"
                : "border border-crimson/20 bg-white/90 text-crimson hover:border-crimson/50"
            }`}
          >
            {y} {y === "2026" ? "upcoming" : "results"}
          </button>
        ))}
      </div>

      {!is2026 && (
        <MotionReveal className="mb-8 flex flex-wrap gap-4">
          <div className="rounded-xl border border-green-300/50 bg-green-50/90 px-8 py-4 text-center shadow-[0_4px_16px_rgba(26,10,10,0.04)]">
            <p className="font-display text-3xl font-bold tabular-nums text-green-800">{wins}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Wins</p>
          </div>
          <div className="rounded-xl border border-red-300/50 bg-red-50/90 px-8 py-4 text-center shadow-[0_4px_16px_rgba(26,10,10,0.04)]">
            <p className="font-display text-3xl font-bold tabular-nums text-red-800">{losses}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Losses</p>
          </div>
          <div className="rounded-xl border border-crimson/15 bg-white/90 px-6 py-4 text-center shadow-[0_4px_16px_rgba(26,10,10,0.04)]">
            <p className="font-display text-xl font-bold text-crimson">{SEASON_RECORD}</p>
            <p className="text-xs text-ink/60">{CONFERENCE_RECORD}</p>
          </div>
        </MotionReveal>
      )}

      {is2026 && (
        <MotionReveal className="mb-8 space-y-4">
          <Callout variant="info">
            <strong>2026 season:</strong> 12 games with 6 home, 5 away, and 1 neutral
            (Texas at Dallas). Times marked TBD will be announced by the SEC network.
          </Callout>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-crimson/12 bg-white/95 p-5 text-center shadow-[0_4px_20px_rgba(26,10,10,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/55">
                National SOS rank
              </p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums text-crimson">
                #{SCHEDULE_SOS_2026.nationalRank}
              </p>
              <p className="mt-1 text-sm font-medium text-ink/70">
                {SCHEDULE_SOS_2026.label}
              </p>
            </div>
            <div className="rounded-xl border border-crimson/12 bg-white/95 p-5 text-center shadow-[0_4px_20px_rgba(26,10,10,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/55">
                Avg opponent strength
              </p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums text-crimson">
                {SCHEDULE_SOS_2026.avgScore}
                <span className="text-lg font-normal text-ink/50">/100</span>
              </p>
              <p className="mt-1 text-xs text-ink/60">Across all 12 games</p>
            </div>
            <div className="rounded-xl border border-crimson/30 bg-crimson p-5 text-center text-cream shadow-[0_8px_24px_rgba(132,22,23,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-cream/80">
                Ranked-level foes
              </p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums">
                {SCHEDULE_SOS_2026.rankedOpponents}
              </p>
              <p className="mt-1 text-xs text-cream/75">Projected top-25 caliber</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-ink/50">
            {SCHEDULE_SOS_2026.note} Each game below includes a strength label and
            0–100 opponent difficulty score.
          </p>
        </MotionReveal>
      )}

      <EditorialSection
        title={is2026 ? "2026 schedule" : "2025 results"}
        divider={false}
      >
        <div className="space-y-3">
          {games.map((game) => (
            <ScheduleCard key={game.date + game.opponent} game={game} />
          ))}
        </div>
      </EditorialSection>

      <SourceAttribution
        className="mt-12"
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
    </>
  );
}
