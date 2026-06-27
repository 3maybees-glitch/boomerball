import { Award, Medal, Shield, Sparkles, Star, Swords, Trophy } from "lucide-react";
import { SourceAttribution } from "@/components/SourceAttribution";
import {
  PRESEASON_GRADES_YEAR,
  athlonAllSec2026,
  athlonAllSecMeta,
  preseasonGradesSources,
  preseasonPhaseSummaries,
  preseasonUnitGrades2026,
  type AllSecTeam,
  type AthlonAllSecPick,
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

const allSecTeamConfig: Record<
  AllSecTeam,
  {
    label: string;
    roman: string;
    headerClass: string;
    cardClass: string;
    badgeClass: string;
    icon: typeof Trophy;
  }
> = {
  1: {
    label: "First Team",
    roman: "I",
    headerClass: "border-amber-400/60 bg-gradient-to-br from-amber-50 via-cream to-amber-100/80",
    cardClass: "border-amber-300/50 bg-white shadow-md shadow-amber-100/50",
    badgeClass: "bg-gradient-to-br from-amber-400 to-amber-600 text-white",
    icon: Trophy,
  },
  2: {
    label: "Second Team",
    roman: "II",
    headerClass: "border-slate-300/70 bg-gradient-to-br from-slate-50 via-white to-slate-100/80",
    cardClass: "border-slate-200 bg-white shadow-sm",
    badgeClass: "bg-gradient-to-br from-slate-400 to-slate-600 text-white",
    icon: Medal,
  },
  3: {
    label: "Third Team",
    roman: "III",
    headerClass: "border-orange-300/60 bg-gradient-to-br from-orange-50 via-cream to-orange-100/70",
    cardClass: "border-orange-200/70 bg-white shadow-sm",
    badgeClass: "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
    icon: Award,
  },
};

const positionStyles: Record<string, string> = {
  DL: "bg-crimson text-cream",
  DE: "bg-crimson-dark text-cream",
  LB: "bg-crimson/85 text-cream",
  CB: "bg-ink/80 text-cream",
  S: "bg-ink text-cream",
  WR: "bg-green-700 text-cream",
  OL: "bg-amber-700 text-cream",
};

function positionBadgeClass(position: string): string {
  return positionStyles[position] ?? "bg-crimson/20 text-crimson";
}

function AllSecPlayerCard({ pick }: { pick: AthlonAllSecPick }) {
  const config = allSecTeamConfig[pick.team];
  const SideIcon = pick.positionGroup === "offense" ? Swords : Shield;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-2 p-3 transition hover:-translate-y-0.5 hover:shadow-lg ${config.cardClass}`}
    >
      <div className="absolute -right-3 -top-3 h-14 w-14 rounded-full bg-crimson/[0.04]" />
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-flex min-w-[2.5rem] items-center justify-center rounded-md px-2 py-1 font-display text-xs font-bold tracking-wider ${positionBadgeClass(pick.position)}`}
        >
          {pick.position}
        </span>
        <SideIcon
          className={`h-3.5 w-3.5 shrink-0 ${
            pick.positionGroup === "offense" ? "text-green-700/50" : "text-crimson/40"
          }`}
          aria-hidden
        />
      </div>
      <p className="mt-2.5 font-display text-base font-bold leading-tight text-ink">
        {pick.name}
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/45">
        {pick.positionGroup}
      </p>
    </div>
  );
}

function AllSecTeamColumn({ team }: { team: AllSecTeam }) {
  const config = allSecTeamConfig[team];
  const Icon = config.icon;
  const picks = athlonAllSec2026.filter((p) => p.team === team);
  const offense = picks.filter((p) => p.positionGroup === "offense");
  const defense = picks.filter((p) => p.positionGroup === "defense");

  return (
    <div className={`overflow-hidden rounded-2xl border-2 ${config.headerClass}`}>
      <div className="flex items-center justify-between gap-3 border-b border-black/5 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold shadow-sm ${config.badgeClass}`}
          >
            {config.roman}
          </span>
          <div>
            <p className="font-display text-sm font-bold text-ink">{config.label}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/50">
              {picks.length} Sooners
            </p>
          </div>
        </div>
        <Icon className="h-5 w-5 text-ink/25" aria-hidden />
      </div>

      <div className="space-y-4 p-4">
        {defense.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-crimson">
              <Shield className="h-3 w-3" aria-hidden />
              Defense
            </p>
            <div className="space-y-2">
              {defense.map((pick) => (
                <AllSecPlayerCard key={pick.name} pick={pick} />
              ))}
            </div>
          </div>
        )}
        {offense.length > 0 && (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-green-800">
              <Swords className="h-3 w-3" aria-hidden />
              Offense
            </p>
            <div className="space-y-2">
              {offense.map((pick) => (
                <AllSecPlayerCard key={pick.name} pick={pick} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AthlonAllSecShowcase() {
  const offenseCount = athlonAllSec2026.filter((p) => p.positionGroup === "offense").length;
  const defenseCount = athlonAllSec2026.filter((p) => p.positionGroup === "defense").length;

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-crimson/25 bg-gradient-to-br from-white via-cream/30 to-cream-dark/50 shadow-lg">
      <div className="border-b border-crimson/10 bg-crimson px-5 py-4 text-cream sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cream/75">
              <Trophy className="h-4 w-4 fill-cream/20" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                {PRESEASON_GRADES_YEAR} Preseason
              </span>
            </div>
            <h4 className="mt-1 font-display text-xl font-bold sm:text-2xl">
              Athlon All-SEC — Oklahoma Sooners
            </h4>
            <p className="mt-1 max-w-xl text-sm text-cream/85">
              {athlonAllSecMeta.totalHonorees} projected honorees — #{athlonAllSecMeta.secRank}{" "}
              in the SEC behind {athlonAllSecMeta.leader.school} ({athlonAllSecMeta.leader.count}).
            </p>
          </div>
          <div className="flex gap-2">
            <div className="rounded-xl border border-cream/20 bg-cream/10 px-3 py-2 text-center backdrop-blur-sm">
              <p className="font-display text-2xl font-bold">{defenseCount}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-cream/70">
                Defense
              </p>
            </div>
            <div className="rounded-xl border border-cream/20 bg-cream/10 px-3 py-2 text-center backdrop-blur-sm">
              <p className="font-display text-2xl font-bold">{offenseCount}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-cream/70">
                Offense
              </p>
            </div>
            <div className="rounded-xl border border-cream/30 bg-cream px-3 py-2 text-center">
              <p className="font-display text-2xl font-bold text-crimson">
                {athlonAllSecMeta.totalHonorees}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-crimson/70">
                Total
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-3">
        {([1, 2, 3] as AllSecTeam[]).map((team) => (
          <AllSecTeamColumn key={team} team={team} />
        ))}
      </div>

      <div className="border-t border-crimson/10 bg-white/60 px-5 py-3 sm:px-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/55">
          <span className="inline-flex items-center gap-1 font-semibold text-ink/70">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
            Position key
          </span>
          {Object.entries(positionStyles).map(([pos, cls]) => (
            <span key={pos} className="inline-flex items-center gap-1">
              <span
                className={`rounded px-1.5 py-0.5 font-display text-[10px] font-bold ${cls}`}
              >
                {pos}
              </span>
            </span>
          ))}
          <span className="text-ink/40">·</span>
          <a
            href={athlonAllSecMeta.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-crimson underline decoration-crimson/30 hover:decoration-crimson"
          >
            View full Athlon All-SEC team
          </a>
        </p>
      </div>
    </div>
  );
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

      <AthlonAllSecShowcase />

      <SourceAttribution className="mt-4" sources={preseasonGradesSources} />

      <p className="mt-3 text-xs text-ink/50">
        Grades are Boomer Ball editorial assessments synthesized from public preseason
        projections — not official SP+, PFF, or coaching-staff evaluations. Updated for
        spring/summer {PRESEASON_GRADES_YEAR} outlook.
      </p>
    </div>
  );
}
