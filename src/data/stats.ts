import type {
  DefenseStat,
  PassingStat,
  ReceivingStat,
  RushingStat,
  TeamStats,
} from "./types";

/** Active season team snapshot — Sources: soonersports.com, ESPN */
export const teamStats2026: TeamStats = {
  record: "1-0",
  conferenceRecord: "0-0 SEC",
  pointsPerGame: 51,
  pointsAllowedPerGame: 0,
  totalYardsPerGame: 401,
  rushingYardsPerGame: 170,
  passingYardsPerGame: 231,
  sacks: 0,
  interceptions: 0,
  tackles: 0,
};

/** Week 1 situational totals that are not part of the shared TeamStats shape */
export const week1TeamExtras2026 = {
  yardsAllowed: 198,
  firstDowns: 18,
  opponentFirstDowns: 10,
  timeOfPossession: "30:32",
  thirdDownConversions: 6,
  opponentThirdDownConversions: 2,
  rushingAttempts: 39,
  gamesPlayed: 1,
};

export const passingStats2026: PassingStat[] = [
  {
    player: "John Mateer",
    number: 10,
    gp: 1,
    comp: 11,
    att: 17,
    yards: 225,
    td: 3,
    int: 0,
    rating: 234.1,
    pct: 64.7,
  },
  {
    player: "Whitt Newbauer",
    number: 16,
    gp: 1,
    comp: 1,
    att: 1,
    yards: 6,
    td: 0,
    int: 0,
    rating: 150.4,
    pct: 100,
  },
];

/** Confirmed Week 1 scoring receptions — full receiving table expands with official cumulatives */
export const receivingStats2026: ReceivingStat[] = [
  { player: "Trell Harris", number: 11, rec: 1, yards: 48, avg: 48.0, td: 1, long: 48 },
  { player: "Rocky Beers", number: 81, rec: 1, yards: 40, avg: 40.0, td: 1, long: 40 },
  { player: "Isaiah Sategna III", number: 5, rec: 1, yards: 34, avg: 34.0, td: 1, long: 34 },
];

export const STATS_SOURCE_SOONERS_2026 =
  "https://soonersports.com/sports/football/stats/2026";
export const STATS_SOURCE_UTEP_RECAP =
  "https://soonersports.com/news/2026/9/4/football-sooners-defeat-utep-to-open-the-season";

/** Cumulative 2025 season archive — Sources: soonersports.com, ESPN */
export const teamStats2025: TeamStats = {
  record: "10-3",
  conferenceRecord: "6-2 SEC",
  pointsPerGame: 26.23,
  pointsAllowedPerGame: 15.46,
  totalYardsPerGame: 354.3,
  rushingYardsPerGame: 118.5,
  passingYardsPerGame: 235.8,
  sacks: 45,
  interceptions: 9,
  tackles: 856,
};

export const passingStats2025: PassingStat[] = [
  {
    player: "John Mateer",
    number: 10,
    gp: 12,
    comp: 247,
    att: 397,
    yards: 2885,
    td: 14,
    int: 11,
    rating: 129.35,
    pct: 62.2,
  },
  {
    player: "Michael Hawkins Jr.",
    number: 3,
    gp: 2,
    comp: 15,
    att: 27,
    yards: 167,
    td: 3,
    int: 0,
    rating: 144.18,
    pct: 55.6,
  },
  {
    player: "Javonnie Gibson",
    number: 11,
    gp: 9,
    comp: 1,
    att: 1,
    yards: 8,
    td: 0,
    int: 0,
    rating: 167.2,
    pct: 100,
  },
  {
    player: "Whitt Newbauer",
    number: 16,
    gp: 3,
    comp: 2,
    att: 4,
    yards: 6,
    td: 0,
    int: 0,
    rating: 62.6,
    pct: 50,
  },
];

export const rushingStats2025: RushingStat[] = [
  { player: "Tory Blaylock", number: 6, att: 120, yards: 480, avg: 4.0, td: 4, long: 25 },
  { player: "John Mateer", number: 10, att: 149, yards: 431, avg: 2.9, td: 8, long: 51 },
  { player: "Xavier Robinson", number: 21, att: 83, yards: 421, avg: 5.1, td: 4, long: 65 },
  { player: "Jaydn Ott", number: 0, att: 21, yards: 68, avg: 3.2, td: 0, long: 12 },
  { player: "Michael Hawkins Jr.", number: 3, att: 15, yards: 58, avg: 3.9, td: 1, long: 27 },
  { player: "Jovantae Barnes", number: 2, att: 19, yards: 45, avg: 2.4, td: 1, long: 10 },
  { player: "Isaiah Sategna III", number: 5, att: 4, yards: 24, avg: 6.0, td: 0, long: 21 },
];

export const receivingStats2025: ReceivingStat[] = [
  { player: "Isaiah Sategna III", number: 5, rec: 67, yards: 965, avg: 14.4, td: 8, long: 87 },
  { player: "Deion Burks", number: 4, rec: 57, yards: 620, avg: 10.9, td: 4, long: 45 },
  { player: "Jaren Kanak", number: 12, rec: 44, yards: 533, avg: 12.1, td: 0, long: 48 },
  { player: "Keontez Lewis", number: 9, rec: 21, yards: 243, avg: 11.6, td: 2, long: 28 },
  { player: "Javonnie Gibson", number: 11, rec: 18, yards: 199, avg: 11.1, td: 1, long: 38 },
  { player: "Xavier Robinson", number: 21, rec: 15, yards: 106, avg: 7.1, td: 1, long: 21 },
  { player: "Jer'Michael Carter", number: 84, rec: 9, yards: 101, avg: 11.2, td: 0, long: 22 },
  { player: "Tory Blaylock", number: 6, rec: 13, yards: 77, avg: 5.9, td: 0, long: 16 },
];

export const defenseStats2025: DefenseStat[] = [
  { player: "Kip Lewis", number: 10, position: "LB", solo: 38, ast: 38, tot: 76, sacks: 4, int: 0, pd: 4 },
  { player: "Owen Heinecke", number: 38, position: "LB", solo: 34, ast: 40, tot: 74, sacks: 3, int: 0, pd: 4 },
  { player: "Robert Spears-Jennings", number: 3, position: "S", solo: 33, ast: 26, tot: 59, sacks: 0, int: 1, pd: 2 },
  { player: "Kendal Daniels", number: 5, position: "EDGE", solo: 28, ast: 25, tot: 53, sacks: 0, int: 0, pd: 3 },
  { player: "Sammy Omosigho", number: 7, position: "LB", solo: 28, ast: 22, tot: 50, sacks: 2, int: 0, pd: 3 },
  { player: "Peyton Bowen", number: 23, position: "DB", solo: 21, ast: 25, tot: 46, sacks: 0, int: 2, pd: 7 },
  { player: "David Stone", number: 0, position: "DL", solo: 16, ast: 27, tot: 43, sacks: 1.5, int: 0, pd: 1 },
  { player: "Courtland Guillory", number: 4, position: "DB", solo: 28, ast: 13, tot: 41, sacks: 0, int: 0, pd: 7 },
  { player: "Taylor Wein", number: 44, position: "DL", solo: 22, ast: 17, tot: 39, sacks: 7, int: 1, pd: 1 },
  { player: "Gracen Halton", number: 56, position: "DT", solo: 11, ast: 22, tot: 33, sacks: 3.5, int: 0, pd: 2 },
  { player: "Kobie McKinzie", number: 11, position: "LB", solo: 12, ast: 20, tot: 32, sacks: 1, int: 0, pd: 0 },
  { player: "Damonic Williams", number: 52, position: "DT", solo: 18, ast: 8, tot: 26, sacks: 6.5, int: 0, pd: 1 },
  { player: "Eli Bowen", number: 27, position: "DB", solo: 19, ast: 5, tot: 24, sacks: 0, int: 2, pd: 3 },
];

export const STATS_SOURCE_SOONERS_2025 =
  "https://soonersports.com/sports/football/stats/2025";
/** Current-season official stats hub */
export const STATS_SOURCE_SOONERS = STATS_SOURCE_SOONERS_2026;
export const STATS_SOURCE_ESPN =
  "https://www.espn.com/college-football/team/stats/_/id/201";
