/**
 * 2026 WAR MAP — Boomer Ball master season preview.
 * Fan projections compiled from roster depth, CFB27 ratings, Game-u-lator
 * unit grades, and 2026 SOS tiers. Entertainment only — not official.
 */

export const WAR_MAP_SEASON = 2026;
export const WAR_MAP_TITLE = "2026 WAR MAP";
export const WAR_MAP_SUBTITLE = "Oklahoma Sooners Super Master Season Preview";
export const WAR_MAP_DISCLAIMER =
  "Fan projections by Boomer Ball. Not affiliated with or endorsed by the University of Oklahoma. For entertainment only.";

export type WarMapUnit = {
  key: string;
  label: string;
  grade: number;
  letter: string;
  strength: string;
  starters: string[];
  depth: string[];
};

export type WarMapGameProjection = {
  date: string;
  opponent: string;
  venue: "H" | "A" | "N";
  conference: boolean;
  pick: "W" | "L";
  score: string;
  note: string;
};

export type WarMapProspect = {
  name: string;
  pos: string;
  round: string;
  note: string;
};

export type WarMapFreshman = {
  name: string;
  pos: string;
  note: string;
};

/** Season headline projection */
export const warMapHeadline = {
  record: "9–3",
  secRecord: "6–2",
  bowl: "Sugar Bowl",
  bowlDetail: "New Year’s Six — CFP bubble watch",
  playoffOdds: "Outside looking in (at-large bubble)",
  spPlusRank: "Top 12 SP+",
  identity: "Venables Yr 5 · Mateer encore · DL havoc",
};

export const warMapUnitGrades: WarMapUnit[] = [
  {
    key: "qb",
    label: "QB",
    grade: 88,
    letter: "A−",
    strength: "Mateer dual-threat ceiling; Bentley as heir.",
    starters: ["#10 John Mateer"],
    depth: ["#8 Bowe Bentley", "#16 Whitt Newbauer"],
  },
  {
    key: "rb",
    label: "RB",
    grade: 82,
    letter: "B",
    strength: "Committee punch — Blaylock speed, Robinson power.",
    starters: ["#6 Tory Blaylock", "#24 Xavier Robinson"],
    depth: ["#9 Lloyd Avant", "#28 DeZephen Walker"],
  },
  {
    key: "wr",
    label: "WR",
    grade: 80,
    letter: "B−",
    strength: "Sategna/Harris proven; Livingstone the X-factor.",
    starters: ["#1 Isaiah Sategna III", "#11 Trell Harris", "#3 Parker Livingstone"],
    depth: ["#14 Elijah Thomas", "#5 Jer'Michael Carter"],
  },
  {
    key: "te",
    label: "TE",
    grade: 74,
    letter: "C+",
    strength: "Hansen/Beers are reliable SEC matchup weapons.",
    starters: ["#89 Hayden Hansen", "#81 Rocky Beers"],
    depth: ["#88 Jack Van Dorselaer"],
  },
  {
    key: "ol",
    label: "OL",
    grade: 78,
    letter: "B−",
    strength: "Fasusi anchors LT; interior still ascending.",
    starters: ["#56 Fasusi", "#55 Pierre-Louis", "#69 Maikkula", "#70 Fodje", "#76 E. Harris"],
    depth: ["#60 Caleb Nitta"],
  },
  {
    key: "dl",
    label: "DL",
    grade: 88,
    letter: "A−",
    strength: "Stone is a wrecking ball; edge rotation elite.",
    starters: ["#0 David Stone", "#65 Jayden Jackson", "#44 Taylor Wein", "#34 Adebawore"],
    depth: ["#8 Bishop Thomas", "#16 Danny Okoye"],
  },
  {
    key: "lb",
    label: "LB",
    grade: 84,
    letter: "B",
    strength: "Lewis is the defense’s heartbeat; Heinecke covers.",
    starters: ["#10 Kip Lewis", "#38 Owen Heinecke", "#18 Cole Sullivan"],
    depth: ["#7 Taylor Heim"],
  },
  {
    key: "db",
    label: "DB",
    grade: 87,
    letter: "A−",
    strength: "Bowen brothers + Guillory = lockdown secondary.",
    starters: ["#23 Eli Bowen", "#22 Peyton Bowen", "#4 Courtland Guillory", "#24 Jacobe Johnson"],
    depth: ["#3 Reggie Powers III", "#25 Michael Boganowski"],
  },
  {
    key: "st",
    label: "ST",
    grade: 83,
    letter: "B",
    strength: "Sandell is automatic; coverage units solid.",
    starters: ["#29 Tate Sandell (K)", "#43 Grayson Miller (P)"],
    depth: ["#50 Seth Freeman (LS)"],
  },
  {
    key: "coach",
    label: "HC",
    grade: 85,
    letter: "B+",
    strength: "Venables Yr 5 after 10–3 CFP run; Arbuckle Yr 2.",
    starters: ["Brent Venables", "Ben Arbuckle (OC)", "Todd Bates / Jay Valai (DC)"],
    depth: [],
  },
];

export const warMapComposite = {
  offense: { score: 82, letter: "B" },
  defense: { score: 86, letter: "A−" },
  specialTeams: { score: 83, letter: "B" },
  overall: { score: 84, letter: "B" },
};

/** Projected scores — seeded from Game-u-lator expected points + SOS tiers */
export const warMapSchedule: WarMapGameProjection[] = [
  {
    date: "Sep 5",
    opponent: "UTEP",
    venue: "H",
    conference: false,
    pick: "W",
    score: "49–10",
    note: "Tune-up",
  },
  {
    date: "Sep 12",
    opponent: "Michigan",
    venue: "A",
    conference: false,
    pick: "L",
    score: "27–31",
    note: "Big House",
  },
  {
    date: "Sep 19",
    opponent: "New Mexico",
    venue: "H",
    conference: false,
    pick: "W",
    score: "45–13",
    note: "Home pad",
  },
  {
    date: "Sep 26",
    opponent: "Georgia",
    venue: "A",
    conference: true,
    pick: "L",
    score: "17–34",
    note: "SEC road",
  },
  {
    date: "Oct 10",
    opponent: "Texas",
    venue: "N",
    conference: true,
    pick: "L",
    score: "27–30",
    note: "Red River",
  },
  {
    date: "Oct 17",
    opponent: "Kentucky",
    venue: "H",
    conference: true,
    pick: "W",
    score: "38–17",
    note: "Must-win",
  },
  {
    date: "Oct 24",
    opponent: "Mississippi St",
    venue: "A",
    conference: true,
    pick: "W",
    score: "31–24",
    note: "Cowbell",
  },
  {
    date: "Oct 31",
    opponent: "South Carolina",
    venue: "H",
    conference: true,
    pick: "W",
    score: "34–20",
    note: "Physical",
  },
  {
    date: "Nov 7",
    opponent: "Florida",
    venue: "A",
    conference: true,
    pick: "W",
    score: "31–28",
    note: "Swamp steal",
  },
  {
    date: "Nov 14",
    opponent: "Ole Miss",
    venue: "H",
    conference: true,
    pick: "W",
    score: "35–28",
    note: "Shootout",
  },
  {
    date: "Nov 21",
    opponent: "Texas A&M",
    venue: "H",
    conference: true,
    pick: "W",
    score: "31–27",
    note: "Playoff lean",
  },
  {
    date: "Nov 28",
    opponent: "Missouri",
    venue: "A",
    conference: true,
    pick: "W",
    score: "28–21",
    note: "Finale",
  },
];

export const warMapDraftProspects: WarMapProspect[] = [
  {
    name: "David Stone",
    pos: "DT",
    round: "1–2",
    note: "94 OVR interior force — early-round disruptor",
  },
  {
    name: "Kip Lewis",
    pos: "LB",
    round: "1–2",
    note: "MIKE general with elite awareness",
  },
  {
    name: "Eli Bowen",
    pos: "CB",
    round: "2",
    note: "Shutdown corner speed / COD profile",
  },
  {
    name: "John Mateer",
    pos: "QB",
    round: "2–3",
    note: "Dual-threat production in Arbuckle’s system",
  },
  {
    name: "Isaiah Sategna III",
    pos: "WR",
    round: "2–3",
    note: "Separation + yards-after-catch weapon",
  },
  {
    name: "Peyton Bowen",
    pos: "S",
    round: "3–4",
    note: "Physical SS; box & deep range",
  },
  {
    name: "Adepoju Adebawore",
    pos: "EDGE",
    round: "4–5",
    note: "Pass-rush juice off the edge",
  },
  {
    name: "Hayden Hansen",
    pos: "TE",
    round: "5–6",
    note: "Inline blocker who wins seams",
  },
];

export const warMapFreshmen: WarMapFreshman[] = [
  {
    name: "Bowe Bentley",
    pos: "QB",
    note: "True freshman heir — package snaps + future starter",
  },
  {
    name: "DeZephen Walker",
    pos: "RB",
    note: "Explosive change-of-pace behind the committee",
  },
  {
    name: "Jahsiear Rogers",
    pos: "WR",
    note: "Early contributor potential in Emmett Jones room",
  },
  {
    name: "Daniel Odom",
    pos: "WR",
    note: "Size/speed developmental X",
  },
  {
    name: "Markel Ford",
    pos: "DB",
    note: "Nickel/boundary battle from day one",
  },
  {
    name: "Derrick Johnson II",
    pos: "DB",
    note: "Secondary depth with special-teams path",
  },
  {
    name: "Jake Kreul",
    pos: "DL",
    note: "Rotational DT body for Stone’s unit",
  },
  {
    name: "Noah Best",
    pos: "OL",
    note: "OL developmental piece — year-one practice hero",
  },
  {
    name: "Jonathan Hatton Jr.",
    pos: "RB",
    note: "Fresh legs in a loaded backfield",
  },
];

export const warMapKeys = [
  "Win the Florida / Ole Miss / A&M stretch — that’s the CFP door.",
  "Stone & Lewis must stay healthy; DL havoc is the identity.",
  "Mateer’s year-two chemistry with Sategna/Harris decides Sept–Oct.",
  "Avoid the Michigan hangover before Georgia week.",
];

export const warMapStrengthsWeaknesses = {
  strengths: [
    "Defensive line depth & havoc",
    "Secondary star power (Bowens)",
    "QB experience in SEC",
    "Kicking reliability (Sandell)",
  ],
  weaknesses: [
    "OL consistency vs. UGA/Texas fronts",
    "TE explosiveness beyond Hansen/Beers",
    "Road environment (Athens, Ann Arbor, Gainesville)",
    "Thin margin after non-con loss",
  ],
};
