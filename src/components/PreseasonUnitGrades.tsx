import { Shield, Sparkles, Swords } from "lucide-react";
import { SourceAttribution } from "@/components/SourceAttribution";
import {
  PRESEASON_GRADES_YEAR,
  preseasonGradesSources,
  preseasonPhaseSummaries,
  preseasonUnitGrades2026,
  type PreseasonUnitGrade,
  type UnitPhase,
} from "@/data/preseason-unit-grades-2026";

const phaseIcons: Record<UnitPhase, typeof Swords> = {
  offense: Swords,
  defense: Shield,
  special: Sparkles,
};

function gradeColor(grade: string): string {
  if (grade.startsWith("A")) return "bg-green-100 text-green-800 border-green-200";
  if (grade.startsWith("B")) return "bg-amber-100 text-amber-900 border-amber-200";
  return "bg-cream-dark text-ink border-cream-dark";
}

function scoreBarColor(score: number): string {
  if (score >= 90) return "bg-green-600";
  if (score >= 83) return "bg-amber-500";
  return "bg-crimson/60";
}

function UnitCard({ unit }: { unit: PreseasonUnitGrade }) {
  return (
    <article className="rounded-xl border-2 border-crimson/15 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="font-display text-lg font-bold text-ink">{unit.name}</h4>
          {unit.rankContext && (
            <p className="mt-0.5 text-xs font-medium text-green-700">{unit.rankContext}</p>
          )}
        </div>
        <span
          className={`rounded-lg border px-3 py-1 font-display text-2xl font-bold ${gradeColor(unit.grade)}`}
        >
          {unit.grade}
        </span>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-ink/55">
          <span>Unit score</span>
          <span className="font-semibold">{unit.score}/100</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-cream-dark">
          <div
            className={`h-full rounded-full transition-all ${scoreBarColor(unit.score)}`}
            style={{ width: `${unit.score}%` }}
          />
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink/80">{unit.assessment}</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            Strengths
          </p>
          <ul className="mt-2 space-y-1.5">
            {unit.strengths.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink/75">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-crimson">
            Concerns
          </p>
          <ul className="mt-2 space-y-1.5">
            {unit.concerns.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink/75">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-cream/60 px-3 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-crimson">
          Key Players
        </p>
        <ul className="mt-2 space-y-2">
          {unit.keyPlayers.map((player) => (
            <li key={player.name} className="text-sm">
              <span className="font-semibold text-ink">{player.name}</span>
              <span className="text-ink/60"> — {player.note}</span>
              {player.allSec && (
                <span className="ml-1.5 inline-block rounded-full bg-crimson/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-crimson">
                  {player.allSec}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function PreseasonUnitGrades() {
  const phases: UnitPhase[] = ["offense", "defense", "special"];

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h3 className="font-display text-lg font-bold text-crimson">
          {PRESEASON_GRADES_YEAR} Preseason Unit Grades
        </h3>
        <p className="mt-1 text-sm text-ink/60">
          Boomer Ball assessment of every offensive, defensive, and special teams unit
          heading into fall camp — informed by ESPN SP+ projections, Athlon preseason
          All-SEC picks, and national preview outlets.
        </p>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {preseasonPhaseSummaries.map((summary) => {
          const Icon = phaseIcons[summary.phase];
          return (
            <div
              key={summary.phase}
              className={`rounded-xl border-2 p-4 ${
                summary.phase === "defense"
                  ? "border-crimson bg-crimson text-cream"
                  : "border-crimson/20 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 opacity-80" aria-hidden />
                  <p
                    className={`text-xs font-semibold uppercase ${
                      summary.phase === "defense" ? "text-cream/80" : "text-ink/60"
                    }`}
                  >
                    {summary.label}
                  </p>
                </div>
                <span
                  className={`font-display text-2xl font-bold ${
                    summary.phase === "defense" ? "text-cream" : "text-crimson"
                  }`}
                >
                  {summary.overallGrade}
                </span>
              </div>
              <p
                className={`mt-2 text-xs font-medium ${
                  summary.phase === "defense" ? "text-cream/75" : "text-green-700"
                }`}
              >
                {summary.rankContext}
              </p>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  summary.phase === "defense" ? "text-cream/90" : "text-ink/75"
                }`}
              >
                {summary.headline}
              </p>
            </div>
          );
        })}
      </div>

      {phases.map((phase) => {
        const summary = preseasonPhaseSummaries.find((s) => s.phase === phase)!;
        const units = preseasonUnitGrades2026.filter((u) => u.phase === phase);
        const Icon = phaseIcons[phase];

        return (
          <section key={phase} className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Icon className="h-5 w-5 text-crimson" aria-hidden />
              <h4 className="font-display text-base font-bold text-crimson">
                {summary.label}{" "}
                <span className="text-ink/50">· {summary.overallGrade} overall</span>
              </h4>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {units.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="rounded-xl border-2 border-crimson/15 bg-cream/40 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-crimson">
          Athlon Preseason All-SEC — OU Selections
        </p>
        <p className="mt-2 text-sm text-ink/75">
          Oklahoma landed <strong>15 All-SEC honorees</strong> in Athlon&apos;s 2026
          projections — tied for second-most in the league behind Texas (16). First team:{" "}
          <span className="font-medium text-ink">
            David Stone, Taylor Wein, Kip Lewis, Isaiah Sategna III, Michael Fasusi
          </span>
          . Second team:{" "}
          <span className="font-medium text-ink">
            Peyton Bowen, Eli Bowen, Courtland Guillory
          </span>
          . Third team: <span className="font-medium text-ink">Owen Heinecke</span>.
        </p>
      </div>

      <SourceAttribution className="mt-4" sources={preseasonGradesSources} />

      <p className="mt-3 text-xs text-ink/50">
        Grades are Boomer Ball editorial assessments synthesized from public preseason
        projections — not official SP+, PFF, or coaching-staff evaluations. Updated for
        spring/summer {PRESEASON_GRADES_YEAR} outlook.
      </p>
    </div>
  );
}
