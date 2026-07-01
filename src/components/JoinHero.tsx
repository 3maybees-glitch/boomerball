"use client";

import Image from "next/image";
import { HatGlasses } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { LockerRoomCTA } from "@/components/LockerRoomCTA";
import { PREMIUM_PRICE_DISPLAY } from "@/lib/premium";

export function JoinHero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { type: "spring" as const, stiffness: 90, damping: 22 },
      };

  return (
    <section className="relative min-h-[min(100dvh,880px)] overflow-hidden border-b border-crimson-dark/40 bg-ink">
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/stadium-inside.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-crimson-dark/90 to-crimson/80" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-24">
        <motion.div {...fadeUp}>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/70">
            <HatGlasses className="h-4 w-4" aria-hidden />
            Now recruiting
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            Join The Locker Room
          </h1>
          <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-cream/85 sm:text-lg">
            An inner circle for die-hard Sooners fans who want film breakdowns,
            recruiting intel, and advanced metrics beyond the box score.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-cream px-4 py-2 text-sm font-bold text-crimson">
              {PREMIUM_PRICE_DISPLAY} · lifetime access
            </span>
            <span className="rounded-full border border-cream/35 px-4 py-2 text-sm text-cream/90">
              No subscription
            </span>
          </div>
          <div className="mt-8">
            <LockerRoomCTA label="Accept your offer" className="items-start" />
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-cream/15 bg-ink/40 p-6 backdrop-blur-md"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, x: 24 },
                animate: { opacity: 1, x: 0 },
                transition: {
                  type: "spring" as const,
                  stiffness: 80,
                  damping: 20,
                  delay: 0.1,
                },
              })}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cream/60">
            Letter from the staff
          </p>
          <p className="mt-3 font-display text-xl font-bold leading-snug text-cream">
            You&apos;ve watched the games. Now see what the coaches see.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/75">
            SP+-inspired ratings, PFF-style grades, full scheme breakdowns, and a
            live 2027 recruiting board from On3, 247Sports, and ESPN.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
