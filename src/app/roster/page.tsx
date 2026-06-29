import type { Metadata } from "next";
import { CoachCard } from "@/components/PlayerCard";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { RosterGrid } from "@/components/RosterGrid";
import { SourceAttribution } from "@/components/SourceAttribution";
import { WesternDivider } from "@/components/WesternDivider";
import { roster2026, ROSTER_SOURCE } from "@/data/roster";
import { coaches2026, COACHES_SOURCE_2026 } from "@/data/coaches-2026";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "2026 Roster & Coaches";
const PAGE_DESCRIPTION = `Full ${roster2026.length}-player 2026 Oklahoma Sooners football roster with height, weight, position, coaching staff bios, and recruiting context from soonersports.com.`;

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/roster",
  keywords: [
    "Oklahoma Sooners roster 2026",
    "OU football roster",
    "Sooners coaching staff",
    "Oklahoma football players",
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
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-crimson">
          2026 Roster & Coaching Staff
        </h1>
        <p className="mt-2 text-lg text-ink/70">
          Full spring roster with {roster2026.length} players — sorted A–Z by last
          name with recruit star ratings and transfer portal info where available.
          Tap a row to expand bio.
        </p>

        <WesternDivider />

        <h2 className="font-display text-2xl font-bold text-crimson">Players</h2>
        <p className="mt-1 text-base text-ink/60">
          Source: soonersports.com 2026 spring roster. Stars from On3 / 247Sports /
          ESPN composites. Headshots via ESPN where available.
        </p>

        <div className="mt-6">
          <RosterGrid players={roster2026} />
        </div>

        <SourceAttribution
          className="mt-10"
          sources={[
            { label: "soonersports.com", url: ROSTER_SOURCE },
            {
              label: "On3 / 247Sports / ESPN (recruit data)",
              url: "https://www.on3.com/college/oklahoma-sooners/football/2026/commits/",
            },
          ]}
        />

        <WesternDivider />

        <h2 className="font-display text-2xl font-bold text-crimson">Coaching Staff</h2>
        <p className="mt-1 text-base text-ink/60">
          Brent Venables and the 2026 Oklahoma coaching staff
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coaches2026.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>

        <SourceAttribution
          className="mt-6"
          sources={[{ label: "soonersports.com", url: COACHES_SOURCE_2026 }]}
        />
      </div>
    </PageShell>
  );
}
