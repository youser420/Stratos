import "server-only";

import { getAscensionAnalytics } from "@/server/services/ascension";
import { getJourneyMilestones } from "@/server/services/community/milestones-service";
import { getParticipationSummary } from "@/server/services/community/participation-service";
import { getReflectionAnalytics } from "@/server/services/reflection";
import { getRecoveryAnalytics } from "@/server/services/recovery";

export type BasecampInsight = {
  id: string;
  /** The STRATOS experiences this insight draws on. */
  evidenceFrom: ("ascension" | "recovery" | "reflection" | "community" | "journey")[];
  /** Plain statement of the evidence itself — not an interpretation. */
  evidence: string;
  /** Context/pattern noticed in that evidence. */
  pattern: string;
  /** Whether this spans more than one experience (a "relationship", section 7). */
  isCrossExperience: boolean;
};

export type BasecampSnapshot = {
  hasAnyEvidence: boolean;
  insights: BasecampInsight[];
  recentMilestoneCount: number;
};

/**
 * Section 7 (Basecamp Governing Analytics Principle):
 *   Evidence → Context → Pattern → Relationship → Interpretation
 *   not: Data → Judgment → Composite Score
 *
 * Deliberately returns a list of small, explainable, evidence-linked
 * statements rather than any single STRATOS/wellness/readiness/performance
 * score. Cross-experience statements are always phrased as correlation,
 * never causation, per section 7.
 */
export async function getBasecampSnapshot(userId: string): Promise<BasecampSnapshot> {
  const [ascension, recovery, reflection, participation, milestones] = await Promise.all([
    getAscensionAnalytics(userId),
    getRecoveryAnalytics(userId),
    getReflectionAnalytics(userId),
    getParticipationSummary(userId),
    getJourneyMilestones(userId, 5),
  ]);

  const insights: BasecampInsight[] = [];

  if (ascension.hasEvidence) {
    insights.push({
      id: "ascension-consistency",
      evidenceFrom: ["ascension"],
      evidence: `${ascension.totalCompleted} completed Ascension session${ascension.totalCompleted === 1 ? "" : "s"} in the last ${ascension.windowDays} days.`,
      pattern:
        ascension.currentStreakDays > 1
          ? `You're on a ${ascension.currentStreakDays}-day streak of activity.`
          : "Activity has been occasional rather than consistent — neither good nor bad, just what's there.",
      isCrossExperience: false,
    });
  }

  if (recovery.hasEvidence) {
    insights.push({
      id: "recovery-consistency",
      evidenceFrom: ["recovery"],
      evidence: `${recovery.totalCompleted} completed Recovery session${recovery.totalCompleted === 1 ? "" : "s"} in the last ${recovery.windowDays} days.`,
      pattern:
        recovery.byDiscipline.length > 1
          ? `You've used ${recovery.byDiscipline.length} different Recovery disciplines.`
          : `Your Recovery activity has centered on ${recovery.byDiscipline[0]?.discipline ?? "one discipline"}.`,
      isCrossExperience: false,
    });
  }

  if (ascension.hasEvidence && recovery.hasEvidence) {
    insights.push({
      id: "ascension-recovery-pairing",
      evidenceFrom: ["ascension", "recovery"],
      evidence: `${ascension.totalCompleted} Ascension and ${recovery.totalCompleted} Recovery sessions in the same ${ascension.windowDays}-day window.`,
      pattern:
        recovery.totalCompleted >= ascension.totalCompleted
          ? "Your Recovery activity has kept pace with your Ascension activity — a consistent pairing, not a guarantee of anything."
          : "Ascension activity has outpaced Recovery activity in this window. Worth noticing, not a verdict.",
      isCrossExperience: true,
    });
  }

  if (reflection.hasEvidence) {
    insights.push({
      id: "reflection-pattern",
      evidenceFrom: ["reflection"],
      evidence: `${reflection.entryCount} Reflection entries in the last ${reflection.windowDays} days, most often tagged "${reflection.dominantMood}".`,
      pattern:
        reflection.crossExperienceNote ??
        "A recurring tag in your recent Reflections — shown as a pattern, not a diagnosis.",
      isCrossExperience: Boolean(reflection.crossExperienceNote),
    });
  }

  if (participation.hasEvidence) {
    insights.push({
      id: "community-participation",
      evidenceFrom: ["community"],
      evidence: `${participation.totalCount} voluntary Community interactions in the last ${participation.windowDays} days.`,
      pattern: "Participation is optional and shown here only as a record, never a score.",
      isCrossExperience: false,
    });
  }

  return {
    hasAnyEvidence: insights.length > 0,
    insights,
    recentMilestoneCount: milestones.length,
  };
}
