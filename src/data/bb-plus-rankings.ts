/**
 * BB+ Rankings — Boomer Ball’s proprietary team ranking system.
 *
 * Built from the same advanced offense/defense DNA as The Locker Room
 * (EPA/play, success rate, explosives, havoc, pressure, scoring & yardage
 * efficiency). Press / preseason edition for the 2026 regular season.
 *
 * Fan analytics estimates — not official SP+, FEI, or FPI.
 */

export const BB_PLUS_EDITION = "2026 Press";
export const BB_PLUS_SEASON = 2026;
export const BB_PLUS_UPDATED = "August 4, 2026";
export const BB_PLUS_TITLE = "BB+ Rankings";
export const BB_PLUS_DISCLAIMER =
  "BB+ is Boomer Ball’s proprietary ranking model. Inputs are fan estimates compiled from returning production, roster talent, and advanced efficiency projections. Not affiliated with or endorsed by the University of Oklahoma or any conference.";

export type BbPlusConference =
  | "SEC"
  | "Big Ten"
  | "ACC"
  | "Big 12"
  | "Independent";

/** Raw advanced inputs feeding the BB+ engine (per team). */
export type BbPlusTeamInput = {
  id: string;
  school: string;
  mascot: string;
  conference: BbPlusConference;
  /** Short note for the press board */
  note: string;
  offense: {
    /** Expected points added per play */
    epaPerPlay: number;
    /** % of successful downs */
    successRate: number;
    /** % of explosive plays (10+ rush / 20+ pass) */
    explosiveRate: number;
    pointsPerGame: number;
    yardsPerPlay: number;
    thirdDownPct: number;
    redZoneTdPct: number;
  };
  defense: {
    /** % of plays with TFL, FF, or INT */
    havocRate: number;
    /** % of dropbacks pressured */
    pressureRate: number;
    pointsAllowedPerGame: number;
    yardsPerPlayAllowed: number;
    thirdDownStopPct: number;
    redZoneTdPctAllowed: number;
  };
};

/**
 * Top-of-board universe for the 2026 press edition.
 * Metrics are Boomer Ball projections entering Week 0 / media days.
 */
export const bbPlusTeamInputs: BbPlusTeamInput[] = [
  {
    id: "ohio-state",
    school: "Ohio State",
    mascot: "Buckeyes",
    conference: "Big Ten",
    note: "Returning skill ceiling + Day-1 edge talent.",
    offense: {
      epaPerPlay: 0.28,
      successRate: 49.2,
      explosiveRate: 15.1,
      pointsPerGame: 38.4,
      yardsPerPlay: 7.1,
      thirdDownPct: 48.5,
      redZoneTdPct: 72.0,
    },
    defense: {
      havocRate: 19.8,
      pressureRate: 32.4,
      pointsAllowedPerGame: 15.8,
      yardsPerPlayAllowed: 4.6,
      thirdDownStopPct: 70.2,
      redZoneTdPctAllowed: 48.0,
    },
  },
  {
    id: "georgia",
    school: "Georgia",
    mascot: "Bulldogs",
    conference: "SEC",
    note: "Still the SEC’s most complete two-way roster.",
    offense: {
      epaPerPlay: 0.22,
      successRate: 47.8,
      explosiveRate: 13.4,
      pointsPerGame: 34.6,
      yardsPerPlay: 6.5,
      thirdDownPct: 46.0,
      redZoneTdPct: 68.5,
    },
    defense: {
      havocRate: 20.4,
      pressureRate: 31.0,
      pointsAllowedPerGame: 14.2,
      yardsPerPlayAllowed: 4.4,
      thirdDownStopPct: 72.5,
      redZoneTdPctAllowed: 44.0,
    },
  },
  {
    id: "texas",
    school: "Texas",
    mascot: "Longhorns",
    conference: "SEC",
    note: "Explosive offense; secondary still the swing unit.",
    offense: {
      epaPerPlay: 0.26,
      successRate: 48.5,
      explosiveRate: 14.8,
      pointsPerGame: 36.8,
      yardsPerPlay: 6.9,
      thirdDownPct: 47.2,
      redZoneTdPct: 70.0,
    },
    defense: {
      havocRate: 18.6,
      pressureRate: 29.5,
      pointsAllowedPerGame: 17.4,
      yardsPerPlayAllowed: 4.9,
      thirdDownStopPct: 67.8,
      redZoneTdPctAllowed: 50.5,
    },
  },
  {
    id: "penn-state",
    school: "Penn State",
    mascot: "Nittany Lions",
    conference: "Big Ten",
    note: "Physical identity travels; QB continuity is the lever.",
    offense: {
      epaPerPlay: 0.2,
      successRate: 46.4,
      explosiveRate: 12.9,
      pointsPerGame: 33.2,
      yardsPerPlay: 6.3,
      thirdDownPct: 44.8,
      redZoneTdPct: 66.0,
    },
    defense: {
      havocRate: 19.2,
      pressureRate: 30.8,
      pointsAllowedPerGame: 15.1,
      yardsPerPlayAllowed: 4.5,
      thirdDownStopPct: 71.0,
      redZoneTdPctAllowed: 46.5,
    },
  },
  {
    id: "notre-dame",
    school: "Notre Dame",
    mascot: "Fighting Irish",
    conference: "Independent",
    note: "Independent path + trench play keeps them playoff-relevant.",
    offense: {
      epaPerPlay: 0.19,
      successRate: 45.9,
      explosiveRate: 12.6,
      pointsPerGame: 32.4,
      yardsPerPlay: 6.2,
      thirdDownPct: 44.0,
      redZoneTdPct: 65.0,
    },
    defense: {
      havocRate: 18.0,
      pressureRate: 28.6,
      pointsAllowedPerGame: 16.8,
      yardsPerPlayAllowed: 4.8,
      thirdDownStopPct: 68.4,
      redZoneTdPctAllowed: 49.0,
    },
  },
  {
    id: "oregon",
    school: "Oregon",
    mascot: "Ducks",
    conference: "Big Ten",
    note: "Tempo offense still grades elite; Big Ten slate is the test.",
    offense: {
      epaPerPlay: 0.25,
      successRate: 48.0,
      explosiveRate: 14.2,
      pointsPerGame: 37.1,
      yardsPerPlay: 6.8,
      thirdDownPct: 46.8,
      redZoneTdPct: 69.0,
    },
    defense: {
      havocRate: 17.4,
      pressureRate: 27.2,
      pointsAllowedPerGame: 18.6,
      yardsPerPlayAllowed: 5.1,
      thirdDownStopPct: 65.5,
      redZoneTdPctAllowed: 52.0,
    },
  },
  {
    id: "alabama",
    school: "Alabama",
    mascot: "Crimson Tide",
    conference: "SEC",
    note: "Talent density remains; consistency is the DeBoer question.",
    offense: {
      epaPerPlay: 0.18,
      successRate: 45.2,
      explosiveRate: 13.0,
      pointsPerGame: 31.8,
      yardsPerPlay: 6.1,
      thirdDownPct: 43.5,
      redZoneTdPct: 64.0,
    },
    defense: {
      havocRate: 18.8,
      pressureRate: 29.0,
      pointsAllowedPerGame: 16.2,
      yardsPerPlayAllowed: 4.7,
      thirdDownStopPct: 69.0,
      redZoneTdPctAllowed: 47.5,
    },
  },
  {
    id: "ole-miss",
    school: "Ole Miss",
    mascot: "Rebels",
    conference: "SEC",
    note: "Scoring pace grades top-five; havoc defense is catching up.",
    offense: {
      epaPerPlay: 0.24,
      successRate: 47.1,
      explosiveRate: 14.5,
      pointsPerGame: 36.2,
      yardsPerPlay: 6.7,
      thirdDownPct: 45.5,
      redZoneTdPct: 67.5,
    },
    defense: {
      havocRate: 16.8,
      pressureRate: 26.4,
      pointsAllowedPerGame: 19.8,
      yardsPerPlayAllowed: 5.3,
      thirdDownStopPct: 63.8,
      redZoneTdPctAllowed: 54.0,
    },
  },
  {
    id: "michigan",
    school: "Michigan",
    mascot: "Wolverines",
    conference: "Big Ten",
    note: "Underwood upside + trench DNA; explosives still developing.",
    offense: {
      epaPerPlay: 0.17,
      successRate: 44.6,
      explosiveRate: 11.8,
      pointsPerGame: 30.5,
      yardsPerPlay: 5.9,
      thirdDownPct: 42.8,
      redZoneTdPct: 62.0,
    },
    defense: {
      havocRate: 18.4,
      pressureRate: 28.8,
      pointsAllowedPerGame: 16.0,
      yardsPerPlayAllowed: 4.6,
      thirdDownStopPct: 70.0,
      redZoneTdPctAllowed: 46.0,
    },
  },
  {
    id: "oklahoma",
    school: "Oklahoma",
    mascot: "Sooners",
    conference: "SEC",
    note: "Venables Yr 5 havoc ceiling; Mateer encore drives the offense.",
    offense: {
      epaPerPlay: 0.12,
      successRate: 44.8,
      explosiveRate: 12.4,
      pointsPerGame: 26.2,
      yardsPerPlay: 5.4,
      thirdDownPct: 38.6,
      redZoneTdPct: 71.4,
    },
    defense: {
      havocRate: 19.6,
      pressureRate: 28.0,
      pointsAllowedPerGame: 15.5,
      yardsPerPlayAllowed: 4.7,
      thirdDownStopPct: 72.0,
      redZoneTdPctAllowed: 41.9,
    },
  },
  {
    id: "texas-am",
    school: "Texas A&M",
    mascot: "Aggies",
    conference: "SEC",
    note: "Roster talent is top-shelf; finishing drives is the grade-up.",
    offense: {
      epaPerPlay: 0.16,
      successRate: 44.2,
      explosiveRate: 12.2,
      pointsPerGame: 30.0,
      yardsPerPlay: 5.8,
      thirdDownPct: 42.0,
      redZoneTdPct: 61.5,
    },
    defense: {
      havocRate: 17.6,
      pressureRate: 27.8,
      pointsAllowedPerGame: 17.8,
      yardsPerPlayAllowed: 5.0,
      thirdDownStopPct: 66.2,
      redZoneTdPctAllowed: 51.0,
    },
  },
  {
    id: "miami",
    school: "Miami",
    mascot: "Hurricanes",
    conference: "ACC",
    note: "ACC’s clearest playoff profile — offense first, front seven next.",
    offense: {
      epaPerPlay: 0.21,
      successRate: 46.8,
      explosiveRate: 13.8,
      pointsPerGame: 34.0,
      yardsPerPlay: 6.4,
      thirdDownPct: 45.0,
      redZoneTdPct: 66.5,
    },
    defense: {
      havocRate: 16.2,
      pressureRate: 25.8,
      pointsAllowedPerGame: 20.4,
      yardsPerPlayAllowed: 5.4,
      thirdDownStopPct: 62.5,
      redZoneTdPctAllowed: 55.0,
    },
  },
];
