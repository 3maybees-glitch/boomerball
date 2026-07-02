import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageContent } from "@/components/PageContent";
import { JsonLd } from "@/components/JsonLd";
import { MmqbRecapBody } from "@/components/MmqbRecapBody";
import { SourceAttribution } from "@/components/SourceAttribution";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { MMQB_TITLE } from "@/data/weekly-recaps";
import {
  formatRecapMatchup,
  getAllRecaps,
  getRecapBySlug,
  getRecapSlugs,
} from "@/lib/mmqb";
import { formatDate } from "@/lib/utils";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getRecapSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recap = getRecapBySlug(slug);

  if (!recap) {
    return pageMetadata({
      title: "Recap not found",
      path: `/mmqb/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: `${recap.headline} | ${MMQB_TITLE}`,
    description: recap.lede,
    path: `/mmqb/${slug}`,
    keywords: [
      `Oklahoma ${recap.opponent} recap`,
      "OU football game recap",
      MMQB_TITLE,
      `Sooners Week ${recap.week} ${recap.season}`,
    ],
  });
}

const resultBadge: Record<"W" | "L", string> = {
  W: "bg-green-500/20 text-green-100 ring-green-400/30",
  L: "bg-red-500/20 text-red-100 ring-red-400/30",
};

export default async function MmqbRecapPage({ params }: PageProps) {
  const { slug } = await params;
  const recap = getRecapBySlug(slug);

  if (!recap) {
    notFound();
  }

  const allRecaps = getAllRecaps();
  const currentIndex = allRecaps.findIndex((r) => r.slug === slug);
  const olderRecap = allRecaps[currentIndex + 1];
  const newerRecap = currentIndex > 0 ? allRecaps[currentIndex - 1] : undefined;

  return (
    <PageShell theme="news">
      <JsonLd
        data={[
          webPageJsonLd({
            path: `/mmqb/${slug}`,
            title: recap.headline,
            description: recap.lede,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: MMQB_TITLE, path: "/mmqb" },
            { name: recap.headline, path: `/mmqb/${slug}` },
          ]),
        ]}
      />
      <PageHeader theme="news" title={recap.headline} compact>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ring-inset ${resultBadge[recap.result]}`}
          >
            {recap.result} {recap.score}
          </span>
          <span className="rounded-full bg-cream/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream/90 ring-1 ring-inset ring-cream/20">
            Week {recap.week} · {recap.season}
          </span>
          {recap.isArchive && (
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-100 ring-1 ring-inset ring-amber-400/30">
              Archive
            </span>
          )}
        </div>
        <p className="mt-3 text-sm text-cream/70">
          {formatRecapMatchup(recap)} · {formatDate(recap.publishedDate)} · Record after:{" "}
          {recap.record}
        </p>
      </PageHeader>

      <PageContent>
        <MotionReveal>
          <Link
            href="/mmqb"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson underline decoration-crimson/25 underline-offset-2 hover:decoration-crimson"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All Monday Morning Quarterback issues
          </Link>
        </MotionReveal>

        <MotionReveal delay={0.05}>
          <MmqbRecapBody recap={recap} />
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <SourceAttribution className="mt-12" sources={recap.sources} />
        </MotionReveal>

        {(newerRecap || olderRecap) && (
          <nav
            className="mt-10 grid gap-4 border-t border-crimson/10 pt-8 sm:grid-cols-2"
            aria-label="Adjacent recaps"
          >
            {newerRecap ? (
              <Link
                href={`/mmqb/${newerRecap.slug}`}
                className="group rounded-xl border border-crimson/12 bg-white/90 p-4 transition hover:border-crimson/30 hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Newer
                </p>
                <p className="mt-1 font-display font-bold text-ink group-hover:text-crimson">
                  {newerRecap.headline}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {olderRecap && (
              <Link
                href={`/mmqb/${olderRecap.slug}`}
                className="group rounded-xl border border-crimson/12 bg-white/90 p-4 text-right transition hover:border-crimson/30 hover:bg-white sm:col-start-2"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Older
                </p>
                <p className="mt-1 font-display font-bold text-ink group-hover:text-crimson">
                  {olderRecap.headline}
                </p>
              </Link>
            )}
          </nav>
        )}
      </PageContent>
    </PageShell>
  );
}
