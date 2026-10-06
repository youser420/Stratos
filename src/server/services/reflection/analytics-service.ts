import "server-only";

import { prisma } from "@/server/db/prisma";
import { startOfUtcDaysAgo } from "@/utils/date";

const ANALYTICS_WINDOW_DAYS = 28;
const MIN_ENTRIES_FOR_PATTERN = 5;

export type ReflectionAnalytics = {
  hasEvidence: boolean;
  windowDays: number;
  entryCount: number;
  moodFrequency: { moodTag: string; count: number }[];
  dominantMood: string | null;
  /** A plain, evidence-linked observation — never framed as a cause. */
  crossExperienceNote: string | null;
};

/**
 * Section 8 (Reflection Analytics): "Should identify insufficient evidence
 * rather than forcing a trend... Should not diagnose medical or
 * psychological conditions... Should not convert Reflection into a
 * performance or wellness score." This only ever reports counts and plain
 * co-occurrence language — never a diagnosis, score, or causal claim.
 */
export async function getReflectionAnalytics(userId: string): Promise<ReflectionAnalytics> {
  const since = startOfUtcDaysAgo(ANALYTICS_WINDOW_DAYS);

  const entries = await prisma.reflection.findMany({
    where: { userId, isDraft: false, reflectionDate: { gte: since } },
    orderBy: { reflectionDate: "desc" },
  });

  if (entries.length < MIN_ENTRIES_FOR_PATTERN) {
    return {
      hasEvidence: false,
      windowDays: ANALYTICS_WINDOW_DAYS,
      entryCount: entries.length,
      moodFrequency: [],
      dominantMood: null,
      crossExperienceNote: null,
    };
  }

  const moodCounts = new Map<string, number>();

  for (const entry of entries) {
    if (!entry.moodTag) continue;
    moodCounts.set(entry.moodTag, (moodCounts.get(entry.moodTag) ?? 0) + 1);
  }

  const moodFrequency = Array.from(moodCounts.entries())
    .map(([moodTag, count]) => ({ moodTag, count }))
    .sort((a, b) => b.count - a.count);

  const dominantMood = moodFrequency[0]?.moodTag ?? null;

  const [ascensionCount, recoveryCount] = await Promise.all([
    prisma.ascensionSession.count({
      where: { userId, status: "COMPLETED", completedAt: { gte: since } },
    }),
    prisma.recoverySession.count({
      where: { userId, status: "COMPLETED", completedAt: { gte: since } },
    }),
  ]);

  let crossExperienceNote: string | null = null;

  if (dominantMood && (ascensionCount > 0 || recoveryCount > 0)) {
    crossExperienceNote = `In the same ${ANALYTICS_WINDOW_DAYS} days you most often logged "${dominantMood}", you also completed ${ascensionCount} Ascension and ${recoveryCount} Recovery session${
      ascensionCount + recoveryCount === 1 ? "" : "s"
    }. This is a pattern worth noticing, not a cause-and-effect conclusion.`;
  }

  return {
    hasEvidence: true,
    windowDays: ANALYTICS_WINDOW_DAYS,
    entryCount: entries.length,
    moodFrequency,
    dominantMood,
    crossExperienceNote,
  };
}
