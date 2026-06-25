import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { WesternDivider } from "@/components/WesternDivider";
import { newsItems } from "@/data/news";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sooner News",
  description:
    "Oklahoma Sooners football news with citations from soonersports.com and reputable outlets.",
};

const categoryColors: Record<string, string> = {
  game: "bg-green-100 text-green-800",
  team: "bg-crimson/10 text-crimson",
  recruiting: "bg-blue-100 text-blue-800",
  offseason: "bg-amber-100 text-amber-800",
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-crimson">Sooner News</h1>
      <p className="mt-2 text-ink/70">
        Curated updates with full attribution to official and reputable sources.
        We cite and credit every story — start with{" "}
        <a
          href="https://soonersports.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-crimson underline"
        >
          soonersports.com
        </a>
        .
      </p>

      <WesternDivider />

      <div className="space-y-6">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border-2 border-crimson/15 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${categoryColors[item.category]}`}
              >
                {item.category}
              </span>
              <time className="text-sm text-ink/60">{formatDate(item.date)}</time>
            </div>
            <h2 className="mt-3 font-display text-xl font-bold text-ink">
              {item.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink/80">{item.summary}</p>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson underline decoration-crimson/30 hover:decoration-crimson"
            >
              Read more at {item.source}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-crimson/20 bg-cream-dark p-4 text-sm text-ink/70">
        <strong className="text-crimson">Attribution policy:</strong> Boomer Ball is a
        fan project. All statistics and news summaries link to original sources. We
        recommend visiting{" "}
        <a
          href="https://soonersports.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-crimson underline"
        >
          soonersports.com
        </a>{" "}
        for official University of Oklahoma athletics content.
      </div>
    </div>
  );
}
