"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import {
  advancedStatsGuide,
  guideCategoryLabels,
  guideCategoryOrder,
  type StatGuideEntry,
} from "@/data/advanced-stats-guide";

function GuideEntry({ entry }: { entry: StatGuideEntry }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-cream-dark/80 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 py-3.5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-ink">{entry.name}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-crimson transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className="space-y-3 pb-4 pl-1 text-sm leading-relaxed text-ink/80">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-crimson">
              What is it?
            </p>
            <p className="mt-1">{entry.whatItIs}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-crimson">
              Why it matters
            </p>
            <p className="mt-1">{entry.whyItMatters}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-crimson">
              How to read it
            </p>
            <p className="mt-1">{entry.howToRead}</p>
          </div>
          {entry.example && (
            <div className="rounded-lg border border-crimson/15 bg-cream-dark/60 px-3 py-2.5">
              <p className="text-xs font-bold uppercase tracking-wide text-crimson/80">
                Simple analogy
              </p>
              <p className="mt-1 text-ink/75">{entry.example}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AdvancedStatsGuide() {
  return (
    <div className="mb-8 rounded-xl border-2 border-crimson/15 bg-white/95 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson/10">
          <BookOpen className="h-5 w-5 text-crimson" aria-hidden />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-crimson">
            Beginner&apos;s Guide to Advanced Stats
          </h3>
          <p className="mt-1 text-sm text-ink/65">
            New to SP+, EPA, or havoc rate? Expand any term below for a plain-English
            explanation — no analytics degree required. These are fan estimates built
            from OU&apos;s official 2025 stats, not ESPN or PFF proprietary data.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {guideCategoryOrder.map((category) => {
          const entries = advancedStatsGuide.filter((e) => e.category === category);
          if (entries.length === 0) return null;
          return (
            <section key={category}>
              <h4 className="mb-2 font-display text-sm font-bold uppercase tracking-wide text-crimson/90">
                {guideCategoryLabels[category]}
              </h4>
              <div className="rounded-lg border border-crimson/10 bg-cream/40 px-4">
                {entries.map((entry) => (
                  <GuideEntry key={entry.id} entry={entry} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-ink/50">
        Tip: Positive SP+ and EPA numbers are good for offense; for defense, lower
        opponent scores and higher havoc/pressure are good. When in doubt, compare OU to
        SEC averages shown in each metric card below.
      </p>
    </div>
  );
}
