"use client";

import { Sparkles } from "lucide-react";
import type { CompMatch, CollegeProspect } from "@/lib/nfl-similarity";

function ScoreRing({ score, grade, size = "lg" }: { score: number; grade: string; size?: "lg" | "sm" }) {
  const dim = size === "lg" ? 108 : 76;
  const stroke = size === "lg" ? 8 : 6;
  const radius = (dim - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (score / 100);

  const color =
    score >= 86 ? "text-green-600" : score >= 74 ? "text-amber-500" : "text-crimson";

  return (
    <div className="relative shrink-0" style={{ width: dim, height: dim }}>
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-cream-dark"
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference - filled}`}
          className={`${color} stroke-current transition-all duration-700`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-display font-bold tabular-nums text-ink ${
            size === "lg" ? "text-3xl" : "text-xl"
          }`}
        >
          {Math.round(score)}
        </span>
        <span
          className={`font-bold uppercase tracking-wide text-ink/50 ${
            size === "lg" ? "text-[11px]" : "text-[9px]"
          }`}
        >
          {grade}
        </span>
      </div>
    </div>
  );
}

function AttributeBars({ match, prospectName }: { match: CompMatch; prospectName: string }) {
  return (
    <div className="mt-5 border-t border-cream-dark/80 pt-4">
      <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-ink/50">
        <span>{prospectName}</span>
        <span>{match.comparable.name}</span>
      </div>
      <ul className="space-y-2.5">
        {match.attributes.map((attr) => (
          <li key={attr.key}>
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="w-24 shrink-0 font-medium tabular-nums text-ink sm:w-28">
                {attr.collegeDisplay}
              </span>
              <span className="flex-1 text-center text-xs font-semibold uppercase tracking-wide text-ink/45">
                {attr.label}
              </span>
              <span className="w-24 shrink-0 text-right font-medium tabular-nums text-ink sm:w-28">
                {attr.nflDisplay}
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-cream-dark">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  attr.similarity >= 80
                    ? "bg-green-500"
                    : attr.similarity >= 55
                      ? "bg-amber-400"
                      : "bg-crimson/70"
                }`}
                style={{ width: `${attr.similarity}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-right text-[10px] text-ink/40">
        Bar length = attribute similarity (100 = identical)
      </p>
    </div>
  );
}

export function NflCompResults({
  prospect,
  matches,
}: {
  prospect: CollegeProspect;
  matches: CompMatch[];
}) {
  if (matches.length === 0) return null;

  const [best, ...rest] = matches;

  return (
    <div>
      {/* Headline verdict */}
      <div className="rounded-2xl border border-crimson/25 bg-gradient-to-br from-crimson to-crimson-dark p-5 text-cream shadow-[0_12px_40px_rgba(132,22,23,0.25)] sm:p-6">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cream/70">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Best NFL comparison
        </p>
        <p className="mt-3 font-display text-2xl font-bold leading-snug sm:text-3xl">
          {prospect.name}{" "}
          <span className="text-cream/60">projects most like</span>{" "}
          {best.comparable.name}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-cream/80">
          {best.comparable.position} · {best.comparable.team} · {best.comparable.college} ·{" "}
          {best.comparable.draft}
        </p>
      </div>

      {/* #1 comp detail card */}
      <div className="mt-4 rounded-2xl border border-crimson/12 bg-white/95 p-5 shadow-[0_4px_20px_rgba(26,10,10,0.06)] sm:p-6">
        <div className="flex flex-wrap items-center gap-5">
          <ScoreRing score={best.score} grade={best.grade} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-crimson">
              Similarity {best.score.toFixed(1)} / 100 — {best.gradeLabel}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-ink">
              {best.comparable.name}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink/70">
              {best.comparable.playStyle}
            </p>
            <p className="mt-1.5 text-xs font-medium text-green-700">
              {best.comparable.accolades}
            </p>
          </div>
        </div>
        <AttributeBars match={best} prospectName={prospect.name} />
      </div>

      {/* Runner-up comps */}
      {rest.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {rest.map((match, i) => (
            <div
              key={match.comparable.id}
              className="rounded-2xl border border-crimson/12 bg-white/95 p-5 shadow-[0_4px_20px_rgba(26,10,10,0.06)]"
            >
              <p className="text-[11px] font-bold uppercase tracking-wide text-ink/45">
                #{i + 2} comp — {match.gradeLabel}
              </p>
              <div className="mt-3 flex items-center gap-4">
                <ScoreRing score={match.score} grade={match.grade} size="sm" />
                <div className="min-w-0">
                  <h4 className="font-display text-lg font-bold leading-tight text-ink">
                    {match.comparable.name}
                  </h4>
                  <p className="mt-0.5 text-xs text-ink/60">
                    {match.comparable.position} · {match.comparable.team}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink/65">
                    {match.comparable.playStyle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
