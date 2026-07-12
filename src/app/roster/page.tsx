import type { Metadata } from "next";
import { CoachCard } from "@/components/PlayerCard";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageContent } from "@/components/PageContent";
import { EditorialSection } from "@/components/EditorialSection";
import { JsonLd } from "@/components/JsonLd";
import { RosterGrid } from "@/components/RosterGrid";
import { SourceAttribution } from "@/components/SourceAttribution";
import { CFB27_RATINGS_SOURCE } from "@/data/cfb27-ratings";
import { roster2026, ROSTER_SOURCE } from "@/data/roster";
import { coaches2026, COACHES_SOURCE_2026 } from "@/data/coaches-2026";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "2026 Roster & Coaches";
const PAGE_DESCRIPTION = `Full ${roster2026.length}-player 2026 Oklahoma Sooners football roster with height, weight, position, EA Sports College Football 27 ratings, coaching staff bios, and recruiting context from soonersports.com.`;

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/roster",
  keywords: [
    "Oklahoma Sooners roster 2026",
    "OU football roster",
    "Sooners coaching staff",
    "Oklahoma football players",
    "EA Sports College Football 27 Oklahoma ratings",
  ],
});

export default function RosterPage() {
  return (
    <PageShell theme="roster">
      <JsonLd
        data={[
          webPageJsonLd({ path: "/roster", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/roster" },
          ]),
        ]}
      />
      <PageHeader
        theme="roster"
        title="2026 roster & coaching staff"
        description={`Full spring roster with ${roster2026.length} players, recruit stars, transfer portal info, and EA Sports College Football 27 overall ratings. Tap a row to expand bios and attribute breakdowns.`}
      />

      <PageContent>
        <EditorialSection
          title="Players"
          description="Source: soonersports.com 2026 spring roster. Stars from On3, 247Sports, and ESPN composites. CFB 27 column shows EA Sports College Football 27 overall ratings — expand a row for SPD, STR, AGI, COD, INJ, and AWR."
          divider={false}
        >
          <RosterGrid players={roster2026} />
        </EditorialSection>

        <SourceAttribution
          className="mt-10"
          sources={[
            { label: "soonersports.com", url: ROSTER_SOURCE },
            {
              label: "On3 / 247Sports / ESPN (recruit data)",
              url: "https://www.on3.com/college/oklahoma-sooners/football/2026/commits/",
            },
            { label: CFB27_RATINGS_SOURCE },
          ]}
        />

        <EditorialSection
          className="mt-14"
          title="Coaching staff"
          description="Brent Venables and the 2026 Oklahoma coaching staff"
          delay={0.08}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coaches2026.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        </EditorialSection>

        <SourceAttribution
          className="mt-8"
          sources={[{ label: "soonersports.com", url: COACHES_SOURCE_2026 }]}
        />
      </PageContent>
    </PageShell>
  );
}
