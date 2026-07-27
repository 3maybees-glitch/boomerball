"use client";

import Link from "next/link";
import { ArrowRight, Dices, ArrowLeftRight } from "lucide-react";
import { LockerRoomCTA } from "@/components/LockerRoomCTA";
import {
  PREMIUM_ACCESS_LABEL,
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_RECRUIT_ROUTE,
  PREMIUM_TIER_NAME,
} from "@/lib/premium";

/** Loud post-purchase upsell — WAR MAP buyers → Locker Room. */
export function WarMapUpgradeCTA() {
  return (
    <aside className="print:hidden overflow-hidden rounded-2xl border-2 border-crimson bg-gradient-to-br from-crimson to-crimson-dark text-cream shadow-[0_16px_48px_rgba(132,22,23,0.35)]">
      <div className="px-5 py-6 sm:px-7 sm:py-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream/70">
          Upgrade · Members only tools
        </p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          You unlocked the sheet. Want the full film room?
        </h2>
        <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-cream/85">
          {PREMIUM_TIER_NAME} includes this WAR MAP plus The Game-u-lator, the NFL
          Comp Machine, SP+ dashboards, and weekly season updates —{" "}
          <strong className="text-cream">
            {PREMIUM_PRICE_DISPLAY} · {PREMIUM_ACCESS_LABEL}
          </strong>
          .
        </p>

        <ul className="mt-4 grid gap-2 text-sm text-cream/90 sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <Dices className="h-4 w-4 shrink-0 text-cream/75" aria-hidden />
            Simulate OU vs Texas & every 2026 opponent
          </li>
          <li className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4 shrink-0 text-cream/75" aria-hidden />
            Every Sooner&apos;s closest NFL twin
          </li>
        </ul>

        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <LockerRoomCTA
            label={`Unlock Game-u-lator + NFL Comps · ${PREMIUM_PRICE_DISPLAY}`}
            variant="featured"
            onDark
            className="items-start sm:items-center"
          />
          <Link
            href={PREMIUM_RECRUIT_ROUTE}
            className="inline-flex items-center gap-1 text-sm font-semibold text-cream/85 underline decoration-cream/35 underline-offset-4 transition hover:text-cream"
          >
            See full membership
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </aside>
  );
}
