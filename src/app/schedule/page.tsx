import type { Metadata } from "next";
import { ScheduleCard } from "@/components/ScheduleCard";
import { SourceAttribution } from "@/components/SourceAttribution";
import { WesternDivider } from "@/components/WesternDivider";
import {
  schedule2025,
  SEASON_RECORD,
  CONFERENCE_RECORD,
  DATA_SOURCE_SCHEDULE,
} from "@/data/schedule";

export const metadata: Metadata = {
  title: "2025 Schedule",
  description: "Full 2025 Oklahoma Sooners football schedule and results.",
};

export default function SchedulePage() {
  const wins = schedule2025.filter((g) => g.result === "W").length;
  const losses = schedule2025.filter((g) => g.result === "L").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-crimson">
        2025 Football Schedule
      </h1>
      <p className="mt-2 text-ink/70">
        Complete results from Oklahoma&apos;s second SEC season — {SEASON_RECORD}{" "}
        overall, {CONFERENCE_RECORD}.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="rounded-xl border-2 border-green-300 bg-green-50 px-6 py-3 text-center">
          <p className="text-3xl font-bold text-green-800">{wins}</p>
          <p className="text-xs font-semibold uppercase text-green-700">Wins</p>
        </div>
        <div className="rounded-xl border-2 border-red-300 bg-red-50 px-6 py-3 text-center">
          <p className="text-3xl font-bold text-red-800">{losses}</p>
          <p className="text-xs font-semibold uppercase text-red-700">Losses</p>
        </div>
        <div className="rounded-xl border-2 border-crimson/20 bg-white px-6 py-3 text-center">
          <p className="text-3xl font-bold text-crimson">{schedule2025.length}</p>
          <p className="text-xs font-semibold uppercase text-ink/70">Games</p>
        </div>
      </div>

      <WesternDivider />

      <div className="space-y-4">
        {schedule2025.map((game) => (
          <ScheduleCard key={game.date + game.opponent} game={game} />
        ))}
      </div>

      <SourceAttribution
        className="mt-10"
        sources={[{ label: "soonersports.com", url: DATA_SOURCE_SCHEDULE }]}
      />
    </div>
  );
}
