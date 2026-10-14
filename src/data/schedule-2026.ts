import type { ScheduleGame } from "./types";
import { getOpponentStrength } from "./schedule-sos-2026";

/** 2026 season schedule — Source: soonersports.com */
export const SEASON_2026 = 2026;
export const SEASON_2026_RECORD = "3-2";
export const SEASON_2026_CONFERENCE_RECORD = "1-1 SEC";

const rawSchedule2026: Omit<ScheduleGame, "opponentStrength">[] = [
  {
    date: "2026-09-04",
    time: "7:00 PM CT",
    opponent: "UTEP",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    result: "W",
    score: "51-0",
    record: "1-0",
    conference: false,
  },
  {
    date: "2026-09-12",
    time: "11:00 AM CT",
    opponent: "Michigan",
    location: "Michigan Stadium, Ann Arbor, MI",
    isHome: false,
    result: "L",
    score: "10-17",
    record: "1-1",
    attendance: 111240,
    conference: false,
  },
  {
    date: "2026-09-19",
    time: "6:30 PM CT",
    opponent: "New Mexico",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    result: "W",
    score: "14-6",
    record: "2-1",
    attendance: 83423,
    conference: false,
  },
  {
    date: "2026-09-26",
    time: "2:30 PM CT",
    opponent: "Georgia",
    location: "Sanford Stadium, Athens, GA",
    isHome: false,
    result: "L",
    score: "13-41",
    record: "2-2",
    attendance: 93033,
    conference: true,
  },
  {
    date: "2026-10-10",
    time: "2:30 PM CT",
    opponent: "Texas",
    location: "Cotton Bowl, Dallas, TX",
    isHome: false,
    isNeutral: true,
    result: "W",
    score: "27-24",
    record: "3-2",
    attendance: 92100,
    conference: true,
  },
  {
    date: "2026-10-17",
    time: "6:30 PM CT",
    opponent: "Kentucky",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    conference: true,
  },
  {
    date: "2026-10-24",
    time: "2:30 PM CT",
    opponent: "Mississippi State",
    location: "Davis Wade Stadium, Starkville, MS",
    isHome: false,
    conference: true,
  },
  {
    date: "2026-10-31",
    time: "2:30–3:30 or 5–7 PM CT",
    opponent: "South Carolina",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    conference: true,
  },
  {
    date: "2026-11-07",
    time: "2:30–3:30 or 5–7 PM CT",
    opponent: "Florida",
    location: "Ben Hill Griffin Stadium, Gainesville, FL",
    isHome: false,
    conference: true,
  },
  {
    date: "2026-11-14",
    time: "2:30–3:30 PM CT",
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
    time: "2:30–3:30 PM CT",
    opponent: "Missouri",
    location: "Memorial Stadium, Columbia, MO",
    isHome: false,
    conference: true,
  },
];

export const schedule2026: ScheduleGame[] = rawSchedule2026.map((game) => ({
  ...game,
  opponentStrength: getOpponentStrength(game.opponent),
}));

export const DATA_SOURCE_SCHEDULE_2026 =
  "https://soonersports.com/sports/football/schedule/text/2026";

export function getUpcoming2026Games(limit = 3): ScheduleGame[] {
  return schedule2026.filter((game) => !game.result).slice(0, limit);
}
