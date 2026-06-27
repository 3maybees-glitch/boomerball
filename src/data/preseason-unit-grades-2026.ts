export type UnitPhase = "offense" | "defense" | "special";

export interface UnitKeyPlayer {
  name: string;
  note: string;
  /** Athlon / projected All-SEC honor, if any */
  allSec?: string;
}

export interface PreseasonUnitGrade {
  id: string;
  name: string;
  phase: UnitPhase;
  grade: string;
  /** 0–100 scale for visual bars */
  score: number;
  rankContext?: string;
  assessment: string;
  strengths: string[];
  concerns: string[];
  keyPlayers: UnitKeyPlayer[];
}

export interface PhaseSummary {
  phase: UnitPhase;
  label: string;
  overallGrade: string;
  score: number;
  rankContext: string;
  headline: string;
}

export const PRESEASON_GRADES_YEAR = 2026;

export type AllSecTeam = 1 | 2 | 3;

export interface AthlonAllSecPick {
  name: string;
  position: string;
  positionGroup: "offense" | "defense";
  team: AllSecTeam;
}

/** Athlon Sports 2026 preseason All-SEC — Oklahoma selections only */
export const athlonAllSec2026: AthlonAllSecPick[] = [
  { name: "David Stone", position: "DL", positionGroup: "defense", team: 1 },
  { name: "Taylor Wein", position: "DE", positionGroup: "defense", team: 1 },
  { name: "Kip Lewis", position: "LB", positionGroup: "defense", team: 1 },
  { name: "Isaiah Sategna III", position: "WR", positionGroup: "offense", team: 1 },
  { name: "Michael Fasusi", position: "OL", positionGroup: "offense", team: 1 },
  { name: "Peyton Bowen", position: "S", positionGroup: "defense", team: 2 },
  { name: "Eli Bowen", position: "CB", positionGroup: "defense", team: 2 },
  { name: "Courtland Guillory", position: "CB", positionGroup: "defense", team: 2 },
  { name: "Owen Heinecke", position: "LB", positionGroup: "defense", team: 3 },
];

export const athlonAllSecMeta = {
  totalHonorees: 15,
  listedHonorees: athlonAllSec2026.length,
  secRank: 2,
  leader: { school: "Texas", count: 16 },
  sourceLabel: "Athlon Sports Preseason All-SEC",
  sourceUrl:
    "https://www.on3.com/news/athlon-sports-releases-preseason-all-sec-team-for-2026/",
};

export const preseasonPhaseSummaries: PhaseSummary[] = [
  {
    phase: "offense",
    label: "Offense",
    overallGrade: "B+",
    score: 86,
    rankContext: "ESPN SP+ offense ~27th nationally · 6th in SEC composite",
    headline:
      "Portal upgrades at OL, TE, and WR should lift a unit that finished 51st in offensive SP+ in 2025. Run game and health remain the swing factors.",
  },
  {
    phase: "defense",
    label: "Defense",
    overallGrade: "A",
    score: 94,
    rankContext: "ESPN SP+ defense ~10th nationally · 4th in SEC last fall",
    headline:
      "Elite front-seven production returns with national-leading sack and TFL rates from 2025. Secondary starts strong; depth is the only nitpick.",
  },
  {
    phase: "special",
    label: "Special Teams",
    overallGrade: "B-",
    score: 80,
    rankContext: "ESPN SP+ special teams ~33rd nationally",
    headline:
      "Kicker Tate Sandell and punter Grayson Miller return a stable core. Lloyd Avant was added specifically to fix one of the worst kick-return units in FBS.",
  },
];

/** Preseason unit-by-unit grades for 2026 — synthesized from ESPN, Athlon, CFN, Sooners Wire */
export const preseasonUnitGrades2026: PreseasonUnitGrade[] = [
  // —— Offense ——
  {
    id: "qb",
    name: "Quarterback",
    phase: "offense",
    grade: "B+",
    score: 87,
    rankContext: "SEC Top 10",
    assessment:
      "John Mateer returns as a proven playoff-caliber starter with 129+ passer rating upside and elite rushing value in Ben Arbuckle's RPO-heavy system. A full healthy season would unlock the ceiling; durability and decision consistency under SEC pressure remain the questions ESPN flagged in its 2026 preview.",
    strengths: [
      "Experience — CFP starter with 3,000+ yard pace when healthy",
      "Dual-threat fit for Arbuckle's RPO and play-action attack",
      "Veteran leadership entering Year 2 in the SEC",
    ],
    concerns: [
      "Missed time in 2025; physical style invites re-injury risk",
      "Turnover spike in biggest games (CFP pick-six vs Alabama)",
    ],
    keyPlayers: [
      { name: "John Mateer", note: "Redshirt SR starter; 129.35 rating in 2025" },
      { name: "Davion Ealy", note: "RS FR developmental backup" },
    ],
  },
  {
    id: "rb",
    name: "Running Back",
    phase: "offense",
    grade: "B-",
    score: 80,
    rankContext: "SEC Bottom Third (2025 carryover)",
    assessment:
      "The run game was the offense's anchor drag in 2025 — ESPN ranked OU 124th nationally in yards per rush (sacks excluded). Tory Blaylock returns as the lead back and Lloyd Avant adds proven kick-return dynamism plus RB depth from Colorado State, but neither projects as a workhorse SEC bell cow yet.",
    strengths: [
      "Blaylock's 4.0 YPC and 480 yards provide a known quantity",
      "Avant averaged 26.4 yards per kick return at Colorado State",
      "Young blue-chip backs (Robinson, etc.) still have growth runway",
    ],
    concerns: [
      "No proven SEC-level feature back on the roster",
      "2025 run blocking ranked among the worst in Power 4",
      "Must prove they can grind in physical SEC fronts",
    ],
    keyPlayers: [
      { name: "Tory Blaylock", note: "RS JR — 120 att, 480 yds, 4 TD in 2025" },
      { name: "Lloyd Avant", note: "JR transfer — RB/KR upgrade from CSU" },
      { name: "Xavier Robinson", note: "RS SO — explosive change-of-pace option" },
    ],
  },
  {
    id: "wr",
    name: "Wide Receiver",
    phase: "offense",
    grade: "A-",
    score: 90,
    rankContext: "SEC Top 5",
    assessment:
      "This is the most SEC-ready skill group on offense. Isaiah Sategna III is a projected first-team All-SEC receiver after 965 yards and 8 TDs, and portal addition Trell Harris gives Mateer a proven vertical threat. Depth behind the top two is solid if not spectacular.",
    strengths: [
      "Sategna's 14.4 YPR and red-zone production",
      "Harris transfer adds experienced outside speed",
      "Air Raid spacing concepts fit the personnel",
    ],
    concerns: [
      "Must stay healthy — top two carry heavy target share",
      "Slot production less proven after departures",
    ],
    keyPlayers: [
      {
        name: "Isaiah Sategna III",
        note: "RS SR — 965 rec yds, 8 TD",
        allSec: "Athlon 1st Team All-SEC WR",
      },
      { name: "Trell Harris", note: "RS SR transfer — immediate starter" },
      { name: "Jermaine Jackson", note: "RS JR — slot and YAC contributor" },
    ],
  },
  {
    id: "te",
    name: "Tight End",
    phase: "offense",
    grade: "B+",
    score: 86,
    rankContext: "SEC Top 8 (projected)",
    assessment:
      "Brent Venables prioritized fixing a position that had underperformed for three years. Portal adds Hayden Hansen and Parker Livingstone plus Jason Witten's coaching give Arbuckle the multi-dimensional TE usage he needs to balance the Air Raid with SEC run-game physicality — a key CBS Sports offseason storyline.",
    strengths: [
      "Hansen (6'8\") and Livingstone add size and blocking",
      "Witten's NFL pedigree elevates technique and usage",
      "Enables 12-personnel and play-action layers",
    ],
    concerns: [
      "New pieces must mesh quickly in fall camp",
      "Passing production from TE spot still unproven at OU",
    ],
    keyPlayers: [
      { name: "Hayden Hansen", note: "RS SR transfer — day-one starter" },
      { name: "Parker Livingstone", note: "RS SR transfer — blocking specialist" },
      { name: "Andrew Williams", note: "RS JR — returning contributor" },
    ],
  },
  {
    id: "ol",
    name: "Offensive Line",
    phase: "offense",
    grade: "B+",
    score: 87,
    rankContext: "SEC Top 8 (projected)",
    assessment:
      "Five transfer linemen — headlined by Arkansas starter E'Marion Harris — address the biggest weakness from 2025. Michael Fasusi projects on Athlon's first-team All-SEC at guard, and four key returners were freshmen or sophomores who survived their first SEC season and could take a Year-2 jump per ESPN's Bill Connelly.",
    strengths: [
      "Portal haul includes Harris (OT) and Fasusi (OG)",
      "Youth with blue-chip pedigree across the room",
      "Better fit for Venables' physical run-game mandate",
    ],
    concerns: [
      "Multiple new starters must gel before Georgia (Week 2)",
      "2025 pass protection was inconsistent vs elite fronts",
    ],
    keyPlayers: [
      {
        name: "Michael Fasusi",
        note: "RS SO guard — breakout candidate",
        allSec: "Athlon 1st Team All-SEC OL",
      },
      { name: "E'Marion Harris", note: "RS SR transfer OT from Arkansas" },
      { name: "Tyler Miller", note: "RS JR center — anchor of the unit" },
    ],
  },

  // —— Defense ——
  {
    id: "dl",
    name: "Defensive Line",
    phase: "defense",
    grade: "A",
    score: 95,
    rankContext: "SEC Top 3 · #1 nationally in sacks & TFL (2025)",
    assessment:
      "The crown jewel of Brent Venables' roster. David Stone and Taylor Wein both land on Athlon's first-team All-SEC defensive line after OU led the nation in sacks and tackles for loss. Four of six top linemen departed, but Venables' blue-chip depth pool (10–12 high-end prospects) keeps this unit national-championship caliber.",
    strengths: [
      "#1 FBS sack rate and TFL rate in 2025",
      "Stone + Wein form an elite interior/exterior pairing",
      "Damonic Williams and Adepoju Adebawore ready for expanded roles",
    ],
    concerns: [
      "Replacing four linemen who played 200+ snaps each",
      "Must maintain edge vs SEC's best pass-protecting tackles",
    ],
    keyPlayers: [
      {
        name: "David Stone",
        note: "RS SO DT — interior disruptor",
        allSec: "Athlon 1st Team All-SEC DL",
      },
      {
        name: "Taylor Wein",
        note: "RS SR DE — team-high 7 sacks",
        allSec: "Athlon 1st Team All-SEC DL",
      },
      { name: "Damonic Williams", note: "RS JR DT — 6.5 sacks in 2025" },
    ],
  },
  {
    id: "lb",
    name: "Linebacker",
    phase: "defense",
    grade: "A",
    score: 94,
    rankContext: "SEC Top 3",
    assessment:
      "Kip Lewis and Owen Heinecke combined for 150 tackles, 22.5 TFL, and 7 sacks in 2025 — one of the best LB duos in the country. Lewis is Athlon first-team All-SEC; Heinecke projects third team. Michigan transfer Cole Sullivan and Cheetah hybrid Reggie Powers III add experienced depth.",
    strengths: [
      "Lewis + Heinecke are elite SEC tacklers and blitzers",
      "Cheetah package with Powers creates matchup nightmares",
      "Sullivan adds Big Ten-tested inside depth",
    ],
    concerns: [
      "Heinecke eligibility tied to offseason injunction news",
      "Must cover faster SEC spread teams in space",
    ],
    keyPlayers: [
      {
        name: "Kip Lewis",
        note: "RS SR — 76 tackles, 4 sacks",
        allSec: "Athlon 1st Team All-SEC LB",
      },
      {
        name: "Owen Heinecke",
        note: "RS SR — 74 tackles, 18.5 TFL",
        allSec: "Athlon 3rd Team All-SEC LB",
      },
      { name: "Cole Sullivan", note: "SR transfer ILB from Michigan" },
      { name: "Reggie Powers III", note: "RS SR Cheetah hybrid edge" },
    ],
  },
  {
    id: "db",
    name: "Secondary",
    phase: "defense",
    grade: "A-",
    score: 91,
    rankContext: "SEC Top 5",
    assessment:
      "The starting five is All-SEC caliber: Peyton Bowen (2nd team S), Eli Bowen (2nd/3rd team CB), and Courtland Guillory (2nd team CB) headline a group that benefits from the nation's best pass rush. Yahoo's CFN preview flagged depth behind the starters as the one defensive nitpick.",
    strengths: [
      "Bowen brothers — Peyton led team with 7 PBUs; Eli had CFP pick-six",
      "Guillory is a lockdown boundary corner",
      "Elite pass rush reduces coverage stress",
    ],
    concerns: [
      "Thin depth behind starting five",
      "Eli Bowen missed time with injury in 2025",
    ],
    keyPlayers: [
      {
        name: "Peyton Bowen",
        note: "SR safety — 2 INT, 7 PD",
        allSec: "Athlon 2nd Team All-SEC S",
      },
      {
        name: "Eli Bowen",
        note: "JR corner — playmaker when healthy",
        allSec: "Athlon 2nd Team All-SEC CB",
      },
      {
        name: "Courtland Guillory",
        note: "RS SR boundary CB",
        allSec: "Athlon 2nd Team All-SEC CB",
      },
      { name: "Robert Spears-Jennings", note: "RS SR safety — 59 tackles" },
    ],
  },

  // —— Special Teams ——
  {
    id: "kicking",
    name: "Kicking & Punting",
    phase: "special",
    grade: "B+",
    score: 86,
    rankContext: "SEC Top 10",
    assessment:
      "Tate Sandell and Grayson Miller return the entire kicking battery from a 2025 unit that Venables leaned on in tight games. Field-goal range and hang-time consistency are SEC-average or better; the operation lacks a game-breaking weapon but rarely costs the Sooners points.",
    strengths: [
      "Full continuity — same kicker, punter, and snapper",
      "Sandell reliable inside 45 yards",
      "Miller's directional punting helps field position",
    ],
    concerns: [
      "No elite long-range leg (55+ yard weapon)",
      "Extra-point/FG operation had occasional lapses",
    ],
    keyPlayers: [
      { name: "Tate Sandell", note: "RS SR kicker — primary FG/PAT" },
      { name: "Grayson Miller", note: "RS JR punter" },
    ],
  },
  {
    id: "returns",
    name: "Return Game",
    phase: "special",
    grade: "C+",
    score: 77,
    rankContext: "2025: fewest KR returns in FBS",
    assessment:
      "OU returned just two kickoffs for 16 combined yards in 2025 — dead last in opportunities and near the bottom in average. Lloyd Avant (26.4 YPR, 1 TD at Colorado State) was brought in specifically to change that, but SEC touchback rates limit his chances. Punt return unit remains a question mark.",
    strengths: [
      "Avant is a proven KR threat at the Group of 5 level",
      "Athleticism upgrade over 2025 return personnel",
    ],
    concerns: [
      "2025 unit was among the worst in the country",
      "SEC touchback rules reduce KR opportunities",
      "Punt return production still unproven",
    ],
    keyPlayers: [
      { name: "Lloyd Avant", note: "JR — primary kick returner" },
      { name: "Isaiah Sategna III", note: "Punt return option" },
    ],
  },
];

export const preseasonGradesSources = [
  {
    label: "ESPN 2026 SEC Preview (SP+ projections)",
    url: "https://www.espn.com/college-football/story/_/id/49143990/2026-sec-college-football-preview-predictions-top-transfers-more",
  },
  {
    label: "Athlon Sports Preseason All-SEC",
    url: "https://www.on3.com/news/athlon-sports-releases-preseason-all-sec-team-for-2026/",
  },
  {
    label: "CFN / Yahoo 2026 OU Preview",
    url: "https://sports.yahoo.com/articles/oklahoma-football-preview-2026-brent-204135554.html",
  },
  {
    label: "Sooners Wire Depth Chart Projections",
    url: "https://soonerswire.usatoday.com/story/sports/college/sooners/football/2026/01/14/oklahoma-football-starting-lineup-depth-chart-projections-2026/88183223007/",
  },
  {
    label: "Roundtable — ESPN SP+ Top 25",
    url: "https://roundtable.io/sports/ncaa/oklahoma/news/where-do-the-oklahoma-sooners-land-in-espn-s-preseason-college-football-top-25",
  },
];
