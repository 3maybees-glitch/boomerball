"use client";

import { useMemo, useState } from "react";
import {
  Dices,
  Gauge,
  RotateCcw,
  Sliders,
  Swords,
  Trophy,
} from "lucide-react";
import type { ScheduleGame } from "@/data/types";
import {
  OKLAHOMA_TEAM,
  getOpponentTeam,
  type GameulatorTeam,
} from "@/data/gameulator";
import {
  UNIT_KEYS,
  UNIT_LABELS,
  UNIT_SHORT_LABELS,
  averageGrade,
  clampGrade,
  letterGrade,
  runSimulation,
  shiftGrades,
  type SimScore,
  type SimulationResult,
  type TeamBox,
  type UnitGrades,
  type Venue,
} from "@/lib/gameulator";

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function venueFor(game: ScheduleGame): Venue {
  if (game.isNeutral) return "neutral";
  return game.isHome ? "home" : "away";
}

function venueLabel(game: ScheduleGame): string {
  const v = venueFor(game);
  if (v === "neutral") return "Neutral site";
  return v === "home" ? "Norman, OK" : "On the road";
}

function gradeTone(score: number): string {
  if (score >= 85) return "bg-green-100 text-green-800";
  if (score >= 72) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-700";
}

const CARD =
  "rounded-2xl border border-crimson/12 bg-white/95 shadow-[0_4px_20px_rgba(26,10,10,0.06)]";

/* ------------------------------------------------------------------ */
/* Grade editor                                                         */
/* ------------------------------------------------------------------ */

function GradeSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-xs font-semibold text-ink/65">
        {label}
        <span
          className={`rounded-full px-2 py-0.5 font-display text-xs font-bold tabular-nums ${gradeTone(value)}`}
        >
          {value} · {letterGrade(value)}
        </span>
      </span>
      <input
        type="range"
        min={30}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(clampGrade(Number(e.target.value)))}
        className="mt-1 w-full accent-crimson"
      />
    </label>
  );
}

function TeamGradePanel({
  team,
  grades,
  mode,
  onChange,
  onReset,
}: {
  team: string;
  grades: UnitGrades;
  mode: "team" | "units";
  onChange: (g: UnitGrades) => void;
  onReset: () => void;
}) {
  const avg = averageGrade(grades);

  return (
    <div className={`${CARD} p-5`}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-lg font-bold text-crimson">{team}</h3>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 font-display text-sm font-bold tabular-nums ${gradeTone(avg)}`}
          >
            {avg} · {letterGrade(avg)}
          </span>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-full border border-crimson/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-crimson transition hover:bg-crimson/10"
            title={`Reset ${team} grades to Boomer Ball defaults`}
          >
            <RotateCcw className="h-3 w-3" aria-hidden />
            Reset
          </button>
        </div>
      </div>

      {mode === "team" ? (
        <div className="mt-4">
          <GradeSlider
            label="Overall team grade"
            value={Math.round(avg)}
            onChange={(v) => onChange(shiftGrades(grades, v - avg))}
          />
          <p className="mt-2 text-[11px] leading-relaxed text-ink/50">
            Moving the team grade shifts every unit up or down together. Switch
            to unit grades for position-by-position control.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2">
          {UNIT_KEYS.map((key) => (
            <GradeSlider
              key={key}
              label={UNIT_LABELS[key]}
              value={grades[key]}
              onChange={(v) => onChange({ ...grades, [key]: v })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Charts (inline SVG)                                                  */
/* ------------------------------------------------------------------ */

function UnitComparisonChart({
  ouGrades,
  oppGrades,
  oppName,
}: {
  ouGrades: UnitGrades;
  oppGrades: UnitGrades;
  oppName: string;
}) {
  const rowH = 30;
  const labelW = 52;
  const width = 560;
  const barMax = width - labelW - 40;
  const height = UNIT_KEYS.length * rowH + 8;

  return (
    <div className={`${CARD} p-5`}>
      <h3 className="font-display text-lg font-bold text-crimson">
        Unit-by-unit matchup
      </h3>
      <div className="mt-2 flex gap-4 text-[11px] font-semibold text-ink/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-crimson" /> Oklahoma
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-ink/55" /> {oppName}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-3 w-full"
        role="img"
        aria-label={`Bar chart comparing Oklahoma and ${oppName} unit grades`}
      >
        {UNIT_KEYS.map((key, i) => {
          const y = i * rowH;
          const ou = ouGrades[key];
          const opp = oppGrades[key];
          return (
            <g key={key}>
              <text
                x={labelW - 8}
                y={y + 16}
                textAnchor="end"
                className="fill-ink/70"
                fontSize={11}
                fontWeight={700}
              >
                {UNIT_SHORT_LABELS[key]}
              </text>
              <rect x={labelW} y={y + 3} width={(ou / 100) * barMax} height={9} rx={3} fill="#841617" />
              <text x={labelW + (ou / 100) * barMax + 5} y={y + 11} fontSize={9.5} fontWeight={700} className="fill-ink/70">
                {ou}
              </text>
              <rect x={labelW} y={y + 15} width={(opp / 100) * barMax} height={9} rx={3} fill="#1a0a0a" opacity={0.55} />
              <text x={labelW + (opp / 100) * barMax + 5} y={y + 23} fontSize={9.5} fontWeight={600} className="fill-ink/55">
                {opp}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ScoreChart({
  sims,
  consensus,
  oppName,
}: {
  sims: SimScore[];
  consensus: SimScore;
  oppName: string;
}) {
  const entries = [
    ...sims.map((s, i) => ({ label: `Sim ${i + 1}`, ...s })),
    { label: "Consensus", ...consensus },
  ];
  const width = 560;
  const height = 210;
  const chartH = 150;
  const maxPts = Math.max(21, ...entries.flatMap((e) => [e.ou, e.opp]));
  const groupW = width / entries.length;
  const barW = 34;

  return (
    <div className={`${CARD} p-5`}>
      <h3 className="font-display text-lg font-bold text-crimson">
        Predicted scores
      </h3>
      <div className="mt-2 flex gap-4 text-[11px] font-semibold text-ink/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-crimson" /> Oklahoma
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-ink/55" /> {oppName}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-3 w-full"
        role="img"
        aria-label={`Bar chart of predicted scores for three simulations and the consensus against ${oppName}`}
      >
        {entries.map((e, i) => {
          const cx = i * groupW + groupW / 2;
          const ouH = (e.ou / maxPts) * chartH;
          const oppH = (e.opp / maxPts) * chartH;
          const baseY = 20 + chartH;
          const isConsensus = e.label === "Consensus";
          return (
            <g key={e.label}>
              {isConsensus && (
                <rect x={i * groupW + 4} y={4} width={groupW - 8} height={height - 8} rx={10} fill="#841617" opacity={0.06} />
              )}
              <text x={cx - barW / 2 - 3} y={baseY - ouH - 6} textAnchor="middle" fontSize={13} fontWeight={800} className="fill-crimson">
                {e.ou}
              </text>
              <rect x={cx - barW - 3} y={baseY - ouH} width={barW} height={ouH} rx={4} fill="#841617" />
              <text x={cx + barW / 2 + 3} y={baseY - oppH - 6} textAnchor="middle" fontSize={13} fontWeight={700} className="fill-ink/70">
                {e.opp}
              </text>
              <rect x={cx + 3} y={baseY - oppH} width={barW} height={oppH} rx={4} fill="#1a0a0a" opacity={0.55} />
              <text x={cx} y={height - 14} textAnchor="middle" fontSize={11} fontWeight={isConsensus ? 800 : 600} className={isConsensus ? "fill-crimson" : "fill-ink/60"}>
                {e.label}
                {e.overtime ? " (OT)" : ""}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function WinProbabilityBar({
  winProbability,
  oppName,
}: {
  winProbability: number;
  oppName: string;
}) {
  return (
    <div className={`${CARD} p-5`}>
      <h3 className="font-display text-lg font-bold text-crimson">
        Win probability
      </h3>
      <div className="mt-3 flex items-baseline justify-between text-sm font-bold">
        <span className="text-crimson">Oklahoma {winProbability}%</span>
        <span className="text-ink/60">
          {oppName} {Math.round((100 - winProbability) * 10) / 10}%
        </span>
      </div>
      <div
        className="mt-2 flex h-5 overflow-hidden rounded-full bg-ink/10"
        role="img"
        aria-label={`Oklahoma has a ${winProbability}% chance to beat ${oppName}`}
      >
        <div
          className="h-full rounded-l-full bg-gradient-to-r from-crimson-dark to-crimson transition-all duration-500"
          style={{ width: `${winProbability}%` }}
        />
        <div className="h-full flex-1 bg-ink/45" />
      </div>
      <p className="mt-2 text-[11px] text-ink/50">
        From 1,200 Monte Carlo runs of this matchup with your grades.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Score cards + quarters                                               */
/* ------------------------------------------------------------------ */

function QuarterTable({
  score,
  oppName,
}: {
  score: SimScore;
  oppName: string;
}) {
  return (
    <table className="mt-3 w-full text-xs tabular-nums">
      <thead>
        <tr className="text-[10px] font-bold uppercase tracking-wide text-ink/45">
          <th className="pb-1 text-left">Team</th>
          {["Q1", "Q2", "Q3", "Q4"].map((q) => (
            <th key={q} className="pb-1 text-center">
              {q}
            </th>
          ))}
          <th className="pb-1 text-right">F{score.overtime ? "/OT" : ""}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-cream-dark/70 font-semibold text-crimson">
          <td className="py-1 text-left">OU</td>
          {score.ouQuarters.map((q, i) => (
            <td key={i} className="py-1 text-center">
              {q}
            </td>
          ))}
          <td className="py-1 text-right font-display text-sm font-bold">{score.ou}</td>
        </tr>
        <tr className="border-t border-cream-dark/70 text-ink/70">
          <td className="py-1 text-left">{oppName}</td>
          {score.oppQuarters.map((q, i) => (
            <td key={i} className="py-1 text-center">
              {q}
            </td>
          ))}
          <td className="py-1 text-right font-display text-sm font-bold">{score.opp}</td>
        </tr>
      </tbody>
    </table>
  );
}

function SimScoreCard({
  title,
  score,
  oppName,
  featured = false,
}: {
  title: string;
  score: SimScore;
  oppName: string;
  featured?: boolean;
}) {
  const ouWins = score.ou > score.opp;
  return (
    <div
      className={`rounded-2xl border p-4 ${
        featured
          ? "border-crimson/35 bg-crimson/[0.04] shadow-[0_8px_28px_rgba(132,22,23,0.14)]"
          : "border-crimson/12 bg-white/95 shadow-[0_4px_20px_rgba(26,10,10,0.06)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.15em] ${featured ? "text-crimson" : "text-ink/50"}`}
        >
          {title}
        </p>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
            ouWins ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
          }`}
        >
          {ouWins ? "OU wins" : "OU loses"}
        </span>
      </div>
      <p className="mt-2 font-display text-3xl font-bold tabular-nums text-ink">
        <span className="text-crimson">{score.ou}</span>
        <span className="mx-1.5 text-ink/30">–</span>
        {score.opp}
        {score.overtime && (
          <span className="ml-1.5 align-middle text-xs font-bold text-amber-700">OT</span>
        )}
      </p>
      <QuarterTable score={score} oppName={oppName} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Box score tables                                                     */
/* ------------------------------------------------------------------ */

function StatSection({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  if (rows.length === 0) return null;
  return (
    <div className="mt-4 first:mt-0">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-crimson/80">
        {title}
      </h4>
      <div className="mt-1.5 overflow-x-auto">
        <table className="w-full min-w-[320px] text-xs tabular-nums">
          <thead>
            <tr className="border-b border-cream-dark text-left text-[10px] font-semibold uppercase tracking-wide text-ink/45">
              {headers.map((h, i) => (
                <th key={h} className={`py-1.5 ${i === 0 ? "pr-2" : "px-1.5 text-right"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-cream-dark/50 last:border-0">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`py-1.5 ${ci === 0 ? "pr-2 font-medium text-ink" : "px-1.5 text-right text-ink/75"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TeamBoxScore({ box }: { box: TeamBox }) {
  return (
    <div className={`${CARD} p-5`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-bold text-crimson">
          {box.team} — estimated box score
        </h3>
        <p className="text-xs font-semibold text-ink/55">
          {box.totalYards} total yds · {box.passYards} pass · {box.rushYards} rush ·{" "}
          {box.turnovers} TO
        </p>
      </div>

      <StatSection
        title="Passing"
        headers={["Player", "C/Att", "Yds", "TD", "INT"]}
        rows={box.passing.map((p) => [
          p.name,
          `${p.completions}/${p.attempts}`,
          p.yards,
          p.td,
          p.int,
        ])}
      />
      <StatSection
        title="Rushing"
        headers={["Player", "Car", "Yds", "TD", "Long"]}
        rows={box.rushing.map((r) => [r.name, r.carries, r.yards, r.td, r.long])}
      />
      <StatSection
        title="Receiving"
        headers={["Player", "Rec", "Yds", "TD", "Long"]}
        rows={box.receiving.map((r) => [r.name, r.receptions, r.yards, r.td, r.long])}
      />
      <StatSection
        title="Defense"
        headers={["Player", "Tkl", "TFL", "Sack", "INT"]}
        rows={box.defense.map((d) => [d.name, d.tackles, d.tfl, d.sacks, d.int])}
      />
      <StatSection
        title="Kicking"
        headers={["Player", "FG", "Long", "XP", "Pts"]}
        rows={box.kicking.map((k) => [
          k.name,
          `${k.fgMade}/${k.fgAtt}`,
          k.long || "—",
          k.xp,
          k.points,
        ])}
      />
      <StatSection
        title="Punting"
        headers={["Player", "Punts", "Avg", "Long"]}
        rows={box.punting.map((p) => [p.name, p.punts, p.avg, p.long])}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ratings summary                                                      */
/* ------------------------------------------------------------------ */

function RatingsRow({
  label,
  ou,
  opp,
}: {
  label: string;
  ou: number;
  opp: number;
}) {
  const edge = ou - opp;
  return (
    <tr className="border-b border-cream-dark/60 last:border-0">
      <td className="py-2 pr-2 font-semibold text-ink">{label}</td>
      <td className="px-2 py-2 text-right font-display font-bold tabular-nums text-crimson">
        {ou}
      </td>
      <td className="px-2 py-2 text-right font-display font-bold tabular-nums text-ink/70">
        {opp}
      </td>
      <td
        className={`py-2 pl-2 text-right text-xs font-bold tabular-nums ${
          edge >= 0 ? "text-green-700" : "text-red-600"
        }`}
      >
        {edge >= 0 ? `OU +${Math.round(edge * 10) / 10}` : `Opp +${Math.round(-edge * 10) / 10}`}
      </td>
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */

export function GameulatorSim({ schedule }: { schedule: ScheduleGame[] }) {
  const [opponent, setOpponent] = useState(schedule[0]?.opponent ?? "UTEP");
  const [mode, setMode] = useState<"team" | "units">("units");
  const [seed, setSeed] = useState(1);
  const [ouGrades, setOuGrades] = useState<UnitGrades>(OKLAHOMA_TEAM.grades);
  const [oppGradesByTeam, setOppGradesByTeam] = useState<Record<string, UnitGrades>>({});

  const game = schedule.find((g) => g.opponent === opponent) ?? schedule[0];
  const oppTeam: GameulatorTeam = getOpponentTeam(opponent);
  const oppGrades = oppGradesByTeam[opponent] ?? oppTeam.grades;

  const setOppGrades = (g: UnitGrades) =>
    setOppGradesByTeam((prev) => ({ ...prev, [opponent]: g }));

  const result: SimulationResult = useMemo(
    () =>
      runSimulation({
        opponentName: opponent,
        venue: venueFor(game),
        ouGrades,
        oppGrades,
        ouPlayers: OKLAHOMA_TEAM.players,
        oppPlayers: oppTeam.players,
        seed,
      }),
    [opponent, game, ouGrades, oppGrades, oppTeam, seed],
  );

  const summary = result.winProbability >= 50
    ? `Oklahoma ${result.consensus.ou}, ${opponent} ${result.consensus.opp}`
    : `${opponent} ${result.consensus.opp}, Oklahoma ${result.consensus.ou}`;

  return (
    <div>
      {/* Opponent picker */}
      <div className={`${CARD} p-5`}>
        <div className="flex items-center gap-2">
          <Swords className="h-4 w-4 text-crimson" aria-hidden />
          <h3 className="font-display text-lg font-bold text-crimson">
            Pick the 2026 matchup
          </h3>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Opponent">
          {schedule.map((g) => (
            <button
              key={g.opponent}
              onClick={() => setOpponent(g.opponent)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                opponent === g.opponent
                  ? "bg-crimson text-cream shadow-[0_4px_14px_rgba(132,22,23,0.3)]"
                  : "bg-cream-dark/60 text-ink/65 hover:bg-crimson/10 hover:text-crimson"
              }`}
            >
              {g.isNeutral ? "vs" : g.isHome ? "vs" : "@"} {g.opponent}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink/55">
          {new Date(`${game.date}T12:00:00`).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          · {venueLabel(game)} · {game.location}
          {game.opponentStrength && (
            <span className="ml-1.5 font-semibold text-crimson">
              — “{game.opponentStrength.label}” ({game.opponentStrength.score}/100 threat)
            </span>
          )}
        </p>
      </div>

      {/* Grade mode toggle */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex rounded-full border border-crimson/15 bg-white/80 p-1 shadow-sm"
          role="tablist"
          aria-label="Grading mode"
        >
          <button
            role="tab"
            aria-selected={mode === "team"}
            onClick={() => setMode("team")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
              mode === "team" ? "bg-crimson text-cream" : "text-ink/65 hover:text-crimson"
            }`}
          >
            <Gauge className="h-4 w-4" aria-hidden />
            Team grades
          </button>
          <button
            role="tab"
            aria-selected={mode === "units"}
            onClick={() => setMode("units")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
              mode === "units" ? "bg-crimson text-cream" : "text-ink/65 hover:text-crimson"
            }`}
          >
            <Sliders className="h-4 w-4" aria-hidden />
            Unit grades
          </button>
        </div>

        <button
          onClick={() => setSeed((s) => s + 1)}
          className="inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-2.5 text-sm font-bold text-cream shadow-[0_4px_16px_rgba(132,22,23,0.3)] transition hover:bg-crimson-dark active:scale-[0.98]"
        >
          <Dices className="h-4 w-4" aria-hidden />
          Re-simulate
        </button>
      </div>

      {/* Grade editors */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <TeamGradePanel
          team="Oklahoma"
          grades={ouGrades}
          mode={mode}
          onChange={setOuGrades}
          onReset={() => setOuGrades(OKLAHOMA_TEAM.grades)}
        />
        <TeamGradePanel
          team={opponent}
          grades={oppGrades}
          mode={mode}
          onChange={setOppGrades}
          onReset={() => setOppGrades(oppTeam.grades)}
        />
      </div>

      {/* Consensus headline */}
      <div className="mt-8 rounded-2xl border border-crimson/30 bg-crimson p-6 text-cream shadow-[0_8px_28px_rgba(132,22,23,0.25)]">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-cream/75">
          <Trophy className="h-4 w-4" aria-hidden />
          Game-u-lator consensus
        </div>
        <p className="mt-2 font-display text-3xl font-bold sm:text-4xl">{summary}</p>
        <p className="mt-1.5 text-sm text-cream/80">
          Oklahoma wins this one {result.winProbability}% of the time · expected
          margin {result.ouExpected >= result.oppExpected ? "OU" : opponent} by{" "}
          {Math.abs(Math.round((result.ouExpected - result.oppExpected) * 10) / 10)} ·
          expected points {result.ouExpected}–{result.oppExpected}
        </p>
      </div>

      {/* Three sims + consensus quarters */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {result.sims.map((s, i) => (
          <SimScoreCard key={i} title={`Simulation ${i + 1}`} score={s} oppName={opponent} />
        ))}
        <SimScoreCard title="Consensus" score={result.consensus} oppName={opponent} featured />
      </div>

      {/* Charts */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ScoreChart sims={result.sims} consensus={result.consensus} oppName={opponent} />
        <div className="flex flex-col gap-4">
          <WinProbabilityBar winProbability={result.winProbability} oppName={opponent} />
          <div className={`${CARD} flex-1 p-5`}>
            <h3 className="font-display text-lg font-bold text-crimson">
              Composite ratings
            </h3>
            <table className="mt-2 w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark text-left text-[10px] font-semibold uppercase tracking-wide text-ink/45">
                  <th className="py-1.5 pr-2">Phase</th>
                  <th className="px-2 py-1.5 text-right">OU</th>
                  <th className="px-2 py-1.5 text-right">{opponent}</th>
                  <th className="py-1.5 pl-2 text-right">Edge</th>
                </tr>
              </thead>
              <tbody>
                <RatingsRow label="Offense" ou={result.ouRatings.offense} opp={result.oppRatings.offense} />
                <RatingsRow label="Defense" ou={result.ouRatings.defense} opp={result.oppRatings.defense} />
                <RatingsRow label="Special teams" ou={result.ouRatings.specialTeams} opp={result.oppRatings.specialTeams} />
                <RatingsRow label="Coaching" ou={result.ouRatings.coaching} opp={result.oppRatings.coaching} />
                <RatingsRow label="Overall" ou={result.ouRatings.overall} opp={result.oppRatings.overall} />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <UnitComparisonChart
          ouGrades={ouGrades}
          oppGrades={oppGrades}
          oppName={opponent}
        />
      </div>

      {/* Box scores */}
      <h3 className="mt-8 font-display text-xl font-bold text-ink">
        Estimated player stats — consensus game
      </h3>
      <p className="mt-1 text-xs text-ink/55">
        Stat lines are generated from the consensus score and your grades.
        Opponent starters use projected names or placeholder roles.
      </p>
      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        <TeamBoxScore box={result.ouBox} />
        <TeamBoxScore box={result.oppBox} />
      </div>
    </div>
  );
}
