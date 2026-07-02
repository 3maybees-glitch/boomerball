import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageContent } from "@/components/PageContent";
import { EditorialSection } from "@/components/EditorialSection";
import { JsonLd } from "@/components/JsonLd";
import { Callout } from "@/components/Callout";
import { MmqbRecapCard } from "@/components/MmqbRecapCard";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { MMQB_TAGLINE, MMQB_TITLE } from "@/data/weekly-recaps";
import { getAllRecaps, getLatestRecap, getMmkbSeasonMessage, isMmkbOffseason } from "@/lib/mmqb";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { PREMIUM_RECRUIT_ROUTE } from "@/lib/premium";

const PAGE_DESCRIPTION =
  "Monday Morning Quarterback — weekly Oklahoma Sooners game recaps with regular stats, advanced analytics, and editorial writeups published every Monday.";

export const metadata: Metadata = pageMetadata({
  title: MMQB_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/mmqb",
  keywords: [
    "Oklahoma Sooners game recap",
    "OU football weekly recap",
    "Monday Morning Quarterback",
    "Sooners football analysis",
    "Oklahoma football stats recap",
  ],
});

export default function MmqbIndexPage() {
  const recaps = getAllRecaps();
  const latest = getLatestRecap();
  const offseason = isMmkbOffseason();
  const [featured, ...archive] = recaps;

  return (
    <PageShell theme="news">
      <JsonLd
        data={[
          webPageJsonLd({ path: "/mmqb", title: MMQB_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: MMQB_TITLE, path: "/mmqb" },
          ]),
        ]}
      />
      <PageHeader
        theme="news"
        title="Monday Morning Quarterback"
        description={MMQB_TAGLINE}
      />

      <PageContent>
        {offseason && (
          <MotionReveal>
            <Callout variant="info" className="mb-10">
              <strong className="text-crimson">2026 season preview:</strong>{" "}
              {getMmkbSeasonMessage()} Browse archive recaps from the 2025 season below
              to see the format.{" "}
              <Link
                href={PREMIUM_RECRUIT_ROUTE}
                className="font-semibold text-crimson underline decoration-crimson/25 underline-offset-2"
              >
                Join The Locker Room
              </Link>{" "}
              for advanced metrics in every issue.
            </Callout>
          </MotionReveal>
        )}

        {latest && (
          <EditorialSection
            title="Latest issue"
            description={
              offseason
                ? "Most recent archive recap from the 2025 season."
                : "Published Monday after the latest game."
            }
            divider={false}
          >
            <MmqbRecapCard recap={latest} featured />
          </EditorialSection>
        )}

        {archive.length > 0 && (
          <EditorialSection
            className="mt-14"
            title={offseason ? "2025 archive" : "Previous issues"}
            description="Every game, every Monday — regular stats and a full writeup."
            delay={0.08}
          >
            <div className="space-y-5">
              {archive.map((recap, index) => (
                <MmqbRecapCard key={recap.id} recap={recap} index={index} />
              ))}
            </div>
          </EditorialSection>
        )}

        <div className="mt-12 rounded-2xl border border-crimson/12 bg-cream/50 p-5 text-sm leading-relaxed text-ink/75 shadow-[0_4px_20px_rgba(26,10,10,0.04)]">
          <strong className="text-crimson">How it works:</strong> Each Monday during the
          season, Boomer Ball publishes a recap of the previous game — box-score highlights,
          QB watch, offense and defense reports, what&apos;s next, and advanced analytics for{" "}
          <Link
            href="/locker-room"
            className="font-medium text-crimson underline decoration-crimson/25 underline-offset-2"
          >
            Locker Room
          </Link>{" "}
          members. Stats are sourced from{" "}
          <a
            href="https://soonersports.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-crimson underline decoration-crimson/25 underline-offset-2"
          >
            soonersports.com
          </a>{" "}
          and ESPN.
        </div>
      </PageContent>
    </PageShell>
  );
}
