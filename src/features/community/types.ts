export type JourneyBoardMilestoneType =
  | "streak"
  | "personal_best"
  | "goal"
  | "consistency"
  | "program";

export type JourneyBoardHighlight = {
  id: string;
  title: string;
  description: string;
  milestoneType: JourneyBoardMilestoneType;
  memberLabel: string;
  timeframe: string;
};
