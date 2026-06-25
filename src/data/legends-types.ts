export interface LegendStat {
  label: string;
  value: string;
}

export interface SoonersLegend {
  id: string;
  name: string;
  nickname?: string;
  position: string;
  years: string;
  category: "heisman" | "icon" | "defense" | "offense";
  honors: string[];
  bio: string;
  stats: LegendStat[];
  /** Local artistic portrait for Legend Land */
  portrait?: string;
  imageCredit?: string;
}

export interface ChampionshipTeam {
  year: number;
  record: string;
  coach: string;
  apRank: string;
  bowl?: string;
  bowlResult?: string;
  highlights: string[];
  keyPlayers: string[];
  sourceUrl: string;
}
