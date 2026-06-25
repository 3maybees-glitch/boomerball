export interface ScheduleGame {
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
  isNeutral?: boolean;
  result?: "W" | "L";
  score?: string;
  record?: string;
  attendance?: number;
  conference?: boolean;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  positionGroup: "QB" | "RB" | "WR" | "TE" | "OL" | "DL" | "LB" | "DB" | "ST";
  height: string;
  weight: number;
  classYear: string;
  hometown: string;
  highSchool?: string;
  bio: string;
  espnId?: number;
  imageCredit?: string;
  /** High school composite star rating (247/On3/ESPN), when available */
  recruitStars?: number;
  /** Previous college if arrived via transfer portal */
  transferFrom?: string;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  bio: string;
  yearsAtOu: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  sourceUrl: string;
  category: "recruiting" | "game" | "team" | "offseason";
}

export interface TeamStats {
  record: string;
  conferenceRecord: string;
  pointsPerGame: number;
  pointsAllowedPerGame: number;
  totalYardsPerGame: number;
  rushingYardsPerGame: number;
  passingYardsPerGame: number;
  sacks: number;
  interceptions: number;
  tackles: number;
}

export interface PassingStat {
  player: string;
  number: number;
  gp: number;
  comp: number;
  att: number;
  yards: number;
  td: number;
  int: number;
  rating: number;
  pct: number;
}

export interface RushingStat {
  player: string;
  number: number;
  att: number;
  yards: number;
  avg: number;
  td: number;
  long: number;
}

export interface ReceivingStat {
  player: string;
  number: number;
  rec: number;
  yards: number;
  avg: number;
  td: number;
  long: number;
}

export interface DefenseStat {
  player: string;
  number: number;
  position: string;
  solo: number;
  ast: number;
  tot: number;
  sacks: number;
  int: number;
  pd: number;
}

export interface AdvancedMetric {
  label: string;
  value: string | number;
  rank?: string;
  description: string;
  category: "offense" | "defense" | "special" | "efficiency";
}
