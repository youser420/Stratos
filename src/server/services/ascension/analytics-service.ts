import "server-only";

import type { AscensionDiscipline } from "@prisma/client";

import { prisma } from "@/server/db/prisma";
import { startOfUtcDaysAgo } from "@/utils/date";

const ANALYTICS_WINDOW_DAYS = 28;

export type AscensionDisciplineBreakdown = {
  discipline: AscensionDiscipline;
  completedCount: number;
  totalMinutes: number;
};

export type AscensionAnalytics = {
  hasEvidence: boolean;
  windowDays: number;
  totalCompleted: number;
  currentStreakDays: number;
  byDiscipline: AscensionDisciplineBreakdown[];
};

/**
 * Detailed Ascension evidence. Per section 17 (Analytics Transfer Rules),
 * this is the detailed layer — it stays here rather than duplicating onto
 * the Landing Page or Basecamp, which receive only selected synthesis.
 */
export async function getAscensionAnalytics(userId: string): Promise<AscensionAnalytics> {
  const since = startOfUtcDaysAgo(ANALYTICS_WINDOW_DAYS);

  const sessions = await prisma.ascensionSession.findMany({
    where: { userId, status: "COMPLETED", completedAt: { gte: since } },
    orderBy: { completedAt: "desc" },
  });

  if (sessions.length === 0) {
    return {
      hasEvidence: false,
      windowDays: ANALYTICS_WINDOW_DAYS,
      totalCompleted: 0,
      currentStreakDays: 0,
      byDiscipline: [],
    };
  }

  const byDisciplineMap = new Map<AscensionDiscipline, AscensionDisciplineBreakdown>();

  for (const session of sessions) {
    const existing = byDisciplineMap.get(session.discipline) ?? {
      discipline: session.discipline,
      completedCount: 0,
      totalMinutes: 0,
    };

    existing.completedCount += 1;
    existing.totalMinutes += session.durationMinutes ?? 0;
    byDisciplineMap.set(session.discipline, existing);
  }

  const completedDays = new Set(
    sessions
      .map((s) => s.completedAt?.toISOString().slice(0, 10))
      .filter((d): d is string => Boolean(d)),
  );

  let streak = 0;
  const cursor = new Date();

  for (;;) {
    const key = cursor.toISOString().slice(0, 10);
    if (!completedDays.has(key)) {
      break;
    }
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  return {
    hasEvidence: true,
    windowDays: ANALYTICS_WINDOW_DAYS,
    totalCompleted: sessions.length,
    currentStreakDays: streak,
    byDiscipline: Array.from(byDisciplineMap.values()),
  };
}
