"use client";

import Image from "next/image";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SiteLogo } from "@/components/SiteLogo";
import { SEASON_RECORD, CONFERENCE_RECORD } from "@/data/schedule";
import { PREMIUM_RECRUIT_ROUTE } from "@/lib/premium";

export function HomeHero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { type: "spring" as const, stiffness: 90, damping: 22 },
      };

  return (
    <section className="relative min-h-[min(100dvh,920px)] overflow-hidden border-b border-crimson-dark/40 bg-ink">
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/stadium.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_35%] opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-crimson-dark/90" />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-24">
        <motion.div {...fadeUp}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/70">
            Boomer Sooner
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            Oklahoma Sooners football analytics
          </h1>
          <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-cream/80 sm:text-lg">
            2026 roster, schedule, 2025 stats, cited news, and premium SP+
            metrics for die-hard fans.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/stats"
              className="inline-flex items-center justify-center rounded-full bg-cream px-6 py-3 text-sm font-semibold text-crimson shadow-[0_8px_24px_rgba(132,22,23,0.35)] transition hover:bg-white active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              View 2025 stats
            </Link>
            <Link
              href={PREMIUM_RECRUIT_ROUTE}
              className="inline-flex items-center justify-center rounded-full border border-cream/35 bg-cream/10 px-6 py-3 text-sm font-semibold text-cream backdrop-blur-sm transition hover:bg-cream/20 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              Join The Locker Room
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative flex flex-col items-center lg:items-end"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, x: 32 },
                animate: { opacity: 1, x: 0 },
                transition: {
                  type: "spring" as const,
                  stiffness: 80,
                  damping: 20,
                  delay: 0.12,
                },
              })}
        >
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 rounded-3xl bg-crimson/30 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl border border-cream/15 bg-ink/40 p-6 backdrop-blur-md">
              <SiteLogo variant="hero" className="mx-auto" />
              <div className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-cream px-5 py-4">
                <Trophy className="h-5 w-5 shrink-0 text-crimson" aria-hidden />
                <div className="text-left">
                  <p className="font-display text-2xl font-bold tabular-nums leading-none text-crimson">
                    {SEASON_RECORD}
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink/65">
                    {CONFERENCE_RECORD} · 2025 final
                  </p>
                </div>
              </div>
              <p className="mt-4 text-center text-xs font-medium uppercase tracking-widest text-cream/55">
                Offseason · opener vs UTEP, Sep 5
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
