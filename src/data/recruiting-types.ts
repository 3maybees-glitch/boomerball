export type RecruitingPositionGroup =
  | "QB"
  | "RB"
  | "WR"
  | "TE"
  | "OL"
  | "DL"
  | "EDGE"
  | "LB"
  | "DB";

export interface ServiceRank {
  national?: number;
  stars?: number;
}

export interface RecruitingCommit {
  id: string;
  name: string;
  position: string;
  positionGroup: RecruitingPositionGroup;
  highSchool: string;
  hometown: string;
  height: string;
  weight: number;
  commitDate: string;
  on3: ServiceRank;
  twoFourSeven: ServiceRank;
  espn: ServiceRank;
}

export interface ClassServiceSummary {
  nationalRank: number;
  classScore?: number;
  commits: number;
  blueChips?: number;
  label: string;
}

export interface RecruitingClass {
  year: number;
  updatedAt: string;
  on3: ClassServiceSummary;
  twoFourSeven: ClassServiceSummary;
  espn: ClassServiceSummary;
  commits: RecruitingCommit[];
}
