import "server-only";

import type { RecoveryDiscipline } from "@prisma/client";

import { prisma } from "@/server/db/prisma";
import { startOfUtcDaysAgo } from "@/utils/date";

const ANALYTICS_WINDOW_DAYS = 28;

export type RecoveryDisciplineBreakdown = {
  discipline: RecoveryDiscipline;
  completedCount: number;
  totalMinutes: number;
};

export type RecoveryAnalytics = {
  hasEvidence: boolean;
  windowDays: number;
  totalCompleted: number;
  byDiscipline: RecoveryDisciplineBreakdown[];
};

export async function getRecoveryAnalytics(userId: string): Promise<RecoveryAnalytics> {
  const since = startOfUtcDaysAgo(ANALYTICS_WINDOW_DAYS);

  const sessions = await prisma.recoverySession.findMany({
    where: { userId, status: "COMPLETED", completedAt: { gte: since } },
    orderBy: { completedAt: "desc" },
  });

  if (sessions.length === 0) {
    return {
      hasEvidence: false,
      windowDays: ANALYTICS_WINDOW_DAYS,
      totalCompleted: 0,
      byDiscipline: [],
    };
  }

  const byDisciplineMap = new Map<RecoveryDiscipline, RecoveryDisciplineBreakdown>();

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

  return {
    hasEvidence: true,
    windowDays: ANALYTICS_WINDOW_DAYS,
    totalCompleted: sessions.length,
    byDiscipline: Array.from(byDisciplineMap.values()),
  };
}
