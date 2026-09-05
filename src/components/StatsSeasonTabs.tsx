"use client";

import { useState } from "react";
import { Callout } from "@/components/Callout";
import { EditorialSection } from "@/components/EditorialSection";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { SourceAttribution } from "@/components/SourceAttribution";
import { StatTable, TeamStatGrid } from "@/components/StatTable";
import {
  defenseStats2025,
  passingStats2025,
  passingStats2026,
  receivingStats2025,
  receivingStats2026,
  rushingStats2025,
  STATS_SOURCE_ESPN,
  STATS_SOURCE_SOONERS_2025,
  STATS_SOURCE_SOONERS_2026,
  STATS_SOURCE_UTEP_RECAP,
  teamStats2025,
  teamStats2026,
  week1TeamExtras2026,
} from "@/data/stats";

export function StatsSeasonTabs() {
  const [season, setSeason] = useState<"2026" | "2025">("2026");
  const is2026 = season === "2026";

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
            {y} {y === "2026" ? "season" : "archive"}
          </button>
        ))}
      </div>

      {is2026 ? (
        <>
          <Callout variant="info" className="mb-10">
            <strong>2026 is live:</strong> Totals through the Week 1 shutout of
            UTEP. Individual rush, receiving, and defense tables expand as
            official cumulative stats publish. The full 2025 season sits in the
            archive tab.
          </Callout>

          <EditorialSection title="Team overview" divider={false}>
            <TeamStatGrid
              stats={[
                { label: "Record", value: teamStats2026.record, sub: teamStats2026.conferenceRecord },
                { label: "Points/Game", value: teamStats2026.pointsPerGame },
                { label: "Allowed/Game", value: teamStats2026.pointsAllowedPerGame },
                { label: "Total Offense", value: `${teamStats2026.totalYardsPerGame} YPG` },
                { label: "Rushing", value: `${teamStats2026.rushingYardsPerGame} YPG` },
                { label: "Passing", value: `${teamStats2026.passingYardsPerGame} YPG` },
                { label: "Yards Allowed", value: week1TeamExtras2026.yardsAllowed },
                { label: "1st Downs", value: week1TeamExtras2026.firstDowns },
                { label: "TOP", value: week1TeamExtras2026.timeOfPossession },
              ]}
            />
          </EditorialSection>

          <div className="mt-12 space-y-10">
            <EditorialSection title="Passing" divider={false} delay={0.05}>
              <StatTable
                title="Passing leaders"
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
                rows={passingStats2026.map((s) => ({
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
            </EditorialSection>

            <EditorialSection title="Scoring receptions" divider={false} delay={0.08}>
              <StatTable
                title="Week 1 touchdown catches"
                columns={[
                  { key: "player", label: "Player" },
                  { key: "rec", label: "Rec", align: "right" },
                  { key: "yards", label: "Yards", align: "right" },
                  { key: "avg", label: "Avg", align: "right" },
                  { key: "td", label: "TD", align: "right" },
                  { key: "long", label: "Long", align: "right" },
                ]}
                rows={receivingStats2026.map((s) => ({
                  player: `#${s.number} ${s.player}`,
                  rec: s.rec,
                  yards: s.yards,
                  avg: s.avg,
                  td: s.td,
                  long: s.long,
                }))}
              />
              <p className="mt-3 text-sm text-ink/60">
                Confirmed scoring receptions from the UTEP box. Additional catches
                will land here when official cumulative receiving stats update.
              </p>
            </EditorialSection>
          </div>
        </>
      ) : (
        <>
          <Callout variant="info" className="mb-10">
            <strong>2025 archive:</strong> Final cumulative totals through the
            College Football Playoff first round. The live 2026 season is on the
            other tab.
          </Callout>

          <EditorialSection title="Team overview" divider={false}>
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
          </EditorialSection>

          <div className="mt-12 space-y-10">
            <EditorialSection title="Passing" divider={false} delay={0.05}>
              <StatTable
                title="Passing leaders"
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
            </EditorialSection>

            <EditorialSection title="Rushing" divider={false} delay={0.08}>
              <StatTable
                title="Rushing leaders"
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
            </EditorialSection>

            <EditorialSection title="Receiving" divider={false} delay={0.1}>
              <StatTable
                title="Receiving leaders"
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
            </EditorialSection>

            <EditorialSection title="Defense" divider={false} delay={0.12}>
              <StatTable
                title="Defensive leaders"
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
            </EditorialSection>
          </div>
        </>
      )}

      <MotionReveal delay={0.08}>
        <SourceAttribution
          className="mt-12"
          sources={
            is2026
              ? [
                  { label: "soonersports.com recap", url: STATS_SOURCE_UTEP_RECAP },
                  { label: "soonersports.com", url: STATS_SOURCE_SOONERS_2026 },
                  { label: "ESPN", url: STATS_SOURCE_ESPN },
                ]
              : [
                  { label: "soonersports.com", url: STATS_SOURCE_SOONERS_2025 },
                  { label: "ESPN", url: STATS_SOURCE_ESPN },
                ]
          }
        />
      </MotionReveal>
    </>
  );
}
