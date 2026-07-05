/**
 * Game-u-lator simulation engine — fan-entertainment score predictor.
 * Grades are 0–100 unit estimates; all outputs are seeded pseudo-random
 * so the same grades + seed always reproduce the same three sims.
 */

export const UNIT_KEYS = [
  "qb",
  "rb",
  "te",
  "wr",
  "ol",
  "dl",
  "lb",
  "db",
  "s",
  "k",
  "p",
  "st",
  "coaching",
] as const;

export type UnitKey = (typeof UNIT_KEYS)[number];

export type UnitGrades = Record<UnitKey, number>;

export const UNIT_LABELS: Record<UnitKey, string> = {
  qb: "Quarterback",
  rb: "Running Back",
  te: "Tight End",
  wr: "Wide Receiver",
  ol: "Offensive Line",
  dl: "Defensive Line",
  lb: "Linebacker",
  db: "Cornerback",
  s: "Safety",
  k: "Kicker",
  p: "Punter",
  st: "Special Teams",
  coaching: "Coaching",
};

export const UNIT_SHORT_LABELS: Record<UnitKey, string> = {
  qb: "QB",
  rb: "RB",
  te: "TE",
  wr: "WR",
  ol: "OL",
  dl: "DL",
  lb: "LB",
  db: "DB",
  s: "S",
  k: "K",
  p: "P",
  st: "ST",
  coaching: "Coach",
};

const LETTER_SCALE: [number, string][] = [
  [97, "A+"],
  [93, "A"],
  [90, "A-"],
  [87, "B+"],
  [83, "B"],
  [80, "B-"],
  [77, "C+"],
  [73, "C"],
  [70, "C-"],
  [67, "D+"],
  [63, "D"],
  [60, "D-"],
  [0, "F"],
];

export function letterGrade(score: number): string {
  return LETTER_SCALE.find(([min]) => score >= min)?.[1] ?? "F";
}

export function clampGrade(value: number): number {
  return Math.min(100, Math.max(30, Math.round(value)));
}

export function averageGrade(grades: UnitGrades): number {
  const sum = UNIT_KEYS.reduce((acc, key) => acc + grades[key], 0);
  return Math.round((sum / UNIT_KEYS.length) * 10) / 10;
}

/** Shift every unit grade by a delta, clamped to the valid range. */
export function shiftGrades(grades: UnitGrades, delta: number): UnitGrades {
  const next = {} as UnitGrades;
  for (const key of UNIT_KEYS) next[key] = clampGrade(grades[key] + delta);
  return next;
}

/* ------------------------------------------------------------------ */
/* Composite ratings                                                    */
/* ------------------------------------------------------------------ */

export interface TeamRatings {
  offense: number;
  defense: number;
  specialTeams: number;
  coaching: number;
  overall: number;
}

export function computeRatings(g: UnitGrades): TeamRatings {
  const offense =
    g.qb * 0.32 + g.ol * 0.22 + g.wr * 0.18 + g.rb * 0.15 + g.te * 0.07 + g.coaching * 0.06;
  const defense =
    g.dl * 0.3 + g.db * 0.24 + g.lb * 0.22 + g.s * 0.16 + g.coaching * 0.08;
  const specialTeams = g.k * 0.4 + g.st * 0.35 + g.p * 0.25;
  const overall = offense * 0.42 + defense * 0.42 + specialTeams * 0.08 + g.coaching * 0.08;
  return {
    offense: round1(offense),
    defense: round1(defense),
    specialTeams: round1(specialTeams),
    coaching: round1(g.coaching),
    overall: round1(overall),
  };
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/* ------------------------------------------------------------------ */
/* Seeded randomness                                                    */
/* ------------------------------------------------------------------ */

export function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

type Rng = () => number;

function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normal(rng: Rng, mean = 0, sd = 1): number {
  const u = Math.max(rng(), 1e-9);
  const v = Math.max(rng(), 1e-9);
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* ------------------------------------------------------------------ */
/* Scoring model                                                        */
/* ------------------------------------------------------------------ */

export type Venue = "home" | "away" | "neutral";

const HOME_EDGE = 2.4;
const SCORE_SD = 6.8;

function venueEdge(venue: Venue, forOklahoma: boolean): number {
  if (venue === "neutral") return 0;
  const ouEdge = venue === "home" ? HOME_EDGE : -HOME_EDGE;
  return forOklahoma ? ouEdge : -ouEdge;
}

export function expectedPoints(
  attack: TeamRatings,
  defendedBy: TeamRatings,
  edge: number,
): number {
  const raw =
    23 +
    (attack.offense - defendedBy.defense) * 0.42 +
    (attack.specialTeams - defendedBy.specialTeams) * 0.06 +
    (attack.coaching - defendedBy.coaching) * 0.1 +
    edge;
  return Math.min(58, Math.max(6, raw));
}

/** Snap a raw simulated value to a plausible football score. */
function footballScore(raw: number): number {
  const n = Math.round(raw);
  if (n <= 0) return 0;
  if (n === 1 || n === 2) return 3;
  if (n === 4 || n === 5) return n + 2;
  return n;
}

export interface SimScore {
  ou: number;
  opp: number;
  ouQuarters: number[];
  oppQuarters: number[];
  overtime: boolean;
}

interface ScoreParts {
  tds: number;
  fgs: number;
  xp: number;
  twoPt: number;
  missedXp: number;
}

/** Decompose a final score into touchdowns, field goals, and conversions. */
export function decomposeScore(points: number): ScoreParts {
  if (points <= 0) return { tds: 0, fgs: 0, xp: 0, twoPt: 0, missedXp: 0 };
  for (let tds = Math.floor(points / 7); tds >= 0; tds--) {
    const rem = points - tds * 7;
    if (rem % 3 === 0) {
      return { tds, fgs: rem / 3, xp: tds, twoPt: 0, missedXp: 0 };
    }
  }
  // Remainder never divisible by 3 → use a two-point conversion or missed XP
  for (let tds = Math.floor(points / 7); tds >= 1; tds--) {
    const remTwo = points - (tds - 1) * 7 - 8;
    if (remTwo >= 0 && remTwo % 3 === 0) {
      return { tds, fgs: remTwo / 3, xp: tds - 1, twoPt: 1, missedXp: 0 };
    }
    const remMiss = points - (tds - 1) * 7 - 6;
    if (remMiss >= 0 && remMiss % 3 === 0) {
      return { tds, fgs: remMiss / 3, xp: tds - 1, twoPt: 0, missedXp: 1 };
    }
  }
  return { tds: 0, fgs: Math.round(points / 3), xp: 0, twoPt: 0, missedXp: 0 };
}

function splitQuarters(points: number, rng: Rng): number[] {
  const parts = decomposeScore(points);
  const quarters = [0, 0, 0, 0];
  const weights = [0.24, 0.28, 0.21, 0.27];
  const events: number[] = [];
  for (let i = 0; i < parts.tds; i++) {
    events.push(7);
  }
  for (let i = 0; i < parts.fgs; i++) events.push(3);
  // Fold conversion adjustments into the last touchdown
  const scored = events.reduce((a, b) => a + b, 0);
  if (events.length > 0 && scored !== points) events[0] += points - scored;

  for (const value of events) {
    const roll = rng();
    let acc = 0;
    let q = 3;
    for (let i = 0; i < 4; i++) {
      acc += weights[i];
      if (roll < acc) {
        q = i;
        break;
      }
    }
    quarters[q] += value;
  }
  return quarters;
}

/* ------------------------------------------------------------------ */
/* Box score generation                                                 */
/* ------------------------------------------------------------------ */

export interface PassingLine {
  name: string;
  completions: number;
  attempts: number;
  yards: number;
  td: number;
  int: number;
}

export interface RushingLine {
  name: string;
  carries: number;
  yards: number;
  td: number;
  long: number;
}

export interface ReceivingLine {
  name: string;
  receptions: number;
  yards: number;
  td: number;
  long: number;
}

export interface DefenseLine {
  name: string;
  tackles: number;
  tfl: number;
  sacks: number;
  int: number;
}

export interface KickingLine {
  name: string;
  fgMade: number;
  fgAtt: number;
  long: number;
  xp: number;
  points: number;
}

export interface PuntingLine {
  name: string;
  punts: number;
  avg: number;
  long: number;
}

export interface TeamBox {
  team: string;
  points: number;
  totalYards: number;
  passYards: number;
  rushYards: number;
  turnovers: number;
  passing: PassingLine[];
  rushing: RushingLine[];
  receiving: ReceivingLine[];
  defense: DefenseLine[];
  kicking: KickingLine[];
  punting: PuntingLine[];
}

export interface SkillPlayers {
  qb: string;
  rb1: string;
  rb2?: string;
  wr1: string;
  wr2?: string;
  wr3?: string;
  te?: string;
  k: string;
  p: string;
  defenders?: { name: string; pos: "DL" | "LB" | "DB" | "S" }[];
}

interface BoxInputs {
  team: string;
  points: number;
  grades: UnitGrades;
  oppGrades: UnitGrades;
  players: SkillPlayers;
  rng: Rng;
}

function allocate(total: number, shares: number[], rng: Rng): number[] {
  const jittered = shares.map((s) => Math.max(0.02, s * (0.8 + rng() * 0.4)));
  const sum = jittered.reduce((a, b) => a + b, 0);
  const out = jittered.map((s) => Math.round((s / sum) * total));
  const drift = total - out.reduce((a, b) => a + b, 0);
  out[0] += drift;
  return out;
}

function distributeTds(count: number, weights: number[], rng: Rng): number[] {
  const out = weights.map(() => 0);
  for (let i = 0; i < count; i++) {
    const roll = rng() * weights.reduce((a, b) => a + b, 0);
    let acc = 0;
    for (let j = 0; j < weights.length; j++) {
      acc += weights[j];
      if (roll < acc) {
        out[j]++;
        break;
      }
    }
  }
  return out;
}

function buildTeamBox({ team, points, grades, oppGrades, players, rng }: BoxInputs): TeamBox {
  const parts = decomposeScore(points);
  const totalYards = Math.round(
    Math.max(120, 175 + points * 7.6 + normal(rng, 0, 28)),
  );
  const passShare = Math.min(
    0.68,
    Math.max(0.36, 0.46 + (grades.qb - grades.rb) * 0.005 + (grades.wr - 74) * 0.002),
  );
  const passYards = Math.round(totalYards * passShare);
  const rushYards = totalYards - passYards;

  // Passing line
  const ypa = 6.2 + (grades.qb - 70) * 0.055;
  const attempts = Math.max(12, Math.round(passYards / Math.max(5.4, ypa)));
  const compPct = Math.min(0.74, Math.max(0.48, 0.555 + (grades.qb - 72) * 0.005));
  const completions = Math.min(attempts - 1, Math.round(attempts * compPct));
  const expInt = Math.min(2.4, Math.max(0.25, 0.7 + ((oppGrades.db + oppGrades.s) / 2 - grades.qb) * 0.02));
  let ints = 0;
  for (let i = 0; i < 3; i++) if (rng() < expInt / 3) ints++;

  const passTdWeight = passShare + 0.06;
  const passTds = distributeTds(parts.tds, [passTdWeight, 1 - passTdWeight], rng)[0];
  const rushTds = parts.tds - passTds;

  // QB scramble yards come out of the rushing total
  const qbRushYards = Math.round(rushYards * Math.min(0.3, Math.max(0.06, (grades.qb - 62) * 0.004)));
  const rbYards = rushYards - qbRushYards;
  const rbSplit = players.rb2 ? [0.62, 0.38] : [1];
  const rbAlloc = allocate(rbYards, rbSplit, rng);
  const rbTdSplit = distributeTds(rushTds, players.rb2 ? [0.5, 0.3, 0.2] : [0.75, 0.25], rng);

  const rushing: RushingLine[] = [];
  const rb1Yards = rbAlloc[0];
  rushing.push({
    name: players.rb1,
    carries: Math.max(4, Math.round(rb1Yards / Math.max(3.4, 4.4 + (grades.rb - 75) * 0.05))),
    yards: rb1Yards,
    td: rbTdSplit[0],
    long: Math.max(6, Math.round(rb1Yards * (0.2 + rng() * 0.2))),
  });
  if (players.rb2) {
    rushing.push({
      name: players.rb2,
      carries: Math.max(2, Math.round(rbAlloc[1] / 4.6)),
      yards: rbAlloc[1],
      td: rbTdSplit[1],
      long: Math.max(4, Math.round(rbAlloc[1] * (0.25 + rng() * 0.2))),
    });
  }
  rushing.push({
    name: `${players.qb} (scrambles)`,
    carries: Math.max(2, Math.round(qbRushYards / 5.8)),
    yards: qbRushYards,
    td: rbTdSplit[players.rb2 ? 2 : 1] ?? 0,
    long: Math.max(4, Math.round(qbRushYards * (0.3 + rng() * 0.25))),
  });

  // Receiving distribution
  const targets: { name: string; share: number; ypr: number }[] = [
    { name: players.wr1, share: 0.28, ypr: 14.6 },
  ];
  if (players.wr2) targets.push({ name: players.wr2, share: 0.2, ypr: 13.4 });
  if (players.wr3) targets.push({ name: players.wr3, share: 0.17, ypr: 15.8 });
  if (players.te) targets.push({ name: players.te, share: 0.14, ypr: 10.8 });
  targets.push({ name: players.rb1, share: 0.09, ypr: 7.4 });
  targets.push({ name: "All others", share: 0.12, ypr: 11.2 });

  const recAlloc = allocate(passYards, targets.map((t) => t.share), rng);
  const recTds = distributeTds(passTds, targets.map((t) => t.share), rng);
  const receiving: ReceivingLine[] = targets.map((t, i) => ({
    name: t.name,
    receptions: Math.max(recTds[i] > 0 ? 1 : 0, Math.round(recAlloc[i] / t.ypr)),
    yards: recAlloc[i],
    td: recTds[i],
    long: Math.max(5, Math.round(recAlloc[i] * (0.3 + rng() * 0.2))),
  }));

  // Reconcile receptions vs completions drift
  const recTotal = receiving.reduce((a, r) => a + r.receptions, 0);
  if (recTotal !== completions) {
    receiving[receiving.length - 1].receptions = Math.max(
      0,
      receiving[receiving.length - 1].receptions + (completions - recTotal),
    );
  }

  // Defense (stats accumulated AGAINST the opponent offense)
  const defense: DefenseLine[] = [];
  if (players.defenders && players.defenders.length > 0) {
    const teamSacks = Math.max(
      0,
      Math.round(1.8 + (grades.dl - oppGrades.ol) * 0.08 + normal(rng, 0, 0.9)),
    );
    const oppInts = Math.min(
      3,
      Math.max(0, Math.round(0.6 + ((grades.db + grades.s) / 2 - oppGrades.qb) * 0.03 + normal(rng, 0, 0.7))),
    );
    let sacksLeft = teamSacks;
    let intsLeft = oppInts;
    for (const d of players.defenders) {
      const isFront = d.pos === "DL" || d.pos === "LB";
      const tackles = Math.max(
        1,
        Math.round(
          (d.pos === "LB" ? 8 : d.pos === "S" ? 6.5 : d.pos === "DB" ? 5 : 4.5) +
            normal(rng, 0, 1.4),
        ),
      );
      const sacks = isFront && sacksLeft > 0 ? Math.min(sacksLeft, rng() < 0.55 ? 1 : 2) : 0;
      sacksLeft -= sacks;
      const canPick = d.pos === "DB" || d.pos === "S" || d.pos === "LB";
      const picks = canPick && intsLeft > 0 && rng() < 0.4 ? 1 : 0;
      intsLeft -= picks;
      defense.push({
        name: `${d.name} (${d.pos})`,
        tackles,
        tfl: sacks + (rng() < 0.4 ? 1 : 0),
        sacks,
        int: picks,
      });
    }
  }

  const fgAtt = parts.fgs + (rng() < 0.3 ? 1 : 0);
  const kicking: KickingLine[] = [
    {
      name: players.k,
      fgMade: parts.fgs,
      fgAtt,
      long: parts.fgs > 0 ? 33 + Math.round(rng() * 21) : 0,
      xp: parts.xp,
      points: parts.fgs * 3 + parts.xp,
    },
  ];

  const punts = Math.min(9, Math.max(1, Math.round(7.2 - points / 8 + normal(rng, 0, 0.8))));
  const punting: PuntingLine[] = [
    {
      name: players.p,
      punts,
      avg: Math.round((40 + (grades.p - 70) * 0.18 + normal(rng, 0, 1.6)) * 10) / 10,
      long: 44 + Math.round(rng() * 18),
    },
  ];

  return {
    team,
    points,
    totalYards,
    passYards,
    rushYards,
    turnovers: ints,
    passing: [
      {
        name: players.qb,
        completions,
        attempts,
        yards: passYards,
        td: passTds,
        int: ints,
      },
    ],
    rushing,
    receiving,
    defense,
    kicking,
    punting,
  };
}

/* ------------------------------------------------------------------ */
/* Full simulation                                                      */
/* ------------------------------------------------------------------ */

export interface SimulationInput {
  opponentName: string;
  venue: Venue;
  ouGrades: UnitGrades;
  oppGrades: UnitGrades;
  ouPlayers: SkillPlayers;
  oppPlayers: SkillPlayers;
  seed: number;
}

export interface SimulationResult {
  ouRatings: TeamRatings;
  oppRatings: TeamRatings;
  ouExpected: number;
  oppExpected: number;
  winProbability: number;
  sims: SimScore[];
  consensus: SimScore;
  ouBox: TeamBox;
  oppBox: TeamBox;
}

const MONTE_CARLO_RUNS = 1200;

export function runSimulation(input: SimulationInput): SimulationResult {
  const ouRatings = computeRatings(input.ouGrades);
  const oppRatings = computeRatings(input.oppGrades);

  const ouExpected = expectedPoints(ouRatings, oppRatings, venueEdge(input.venue, true));
  const oppExpected = expectedPoints(oppRatings, ouRatings, venueEdge(input.venue, false));

  const baseSeed = (hashSeed(input.opponentName) ^ input.seed) >>> 0;

  // Win probability via Monte Carlo
  const mcRng = mulberry32(baseSeed ^ 0x9e3779b9);
  let wins = 0;
  for (let i = 0; i < MONTE_CARLO_RUNS; i++) {
    const ou = normal(mcRng, ouExpected, SCORE_SD);
    const opp = normal(mcRng, oppExpected, SCORE_SD);
    if (ou > opp) wins++;
    else if (ou === opp) wins += 0.5;
  }
  const winProbability = Math.round((wins / MONTE_CARLO_RUNS) * 1000) / 10;

  // Three display sims
  const sims: SimScore[] = [];
  for (let i = 0; i < 3; i++) {
    const rng = mulberry32((baseSeed + i * 7919) >>> 0);
    let ou = footballScore(normal(rng, ouExpected, SCORE_SD));
    let opp = footballScore(normal(rng, oppExpected, SCORE_SD));
    let overtime = false;
    if (ou === opp) {
      overtime = true;
      if (rng() < winProbability / 100) ou += rng() < 0.5 ? 3 : 7;
      else opp += rng() < 0.5 ? 3 : 7;
    }
    sims.push({
      ou,
      opp,
      ouQuarters: splitQuarters(ou, rng),
      oppQuarters: splitQuarters(opp, rng),
      overtime,
    });
  }

  // Consensus = footballized expected scores (nudged apart if tied)
  const consensusRng = mulberry32((baseSeed + 424242) >>> 0);
  let cOu = footballScore(ouExpected);
  let cOpp = footballScore(oppExpected);
  if (cOu === cOpp) {
    if (winProbability >= 50) cOu += 3;
    else cOpp += 3;
  }
  const consensus: SimScore = {
    ou: cOu,
    opp: cOpp,
    ouQuarters: splitQuarters(cOu, consensusRng),
    oppQuarters: splitQuarters(cOpp, consensusRng),
    overtime: false,
  };

  // Box scores keyed off the consensus game
  const boxRng = mulberry32((baseSeed + 777777) >>> 0);
  const ouBox = buildTeamBox({
    team: "Oklahoma",
    points: consensus.ou,
    grades: input.ouGrades,
    oppGrades: input.oppGrades,
    players: input.ouPlayers,
    rng: boxRng,
  });
  const oppBox = buildTeamBox({
    team: input.opponentName,
    points: consensus.opp,
    grades: input.oppGrades,
    oppGrades: input.ouGrades,
    players: input.oppPlayers,
    rng: boxRng,
  });

  // Keep QB interceptions consistent with the opposing defense's takeaways
  const ouDefInts = ouBox.defense.reduce((a, d) => a + d.int, 0);
  const oppDefInts = oppBox.defense.reduce((a, d) => a + d.int, 0);
  if (ouBox.defense.length > 0) {
    oppBox.passing[0].int = ouDefInts;
    oppBox.turnovers = ouDefInts;
  }
  if (oppBox.defense.length > 0) {
    ouBox.passing[0].int = oppDefInts;
    ouBox.turnovers = oppDefInts;
  }

  return {
    ouRatings,
    oppRatings,
    ouExpected: round1(ouExpected),
    oppExpected: round1(oppExpected),
    winProbability,
    sims,
    consensus,
    ouBox,
    oppBox,
  };
}
