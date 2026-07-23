import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageContent } from "@/components/PageContent";
import { EditorialSection } from "@/components/EditorialSection";
import { JsonLd } from "@/components/JsonLd";
import { PodcastChannels } from "@/components/PodcastChannels";
import { XFeed } from "@/components/XFeed";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { newsItems } from "@/data/news";
import { formatDate } from "@/lib/utils";
import { X_HANDLE } from "@/lib/brand";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "Sooner News";
const PAGE_DESCRIPTION =
  "Oklahoma Sooners football news with full citations from soonersports.com, ESPN, and reputable college football outlets — plus Boomer Ball posts on X.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/news",
  keywords: [
    "Oklahoma Sooners news",
    "OU football news",
    "Sooners football updates",
    "Oklahoma recruiting news",
    "Boomer Ball X",
    `@${X_HANDLE}`,
  ],
});

const categoryColors: Record<string, string> = {
  game: "bg-green-100/90 text-green-800",
  team: "bg-crimson/10 text-crimson",
  recruiting: "bg-blue-100/90 text-blue-800",
  offseason: "bg-amber-100/90 text-amber-900",
};

export default function NewsPage() {
  return (
    <PageShell theme="news">
      <JsonLd
        data={[
          webPageJsonLd({ path: "/news", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/news" },
          ]),
        ]}
      />
      <PageHeader
        theme="news"
        title="Sooner news"
        description="Curated updates with full attribution to official and reputable sources. We cite and credit every story."
      />

      <PageContent>
        <EditorialSection
          title="Sooner podcasts"
          description="Listen to trusted voices covering Oklahoma football."
          divider={false}
        >
          <PodcastChannels />
        </EditorialSection>

        <EditorialSection
          className="mt-14"
          title="Boomer Ball on X"
          description={`Quick hits and site updates from @${X_HANDLE} — follow along between the longer writeups.`}
          delay={0.06}
        >
          <XFeed />
        </EditorialSection>

        <EditorialSection
          className="mt-14"
          title="Latest stories"
          description="Curated headlines with links to original reporting."
          delay={0.1}
        >
          <div className="space-y-5">
            {newsItems.map((item, index) => (
              <MotionReveal key={item.id} delay={index * 0.04}>
                <article className="group border-l-2 border-crimson/25 bg-white/85 py-5 pl-5 pr-4 transition hover:border-crimson hover:bg-white sm:pl-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${categoryColors[item.category]}`}
                    >
                      {item.category}
                    </span>
                    <time className="text-xs font-medium uppercase tracking-wide text-ink/50">
                      {formatDate(item.date)}
                    </time>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink group-hover:text-crimson">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-ink/75">
                    {item.summary}
                  </p>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson underline decoration-crimson/25 underline-offset-2 hover:decoration-crimson"
                  >
                    Read more at {item.source}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </article>
              </MotionReveal>
            ))}
          </div>
        </EditorialSection>

        <div className="mt-12 rounded-2xl border border-crimson/12 bg-cream/50 p-5 text-sm leading-relaxed text-ink/75 shadow-[0_4px_20px_rgba(26,10,10,0.04)]">
          <strong className="text-crimson">Attribution policy:</strong> Boomer Ball is a
          fan project. All statistics and news summaries link to original sources. Visit{" "}
          <a
            href="https://soonersports.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-crimson underline decoration-crimson/25 underline-offset-2"
          >
            soonersports.com
          </a>{" "}
          for official University of Oklahoma athletics content.
        </div>
      </PageContent>
    </PageShell>
  );
}
