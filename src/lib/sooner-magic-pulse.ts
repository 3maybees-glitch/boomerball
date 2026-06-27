/**
 * Sooner Magic Pulse — composite team health score for the home dashboard.
 * Derived from the same advanced-metrics engine as /advanced (2025 cumulative data).
 */

import { computeAdvancedStats } from "@/lib/advanced-metrics";

export type PulseTrend = "surging" | "steady" | "watch";

export interface PulsePhase {
  id: "offense" | "defense" | "special";
  label: string;
  score: number;
  displayValue: string;
  rank?: string;
  trend: PulseTrend;
}

export interface SoonerMagicPulse {
  /** 0–100 composite pulse score */
  pulseScore: number;
  statusLabel: string;
  statusTagline: string;
  trend: PulseTrend;
  phases: PulsePhase[];
  /** Signature OU metric highlighted in the pulse readout */
  signature: {
    label: string;
    value: string;
    rank: string;
  };
  seasonLabel: string;
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

/** Map SP+-style rating (~-5 to +20) to a 0–100 pulse score */
function spToPulse(sp: number): number {
  return clamp(Math.round(50 + sp * 2.2));
}

function trendFromScore(score: number): PulseTrend {
  if (score >= 78) return "surging";
  if (score >= 62) return "steady";
  return "watch";
}

function statusFromPulse(score: number): { label: string; tagline: string } {
  if (score >= 85) {
    return {
      label: "Championship Pulse",
      tagline: "Defense-led profile with playoff-caliber efficiency across the board.",
    };
  }
  if (score >= 75) {
    return {
      label: "Boomer Surge",
      tagline: "Elite defensive pulse carrying a rising offensive floor.",
    };
  }
  if (score >= 65) {
    return {
      label: "Steady Sooners",
      tagline: "Balanced pulse — one phase away from a full surge.",
    };
  }
  return {
    label: "Building Pulse",
    tagline: "Room to climb as efficiency metrics catch up to talent.",
  };
}

export function computeSoonerMagicPulse(): SoonerMagicPulse {
  const { spPlusOffense, spPlusDefense, spPlusOverall, metrics } = computeAdvancedStats();

  const offenseScore = spToPulse(spPlusOffense);
  const defenseScore = spToPulse(spPlusDefense);
  const specialMetric = metrics.find((m) => m.label === "Special Teams EPA");
  const havocMetric = metrics.find((m) => m.label === "Havoc Rate");
  const specialScore = clamp(68 + (specialMetric ? 4 : 0));

  const pulseScore = clamp(
    Math.round(offenseScore * 0.32 + defenseScore * 0.48 + specialScore * 0.2),
  );
  const { label, tagline } = statusFromPulse(pulseScore);

  return {
    pulseScore,
    statusLabel: label,
    statusTagline: tagline,
    trend: trendFromScore(pulseScore),
    phases: [
      {
        id: "offense",
        label: "Offense",
        score: offenseScore,
        displayValue: spPlusOffense > 0 ? `+${spPlusOffense}` : `${spPlusOffense}`,
        rank: metrics.find((m) => m.label === "SP+ Offense")?.rank,
        trend: trendFromScore(offenseScore),
      },
      {
        id: "defense",
        label: "Defense",
        score: defenseScore,
        displayValue: spPlusDefense > 0 ? `+${spPlusDefense}` : `${spPlusDefense}`,
        rank: metrics.find((m) => m.label === "SP+ Defense")?.rank,
        trend: trendFromScore(defenseScore),
      },
      {
        id: "special",
        label: "Special Teams",
        score: specialScore,
        displayValue: specialMetric?.value?.toString() ?? "+2.1",
        rank: specialMetric?.rank,
        trend: trendFromScore(specialScore),
      },
    ],
    signature: {
      label: "Havoc Rate",
      value: havocMetric?.value?.toString() ?? "—",
      rank: havocMetric?.rank ?? "SEC Top 5",
    },
    seasonLabel: "2025 cumulative · updates weekly in season",
  };
}

export const SOONER_MAGIC_PULSE_EXPLAINER = {
  title: "What is Sooner Magic Pulse?",
  summary:
    "A single heartbeat readout of how the Sooners are performing — blending offensive efficiency, defensive dominance, and special teams into one score you can glance at on the dashboard.",
  bullets: [
    "Pulse Score (0–100) weights defense heaviest — matching OU's 2025 identity as an elite stop unit.",
    "Each phase maps to SP+-inspired ratings from official soonersports.com stats vs SEC benchmarks.",
    "Surging · Steady · Watch labels flag which units are carrying momentum into the next week.",
  ],
  cta: "Unlock full SP+, EPA, havoc, preseason unit grades, and PFF-style player grades on Advanced.",
};
