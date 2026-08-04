/**
 * BB+ ranking engine — converts advanced O/D inputs into offense, defense,
 * and combined ratings, then ranks the top board.
 *
 * Methodology mirrors The Locker Room SP+/EPA/havoc stack:
 *  - Offense: EPA, success, explosives, scoring, YPP, 3rd down, RZ TD%
 *  - Defense: havoc, pressure, points allowed, YPP allowed, 3rd-down stops, RZ
 *  - Combined: 48% offense + 52% defense (slight defensive lean, Venables DNA)
 */

import {
  bbPlusTeamInputs,
  type BbPlusTeamInput,
} from "@/data/bb-plus-rankings";

/** Power-4 style baselines used for normalization (same spirit as SEC_AVG). */
const BASELINE = {
  epaPerPlay: 0.08,
  successRate: 42,
  explosiveRate: 11,
  ppg: 28.5,
  ypp: 5.6,
  thirdDownPct: 42,
  redZoneTdPct: 58,
  havocRate: 16,
  pressureRate: 24,
  papg: 22,
  yppAllowed: 5.3,
  thirdDownStopPct: 62,
  redZoneTdPctAllowed: 55,
};

export type BbPlusBoardKind = "combined" | "offense" | "defense";

export type BbPlusRatedTeam = {
  id: string;
  school: string;
  mascot: string;
  conference: BbPlusTeamInput["conference"];
  note: string;
  bbPlusOffense: number;
  bbPlusDefense: number;
  bbPlusCombined: number;
  offense: BbPlusTeamInput["offense"];
  defense: BbPlusTeamInput["defense"];
};

export type BbPlusRankedTeam = BbPlusRatedTeam & {
  rank: number;
  rating: number;
};

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/** Ratio helper — 1.0 = baseline, then map to SP+-style points. */
function efficiencyPoints(actual: number, baseline: number, weight: number): number {
  if (baseline === 0) return 0;
  return ((actual / baseline) - 1) * weight;
}

/** Inverse efficiency (lower actual is better — defense). */
function inverseEfficiencyPoints(
  actual: number,
  baseline: number,
  weight: number,
): number {
  if (actual === 0) return weight;
  return ((baseline / actual) - 1) * weight;
}

export function rateTeam(input: BbPlusTeamInput): BbPlusRatedTeam {
  const { offense: o, defense: d } = input;

  // Weights tuned so elite Power-4 clubs land roughly +8 to +28 (SP+-ish scale)
  // without bunching on the clamp ceiling.
  const offenseRaw =
    efficiencyPoints(o.epaPerPlay, BASELINE.epaPerPlay, 8) +
    efficiencyPoints(o.successRate, BASELINE.successRate, 10) +
    efficiencyPoints(o.explosiveRate, BASELINE.explosiveRate, 8) +
    efficiencyPoints(o.pointsPerGame, BASELINE.ppg, 10) +
    efficiencyPoints(o.yardsPerPlay, BASELINE.ypp, 8) +
    efficiencyPoints(o.thirdDownPct, BASELINE.thirdDownPct, 4) +
    efficiencyPoints(o.redZoneTdPct, BASELINE.redZoneTdPct, 4);

  const defenseRaw =
    efficiencyPoints(d.havocRate, BASELINE.havocRate, 10) +
    efficiencyPoints(d.pressureRate, BASELINE.pressureRate, 7) +
    inverseEfficiencyPoints(d.pointsAllowedPerGame, BASELINE.papg, 12) +
    inverseEfficiencyPoints(d.yardsPerPlayAllowed, BASELINE.yppAllowed, 8) +
    efficiencyPoints(d.thirdDownStopPct, BASELINE.thirdDownStopPct, 7) +
    inverseEfficiencyPoints(d.redZoneTdPctAllowed, BASELINE.redZoneTdPctAllowed, 6);

  const bbPlusOffense = Math.round(clamp(offenseRaw, -20, 35) * 10) / 10;
  const bbPlusDefense = Math.round(clamp(defenseRaw, -20, 35) * 10) / 10;
  const bbPlusCombined =
    Math.round((bbPlusOffense * 0.48 + bbPlusDefense * 0.52) * 10) / 10;

  return {
    id: input.id,
    school: input.school,
    mascot: input.mascot,
    conference: input.conference,
    note: input.note,
    bbPlusOffense,
    bbPlusDefense,
    bbPlusCombined,
    offense: o,
    defense: d,
  };
}

export function formatBbPlus(rating: number): string {
  if (rating > 0) return `+${rating.toFixed(1)}`;
  if (rating === 0) return "0.0";
  return rating.toFixed(1);
}

export function getBbPlusBoard(kind: BbPlusBoardKind = "combined"): BbPlusRankedTeam[] {
  const rated = bbPlusTeamInputs.map(rateTeam);

  const key: keyof BbPlusRatedTeam =
    kind === "offense"
      ? "bbPlusOffense"
      : kind === "defense"
        ? "bbPlusDefense"
        : "bbPlusCombined";

  return [...rated]
    .sort((a, b) => {
      const diff = (b[key] as number) - (a[key] as number);
      if (diff !== 0) return diff;
      return a.school.localeCompare(b.school);
    })
    .map((team, index) => ({
      ...team,
      rank: index + 1,
      rating: team[key] as number,
    }));
}

export const BB_PLUS_METHODOLOGY = [
  {
    title: "Offense BB+",
    body: "EPA/play, success rate, explosive-play rate, scoring pace, yards per play, third-down conversion, and red-zone TD rate — each graded vs a Power-4 baseline.",
  },
  {
    title: "Defense BB+",
    body: "Havoc rate, pressure rate, points allowed, yards per play allowed, third-down stop rate, and red-zone TD% allowed. Lower scoring/yardage allowed grades higher.",
  },
  {
    title: "Combined BB+",
    body: "48% offense + 52% defense. Slight defensive lean mirrors how championship floors are built — and matches Boomer Ball’s Venables-era lens.",
  },
] as const;
