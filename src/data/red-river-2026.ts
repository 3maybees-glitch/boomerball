/** Red River preview for Oct. 10, 2026.
 * Team rates and series facts: OU game notes / primer, Oct. 8, 2026.
 * Texas results and Manning lines: Texas game notes, Oct. 8, 2026.
 */

export const RED_RIVER_KICKOFF = {
  dateLabel: "Saturday, Oct. 10, 2026",
  time: "2:30 p.m. CT",
  network: "ABC",
  announcers: "Sean McDonough, Greg McElroy, and Katie George",
  stadium: "Cotton Bowl",
  capacity: "92,100",
  city: "Dallas",
  designation: "Oklahoma is the designated home team",
  meeting: "122nd meeting",
  name: "Allstate Red River Rivalry",
} as const;

export const RED_RIVER_SOURCES = [
  {
    label: "OU game primer",
    url: "https://soonersports.com/news/2026/10/8/football-game-primer-ou-vs-texas",
  },
  {
    label: "OU game notes (PDF)",
    url: "https://soonersports.com/documents/download/2026/10/8/05_OUvsTexas.pdf",
  },
  {
    label: "Texas game notes (PDF)",
    url: "https://texaslonghorns.com/documents/download/2026/10/8/06_-_Oklahoma.pdf",
  },
] as const;

export interface PreviewStatRow {
  label: string;
  ou: string;
  texas: string;
  note?: string;
}

export const redRiverComparison: PreviewStatRow[] = [
  { label: "Record", ou: "2-2, 0-1 SEC", texas: "4-0, 1-0 SEC", note: "OU unranked · Texas No. 1" },
  { label: "Points / game", ou: "22.0", texas: "33.3", note: "OU 109th · Texas 55th" },
  { label: "Points allowed", ou: "16.0", texas: "13.3", note: "OU 24th · Texas 11th" },
  { label: "Total offense", ou: "321.2", texas: "378.5", note: "Yards per game" },
  { label: "Rush yards", ou: "99.0", texas: "147.3", note: "OU 131st nationally" },
  { label: "Total defense", ou: "238.0", texas: "271.0", note: "OU 5th · Texas 22nd" },
  { label: "Pass defense", ou: "122.5", texas: "171.8", note: "OU 4th nationally" },
  { label: "Pass TD allowed", ou: "1", texas: "—", note: "OU leads the nation" },
  { label: "Sacks / game", ou: "3.3", texas: "3.8", note: "OU 10th · Texas 4th" },
  { label: "Turnover margin", ou: "−6", texas: "Even", note: "OU 136th nationally" },
];

/** Ready-to-publish post for @boomerballapp. Kept under 280 characters. */
export const RED_RIVER_X_POST =
  "Red River. Today. 2:30 p.m. CT. ABC.\n\nUnranked OU (2-2) vs No. 1 Texas (4-0) at the Cotton Bowl. 5th in total defense, 1 passing TD allowed, 131st rushing, minus-6 turnovers, and 0-4-1 all-time vs a No. 1 Texas.\n\nThe path: pass rush and takeaways. boomerball.app";

export const RED_RIVER_INFOGRAPHIC = "/social/2026-red-river-preview.png";
