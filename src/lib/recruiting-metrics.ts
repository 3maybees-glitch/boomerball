import type {
  RecruitingClass,
  RecruitingCommit,
  RecruitingPositionGroup,
} from "@/data/recruiting-types";

const POSITION_GROUP_LABELS: Record<RecruitingPositionGroup, string> = {
  QB: "Quarterbacks",
  RB: "Running Backs",
  WR: "Wide Receivers",
  TE: "Tight Ends",
  OL: "Offensive Line",
  DL: "Defensive Line",
  EDGE: "Edge Rushers",
  LB: "Linebackers",
  DB: "Defensive Backs",
};

const POSITION_GROUP_ORDER: RecruitingPositionGroup[] = [
  "QB",
  "RB",
  "WR",
  "TE",
  "OL",
  "DL",
  "EDGE",
  "LB",
  "DB",
];

export interface PositionBreakdown {
  group: RecruitingPositionGroup;
  label: string;
  count: number;
  avgOn3: number | null;
  avg247: number | null;
  avgEspn: number | null;
}

function avgRank(commits: RecruitingCommit[], key: "on3" | "twoFourSeven" | "espn") {
  const ranks = commits
    .map((c) => c[key].national)
    .filter((r): r is number => r !== undefined);
  if (ranks.length === 0) return null;
  return Math.round(ranks.reduce((a, b) => a + b, 0) / ranks.length);
}

export function computePositionBreakdown(
  recruitingClass: RecruitingClass,
): PositionBreakdown[] {
  return POSITION_GROUP_ORDER.map((group) => {
    const inGroup = recruitingClass.commits.filter((c) => c.positionGroup === group);
    return {
      group,
      label: POSITION_GROUP_LABELS[group],
      count: inGroup.length,
      avgOn3: avgRank(inGroup, "on3"),
      avg247: avgRank(inGroup, "twoFourSeven"),
      avgEspn: avgRank(inGroup, "espn"),
    };
  }).filter((p) => p.count > 0);
}

export function formatCommitDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function starDisplay(stars?: number) {
  if (!stars) return null;
  return "★".repeat(stars);
}
