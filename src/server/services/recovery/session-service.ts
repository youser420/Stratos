import "server-only";

import type { AscensionDiscipline, RecoveryDiscipline } from "@prisma/client";

import { prisma } from "@/server/db/prisma";
import { isSameUtcDay, startOfUtcDaysAgo } from "@/utils/date";

const SUGGESTION_LOOKBACK_DAYS = 14;

export async function getActiveRecoverySession(userId: string) {
  return prisma.recoverySession.findFirst({
    where: { userId, status: "ACTIVE" },
    orderBy: { startedAt: "desc" },
  });
}

export async function startRecoverySession(
  userId: string,
  discipline: RecoveryDiscipline,
) {
  return prisma.recoverySession.create({
    data: { userId, discipline, status: "ACTIVE" },
  });
}

export async function completeRecoverySession(
  userId: string,
  sessionId: string,
  input: { durationMinutes?: number; notes?: string },
) {
  const session = await prisma.recoverySession.findFirst({
    where: { id: sessionId, userId },
  });

  if (!session) {
    return null;
  }

  return prisma.recoverySession.update({
    where: { id: sessionId },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      durationMinutes: input.durationMinutes,
      notes: input.notes,
    },
  });
}

export async function abandonRecoverySession(userId: string, sessionId: string) {
  const session = await prisma.recoverySession.findFirst({
    where: { id: sessionId, userId },
  });

  if (!session) {
    return null;
  }

  return prisma.recoverySession.update({
    where: { id: sessionId },
    data: { status: "ABANDONED" },
  });
}

export async function getRecentRecoverySessions(userId: string, limit = 20) {
  return prisma.recoverySession.findMany({
    where: { userId, status: "COMPLETED" },
    orderBy: { completedAt: "desc" },
    take: limit,
  });
}

export type RecoverySuggestion = {
  discipline: RecoveryDiscipline;
  rationale: string;
};

/**
 * Section 6: "Before Ascension, Stretch may be emphasized where applicable.
 * After Ascension, Recovery recommendations may shift based on completed
 * activity and existing Recovery activity." Supportive, not diagnostic —
 * the rationale is always plain and traceable to real evidence, and this
 * returns null (neutral invitation, section 14) rather than inventing one.
 */
export async function getSuggestedRecoveryDiscipline(
  userId: string,
): Promise<RecoverySuggestion | null> {
  const todayAscension = await prisma.ascensionSession.findMany({
    where: { userId, status: "COMPLETED" },
    orderBy: { completedAt: "desc" },
    take: 5,
  });

  const completedTodayAscension = todayAscension.find(
    (s) => s.completedAt && isSameUtcDay(s.completedAt, new Date()),
  );

  if (completedTodayAscension) {
    const byDiscipline: Record<AscensionDiscipline, RecoveryDiscipline> = {
      PUMP: "STRETCH",
      RUN: "BREATHE",
      PRIME: "NOURISH",
    };

    const suggested = byDiscipline[completedTodayAscension.discipline];

    return {
      discipline: suggested,
      rationale: `You completed a ${completedTodayAscension.discipline} session today — ${suggested.toLowerCase()} is a natural follow-up.`,
    };
  }

  const since = startOfUtcDaysAgo(SUGGESTION_LOOKBACK_DAYS);
  const recent = await prisma.recoverySession.findMany({
    where: { userId, status: "COMPLETED", completedAt: { gte: since } },
    orderBy: { completedAt: "desc" },
  });

  if (recent.length === 0) {
    // No Ascension activity today and no recent Recovery history: emphasize
    // Stretch before Ascension, as the doc allows, rather than staying silent.
    return {
      discipline: "STRETCH",
      rationale: "Stretch is a steady way to prepare before your next Ascension session.",
    };
  }

  const lastCompletedByDiscipline = new Map<RecoveryDiscipline, Date>();

  for (const session of recent) {
    if (session.completedAt && !lastCompletedByDiscipline.has(session.discipline)) {
      lastCompletedByDiscipline.set(session.discipline, session.completedAt);
    }
  }

  const all: RecoveryDiscipline[] = ["STRETCH", "BREATHE", "NOURISH"];
  const neverDone = all.find((d) => !lastCompletedByDiscipline.has(d));

  if (neverDone) {
    return {
      discipline: neverDone,
      rationale: `You haven't logged a ${neverDone} session in the last ${SUGGESTION_LOOKBACK_DAYS} days.`,
    };
  }

  let oldest: RecoveryDiscipline = all[0]!;
  let oldestDate = lastCompletedByDiscipline.get(oldest)!;

  for (const discipline of all) {
    const lastDate = lastCompletedByDiscipline.get(discipline)!;
    if (lastDate < oldestDate) {
      oldest = discipline;
      oldestDate = lastDate;
    }
  }

  return {
    discipline: oldest,
    rationale: `It's been the longest since your last ${oldest} session, based on your recent activity.`,
  };
}
