import {
  getComparablesByGroup,
  nflComparables,
  type AthleticMeasurables,
  type NflComparable,
  type PositionGroup,
} from "@/data/nfl-comparables";
import { combineEstimates } from "@/data/combine-profiles";
import type { Player } from "@/data/types";

/** College player input for the comp engine (roster or custom entry). */
export interface CollegeProspect {
  name: string;
  position: string;
  positionGroup: PositionGroup;
  measurables: AthleticMeasurables;
  scoutingNote?: string;
  /** True when the athletic profile was hand-curated vs derived */
  curated: boolean;
}

export interface AttributeComparison {
  key: keyof AthleticMeasurables;
  label: string;
  collegeValue: number;
  nflValue: number;
  collegeDisplay: string;
  nflDisplay: string;
  /** 0–100 — how close the two players are on this attribute */
  similarity: number;
  /** Lower value is better for this attribute (40 time, 3-cone) */
  lowerIsBetter: boolean;
}

export interface CompMatch {
  comparable: NflComparable;
  /** Similarity score out of 100 */
  score: number;
  grade: string;
  gradeLabel: string;
  attributes: AttributeComparison[];
}

type AttributeKey = keyof AthleticMeasurables;

const ATTRIBUTE_META: {
  key: AttributeKey;
  label: string;
  lowerIsBetter: boolean;
  format: (v: number) => string;
}[] = [
  { key: "heightIn", label: "Height", lowerIsBetter: false, format: formatHeight },
  { key: "weightLb", label: "Weight", lowerIsBetter: false, format: (v) => `${Math.round(v)} lbs` },
  { key: "fortyYd", label: "40-yard dash", lowerIsBetter: true, format: (v) => `${v.toFixed(2)}s` },
  { key: "benchReps", label: "Bench (225 lb)", lowerIsBetter: false, format: (v) => `${Math.round(v)} reps` },
  { key: "verticalIn", label: "Vertical jump", lowerIsBetter: false, format: (v) => `${v}\u2033` },
  { key: "broadIn", label: "Broad jump", lowerIsBetter: false, format: formatBroad },
  { key: "threeCone", label: "3-cone drill", lowerIsBetter: true, format: (v) => `${v.toFixed(2)}s` },
  { key: "talent", label: "Talent level", lowerIsBetter: false, format: (v) => `${Math.round(v)}/100` },
];

/**
 * Attribute weights per position group. Speed matters most for skill
 * positions, mass/strength for the trenches, and talent always matters —
 * a player's ceiling shapes who they become at the next level.
 */
const GROUP_WEIGHTS: Record<PositionGroup, Record<AttributeKey, number>> = {
  QB: { heightIn: 0.9, weightLb: 0.7, fortyYd: 1.1, benchReps: 0.2, verticalIn: 0.6, broadIn: 0.6, threeCone: 0.6, talent: 1.6 },
  RB: { heightIn: 0.5, weightLb: 1.1, fortyYd: 1.4, benchReps: 0.7, verticalIn: 0.9, broadIn: 0.9, threeCone: 0.8, talent: 1.4 },
  WR: { heightIn: 1.1, weightLb: 1.0, fortyYd: 1.5, benchReps: 0.3, verticalIn: 1.0, broadIn: 0.9, threeCone: 0.8, talent: 1.3 },
  TE: { heightIn: 1.0, weightLb: 1.1, fortyYd: 1.2, benchReps: 0.6, verticalIn: 0.8, broadIn: 0.8, threeCone: 0.8, talent: 1.3 },
  OL: { heightIn: 1.0, weightLb: 1.3, fortyYd: 0.9, benchReps: 1.4, verticalIn: 0.6, broadIn: 0.6, threeCone: 0.9, talent: 1.4 },
  DL: { heightIn: 0.9, weightLb: 1.4, fortyYd: 1.2, benchReps: 1.2, verticalIn: 0.8, broadIn: 0.8, threeCone: 0.9, talent: 1.3 },
  LB: { heightIn: 0.8, weightLb: 1.1, fortyYd: 1.3, benchReps: 0.9, verticalIn: 0.9, broadIn: 0.9, threeCone: 0.9, talent: 1.4 },
  DB: { heightIn: 1.0, weightLb: 1.0, fortyYd: 1.5, benchReps: 0.3, verticalIn: 1.0, broadIn: 0.9, threeCone: 0.9, talent: 1.3 },
  ST: { heightIn: 0.8, weightLb: 0.8, fortyYd: 0.4, benchReps: 0.2, verticalIn: 0.3, broadIn: 0.3, threeCone: 0.3, talent: 1.8 },
};

/** Floors prevent tiny per-group standard deviations from exploding z-scores. */
const MIN_STD: Record<AttributeKey, number> = {
  heightIn: 1.2,
  weightLb: 8,
  fortyYd: 0.08,
  benchReps: 3,
  verticalIn: 2,
  broadIn: 4,
  threeCone: 0.12,
  talent: 5,
};

/** How fast the 0–100 score falls off per weighted z-unit of distance. */
const SCORE_SLOPE = 17;

export function formatHeight(inches: number): string {
  const ft = Math.floor(inches / 12);
  const rem = Math.round(inches - ft * 12);
  return `${ft}'${rem}"`;
}

function formatBroad(inches: number): string {
  const ft = Math.floor(inches / 12);
  const rem = Math.round(inches - ft * 12);
  return `${ft}'${rem}"`;
}

export function parseHeightToInches(height: string): number {
  const match = height.match(/(\d+)\s*'\s*(\d+)/);
  if (!match) return 72;
  return Number(match[1]) * 12 + Number(match[2]);
}

interface GroupStats {
  mean: Record<AttributeKey, number>;
  std: Record<AttributeKey, number>;
}

const groupStatsCache = new Map<PositionGroup, GroupStats>();

function getGroupStats(group: PositionGroup): GroupStats {
  const cached = groupStatsCache.get(group);
  if (cached) return cached;

  const pool = getComparablesByGroup(group);
  const source = pool.length >= 4 ? pool : nflComparables;

  const mean = {} as Record<AttributeKey, number>;
  const std = {} as Record<AttributeKey, number>;

  for (const { key } of ATTRIBUTE_META) {
    const values = source.map((c) => c.measurables[key]);
    const m = values.reduce((a, b) => a + b, 0) / values.length;
    const variance =
      values.reduce((acc, v) => acc + (v - m) ** 2, 0) / values.length;
    mean[key] = m;
    std[key] = Math.max(Math.sqrt(variance), MIN_STD[key]);
  }

  const stats = { mean, std };
  groupStatsCache.set(group, stats);
  return stats;
}

export interface SimilarityGrade {
  grade: string;
  label: string;
}

export function gradeForScore(score: number): SimilarityGrade {
  if (score >= 92) return { grade: "A+", label: "Mirror match" };
  if (score >= 86) return { grade: "A", label: "Strong comp" };
  if (score >= 80) return { grade: "A-", label: "Very similar" };
  if (score >= 74) return { grade: "B+", label: "Solid comp" };
  if (score >= 68) return { grade: "B", label: "Similar mold" };
  if (score >= 60) return { grade: "C+", label: "Loose comp" };
  if (score >= 50) return { grade: "C", label: "Faint echo" };
  return { grade: "D", label: "Stretch" };
}

/**
 * Rank every NFL comparable at the prospect's position group by weighted,
 * position-normalized distance across the eight profile attributes.
 */
export function findComps(prospect: CollegeProspect, limit = 3): CompMatch[] {
  let pool = getComparablesByGroup(prospect.positionGroup);

  // Specialists only comp against their own craft (K vs K, P vs P, LS vs LS).
  if (prospect.positionGroup === "ST" && prospect.position) {
    const filtered = pool.filter((c) =>
      prospect.position.toUpperCase().includes(c.position),
    );
    if (filtered.length > 0) pool = filtered;
  }

  const stats = getGroupStats(prospect.positionGroup);
  const weights = GROUP_WEIGHTS[prospect.positionGroup];

  const matches = pool.map((comparable) => {
    let weightedSq = 0;
    let weightSum = 0;
    const attributes: AttributeComparison[] = [];

    for (const meta of ATTRIBUTE_META) {
      const collegeValue = prospect.measurables[meta.key];
      const nflValue = comparable.measurables[meta.key];
      const dz = (collegeValue - nflValue) / stats.std[meta.key];
      const w = weights[meta.key];
      weightedSq += w * dz * dz;
      weightSum += w;

      attributes.push({
        key: meta.key,
        label: meta.label,
        collegeValue,
        nflValue,
        collegeDisplay: meta.format(collegeValue),
        nflDisplay: meta.format(nflValue),
        similarity: Math.max(0, Math.min(100, Math.round(100 - 25 * Math.abs(dz)))),
        lowerIsBetter: meta.lowerIsBetter,
      });
    }

    const distance = Math.sqrt(weightedSq / weightSum);
    const score = Math.max(5, Math.min(99.9, 100 - SCORE_SLOPE * distance));
    const roundedScore = Math.round(score * 10) / 10;
    const { grade, label } = gradeForScore(roundedScore);

    return { comparable, score: roundedScore, grade, gradeLabel: label, attributes };
  });

  return matches.sort((a, b) => b.score - a.score).slice(0, limit);
}

// ── Roster profile derivation ─────────────────────────────────────

const GROUP_BASELINES: Record<
  PositionGroup,
  { fortyYd: number; benchReps: number; verticalIn: number; broadIn: number; threeCone: number; avgWeight: number }
> = {
  QB: { fortyYd: 4.80, benchReps: 15, verticalIn: 31, broadIn: 112, threeCone: 7.15, avgWeight: 218 },
  RB: { fortyYd: 4.52, benchReps: 19, verticalIn: 35, broadIn: 120, threeCone: 7.05, avgWeight: 212 },
  WR: { fortyYd: 4.50, benchReps: 13, verticalIn: 35, broadIn: 120, threeCone: 7.00, avgWeight: 195 },
  TE: { fortyYd: 4.70, benchReps: 19, verticalIn: 33, broadIn: 116, threeCone: 7.15, avgWeight: 245 },
  OL: { fortyYd: 5.15, benchReps: 27, verticalIn: 28, broadIn: 103, threeCone: 7.70, avgWeight: 315 },
  DL: { fortyYd: 4.90, benchReps: 27, verticalIn: 31, broadIn: 110, threeCone: 7.40, avgWeight: 280 },
  LB: { fortyYd: 4.65, benchReps: 21, verticalIn: 34, broadIn: 119, threeCone: 7.05, avgWeight: 228 },
  DB: { fortyYd: 4.48, benchReps: 14, verticalIn: 36, broadIn: 122, threeCone: 6.95, avgWeight: 198 },
  ST: { fortyYd: 4.95, benchReps: 12, verticalIn: 28, broadIn: 102, threeCone: 7.50, avgWeight: 205 },
};

function round(value: number, decimals: number): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

function deriveTalent(player: Player): number {
  const starTalent: Record<number, number> = { 5: 84, 4: 78, 3: 72 };
  let talent = player.recruitStars ? (starTalent[player.recruitStars] ?? 70) : 68;

  const classYear = player.classYear.toLowerCase();
  if (classYear.includes("senior")) talent += 3;
  else if (classYear.includes("junior")) talent += 2;
  else if (classYear.includes("sophomore")) talent += 1;

  return Math.max(60, Math.min(90, talent));
}

/**
 * Derive an estimated athletic profile for roster players without a
 * curated entry: position baseline, adjusted for listed weight (heavier
 * players run slower and press more) and recruiting pedigree.
 */
function deriveEstimate(player: Player) {
  const base = GROUP_BASELINES[player.positionGroup];
  const weightDelta = player.weight - base.avgWeight;
  const isBig = player.positionGroup === "OL" || player.positionGroup === "DL";
  const speedFactor = isBig ? 0.0016 : 0.0022;

  return {
    fortyYd: round(base.fortyYd + weightDelta * speedFactor, 2),
    benchReps: Math.round(base.benchReps + weightDelta * 0.06),
    verticalIn: round(base.verticalIn - weightDelta * 0.03, 1),
    broadIn: Math.round(base.broadIn - weightDelta * 0.06),
    threeCone: round(base.threeCone + weightDelta * 0.0015, 2),
    talent: deriveTalent(player),
  };
}

/** Build the full comp-engine input for a Sooners roster player. */
export function buildProspectFromPlayer(player: Player): CollegeProspect {
  const curatedEstimate = combineEstimates[player.id];
  const estimate = curatedEstimate ?? deriveEstimate(player);

  return {
    name: player.name,
    position: player.position,
    positionGroup: player.positionGroup,
    curated: Boolean(curatedEstimate),
    scoutingNote: curatedEstimate?.scoutingNote,
    measurables: {
      heightIn: parseHeightToInches(player.height),
      weightLb: player.weight,
      fortyYd: estimate.fortyYd,
      benchReps: estimate.benchReps,
      verticalIn: estimate.verticalIn,
      broadIn: estimate.broadIn,
      threeCone: estimate.threeCone,
      talent: estimate.talent,
    },
  };
}
