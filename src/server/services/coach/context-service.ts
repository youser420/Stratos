import "server-only";

import type { CoachContextSource } from "@prisma/client";

import { getActiveAscensionSession, getSuggestedAscensionDiscipline } from "@/server/services/ascension";
import { getBasecampSnapshot } from "@/server/services/basecamp";
import { getPersonalGoals } from "@/server/services/community/goals-service";
import { getJourneyMilestones } from "@/server/services/community/milestones-service";
import { getReflectionAnalytics, getTodaysReflection } from "@/server/services/reflection";
import { getActiveRecoverySession, getSuggestedRecoveryDiscipline } from "@/server/services/recovery";

export type CoachContext = {
  /** Plain-language lines shown to the Individual so they know what Coach is considering (section 11). */
  summaryForUser: string[];
  /** Same information, formatted for the model's system prompt. */
  systemContextBlock: string;
};

/**
 * Section 11: "Coach may use legitimate current STRATOS context. The
 * Individual should be able to understand what context Coach is
 * considering... should not invent unavailable data." Every line here is
 * drawn directly from a real record; when something isn't available, the
 * line says so explicitly instead of being omitted silently.
 */
export async function buildCoachContext(
  userId: string,
  source: CoachContextSource,
  sourceDetail?: string | null,
): Promise<CoachContext> {
  const [todaysReflection, activeAscension, activeRecovery, ascensionSuggestion, recoverySuggestion, basecamp, goals, milestones] =
    await Promise.all([
      getTodaysReflection(userId),
      getActiveAscensionSession(userId),
      getActiveRecoverySession(userId),
      getSuggestedAscensionDiscipline(userId),
      getSuggestedRecoveryDiscipline(userId),
      getBasecampSnapshot(userId),
      getPersonalGoals(userId),
      getJourneyMilestones(userId, 3),
    ]);

  const reflectionAnalytics = await getReflectionAnalytics(userId);

  const lines: string[] = [];

  lines.push(`Coach was opened from: ${describeSource(source, sourceDetail)}.`);

  lines.push(
    todaysReflection
      ? `Today's Reflection: ${todaysReflection.isDraft ? "started, not yet submitted" : "submitted"}${
          todaysReflection.moodTag ? ` (tagged "${todaysReflection.moodTag}")` : ""
        }.`
      : "Today's Reflection: not started.",
  );

  lines.push(
    activeAscension
      ? `Active Ascension session in progress: ${activeAscension.discipline}, started ${activeAscension.startedAt.toISOString()}.`
      : ascensionSuggestion
        ? `No active Ascension session. Suggested discipline: ${ascensionSuggestion.discipline} (${ascensionSuggestion.rationale})`
        : "No active Ascension session and not enough history yet for a suggestion.",
  );

  lines.push(
    activeRecovery
      ? `Active Recovery session in progress: ${activeRecovery.discipline}, started ${activeRecovery.startedAt.toISOString()}.`
      : recoverySuggestion
        ? `No active Recovery session. Suggested discipline: ${recoverySuggestion.discipline} (${recoverySuggestion.rationale})`
        : "No active Recovery session and not enough history yet for a suggestion.",
  );

  const activeGoals = goals.filter((goal) => goal.status === "ACTIVE");
  lines.push(
    activeGoals.length > 0
      ? `Active Personal Goals: ${activeGoals.map((g) => g.title).join("; ")}.`
      : "No active Personal Goals set.",
  );

  lines.push(
    milestones.length > 0
      ? `Recent Journey Milestones: ${milestones.map((m) => m.title).join("; ")}.`
      : "No Journey Milestones recorded yet.",
  );

  lines.push(
    basecamp.hasAnyEvidence
      ? `Basecamp patterns currently available: ${basecamp.insights.map((i) => i.pattern).join(" ")}`
      : "Basecamp does not have enough cross-experience evidence yet.",
  );

  lines.push(
    reflectionAnalytics.hasEvidence
      ? `Reflection pattern: most frequently tagged "${reflectionAnalytics.dominantMood}" over the last ${reflectionAnalytics.windowDays} days.`
      : "Not enough Reflection history yet for a pattern.",
  );

  return {
    summaryForUser: lines,
    systemContextBlock: lines.map((line) => `- ${line}`).join("\n"),
  };
}

function describeSource(source: CoachContextSource, detail?: string | null): string {
  const base: Record<CoachContextSource, string> = {
    LANDING: "the STRATOS Landing Page",
    BASECAMP: "Basecamp",
    REFLECTION: "Reflection",
    ASCENSION: "Ascension",
    RECOVERY: "Recovery",
    COMMUNITY: "Community",
    DIRECT: "Coach directly",
  };

  const label = base[source];

  return detail ? `${label} (${detail})` : label;
}
