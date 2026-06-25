import type { Metadata } from "next";
import { StatTable, TeamStatGrid } from "@/components/StatTable";
import { SourceAttribution } from "@/components/SourceAttribution";
import { WesternDivider } from "@/components/WesternDivider";
import {
  teamStats2025,
  passingStats2025,
  rushingStats2025,
  receivingStats2025,
  defenseStats2025,
  STATS_SOURCE_SOONERS,
  STATS_SOURCE_ESPN,
} from "@/data/stats";

export const metadata: Metadata = {
  title: "2025 Season Stats",
  description:
    "Oklahoma Sooners 2025 cumulative football statistics — passing, rushing, receiving, and defense.",
};

export default function StatsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>Offseason note:</strong> No active games — displaying 2025 season
        cumulative stats. Stats will update weekly once the 2026 season begins.
      </div>

      <h1 className="mt-6 font-display text-3xl font-bold text-crimson">
        2025 Season Statistics
      </h1>
      <p className="mt-2 text-ink/70">
        Free stats for Sooner Nation — individual and team cumulative totals through
        the College Football Playoff first round.
      </p>

      <WesternDivider />

      <h2 className="font-display text-xl font-bold text-crimson">Team Overview</h2>
      <div className="mt-4">
        <TeamStatGrid
          stats={[
            { label: "Record", value: teamStats2025.record, sub: teamStats2025.conferenceRecord },
            { label: "Points/Game", value: teamStats2025.pointsPerGame },
            { label: "Allowed/Game", value: teamStats2025.pointsAllowedPerGame },
            { label: "Total Offense", value: `${teamStats2025.totalYardsPerGame} YPG` },
            { label: "Rushing", value: `${teamStats2025.rushingYardsPerGame} YPG` },
            { label: "Passing", value: `${teamStats2025.passingYardsPerGame} YPG` },
            { label: "Team Sacks", value: teamStats2025.sacks },
            { label: "Team INTs", value: teamStats2025.interceptions },
            { label: "Team Tackles", value: teamStats2025.tackles },
          ]}
        />
      </div>

      <div className="mt-10 space-y-8">
        <StatTable
          title="Passing"
          columns={[
            { key: "player", label: "Player" },
            { key: "gp", label: "GP", align: "right" },
            { key: "comp", label: "Comp", align: "right" },
            { key: "att", label: "Att", align: "right" },
            { key: "yards", label: "Yards", align: "right" },
            { key: "td", label: "TD", align: "right" },
            { key: "int", label: "INT", align: "right" },
            { key: "pct", label: "Pct", align: "right" },
            { key: "rating", label: "Rating", align: "right" },
          ]}
          rows={passingStats2025.map((s) => ({
            player: `#${s.number} ${s.player}`,
            gp: s.gp,
            comp: s.comp,
            att: s.att,
            yards: s.yards.toLocaleString(),
            td: s.td,
            int: s.int,
            pct: `${s.pct}%`,
            rating: s.rating,
          }))}
        />

        <StatTable
          title="Rushing"
          columns={[
            { key: "player", label: "Player" },
            { key: "att", label: "Att", align: "right" },
            { key: "yards", label: "Yards", align: "right" },
            { key: "avg", label: "Avg", align: "right" },
            { key: "td", label: "TD", align: "right" },
            { key: "long", label: "Long", align: "right" },
          ]}
          rows={rushingStats2025.map((s) => ({
            player: `#${s.number} ${s.player}`,
            att: s.att,
            yards: s.yards,
            avg: s.avg,
            td: s.td,
            long: s.long,
          }))}
        />

        <StatTable
          title="Receiving"
          columns={[
            { key: "player", label: "Player" },
            { key: "rec", label: "Rec", align: "right" },
            { key: "yards", label: "Yards", align: "right" },
            { key: "avg", label: "Avg", align: "right" },
            { key: "td", label: "TD", align: "right" },
            { key: "long", label: "Long", align: "right" },
          ]}
          rows={receivingStats2025.map((s) => ({
            player: `#${s.number} ${s.player}`,
            rec: s.rec,
            yards: s.yards,
            avg: s.avg,
            td: s.td,
            long: s.long,
          }))}
        />

        <StatTable
          title="Defense"
          columns={[
            { key: "player", label: "Player" },
            { key: "pos", label: "Pos" },
            { key: "solo", label: "Solo", align: "right" },
            { key: "ast", label: "Ast", align: "right" },
            { key: "tot", label: "Tot", align: "right" },
            { key: "sacks", label: "Sacks", align: "right" },
            { key: "int", label: "INT", align: "right" },
            { key: "pd", label: "PD", align: "right" },
          ]}
          rows={defenseStats2025.map((s) => ({
            player: `#${s.number} ${s.player}`,
            pos: s.position,
            solo: s.solo,
            ast: s.ast,
            tot: s.tot,
            sacks: s.sacks,
            int: s.int,
            pd: s.pd,
          }))}
        />
      </div>

      <SourceAttribution
        className="mt-10"
        sources={[
          { label: "soonersports.com", url: STATS_SOURCE_SOONERS },
          { label: "ESPN", url: STATS_SOURCE_ESPN },
        ]}
      />
    </div>
  );
}
