import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageContent } from "@/components/PageContent";
import { Callout } from "@/components/Callout";
import { EditorialSection } from "@/components/EditorialSection";
import { JsonLd } from "@/components/JsonLd";
import { StatTable, TeamStatGrid } from "@/components/StatTable";
import { SourceAttribution } from "@/components/SourceAttribution";
import {
  teamStats2025,
  passingStats2025,
  rushingStats2025,
  receivingStats2025,
  defenseStats2025,
  STATS_SOURCE_SOONERS,
  STATS_SOURCE_ESPN,
} from "@/data/stats";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "2025 Season Stats";
const PAGE_DESCRIPTION =
  "Oklahoma Sooners 2025 cumulative football statistics — passing, rushing, receiving, and defense with sources from soonersports.com and ESPN.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/stats",
  keywords: [
    "Oklahoma Sooners 2025 stats",
    "OU football passing stats",
    "Sooners rushing stats",
    "Oklahoma defense stats 2025",
  ],
});

export default function StatsPage() {
  return (
    <PageShell theme="stats">
      <JsonLd
        data={[
          webPageJsonLd({ path: "/stats", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/stats" },
          ]),
        ]}
      />
      <PageHeader
        theme="stats"
        title="2025 season statistics"
        description="Free stats for Sooner Nation. Individual and team cumulative totals through the College Football Playoff first round."
      />

      <PageContent>
        <Callout variant="warning" className="mb-10">
          <strong>Offseason note:</strong> No active games. Displaying 2025 season
          cumulative stats until weekly 2026 updates begin.
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

        <SourceAttribution
          className="mt-12"
          sources={[
            { label: "soonersports.com", url: STATS_SOURCE_SOONERS },
            { label: "ESPN", url: STATS_SOURCE_ESPN },
          ]}
        />
      </PageContent>
    </PageShell>
  );
}
