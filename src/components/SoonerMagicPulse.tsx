"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ChevronDown,
  HatGlasses,
  Shield,
  Sparkles,
  Swords,
  Zap,
} from "lucide-react";
import {
  SOONER_MAGIC_PULSE_EXPLAINER,
  type PulsePhase,
  type PulseTrend,
  type SoonerMagicPulse,
} from "@/lib/sooner-magic-pulse";
import { PREMIUM_PRICE_DISPLAY } from "@/lib/premium";

const phaseIcons = {
  offense: Swords,
  defense: Shield,
  special: Sparkles,
} as const;

const trendStyles: Record<
  PulseTrend,
  { label: string; dot: string; text: string }
> = {
  surging: {
    label: "Surging",
    dot: "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]",
    text: "text-green-300",
  },
  steady: {
    label: "Steady",
    dot: "bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.7)]",
    text: "text-amber-200",
  },
  watch: {
    label: "Watch",
    dot: "bg-cream/60 shadow-[0_0_6px_rgba(253,249,216,0.5)]",
    text: "text-cream/70",
  },
};

function PhaseCard({ phase }: { phase: PulsePhase }) {
  const Icon = phaseIcons[phase.id];
  const trend = trendStyles[phase.trend];

  return (
    <div className="rounded-xl border border-cream/15 bg-crimson-dark/40 p-3 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5 text-cream/60" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cream/70">
            {phase.label}
          </span>
        </div>
        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${trend.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${trend.dot}`} />
          {trend.label}
        </span>
      </div>
      <p className="mt-2 font-display text-2xl font-bold text-cream">{phase.displayValue}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cream/80 to-cream transition-all duration-700"
          style={{ width: `${phase.score}%` }}
        />
      </div>
      {phase.rank && (
        <p className="mt-1.5 text-[10px] font-medium text-green-300/90">{phase.rank}</p>
      )}
    </div>
  );
}

export function SoonerMagicPulse({ pulse }: { pulse: SoonerMagicPulse }) {
  const [explainerOpen, setExplainerOpen] = useState(false);
  const overallTrend = trendStyles[pulse.trend];

  return (
    <section
      aria-labelledby="sooner-magic-pulse-heading"
      className="relative overflow-hidden rounded-2xl border-2 border-crimson-dark bg-gradient-to-br from-crimson via-crimson to-crimson-dark shadow-xl"
    >
      {/* Ambient pulse rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
        <div className="pulse-ring absolute h-48 w-48 rounded-full border border-cream/20" />
        <div className="pulse-ring pulse-ring--delay absolute h-64 w-64 rounded-full border border-cream/10" />
        <div className="pulse-ring pulse-ring--delay-2 absolute h-80 w-80 rounded-full border border-cream/5" />
      </div>

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cream/75">
              <Activity className="h-4 w-4" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                Team Pulse
              </span>
            </div>
            <h2
              id="sooner-magic-pulse-heading"
              className="mt-1 font-display text-2xl font-bold text-cream sm:text-3xl"
            >
              Sooner Magic Pulse
            </h2>
            <p className="mt-1 max-w-md text-sm text-cream/80">{pulse.statusTagline}</p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-cream/10 px-3 py-1 text-xs font-bold uppercase tracking-wide ${overallTrend.text}`}
          >
            <span className={`h-2 w-2 rounded-full ${overallTrend.dot}`} />
            {pulse.statusLabel}
          </span>
        </div>

        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[auto_1fr]">
          {/* Central pulse score */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
              <svg
                className="absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(253,249,216,0.12)"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(253,249,216,0.85)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${pulse.pulseScore * 2.64} 264`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="relative text-center">
                <p className="font-display text-5xl font-extrabold leading-none text-cream sm:text-6xl">
                  {pulse.pulseScore}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cream/60">
                  Pulse
                </p>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-cream/55">{pulse.seasonLabel}</p>
          </div>

          {/* Phase breakdown + signature metric */}
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {pulse.phases.map((phase) => (
                <PhaseCard key={phase.id} phase={phase} />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cream/15 bg-black/15 px-4 py-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-300" aria-hidden />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-cream/55">
                    Signature metric
                  </p>
                  <p className="font-display text-lg font-bold text-cream">
                    {pulse.signature.label}{" "}
                    <span className="text-amber-200">{pulse.signature.value}</span>
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-900/40 px-2.5 py-1 text-xs font-semibold text-green-300">
                {pulse.signature.rank}
              </span>
            </div>

            {/* EKG-style decorative line */}
            <div className="overflow-hidden rounded-lg border border-cream/10 bg-black/10 px-3 py-2">
              <svg
                viewBox="0 0 400 40"
                className="h-8 w-full text-cream/70"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  className="pulse-ekg"
                  d="M0 20 L40 20 L50 8 L60 32 L70 20 L120 20 L130 12 L140 28 L150 20 L200 20 L210 6 L220 34 L230 20 L280 20 L290 14 L300 26 L310 20 L400 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Explainer + CTA */}
        <div className="mt-5 border-t border-cream/15 pt-4">
          <button
            type="button"
            onClick={() => setExplainerOpen(!explainerOpen)}
            className="flex w-full items-center justify-between gap-2 text-left text-sm font-semibold text-cream/90"
            aria-expanded={explainerOpen}
          >
            <span>{SOONER_MAGIC_PULSE_EXPLAINER.title}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform ${explainerOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          {explainerOpen && (
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-cream/80">
              <p>{SOONER_MAGIC_PULSE_EXPLAINER.summary}</p>
              <ul className="space-y-2">
                {SOONER_MAGIC_PULSE_EXPLAINER.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cream/60" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="text-cream/65">{SOONER_MAGIC_PULSE_EXPLAINER.cta}</p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/advanced"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-crimson transition hover:bg-white"
            >
              <HatGlasses className="h-4 w-4" aria-hidden />
              Full Advanced Analytics
            </Link>
            <span className="text-xs text-cream/55">
              Premium · {PREMIUM_PRICE_DISPLAY} lifetime · SP+, grades & schemes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
