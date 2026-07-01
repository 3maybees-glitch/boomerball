import { SourceAttribution } from "@/components/SourceAttribution";
import { FormationDiagram } from "@/components/FormationDiagram";
import {
  cheetahRole,
  defensivePackages,
  defensivePhilosophy,
  offensiveFormations,
  offensivePersonnel,
  offensivePhilosophy,
  schemeSources,
} from "@/data/schemes";

export function SchemeGuide() {
  return (
    <div className="mt-8">
      <div className="mb-6">
        <h3 className="font-display text-lg font-bold text-crimson">
          OU Scheme & Formation Guide
        </h3>
        <p className="mt-1 text-sm text-ink/60">
          How Ben Arbuckle&apos;s offense and Brent Venables&apos; defense are built —
          personnel groupings, common looks, and the Cheetah hybrid role. Based on 2025
          tendencies.
        </p>
      </div>

      {/* Offense overview */}
      <div className="rounded-2xl border border-crimson/12 bg-white/95 p-5 backdrop-blur-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-crimson">
              Offense
            </p>
            <h4 className="font-display text-xl font-bold text-ink">
              {offensivePhilosophy.scheme}
            </h4>
            <p className="mt-1 text-sm text-ink/60">
              OC {offensivePhilosophy.coordinator}
            </p>
          </div>
        </div>
        <p className="mt-4 text-base leading-relaxed text-ink/80">
          {offensivePhilosophy.summary}
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {offensivePhilosophy.pillars.map((pillar) => (
            <li
              key={pillar}
              className="flex items-start gap-2 text-sm text-ink/75"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
              {pillar}
            </li>
          ))}
        </ul>
      </div>

      {/* Personnel */}
      <div className="mt-6 rounded-2xl border border-crimson/12 bg-white/95 p-5 backdrop-blur-sm">
        <h4 className="font-display text-base font-bold text-crimson">
          Offensive Personnel Groupings
        </h4>
        <p className="mt-1 text-sm text-ink/60">
          First digit = RBs, second = TEs. Arbuckle used 11+ packages at Washington
          State; 11 personnel is the foundation.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-cream-dark text-left text-xs font-semibold uppercase text-crimson">
                <th className="py-2 pr-4">Pkg</th>
                <th className="py-2 pr-4">Personnel</th>
                <th className="py-2 pr-4">Usage</th>
                <th className="py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {offensivePersonnel.map((pg) => (
                <tr key={pg.code} className="border-b border-cream-dark/60">
                  <td className="py-2.5 font-bold text-crimson">{pg.code}</td>
                  <td className="py-2.5 font-medium">{pg.label}</td>
                  <td className="py-2.5 text-ink/70">{pg.usage}</td>
                  <td className="py-2.5 text-ink/70">{pg.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Offensive formations */}
      <div className="mt-6">
        <h4 className="mb-4 font-display text-base font-bold text-crimson">
          Common Offensive Formations
        </h4>
        <div className="grid gap-4 lg:grid-cols-2">
          {offensiveFormations.map((formation) => (
            <div
              key={formation.id}
              className="rounded-2xl border border-crimson/12 bg-white/95 p-4 backdrop-blur-sm"
            >
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h5 className="font-display text-lg font-bold text-ink">
                  {formation.name}
                </h5>
                <span className="rounded-full bg-crimson/10 px-2.5 py-0.5 text-xs font-bold text-crimson">
                  {formation.personnel}
                </span>
              </div>
              <FormationDiagram
                players={formation.players}
                side="offense"
                className="mb-3 h-44 sm:h-52"
              />
              <p className="text-sm leading-relaxed text-ink/80">
                {formation.description}
              </p>
              <p className="mt-2 text-xs font-medium text-crimson/80">
                When used: {formation.whenUsed}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Defense overview */}
      <div className="mt-8 rounded-2xl border border-crimson/12 bg-white/95 p-5 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-crimson">
          Defense
        </p>
        <h4 className="font-display text-xl font-bold text-ink">
          {defensivePhilosophy.scheme}
        </h4>
        <p className="mt-1 text-sm text-ink/60">
          DC {defensivePhilosophy.coordinator}
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink/80">
          {defensivePhilosophy.summary}
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {defensivePhilosophy.pillars.map((pillar) => (
            <li
              key={pillar}
              className="flex items-start gap-2 text-sm text-ink/75"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
              {pillar}
            </li>
          ))}
        </ul>
      </div>

      {/* Cheetah */}
      <div className="mt-6 rounded-xl border-2 border-crimson bg-crimson p-5 text-cream">
        <h4 className="font-display text-lg font-bold">{cheetahRole.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-cream/90">
          {cheetahRole.description}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {cheetahRole.variants.map((v) => (
            <div
              key={v.type}
              className="rounded-lg border border-cream/20 bg-crimson-dark/40 p-3"
            >
              <p className="font-display font-bold">{v.type}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-cream/70">
                {v.body}
              </p>
              <p className="mt-2 text-sm text-cream/85">
                <span className="font-semibold">Examples:</span> {v.examples}
              </p>
              <p className="mt-1 text-sm text-cream/80">{v.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Defensive packages */}
      <div className="mt-6">
        <h4 className="mb-4 font-display text-base font-bold text-crimson">
          Defensive Fronts & Packages
        </h4>
        <div className="grid gap-4 lg:grid-cols-3">
          {defensivePackages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl border border-crimson/12 bg-white/95 p-4 backdrop-blur-sm"
            >
              <h5 className="font-display text-lg font-bold text-ink">
                {pkg.name}
              </h5>
              <FormationDiagram
                players={pkg.players}
                side="defense"
                className="my-3 h-44"
              />
              <p className="text-sm leading-relaxed text-ink/80">
                {pkg.description}
              </p>
              <p className="mt-2 text-xs font-medium text-crimson/80">
                When used: {pkg.whenUsed}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Game-day chess match */}
      <div className="mt-6 rounded-xl border border-crimson/20 bg-cream-dark p-5">
        <h4 className="font-display text-base font-bold text-crimson">
          Game-Day Chess Match
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          Arbuckle spreads the field with 11/10 personnel and tempo → Venables
          answers with 4-2-5 and the Cheetah in the slot → Arbuckle counters with
          bunch formations, RPOs, and QB run to stress the box. The 2025 Sooners
          ranked among the SEC&apos;s best defenses (14.0 PPG allowed) while the offense
          was still finding its SEC footing under year one of Arbuckle&apos;s system.
        </p>
      </div>

      <SourceAttribution className="mt-6" sources={schemeSources} />

      <p className="mt-4 text-xs text-ink/50">
        Scheme breakdown compiled from public reporting and film-study articles. Not
        affiliated with the University of Oklahoma coaching staff.
      </p>
    </div>
  );
}
