import type {
  DefenseStat,
  PassingStat,
  ReceivingStat,
  RushingStat,
  TeamStats,
} from "./types";

/** Active season team snapshot through Georgia (4 games) — Sources: soonersports.com, ESPN */
export const teamStats2026: TeamStats = {
  record: "2-2",
  conferenceRecord: "0-1 SEC",
  pointsPerGame: 22.0,
  pointsAllowedPerGame: 16.0,
  totalYardsPerGame: 321.2,
  rushingYardsPerGame: 99.0,
  passingYardsPerGame: 222.3,
  sacks: 13,
  interceptions: 1,
  tackles: 246,
};

/** Situational totals / per-game averages that are not part of the shared TeamStats shape */
export const teamExtras2026 = {
  yardsAllowed: 238.0,
  firstDowns: 16.5,
  opponentFirstDowns: 12.0,
  timeOfPossession: "29:38",
  thirdDownConversions: 18,
  opponentThirdDownConversions: 12,
  rushingAttempts: 135,
  gamesPlayed: 4,
};

export const passingStats2026: PassingStat[] = [
  {
    player: "John Mateer",
    number: 10,
    gp: 4,
    comp: 72,
    att: 109,
    yards: 883,
    td: 8,
    int: 4,
    rating: 151.0,
    pct: 66.1,
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
  {
    player: "Bowe Bentley",
    number: 8,
    gp: 1,
    comp: 0,
    att: 1,
    yards: 0,
    td: 0,
    int: 0,
    rating: 0.0,
    pct: 0,
  },
  {
    player: "Team",
    number: 0,
    gp: 4,
    comp: 0,
    att: 1,
    yards: 0,
    td: 0,
    int: 0,
    rating: 0.0,
    pct: 0,
  },
];

/** Cumulative receiving through Georgia. Source: soonersports.com, cross-checked with ESPN. */
export const receivingStats2026: ReceivingStat[] = [
  { player: "Isaiah Sategna III", number: 1, rec: 20, yards: 267, avg: 13.3, td: 2, long: 53 },
  { player: "Rocky Beers", number: 81, rec: 18, yards: 255, avg: 14.2, td: 2, long: 43 },
  { player: "Trell Harris", number: 11, rec: 6, yards: 104, avg: 17.3, td: 1, long: 48 },
  { player: "Hayden Hansen", number: 89, rec: 4, yards: 64, avg: 16.0, td: 1, long: 29 },
  { player: "Parker Livingstone", number: 3, rec: 6, yards: 51, avg: 8.5, td: 0, long: 17 },
  { player: "Mackenzie Alleyne", number: 17, rec: 4, yards: 40, avg: 10.0, td: 1, long: 22 },
  { player: "Elijah Thomas", number: 14, rec: 4, yards: 38, avg: 9.5, td: 0, long: 24 },
  { player: "Lloyd Avant", number: 9, rec: 6, yards: 31, avg: 5.2, td: 0, long: 9 },
  { player: "Xavier Robinson", number: 21, rec: 3, yards: 18, avg: 6.0, td: 0, long: 8 },
  { player: "Manny Choice", number: 0, rec: 1, yards: 14, avg: 14.0, td: 1, long: 14 },
  { player: "Jonathan Hatton Jr.", number: 20, rec: 1, yards: 7, avg: 7.0, td: 0, long: 7 },
];

/** Cumulative rushing through Georgia. Source: soonersports.com. Team rushes are two kneel-downs. */
export const rushingStats2026: RushingStat[] = [
  { player: "Lloyd Avant", number: 9, att: 42, yards: 164, avg: 3.9, td: 1, long: 13 },
  { player: "John Mateer", number: 10, att: 41, yards: 76, avg: 1.9, td: 0, long: 22 },
  { player: "Xavier Robinson", number: 21, att: 13, yards: 50, avg: 3.8, td: 0, long: 11 },
  { player: "Jonathan Hatton Jr.", number: 20, att: 14, yards: 43, avg: 3.1, td: 0, long: 21 },
  { player: "Ben McCreary", number: 23, att: 6, yards: 40, avg: 6.7, td: 0, long: 24 },
  { player: "Isaiah Sategna III", number: 1, att: 4, yards: 17, avg: 4.2, td: 0, long: 7 },
  { player: "Tory Blaylock", number: 6, att: 8, yards: 15, avg: 1.9, td: 0, long: 5 },
  { player: "Whitt Newbauer", number: 16, att: 2, yards: 3, avg: 1.5, td: 1, long: 3 },
  { player: "Bowe Bentley", number: 8, att: 1, yards: -2, avg: -2.0, td: 0, long: 0 },
  { player: "Team", number: 0, att: 2, yards: -2, avg: -1.0, td: 0, long: 0 },
  { player: "Andy Bass", number: 25, att: 2, yards: -8, avg: -4.0, td: 0, long: 5 },
];

/** Cumulative defense through Georgia. Leaders plus every player with a sack. Source: soonersports.com. */
export const defenseStats2026: DefenseStat[] = [
  { player: "Owen Heinecke", number: 38, position: "LB", solo: 13, ast: 14, tot: 27, sacks: 1, int: 0, pd: 0 },
  { player: "Peyton Bowen", number: 22, position: "DB", solo: 8, ast: 9, tot: 17, sacks: 1, int: 0, pd: 4 },
  { player: "Reggie Powers III", number: 3, position: "DB", solo: 12, ast: 5, tot: 17, sacks: 2, int: 0, pd: 2 },
  { player: "Omarion Robinson", number: 2, position: "DB", solo: 10, ast: 7, tot: 17, sacks: 0, int: 1, pd: 0 },
  { player: "James Nesta", number: 47, position: "LB", solo: 7, ast: 9, tot: 16, sacks: 0, int: 0, pd: 1 },
  { player: "Jayden Jackson", number: 65, position: "DL", solo: 8, ast: 7, tot: 15, sacks: 0.5, int: 0, pd: 0 },
  { player: "Taylor Wein", number: 44, position: "DL", solo: 8, ast: 7, tot: 15, sacks: 1, int: 0, pd: 0 },
  { player: "David Stone", number: 0, position: "DL", solo: 8, ast: 6, tot: 14, sacks: 0.5, int: 0, pd: 0 },
  { player: "Eli Bowen", number: 23, position: "DB", solo: 8, ast: 4, tot: 12, sacks: 0, int: 0, pd: 2 },
  { player: "Adepoju Adebawore", number: 34, position: "DL", solo: 3, ast: 8, tot: 11, sacks: 2.5, int: 0, pd: 0 },
  { player: "Courtland Guillory", number: 4, position: "DB", solo: 6, ast: 4, tot: 10, sacks: 0, int: 0, pd: 2 },
  { player: "Wyatt Gilmore", number: 42, position: "DL", solo: 4, ast: 4, tot: 8, sacks: 0, int: 0, pd: 0 },
  { player: "Kip Lewis", number: 10, position: "LB", solo: 4, ast: 4, tot: 8, sacks: 1, int: 0, pd: 1 },
  { player: "Michael Boganowski", number: 25, position: "DB", solo: 4, ast: 2, tot: 6, sacks: 0, int: 0, pd: 0 },
  { player: "Bishop Thomas", number: 8, position: "DL", solo: 1, ast: 5, tot: 6, sacks: 0.5, int: 0, pd: 1 },
  { player: "Dane Bathurst", number: 30, position: "LB", solo: 2, ast: 3, tot: 5, sacks: 1, int: 0, pd: 0 },
  { player: "Jacobe Johnson", number: 24, position: "DB", solo: 2, ast: 2, tot: 4, sacks: 1, int: 0, pd: 1 },
  { player: "James Carrington", number: 58, position: "DL", solo: 1, ast: 2, tot: 3, sacks: 0.5, int: 0, pd: 0 },
  { player: "Jake Kreul", number: 98, position: "DL", solo: 1, ast: 1, tot: 2, sacks: 0.5, int: 0, pd: 0 },
];

export const STATS_SOURCE_SOONERS_2026 =
  "https://soonersports.com/sports/football/stats/2026";
export const STATS_SOURCE_UTEP_RECAP =
  "https://soonersports.com/news/2026/9/4/football-sooners-defeat-utep-to-open-the-season";
export const STATS_SOURCE_MICHIGAN_BOX =
  "https://mgoblue.com/sports/football/stats/2026/oklahoma/boxscore/30375";
export const STATS_SOURCE_MICHIGAN_NOTES =
  "https://soonersports.com/documents/2026/9/12/02_OU_Postgame_Notes_at_Michigan.pdf";
export const STATS_SOURCE_ESPN_MICHIGAN =
  "https://www.espn.com/college-football/recap?gameId=401856679";
export const STATS_SOURCE_NEW_MEXICO_BOX =
  "https://soonersports.com/sports/football/stats/2026/new-mexico/boxscore/11372";
export const STATS_SOURCE_NEW_MEXICO_RECAP =
  "https://soonersports.com/news/2026/9/19/football-defense-stifles-new-mexico";
export const STATS_SOURCE_ESPN_NEW_MEXICO =
  "https://www.espn.com/college-football/recap/_/gameId/401856690";
export const STATS_SOURCE_ESPN_2026 =
  "https://www.espn.com/college-football/team/stats/_/id/201/oklahoma-sooners";

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
