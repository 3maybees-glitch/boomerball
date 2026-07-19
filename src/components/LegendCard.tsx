import Image from "next/image";
import { Award, Palette } from "lucide-react";
import type { ChampionshipTeam, SoonersLegend } from "@/data/legends-types";
import { getLegendPortraitUrl, LEGEND_PORTRAIT_CREDIT } from "@/data/legends";

const categoryBadge: Record<SoonersLegend["category"], string> = {
  heisman: "bg-amber-100 text-amber-900",
  icon: "bg-crimson/10 text-crimson",
  offense: "bg-blue-100 text-blue-900",
  defense: "bg-green-100 text-green-900",
};

const categoryLabel: Record<SoonersLegend["category"], string> = {
  heisman: "Heisman Winner",
  icon: "Sooner Icon",
  offense: "Offensive Legend",
  defense: "Defensive Legend",
};

export function LegendCard({ legend }: { legend: SoonersLegend }) {
  const portraitUrl = getLegendPortraitUrl(legend);

  return (
    <article className="overflow-hidden rounded-2xl border border-crimson/15 bg-white/95 shadow-[0_8px_32px_rgba(26,10,10,0.08)] transition hover:border-crimson/40 hover:shadow-[0_12px_40px_rgba(132,22,23,0.12)]">
      <div className="relative bg-gradient-to-br from-crimson to-crimson-dark p-6 text-cream">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="group relative mx-auto shrink-0 sm:mx-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cream/40 via-amber-200/30 to-crimson/40 opacity-80 blur-sm" />
            <div className="relative h-36 w-36 overflow-hidden rounded-xl border-4 border-cream/50 bg-cream shadow-inner">
              <Image
                src={portraitUrl}
                alt={`Artistic portrait of ${legend.name}`}
                fill
                unoptimized
                className="object-cover object-top transition duration-300 group-hover:scale-105"
                sizes="144px"
                priority={legend.category === "heisman"}
              />
            </div>
            <span className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-cream px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-crimson shadow">
              <Palette className="h-2.5 w-2.5" aria-hidden />
              Illustrated
            </span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${categoryBadge[legend.category]}`}
            >
              {categoryLabel[legend.category]}
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold">
              {legend.name}
              {legend.nickname && (
                <span className="ml-2 text-base font-normal text-cream/80">
                  &ldquo;{legend.nickname}&rdquo;
                </span>
              )}
            </h3>
            <p className="mt-1 text-sm text-cream/85">
              {legend.position} · {legend.years}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
              {legend.honors.slice(0, 3).map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1 rounded-full bg-cream/15 px-2 py-0.5 text-[10px] font-medium"
                >
                  <Award className="h-3 w-3" aria-hidden />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-cream-dark sm:grid-cols-3 lg:grid-cols-5">
        {legend.stats.map((stat) => (
          <div key={stat.label} className="bg-white px-3 py-3 text-center">
            <p className="font-display text-lg font-bold text-crimson">{stat.value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/55">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-cream-dark px-5 py-4">
        <p className="text-sm leading-relaxed text-ink/80">{legend.bio}</p>
        {legend.honors.length > 3 && (
          <ul className="mt-3 space-y-1 text-xs text-ink/65">
            {legend.honors.slice(3).map((h) => (
              <li key={h}>· {h}</li>
            ))}
          </ul>
        )}
        <p className="mt-2 flex items-center gap-1 text-[10px] text-ink/45">
          <Palette className="h-3 w-3" aria-hidden />
          {legend.imageCredit ?? LEGEND_PORTRAIT_CREDIT}
        </p>
      </div>
    </article>
  );
}

export function ChampionshipCard({ team }: { team: ChampionshipTeam }) {
  return (
    <article className="overflow-hidden rounded-2xl border-2 border-amber-300/60 bg-gradient-to-br from-amber-50 to-white shadow-md">
      <div className="flex items-center justify-between bg-crimson px-5 py-4 text-cream">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
            National Champion
          </p>
          <h3 className="font-display text-4xl font-extrabold">{team.year}</h3>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-bold">{team.record}</p>
          <p className="text-sm text-cream/80">{team.apRank}</p>
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="font-semibold text-crimson">Head Coach: {team.coach}</p>
        {team.bowl && (
          <p className="mt-1 text-sm text-ink/70">
            {team.bowl}: {team.bowlResult}
          </p>
        )}

        <h4 className="mt-4 text-xs font-bold uppercase tracking-wide text-ink/55">
          Season Highlights
        </h4>
        <ul className="mt-2 space-y-1.5 text-sm text-ink/80">
          {team.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-crimson">★</span>
              {h}
            </li>
          ))}
        </ul>

        <h4 className="mt-4 text-xs font-bold uppercase tracking-wide text-ink/55">
          Key Players
        </h4>
        <p className="mt-1 text-sm text-ink/75">{team.keyPlayers.join(" · ")}</p>
      </div>
    </article>
  );
}
