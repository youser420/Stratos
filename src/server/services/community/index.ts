export {
  getLocalOpportunities,
  getNonLocationOpportunities,
  type LocalOpportunitiesResult,
  type OutreachOpportunity,
} from "@/server/services/community/outreach-service";
export {
  getParticipationSummary,
  getRecentParticipation,
  logCommunityParticipation,
  type ParticipationSummary,
} from "@/server/services/community/participation-service";
export {
  createPersonalGoal,
  getPersonalGoals,
  setPersonalGoalStatus,
  updatePersonalGoal,
} from "@/server/services/community/goals-service";
export {
  createJourneyMilestone,
  getJourneyMilestones,
} from "@/server/services/community/milestones-service";
