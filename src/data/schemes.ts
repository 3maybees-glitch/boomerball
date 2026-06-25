export interface FormationPlayer {
  label: string;
  x: number;
  y: number;
  emphasis?: boolean;
}

export interface Formation {
  id: string;
  name: string;
  personnel: string;
  description: string;
  whenUsed: string;
  players: FormationPlayer[];
}

export interface PersonnelGroup {
  code: string;
  label: string;
  usage: string;
  description: string;
}

export interface DefensivePackage {
  id: string;
  name: string;
  description: string;
  whenUsed: string;
  players: FormationPlayer[];
}

export const offensivePhilosophy = {
  coordinator: "Ben Arbuckle",
  scheme: "Modern Air Raid spread",
  summary:
    "Tempo-driven spread offense blending Air Raid passing principles with RPOs, pre-snap motion, and a commitment to making the run game credible in the SEC. Built around QB reads, rhythm throws, and formation variety.",
  pillars: [
    "Controlled tempo with pre-snap motion and shifts",
    "RPOs — especially run-heavy reads with a mobile QB",
    "Rhythm quick game + shot plays downfield",
    "11 personnel as the base; 10 and 12 for matchup tweaks",
    "Bunch/trips looks to stress leverage and create rub routes",
  ],
};

export const offensivePersonnel: PersonnelGroup[] = [
  {
    code: "11",
    label: "1 RB · 1 TE · 3 WR",
    usage: "~56%",
    description:
      "Bread-and-butter grouping. Spread the field, keep a TE for play-action and red-zone flexibility.",
  },
  {
    code: "10",
    label: "1 RB · 0 TE · 4 WR",
    usage: "Common",
    description:
      "Four-wide spread forces lighter boxes and opens QB run lanes and quick screens.",
  },
  {
    code: "12",
    label: "1 RB · 2 TE · 2 WR",
    usage: "Situational",
    description:
      "Heavier looks for short yardage, play-action, and red-zone condensed sets.",
  },
  {
    code: "21",
    label: "2 RB · 1 TE · 2 WR",
    usage: "Occasional",
    description: "Power run looks and goal-line packages when Arbuckle wants extra blockers.",
  },
];

export const offensiveFormations: Formation[] = [
  {
    id: "spread-2x2",
    name: "2×2 Spread (Gun)",
    personnel: "11 / 10",
    description:
      "Balanced four-receiver spread with the QB in shotgun. Foundation for quick game, RPOs, and screens.",
    whenUsed: "Base early-down look; establishes rhythm passing and QB run threat.",
    players: [
      { label: "X", x: 12, y: 22 },
      { label: "Z", x: 88, y: 22 },
      { label: "QB", x: 50, y: 48, emphasis: true },
      { label: "H", x: 28, y: 38 },
      { label: "Y", x: 72, y: 38 },
      { label: "RB", x: 50, y: 62 },
    ],
  },
  {
    id: "trips-3x1",
    name: "3×1 Trips",
    personnel: "11 / 10",
    description:
      "Three receivers to one side forces the defense to declare coverage to the trips side — opens levels concepts and RPO reads.",
    whenUsed: "When Arbuckle wants to isolate a matchup or run pick/rub routes to the field.",
    players: [
      { label: "X", x: 18, y: 20 },
      { label: "Z", x: 34, y: 16 },
      { label: "H", x: 50, y: 20 },
      { label: "QB", x: 50, y: 48, emphasis: true },
      { label: "Y", x: 78, y: 38 },
      { label: "RB", x: 50, y: 64 },
    ],
  },
  {
    id: "bunch",
    name: "Bunch / Compressed",
    personnel: "11",
    description:
      "Receivers stacked tight to one side for rub routes, pick concepts, and man-coverage stress. Signature Arbuckle tendency from Washington State.",
    whenUsed: "Red zone, third down, and any time OU needs a free release off the line.",
    players: [
      { label: "X", x: 22, y: 24 },
      { label: "Z", x: 30, y: 18 },
      { label: "H", x: 38, y: 24 },
      { label: "QB", x: 50, y: 48, emphasis: true },
      { label: "Y", x: 82, y: 36 },
      { label: "RB", x: 50, y: 64 },
    ],
  },
  {
    id: "empty",
    name: "Empty (5-Wide)",
    personnel: "10",
    description:
      "No back in the backfield — maximum spread. Obvious passing down, but also used to declare coverage and create QB run lanes.",
    whenUsed: "Obvious pass downs; occasional tempo change to spread the defense horizontally.",
    players: [
      { label: "X", x: 8, y: 20 },
      { label: "H", x: 28, y: 16 },
      { label: "Z", x: 72, y: 16 },
      { label: "Y", x: 92, y: 20 },
      { label: "QB", x: 50, y: 50, emphasis: true },
      { label: "S", x: 50, y: 24 },
    ],
  },
];

export const defensivePhilosophy = {
  coordinator: "Brent Venables",
  scheme: "Multiple 4-2-5 (big nickel)",
  summary:
    "Aggressive, multiple-front defense built on simulated pressures, heavy front-seven rotation, and the signature Cheetah hybrid. Venables calls plays and constantly shifts looks to hunt matchups.",
  pillars: [
    "4-2-5 base with a Cheetah hybrid LB/safety",
    "Simulated pressures and exotic blitz packages",
    "Heavy DL rotation — 97 TFLs in 2025",
    "Quarters / pattern-match coverage family",
    "Chameleon fronts: 4-3, 3-3-5, and odd looks by opponent",
  ],
};

export const cheetahRole = {
  title: "The Cheetah Position",
  description:
    "Venables' hybrid linebacker/safety — essentially a big nickel who can cover the slot, blitz from anywhere, and support the run without sacrificing as much as a small corner.",
  variants: [
    {
      type: "Big Cheetah",
      body: "Linebacker build",
      examples: "Kendal Daniels",
      role: "Run support, edge blitz, matchup vs. TEs and bigger slots.",
    },
    {
      type: "Little Cheetah",
      body: "Safety build",
      examples: "Kendel Dolby, Reggie Powers III",
      role: "Slot coverage, disguised blitz, middle-of-field flexibility.",
    },
  ],
};

export const defensivePackages: DefensivePackage[] = [
  {
    id: "base-425",
    name: "4-2-5 Base (Cheetah Nickel)",
    description:
      "Primary defensive structure in 2025. Four down linemen, two linebackers, five DBs including the Cheetah as a movable chess piece.",
    whenUsed: "Default vs. 11 personnel spread teams — most SEC snaps.",
    players: [
      { label: "DE", x: 14, y: 42 },
      { label: "DT", x: 32, y: 44 },
      { label: "DT", x: 68, y: 44 },
      { label: "DE", x: 86, y: 42 },
      { label: "LB", x: 38, y: 58 },
      { label: "LB", x: 62, y: 58 },
      { label: "CB", x: 8, y: 28 },
      { label: "CH", x: 28, y: 32, emphasis: true },
      { label: "CB", x: 72, y: 32 },
      { label: "S", x: 42, y: 18 },
      { label: "S", x: 58, y: 18 },
    ],
  },
  {
    id: "four-three",
    name: "4-3 (Heavy Personnel)",
    description:
      "Traditional four-man front with three linebackers — answers 12/21 personnel and power-run looks.",
    whenUsed: "Vs. heavier offensive sets (Michigan-style 12 personnel, goal line).",
    players: [
      { label: "DE", x: 14, y: 42 },
      { label: "DT", x: 32, y: 44 },
      { label: "DT", x: 68, y: 44 },
      { label: "DE", x: 86, y: 42 },
      { label: "LB", x: 28, y: 58 },
      { label: "LB", x: 50, y: 56 },
      { label: "LB", x: 72, y: 58 },
      { label: "CB", x: 8, y: 28 },
      { label: "CB", x: 92, y: 28 },
      { label: "S", x: 38, y: 18 },
      { label: "S", x: 62, y: 18 },
    ],
  },
  {
    id: "three-three-five",
    name: "3-3-5 Odd Stack",
    description:
      "Three down linemen with three linebackers and five DBs. Cheetah becomes a movable second-level weapon.",
    whenUsed: "Specific matchup downs; dime-style answers when Venables wants speed on the field.",
    players: [
      { label: "DE", x: 22, y: 42 },
      { label: "NT", x: 50, y: 44, emphasis: true },
      { label: "DE", x: 78, y: 42 },
      { label: "LB", x: 30, y: 56 },
      { label: "CH", x: 50, y: 52, emphasis: true },
      { label: "LB", x: 70, y: 56 },
      { label: "CB", x: 8, y: 28 },
      { label: "CB", x: 92, y: 28 },
      { label: "S", x: 32, y: 18 },
      { label: "S", x: 50, y: 14 },
      { label: "S", x: 68, y: 18 },
    ],
  },
];

export const schemeSources = [
  {
    label: "Sooners Wire — Arbuckle offense preview",
    url: "https://soonerswire.usatoday.com/story/sports/college/sooners/football/2025/07/11/oklahoma-sooners-football-ben-arbuckle-offense-john-mateer-sec-brent-venables/84526415007/",
  },
  {
    label: "AtoZ Sports — Cheetah position",
    url: "https://atozsports.com/college-football/oklahoma-sooners-news/oklahoma-sooners-additions-defense-allowing-them-to-be-creative-at-unique-position-in-brent-venables-defense-cheetah-kendal-daniels/",
  },
  {
    label: "Roll Bama Roll — 2025 OU defense preview",
    url: "https://www.rollbamaroll.com/alabama-crimson-tide-football/76611/alabama-football-2025-vs-oklahoma-previewing-the-sooners-defense",
  },
];
