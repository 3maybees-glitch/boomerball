import { nationalChampionships } from "@/data/legends";
import { schedule2026 } from "@/data/schedule-2026";
import { SEASON_RECORD, CONFERENCE_RECORD } from "@/data/schedule";
import { teamStats2025 } from "@/data/stats";
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
      "Boomer Ball is a fan-inspired Oklahoma Sooners football analytics website at boomerball.app. It publishes free 2025 season stats, the 2026 roster, schedule, cited news, legends content, and optional premium advanced metrics. It is not affiliated with or endorsed by the University of Oklahoma.",
  },
  {
    question: "What was Oklahoma's 2025 football record?",
    answer: `The Oklahoma Sooners finished the 2025 season ${SEASON_RECORD} overall and ${CONFERENCE_RECORD} in SEC play, including a College Football Playoff first-round appearance.`,
  },
  {
    question: "How many points per game did Oklahoma score in 2025?",
    answer: `Oklahoma averaged ${teamStats2025.pointsPerGame} points per game and allowed ${teamStats2025.pointsAllowedPerGame} points per game through 13 games in 2025, per official cumulative stats on soonersports.com.`,
  },
  {
    question: "When is Oklahoma's 2026 football season opener?",
    answer: `Oklahoma opens the 2026 season on ${schedule2026[0]?.date ?? "2026-09-05"} against ${schedule2026[0]?.opponent ?? "UTEP"} at Gaylord Family – Oklahoma Memorial Stadium in Norman, Oklahoma.`,
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
      "The Locker Room is Boomer Ball's premium membership ($9.99 one-time, lifetime access). It unlocks advanced SP+ analytics, PFF-style player grades, the NFL Comp Machine, The Game-u-lator matchup simulator, scheme guides, the 2027 recruiting board, and weekly in-season metric updates. Members can restore access on any device with a magic link sent to their checkout email.",
  },
];
