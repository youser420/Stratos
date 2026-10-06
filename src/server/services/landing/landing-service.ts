import "server-only";

import { getActiveAscensionSession, getSuggestedAscensionDiscipline } from "@/server/services/ascension";
import { getBasecampSnapshot } from "@/server/services/basecamp";
import { isCoachModelAvailable } from "@/server/services/coach";
import { getPersonalGoals } from "@/server/services/community/goals-service";
import { getTodaysReflection } from "@/server/services/reflection";
import { getActiveRecoverySession, getSuggestedRecoveryDiscipline } from "@/server/services/recovery";

export type LandingState = {
  greetingName: string | null;
  today: string;
  ascension: {
    activeSession: Awaited<ReturnType<typeof getActiveAscensionSession>>;
    suggestion: Awaited<ReturnType<typeof getSuggestedAscensionDiscipline>>;
  };
  recovery: {
    activeSession: Awaited<ReturnType<typeof getActiveRecoverySession>>;
    suggestion: Awaited<ReturnType<typeof getSuggestedRecoveryDiscipline>>;
  };
  reflection: {
    hasSubmittedToday: boolean;
    hasDraftToday: boolean;
  };
  community: {
    hasActiveGoals: boolean;
  };
  basecamp: {
    hasMeaningfulUpdate: boolean;
  };
  coach: {
    available: boolean;
  };
};

/**
 * Section 4 (Landing Page State): "At entry, STRATOS should load the
 * Individual's current high-level context where available... If sufficient
 * evidence does not exist for a recommendation, STRATOS should present a
 * neutral state rather than inventing one." Every field here is either a
 * real record or an explicit absence — never a guess.
 */
export async function getLandingState(userId: string, userName: string | null): Promise<LandingState> {
  const [
    activeAscension,
    ascensionSuggestion,
    activeRecovery,
    recoverySuggestion,
    todaysReflection,
    goals,
    basecamp,
  ] = await Promise.all([
    getActiveAscensionSession(userId),
    getSuggestedAscensionDiscipline(userId),
    getActiveRecoverySession(userId),
    getSuggestedRecoveryDiscipline(userId),
    getTodaysReflection(userId),
    getPersonalGoals(userId),
    getBasecampSnapshot(userId),
  ]);

  return {
    greetingName: userName,
    today: new Date().toISOString(),
    ascension: {
      activeSession: activeAscension,
      suggestion: ascensionSuggestion,
    },
    recovery: {
      activeSession: activeRecovery,
      suggestion: recoverySuggestion,
    },
    reflection: {
      hasSubmittedToday: Boolean(todaysReflection && !todaysReflection.isDraft),
      hasDraftToday: Boolean(todaysReflection?.isDraft),
    },
    community: {
      hasActiveGoals: goals.some((goal) => goal.status === "ACTIVE"),
    },
    basecamp: {
      hasMeaningfulUpdate: basecamp.hasAnyEvidence,
    },
    coach: {
      available: isCoachModelAvailable(),
    },
  };
}
