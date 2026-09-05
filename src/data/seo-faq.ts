import { nationalChampionships } from "@/data/legends";
import {
  SEASON_2026_CONFERENCE_RECORD,
  SEASON_2026_RECORD,
} from "@/data/schedule-2026";
import { SEASON_RECORD, CONFERENCE_RECORD } from "@/data/schedule";
import { teamStats2025, teamStats2026 } from "@/data/stats";
import { roster2026 } from "@/data/roster";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

/** Factual Q&A pairs for on-page content and FAQPage schema (AEO-friendly) */
export const seoFaqItems: SeoFaqItem[] = [
  {
    question: "What is Boomer Ball?",
    answer:
      "Boomer Ball is a fan-inspired Oklahoma Sooners football analytics website at boomerball.app. It publishes free 2026 season stats, Monday Morning Quarterback recaps, the roster, schedule, cited news, legends content, archived 2025 data, and optional premium advanced metrics. It is not affiliated with or endorsed by the University of Oklahoma.",
  },
  {
    question: "What is Oklahoma's 2026 football record?",
    answer: `The Oklahoma Sooners are ${SEASON_2026_RECORD} overall and ${SEASON_2026_CONFERENCE_RECORD} after a 51-0 Week 1 shutout of UTEP. The next game is at Michigan.`,
  },
  {
    question: "How did Oklahoma's 2026 season opener go?",
    answer:
      "No. 10 Oklahoma beat UTEP 51-0 on September 4, 2026, at Gaylord Family – Oklahoma Memorial Stadium. John Mateer threw three touchdown passes, Isaiah Sategna III returned a punt 88 yards for a score, and the Sooners scored on their first eight possessions.",
  },
  {
    question: "What was Oklahoma's 2025 football record?",
    answer: `The Oklahoma Sooners finished the 2025 season ${SEASON_RECORD} overall and ${CONFERENCE_RECORD} in SEC play, including a College Football Playoff first-round appearance. Full 2025 totals remain in the stats archive.`,
  },
  {
    question: "How many points per game did Oklahoma score in 2025?",
    answer: `Oklahoma averaged ${teamStats2025.pointsPerGame} points per game and allowed ${teamStats2025.pointsAllowedPerGame} points per game through 13 games in 2025, per official cumulative stats on soonersports.com. Through one 2026 game the Sooners are averaging ${teamStats2026.pointsPerGame} points and allowing ${teamStats2026.pointsAllowedPerGame}.`,
  },
  {
    question: "How many players are on the 2026 Oklahoma Sooners roster?",
    answer: `Boomer Ball tracks ${roster2026.length} players on the 2026 Oklahoma Sooners spring roster, sourced from soonersports.com with height, weight, position, and recruiting context where available.`,
  },
  {
    question: "How many national championships has Oklahoma football won?",
    answer: `Oklahoma claims ${nationalChampionships.length} recognized national championships in football (1950, 1955, 1956, 1974, 1975, 1985, and 2000), per University of Oklahoma Athletics records.`,
  },
  {
    question: "Where does Boomer Ball get its football statistics?",
    answer:
      "Statistics are sourced from University of Oklahoma Athletics (soonersports.com) and cross-referenced with ESPN College Football. Every stats page includes source attribution links.",
  },
  {
    question: "What is The Locker Room on Boomer Ball?",
    answer:
      "The Locker Room is Boomer Ball's premium membership ($24.99 one-time for 2026 season access). It unlocks advanced SP+ analytics, PFF-style player grades, the NFL Comp Machine, The Game-u-lator matchup simulator, scheme guides, the 2027 recruiting board, the 2026 WAR MAP, and weekly in-season metric updates. Members can restore access on any device with a magic link sent to their checkout email.",
  },
];
