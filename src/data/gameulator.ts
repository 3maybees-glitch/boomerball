import type { SkillPlayers, UnitGrades } from "@/lib/gameulator";

/**
 * Game-u-lator default unit grades (0–100) — Boomer Ball fan estimates
 * compiled from 2026 opponent strength tiers, returning production, and
 * recruiting talent. Pure entertainment, fully editable in the tool.
 */

export interface GameulatorTeam {
  name: string;
  mascot: string;
  grades: UnitGrades;
  players: SkillPlayers;
}

export const OKLAHOMA_TEAM: GameulatorTeam = {
  name: "Oklahoma",
  mascot: "Sooners",
  grades: {
    qb: 88,
    rb: 82,
    te: 74,
    wr: 80,
    ol: 78,
    dl: 88,
    lb: 84,
    db: 87,
    s: 85,
    k: 86,
    p: 78,
    st: 83,
    coaching: 85,
  },
  players: {
    qb: "John Mateer",
    rb1: "Tory Blaylock",
    rb2: "Xavier Robinson",
    wr1: "Isaiah Sategna III",
    wr2: "Trell Harris",
    wr3: "Parker Livingstone",
    te: "Hayden Hansen",
    k: "Tate Sandell",
    p: "Jacob Ulrich",
    defenders: [
      { name: "Kip Lewis", pos: "LB" },
      { name: "David Stone", pos: "DL" },
      { name: "Adepoju Adebawore", pos: "DL" },
      { name: "Peyton Bowen", pos: "S" },
      { name: "Eli Bowen", pos: "DB" },
      { name: "Reggie Powers III", pos: "S" },
    ],
  },
};

/** Placeholder skill players built from the opponent's mascot. */
function mascotPlayers(mascot: string, qbName?: string): SkillPlayers {
  return {
    qb: qbName ?? `${mascot} QB1`,
    rb1: `${mascot} RB1`,
    rb2: `${mascot} RB2`,
    wr1: `${mascot} WR1`,
    wr2: `${mascot} WR2`,
    wr3: `${mascot} WR3`,
    te: `${mascot} TE1`,
    k: `${mascot} K`,
    p: `${mascot} P`,
    defenders: [
      { name: `${mascot} LB1`, pos: "LB" },
      { name: `${mascot} DL1`, pos: "DL" },
      { name: `${mascot} DB1`, pos: "DB" },
      { name: `${mascot} S1`, pos: "S" },
    ],
  };
}

export const OPPONENT_TEAMS: Record<string, GameulatorTeam> = {
  UTEP: {
    name: "UTEP",
    mascot: "Miners",
    grades: { qb: 52, rb: 55, te: 50, wr: 53, ol: 50, dl: 52, lb: 54, db: 51, s: 52, k: 60, p: 62, st: 55, coaching: 58 },
    players: mascotPlayers("Miners"),
  },
  Michigan: {
    name: "Michigan",
    mascot: "Wolverines",
    grades: { qb: 90, rb: 84, te: 80, wr: 78, ol: 86, dl: 87, lb: 85, db: 83, s: 82, k: 78, p: 76, st: 80, coaching: 84 },
    players: mascotPlayers("Wolverines", "Bryce Underwood"),
  },
  "New Mexico": {
    name: "New Mexico",
    mascot: "Lobos",
    grades: { qb: 56, rb: 58, te: 52, wr: 57, ol: 52, dl: 53, lb: 55, db: 54, s: 53, k: 62, p: 60, st: 56, coaching: 62 },
    players: mascotPlayers("Lobos"),
  },
  Georgia: {
    name: "Georgia",
    mascot: "Bulldogs",
    grades: { qb: 87, rb: 86, te: 84, wr: 84, ol: 89, dl: 90, lb: 89, db: 88, s: 87, k: 82, p: 80, st: 84, coaching: 92 },
    players: mascotPlayers("Bulldogs", "Gunner Stockton"),
  },
  Texas: {
    name: "Texas",
    mascot: "Longhorns",
    grades: { qb: 91, rb: 83, te: 80, wr: 87, ol: 85, dl: 88, lb: 84, db: 88, s: 86, k: 80, p: 78, st: 82, coaching: 88 },
    players: mascotPlayers("Longhorns", "Arch Manning"),
  },
  Kentucky: {
    name: "Kentucky",
    mascot: "Wildcats",
    grades: { qb: 64, rb: 70, te: 66, wr: 65, ol: 68, dl: 72, lb: 71, db: 68, s: 67, k: 74, p: 76, st: 70, coaching: 72 },
    players: mascotPlayers("Wildcats"),
  },
  "Mississippi State": {
    name: "Mississippi State",
    mascot: "Bulldogs",
    grades: { qb: 72, rb: 71, te: 66, wr: 73, ol: 68, dl: 70, lb: 69, db: 68, s: 67, k: 72, p: 70, st: 69, coaching: 71 },
    players: mascotPlayers("Bulldogs"),
  },
  "South Carolina": {
    name: "South Carolina",
    mascot: "Gamecocks",
    grades: { qb: 74, rb: 72, te: 68, wr: 74, ol: 70, dl: 78, lb: 74, db: 73, s: 72, k: 74, p: 72, st: 74, coaching: 75 },
    players: mascotPlayers("Gamecocks"),
  },
  Florida: {
    name: "Florida",
    mascot: "Gators",
    grades: { qb: 86, rb: 78, te: 76, wr: 80, ol: 78, dl: 82, lb: 78, db: 79, s: 77, k: 76, p: 74, st: 77, coaching: 74 },
    players: mascotPlayers("Gators", "DJ Lagway"),
  },
  "Ole Miss": {
    name: "Ole Miss",
    mascot: "Rebels",
    grades: { qb: 84, rb: 80, te: 74, wr: 84, ol: 79, dl: 80, lb: 76, db: 78, s: 76, k: 76, p: 74, st: 76, coaching: 84 },
    players: mascotPlayers("Rebels", "Austin Simmons"),
  },
  "Texas A&M": {
    name: "Texas A&M",
    mascot: "Aggies",
    grades: { qb: 85, rb: 82, te: 78, wr: 82, ol: 84, dl: 85, lb: 82, db: 81, s: 80, k: 78, p: 76, st: 79, coaching: 82 },
    players: mascotPlayers("Aggies", "Marcel Reed"),
  },
  Missouri: {
    name: "Missouri",
    mascot: "Tigers",
    grades: { qb: 74, rb: 78, te: 70, wr: 75, ol: 74, dl: 76, lb: 74, db: 74, s: 73, k: 76, p: 74, st: 74, coaching: 78 },
    players: mascotPlayers("Tigers", "Matt Zollers"),
  },
};

export function getOpponentTeam(opponent: string): GameulatorTeam {
  return (
    OPPONENT_TEAMS[opponent] ?? {
      name: opponent,
      mascot: opponent,
      grades: { qb: 70, rb: 70, te: 70, wr: 70, ol: 70, dl: 70, lb: 70, db: 70, s: 70, k: 70, p: 70, st: 70, coaching: 70 },
      players: mascotPlayers(opponent),
    }
  );
}
