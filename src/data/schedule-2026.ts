import type { ScheduleGame } from "./types";

/** 2026 season schedule — Source: soonersports.com */
export const SEASON_2026 = 2026;

export const schedule2026: ScheduleGame[] = [
  {
    date: "2026-09-05",
    time: "TBD",
    opponent: "UTEP",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    conference: false,
  },
  {
    date: "2026-09-12",
    time: "11:00 AM CT",
    opponent: "Michigan",
    location: "Michigan Stadium, Ann Arbor, MI",
    isHome: false,
    conference: false,
  },
  {
    date: "2026-09-19",
    time: "6:30 PM CT",
    opponent: "New Mexico",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    conference: false,
  },
  {
    date: "2026-09-26",
    time: "TBD",
    opponent: "Georgia",
    location: "Sanford Stadium, Athens, GA",
    isHome: false,
    conference: true,
  },
  {
    date: "2026-10-10",
    time: "2:30 PM CT",
    opponent: "Texas",
    location: "Cotton Bowl, Dallas, TX",
    isHome: false,
    isNeutral: true,
    conference: true,
  },
  {
    date: "2026-10-17",
    time: "TBD",
    opponent: "Kentucky",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    conference: true,
  },
  {
    date: "2026-10-24",
    time: "TBD",
    opponent: "Mississippi State",
    location: "Davis Wade Stadium, Starkville, MS",
    isHome: false,
    conference: true,
  },
  {
    date: "2026-10-31",
    time: "TBD",
    opponent: "South Carolina",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    conference: true,
  },
  {
    date: "2026-11-07",
    time: "TBD",
    opponent: "Florida",
    location: "Ben Hill Griffin Stadium, Gainesville, FL",
    isHome: false,
    conference: true,
  },
  {
    date: "2026-11-14",
    time: "TBD",
    opponent: "Ole Miss",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    conference: true,
  },
  {
    date: "2026-11-21",
    time: "11:00 AM – Noon CT",
    opponent: "Texas A&M",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    conference: true,
  },
  {
    date: "2026-11-28",
    time: "TBD",
    opponent: "Missouri",
    location: "Memorial Stadium, Columbia, MO",
    isHome: false,
    conference: true,
  },
];

export const DATA_SOURCE_SCHEDULE_2026 =
  "https://soonersports.com/sports/football/schedule/text/2026";
