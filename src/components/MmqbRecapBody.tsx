import { TeamStatGrid } from "@/components/StatTable";
import { PremiumGate } from "@/components/PremiumGate";
import type { WeeklyRecap, WeeklyRecapSection } from "@/data/types";
import { PREMIUM_TIER_NAME } from "@/lib/premium";

function RecapSectionBlock({ section }: { section: WeeklyRecapSection }) {
  return (
    <section className="scroll-mt-24">
      <h3 className="font-display text-xl font-bold text-crimson sm:text-2xl">
        {section.title}
      </h3>
      <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-ink/80">
        {section.body}
      </p>
      {section.stats && section.stats.length > 0 && (
        <div className="mt-5">
          <TeamStatGrid stats={section.stats} />
        </div>
      )}
    </section>
  );
}

type MmqbRecapBodyProps = {
  recap: WeeklyRecap;
};

export function MmqbRecapBody({ recap }: MmqbRecapBodyProps) {
  return (
    <div className="space-y-12">
      <p className="max-w-[68ch] text-lg leading-relaxed text-ink/85">{recap.lede}</p>

      {recap.sections.map((section) => (
        <RecapSectionBlock key={section.title} section={section} />
      ))}

      {recap.premiumSections.length > 0 && (
        <div className="rounded-2xl border border-crimson/15 bg-cream/30 p-5 sm:p-6">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson/70">
              {PREMIUM_TIER_NAME}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-crimson sm:text-2xl">
              Advanced analytics
            </h3>
            <p className="mt-2 max-w-[60ch] text-sm text-ink/70">
              EPA, success rate, havoc, and estimated grades — the numbers behind the
              narrative.
            </p>
          </div>
          <PremiumGate>
            <div className="space-y-10">
              {recap.premiumSections.map((section) => (
                <RecapSectionBlock key={section.title} section={section} />
              ))}
            </div>
          </PremiumGate>
        </div>
      )}
    </div>
  );
}
