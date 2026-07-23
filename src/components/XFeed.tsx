"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ExternalLink } from "lucide-react";
import { featuredXPosts, xFeedMeta } from "@/data/x-posts";
import { X_TIMELINE_URL } from "@/lib/brand";
import { formatDate } from "@/lib/utils";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (element?: HTMLElement | null) => void;
      };
    };
  }
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function reloadXWidgets() {
  window.twttr?.widgets?.load();
}

export function XFeed() {
  useEffect(() => {
    reloadXWidgets();
  }, []);

  const latestPost = featuredXPosts[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 border-l-2 border-crimson/30 bg-white/85 py-4 pl-4 pr-3 sm:pl-5 sm:pr-4">
        <div className="min-w-0">
          <p className="font-display text-lg font-bold text-ink">
            @{xFeedMeta.handle}
          </p>
          <p className="mt-0.5 text-sm text-ink/65">
            Real-time Sooner takes from {xFeedMeta.displayName}.
          </p>
        </div>
        <a
          href={xFeedMeta.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-crimson active:scale-[0.98]"
        >
          <XLogo className="h-4 w-4" />
          Follow on X
          <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </a>
      </div>

      {latestPost && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
            Latest post
          </p>
          <article className="border-l-2 border-crimson/35 bg-white/90 py-4 pl-4 pr-3 shadow-[0_4px_20px_rgba(26,10,10,0.04)] sm:pl-5 sm:pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-crimson">
                <XLogo className="h-3 w-3" />
                @{xFeedMeta.handle}
              </span>
              <time className="text-xs font-medium uppercase tracking-wide text-ink/50">
                {formatDate(latestPost.date)}
              </time>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/85 sm:text-base">
              {latestPost.text}
            </p>
            <a
              href={latestPost.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson underline decoration-crimson/25 underline-offset-2 hover:decoration-crimson"
            >
              View on X
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </article>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-crimson/12 bg-white/90 shadow-[0_4px_20px_rgba(26,10,10,0.04)]">
        <div className="border-b border-crimson/10 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
            More from @{xFeedMeta.handle}
          </p>
        </div>
        <div className="max-h-[min(520px,70vh)] overflow-y-auto px-2 py-2 sm:px-3">
          <a
            className="twitter-timeline"
            data-lang="en"
            data-height="480"
            data-theme="light"
            data-chrome="noheader nofooter noborders transparent"
            href={X_TIMELINE_URL}
          >
            Posts by @{xFeedMeta.handle}
          </a>
        </div>
      </div>

      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onReady={reloadXWidgets}
      />
    </div>
  );
}
