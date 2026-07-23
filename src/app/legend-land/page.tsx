import type { Metadata } from "next";
import { Trophy, Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageContent } from "@/components/PageContent";
import { EditorialSection } from "@/components/EditorialSection";
import { JsonLd } from "@/components/JsonLd";
import { LegendCard, ChampionshipCard } from "@/components/LegendCard";
import { IconicGameCard } from "@/components/IconicGameCard";
import { LegendMapsShowcase } from "@/components/LegendMapsShowcase";
import { LegendLandSectionNav } from "@/components/LegendLandSectionNav";
import { SourceAttribution } from "@/components/SourceAttribution";
import { iconicGames, ICONIC_GAMES_SOURCE } from "@/data/iconic-games";
import {
  soonersLegends,
  nationalChampionships,
  LEGENDS_SOURCE,
  CHAMPIONSHIPS_SOURCE,
} from "@/data/legends";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "Legend Land — Sooners Hall of Fame";
const PAGE_DESCRIPTION =
  "Oklahoma Sooners football legends, seven Heisman Trophy winners, iconic games, national championship teams, and printable Legend Land fantasy maps.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/legend-land",
  keywords: [
    "Oklahoma Sooners legends",
    "OU Heisman winners",
    "Sooners national championships",
    "Oklahoma iconic football games",
    "Oklahoma Sooners Legend Land map",
    "OU football wall art",
  ],
});

export default function LegendLandPage() {
  const heismanWinners = soonersLegends.filter((l) => l.category === "heisman");
  const icons = soonersLegends.filter((l) => l.category !== "heisman");

  return (
    <PageShell theme="legends">
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/legend-land",
            title: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Legend Land", path: "/legend-land" },
          ]),
        ]}
      />
      <PageHeader
        theme="legends"
        title="Legend Land"
        description="Celebrate the icons who built Sooner Nation. Heisman winners, ten iconic games, and the seven national championship teams that define crimson and cream excellence."
      >
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-sm font-semibold text-cream backdrop-blur-sm">
            <Trophy className="h-4 w-4" aria-hidden />
            7 national titles
          </div>
          <div className="flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-sm font-semibold text-cream backdrop-blur-sm">
            <Star className="h-4 w-4" aria-hidden />
            7 Heisman trophies
          </div>
        </div>
      </PageHeader>

      <PageContent>
        <LegendLandSectionNav />

        <EditorialSection
          id="heisman"
          title="Heisman Trophy winners"
          description="OU is tied for the second-most Heisman winners in college football history."
        >
          <div className="space-y-6">
            {heismanWinners.map((legend) => (
              <LegendCard key={legend.id} legend={legend} />
            ))}
          </div>
        </EditorialSection>

        <EditorialSection
          id="icons"
          className="mt-14"
          title="Sooner icons"
          description="Legends who defined eras, from The Boz to Adrian Peterson and Lee Roy Selmon."
          delay={0.06}
        >
          <div className="space-y-6">
            {icons.map((legend) => (
              <LegendCard key={legend.id} legend={legend} />
            ))}
          </div>
        </EditorialSection>

        <EditorialSection
          id="games"
          className="mt-14"
          title="Iconic games in Sooner history"
          description="Ten of the most famous wins, heartbreaks, and moments that define Boomer Sooner lore."
          delay={0.08}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {iconicGames.map((game) => (
              <IconicGameCard key={game.id} game={game} />
            ))}
          </div>
        </EditorialSection>

        <EditorialSection
          id="championships"
          className="mt-14"
          title="National championship teams"
          description="Seven consensus national titles since 1950. One of only three programs to reach that mark."
          delay={0.1}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {nationalChampionships.map((team) => (
              <ChampionshipCard key={team.year} team={team} />
            ))}
          </div>
        </EditorialSection>

        <EditorialSection
          id="maps"
          className="mt-14"
          title="Take Legend Land home"
          description="Printable fantasy maps that chart the same icons, championships, and quarterback lineages celebrated above — available as digital downloads on Etsy."
          delay={0.12}
        >
          <LegendMapsShowcase />
        </EditorialSection>

        <SourceAttribution
          className="mt-12"
          sources={[
            { label: "soonersports.com — National Championships", url: CHAMPIONSHIPS_SOURCE },
            { label: "soonersports.com — Award Winners", url: LEGENDS_SOURCE },
            { label: "soonersports.com — Opponent History", url: ICONIC_GAMES_SOURCE },
          ]}
        />

        <p className="mt-4 text-xs leading-relaxed text-ink/50">
          Stats compiled from University of Oklahoma Athletics, SoonerStats, and NCAA
          historical records. Portrait and game moment illustrations are original
          Boomer Ball artwork inspired by each legend and iconic matchup. Not
          affiliated with the University of Oklahoma.
        </p>
      </PageContent>
    </PageShell>
  );
}
