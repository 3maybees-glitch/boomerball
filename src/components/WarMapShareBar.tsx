"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { X_HANDLE } from "@/lib/brand";
import { WAR_MAP_PRICE_DISPLAY, WAR_MAP_ROUTE } from "@/lib/war-map";

const SHARE_TEXT = `$1 Sooner season sheet — the 2026 WAR MAP from Boomer Ball. Depth charts, unit grades, projected scores & bowl call.`;

function shareUrl(): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${WAR_MAP_ROUTE}`;
  }
  return `https://boomerball.app${WAR_MAP_ROUTE}`;
}

export function WarMapShareBar() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function shareOnX() {
    const url = new URL("https://x.com/intent/tweet");
    url.searchParams.set("text", `${SHARE_TEXT}\n\n${shareUrl()}`);
    url.searchParams.set("via", X_HANDLE);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="print:hidden flex flex-wrap items-center gap-2 rounded-xl border border-crimson/15 bg-cream/50 px-3 py-2.5">
      <Share2 className="h-4 w-4 shrink-0 text-crimson" aria-hidden />
      <p className="mr-auto text-xs font-semibold text-ink/70 sm:text-sm">
        Share the {WAR_MAP_PRICE_DISPLAY} Sooner season sheet
      </p>
      <button
        type="button"
        onClick={shareOnX}
        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-cream transition hover:bg-ink/85"
      >
        Post on X
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 rounded-full border border-crimson/25 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-crimson transition hover:bg-crimson/5"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" aria-hidden />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden />
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
