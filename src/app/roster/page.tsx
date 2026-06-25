import type { Metadata } from "next";
import { PlayerCard, CoachCard } from "@/components/PlayerCard";
import { SourceAttribution } from "@/components/SourceAttribution";
import { WesternDivider } from "@/components/WesternDivider";
import { roster2025, ROSTER_SOURCE } from "@/data/roster";
import { coaches2025, COACHES_SOURCE } from "@/data/coaches";

export const metadata: Metadata = {
  title: "Roster & Coaches",
  description:
    "2025 Oklahoma Sooners football roster with player bios, headshots, height/weight, and coaching staff.",
};

const positionOrder = ["QB", "RB", "WR", "TE", "DL", "LB", "DB", "ST"] as const;

export default function RosterPage() {
  const grouped = positionOrder.map((group) => ({
    group,
    players: roster2025.filter((p) => p.positionGroup === group),
  })).filter((g) => g.players.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-crimson">
        2025 Roster & Coaching Staff
      </h1>
      <p className="mt-2 text-ink/70">
        Key players and coaches from the Sooners&apos; 10-3 season. Height, weight,
        and bios sourced from official athletics data.
      </p>

      <WesternDivider />

      <h2 className="font-display text-2xl font-bold text-crimson">Coaching Staff</h2>
      <p className="mt-1 text-sm text-ink/60">
        Head coach Brent Venables and his 2025 staff
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coaches2025.map((coach) => (
          <CoachCard key={coach.id} coach={coach} />
        ))}
      </div>

      <SourceAttribution
        className="mt-6"
        sources={[{ label: "soonersports.com", url: COACHES_SOURCE }]}
      />

      <WesternDivider />

      <h2 className="font-display text-2xl font-bold text-crimson">Players</h2>
      <p className="mt-1 text-sm text-ink/60">
        Featured players from the 2025 roster — headshots via ESPN
      </p>

      {grouped.map(({ group, players }) => (
        <section key={group} className="mt-8">
          <h3 className="mb-4 inline-block rounded-full bg-crimson px-4 py-1 font-display text-sm font-bold uppercase tracking-wider text-cream">
            {group === "ST" ? "Special Teams" : group}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      ))}

      <SourceAttribution
        className="mt-10"
        sources={[{ label: "soonersports.com", url: ROSTER_SOURCE }]}
      />
    </div>
  );
}
