/**
 * Boomer Ball estimated athletic profiles for 2026 Sooners.
 *
 * College players rarely have official combine numbers, so these are
 * scouting estimates built from listed size, recruiting testing data,
 * game film speed, and production. Talent = estimated NFL projection on
 * the same 0–100 scale used for the NFL comparable database.
 *
 * Players without a curated entry get a derived profile from position
 * baselines, listed size, recruiting stars, and class year
 * (see `src/lib/nfl-similarity.ts`).
 */

export interface CombineEstimate {
  fortyYd: number;
  benchReps: number;
  verticalIn: number;
  broadIn: number;
  threeCone: number;
  talent: number;
  scoutingNote?: string;
}

export const combineEstimates: Record<string, CombineEstimate> = {
  // ── Quarterbacks ────────────────────────────────────────────────
  "john-mateer-10": {
    fortyYd: 4.61, benchReps: 17, verticalIn: 33.5, broadIn: 118, threeCone: 7.05, talent: 88,
    scoutingNote:
      "Heisman-caliber dual-threat. Fearless runner with a live arm and elite competitive toughness — profiles as an early-round NFL pick.",
  },
  "bowe-bentley-8": {
    fortyYd: 4.72, benchReps: 14, verticalIn: 31, broadIn: 112, threeCone: 7.18, talent: 77,
    scoutingNote: "Four-star freshman with advanced pocket feel and enough mobility to extend plays.",
  },
  "whitt-newbauer-16": {
    fortyYd: 4.92, benchReps: 15, verticalIn: 29, broadIn: 106, threeCone: 7.32, talent: 73,
    scoutingNote: "Towering 6'6\" pocket passer — arm strength and frame are NFL-caliber traits.",
  },
  "jett-niu-15": {
    fortyYd: 4.80, benchReps: 13, verticalIn: 30, broadIn: 110, threeCone: 7.25, talent: 68,
    scoutingNote: "Developmental passer with functional athleticism.",
  },

  // ── Running backs ───────────────────────────────────────────────
  "tory-blaylock-6": {
    fortyYd: 4.45, benchReps: 18, verticalIn: 36, broadIn: 122, threeCone: 7.00, talent: 84,
    scoutingNote: "Breakout sophomore with one-cut burst, receiving value, and workhorse toughness.",
  },
  "xavier-robinson-24": {
    fortyYd: 4.55, benchReps: 24, verticalIn: 33.5, broadIn: 118, threeCone: 7.15, talent: 79,
    scoutingNote: "238-pound hammer — short-yardage power with sneaky long speed.",
  },
  "jonathan-hatton-jr-20": {
    fortyYd: 4.52, benchReps: 22, verticalIn: 34, broadIn: 120, threeCone: 7.12, talent: 78,
    scoutingNote: "Four-star freshman with a rare size-speed blend for his age.",
  },

  // ── Wide receivers ──────────────────────────────────────────────
  "isaiah-sategna-iii-1": {
    fortyYd: 4.38, benchReps: 12, verticalIn: 36.5, broadIn: 122, threeCone: 6.85, talent: 82,
    scoutingNote: "Track-fast slot with return value — OU's leading receiver in 2025.",
  },
  "parker-livingstone-3": {
    fortyYd: 4.48, benchReps: 14, verticalIn: 35, broadIn: 122, threeCone: 7.00, talent: 78,
    scoutingNote: "Long-framed outside target with vertical ball skills.",
  },
  "trell-harris-11": {
    fortyYd: 4.47, benchReps: 14, verticalIn: 35, broadIn: 120, threeCone: 6.98, talent: 76,
    scoutingNote: "Veteran transfer with reliable hands and route polish.",
  },
  "jacob-jordan-7": {
    fortyYd: 4.52, benchReps: 13, verticalIn: 33, broadIn: 116, threeCone: 6.78, talent: 74,
    scoutingNote: "Quick-twitch slot separator who wins with option routes.",
  },
  "jayden-petit-13": {
    fortyYd: 4.55, benchReps: 15, verticalIn: 34, broadIn: 120, threeCone: 7.10, talent: 75,
    scoutingNote: "6'4\" four-star freshman with a huge catch radius.",
  },
  "manny-choice-0": {
    fortyYd: 4.52, benchReps: 14, verticalIn: 34, broadIn: 119, threeCone: 7.05, talent: 72,
    scoutingNote: "Big-bodied X receiver still rounding into form.",
  },

  // ── Tight ends ──────────────────────────────────────────────────
  "hayden-hansen-89": {
    fortyYd: 4.85, benchReps: 20, verticalIn: 30, broadIn: 110, threeCone: 7.40, talent: 76,
    scoutingNote: "6'8\" red-zone matchup problem and in-line blocker.",
  },
  "jack-van-dorselaer-88": {
    fortyYd: 4.70, benchReps: 18, verticalIn: 32, broadIn: 114, threeCone: 7.15, talent: 73,
    scoutingNote: "Tennessee transfer with a balanced blocking/receiving profile.",
  },

  // ── Offensive line ──────────────────────────────────────────────
  "michael-fasusi-56": {
    fortyYd: 5.05, benchReps: 28, verticalIn: 30, broadIn: 106, threeCone: 7.60, talent: 86,
    scoutingNote: "Five-star LT with elite feet — early first-round trajectory.",
  },
  "ryan-fodje-70": {
    fortyYd: 5.15, benchReps: 29, verticalIn: 28, broadIn: 103, threeCone: 7.70, talent: 82,
    scoutingNote: "Five-star tackle with rare mass and natural power.",
  },
  "daniel-akinkunmi-75": {
    fortyYd: 5.10, benchReps: 27, verticalIn: 29, broadIn: 105, threeCone: 7.65, talent: 78,
    scoutingNote: "UK-born mauler with elite physical upside.",
  },
  "heath-ozaeta-77": {
    fortyYd: 5.12, benchReps: 26, verticalIn: 28, broadIn: 103, threeCone: 7.68, talent: 77,
    scoutingNote: "Experienced interior starter with a strong anchor.",
  },
  "jake-maikkula-69": {
    fortyYd: 5.10, benchReps: 25, verticalIn: 28, broadIn: 104, threeCone: 7.60, talent: 75,
    scoutingNote: "Smart, athletic center — Stanford transfer anchoring the middle.",
  },
  "eddy-pierre-louis-55": {
    fortyYd: 5.15, benchReps: 30, verticalIn: 27, broadIn: 100, threeCone: 7.70, talent: 76,
    scoutingNote: "Powerful guard with heavy hands.",
  },

  // ── Defensive line ──────────────────────────────────────────────
  "david-stone-0": {
    fortyYd: 5.00, benchReps: 30, verticalIn: 29, broadIn: 105, threeCone: 7.55, talent: 83,
    scoutingNote: "Former five-star interior disruptor entering his breakout year.",
  },
  "jayden-jackson-65": {
    fortyYd: 5.05, benchReps: 31, verticalIn: 28, broadIn: 104, threeCone: 7.60, talent: 80,
    scoutingNote: "Stout two-gapping nose with heavy, active hands.",
  },
  "adepoju-adebawore-34": {
    fortyYd: 4.62, benchReps: 25, verticalIn: 37, broadIn: 126, threeCone: 7.00, talent: 84,
    scoutingNote: "One of the most explosive testers in his recruiting class — twitchy edge with elite bend.",
  },
  "danny-okoye-16": {
    fortyYd: 4.70, benchReps: 23, verticalIn: 35, broadIn: 122, threeCone: 7.05, talent: 79,
    scoutingNote: "Long, ascending edge rusher with power at the point.",
  },
  "jake-kreul-98": {
    fortyYd: 4.65, benchReps: 22, verticalIn: 35, broadIn: 123, threeCone: 6.95, talent: 82,
    scoutingNote: "Five-star freshman edge with an advanced pass-rush plan.",
  },
  "nigel-smith-ii-6": {
    fortyYd: 4.95, benchReps: 28, verticalIn: 30, broadIn: 108, threeCone: 7.45, talent: 79,
    scoutingNote: "Former top-100 recruit with inside-out versatility.",
  },
  "taylor-wein-44": {
    fortyYd: 4.78, benchReps: 24, verticalIn: 33, broadIn: 118, threeCone: 7.15, talent: 77,
    scoutingNote: "High-motor strongside end coming off a productive 2025.",
  },

  // ── Linebackers ─────────────────────────────────────────────────
  "kip-lewis-10": {
    fortyYd: 4.55, benchReps: 21, verticalIn: 35, broadIn: 121, threeCone: 7.00, talent: 83,
    scoutingNote: "Sideline-to-sideline leader of the defense with pick-six speed.",
  },
  "owen-heinecke-38": {
    fortyYd: 4.65, benchReps: 22, verticalIn: 33, broadIn: 117, threeCone: 7.05, talent: 78,
    scoutingNote: "Instinctive walk-on-made-good who racks up tackles.",
  },
  "cole-sullivan-18": {
    fortyYd: 4.62, benchReps: 20, verticalIn: 34, broadIn: 120, threeCone: 7.02, talent: 77,
    scoutingNote: "Michigan transfer with length and blitz juice.",
  },
  "taylor-heim-7": {
    fortyYd: 4.68, benchReps: 19, verticalIn: 34, broadIn: 120, threeCone: 7.05, talent: 74,
    scoutingNote: "6'5\" hybrid backer with edge flexibility.",
  },

  // ── Defensive backs ─────────────────────────────────────────────
  "peyton-bowen-22": {
    fortyYd: 4.42, benchReps: 15, verticalIn: 38, broadIn: 127, threeCone: 6.85, talent: 86,
    scoutingNote: "Former five-star safety — elite range, return skills, and closing burst.",
  },
  "eli-bowen-23": {
    fortyYd: 4.42, benchReps: 13, verticalIn: 35, broadIn: 120, threeCone: 6.80, talent: 80,
    scoutingNote: "Sticky slot corner who plays much bigger than his frame.",
  },
  "jacobe-johnson-24": {
    fortyYd: 4.45, benchReps: 15, verticalIn: 36, broadIn: 124, threeCone: 6.95, talent: 79,
    scoutingNote: "Two-sport athlete with rare length for the boundary.",
  },
  "courtland-guillory-4": {
    fortyYd: 4.40, benchReps: 13, verticalIn: 36, broadIn: 123, threeCone: 6.90, talent: 80,
    scoutingNote: "Ascending press corner with track speed.",
  },
  "reggie-powers-iii-3": {
    fortyYd: 4.50, benchReps: 17, verticalIn: 35, broadIn: 121, threeCone: 7.00, talent: 78,
    scoutingNote: "Physical nickel/safety hybrid who thrives near the box.",
  },
  "omarion-robinson-2": {
    fortyYd: 4.48, benchReps: 17, verticalIn: 35, broadIn: 120, threeCone: 7.00, talent: 76,
    scoutingNote: "Downhill safety with linebacker physicality.",
  },
  "michael-boganowski-25": {
    fortyYd: 4.50, benchReps: 16, verticalIn: 35, broadIn: 122, threeCone: 7.00, talent: 77,
    scoutingNote: "Big-framed safety with special-teams core value.",
  },

  // ── Specialists ─────────────────────────────────────────────────
  "tate-sandell-29": {
    fortyYd: 4.90, benchReps: 10, verticalIn: 28, broadIn: 100, threeCone: 7.50, talent: 84,
    scoutingNote: "Lou Groza finalist — automatic from 50+ with a pro-ready leg.",
  },
  "jacob-ulrich-87": {
    fortyYd: 5.00, benchReps: 12, verticalIn: 28, broadIn: 102, threeCone: 7.50, talent: 75,
    scoutingNote: "Big-legged punter with strong hang-time numbers.",
  },
};
