import Link from "next/link";
import { Sparkles } from "lucide-react";
import { NflCompResults } from "@/components/NflCompResults";
import { LockerRoomCTA } from "@/components/LockerRoomCTA";
import { roster2026 } from "@/data/roster";
import {
  PREMIUM_ACCESS_LABEL,
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_RECRUIT_ROUTE,
  PREMIUM_TIER_NAME,
} from "@/lib/premium";
import { buildProspectFromPlayer, findComps } from "@/lib/nfl-similarity";

const MATEER_ID = "john-mateer-10";

/** Free ungated sample — John Mateer's top NFL twin. */
export function MateerCompTeaser() {
  const mateer = roster2026.find((player) => player.id === MATEER_ID);
  if (!mateer) return null;

  const prospect = buildProspectFromPlayer(mateer);
  const matches = findComps(prospect, 1);

  return (
    <section className="overflow-hidden rounded-2xl border border-crimson/20 bg-white/95 shadow-[0_8px_32px_rgba(26,10,10,0.08)]">
      <div className="border-b border-crimson/10 bg-gradient-to-br from-cream/90 to-white px-5 py-5 sm:px-6">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-crimson/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-crimson">
          <Sparkles className="h-3 w-3" aria-hidden />
          Free teaser
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Feel the Comp Machine — John Mateer
        </h2>
        <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-ink/65">
          One free look at the scouting engine. Unlock every Sooner, the full
          country-wide tool, and The Game-u-lator with {PREMIUM_TIER_NAME}.
        </p>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <NflCompResults prospect={prospect} matches={matches} />

        <div className="mt-6 flex flex-col items-center gap-3 border-t border-crimson/10 pt-6 text-center">
          <p className="text-sm text-ink/70">
            Want every Sooner&apos;s twin + The Game-u-lator?{" "}
            <span className="font-semibold text-crimson">
              {PREMIUM_PRICE_DISPLAY} · {PREMIUM_ACCESS_LABEL}
            </span>
          </p>
          <LockerRoomCTA label={`Unlock ${PREMIUM_TIER_NAME}`} />
          <Link
            href={PREMIUM_RECRUIT_ROUTE}
            className="text-xs font-semibold text-crimson/80 underline decoration-crimson/30 underline-offset-4 transition hover:text-crimson"
          >
            See everything inside {PREMIUM_TIER_NAME}
          </Link>
        </div>
      </div>
    </section>
  );
}
