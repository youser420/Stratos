import "server-only";

import type { AscensionDiscipline } from "@prisma/client";

import { prisma } from "@/server/db/prisma";
import { startOfUtcDaysAgo } from "@/utils/date";

const SUGGESTION_LOOKBACK_DAYS = 14;

export async function getActiveAscensionSession(userId: string) {
  return prisma.ascensionSession.findFirst({
    where: { userId, status: "ACTIVE" },
    orderBy: { startedAt: "desc" },
  });
}

export async function startAscensionSession(
  userId: string,
  discipline: AscensionDiscipline,
) {
  return prisma.ascensionSession.create({
    data: { userId, discipline, status: "ACTIVE" },
  });
}

export async function completeAscensionSession(
  userId: string,
  sessionId: string,
  input: { durationMinutes?: number; notes?: string },
) {
  const session = await prisma.ascensionSession.findFirst({
    where: { id: sessionId, userId },
  });

  if (!session) {
    return null;
  }

  return prisma.ascensionSession.update({
    where: { id: sessionId },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      durationMinutes: input.durationMinutes,
      notes: input.notes,
    },
  });
}

export async function abandonAscensionSession(userId: string, sessionId: string) {
  const session = await prisma.ascensionSession.findFirst({
    where: { id: sessionId, userId },
  });

  if (!session) {
    return null;
  }

  return prisma.ascensionSession.update({
    where: { id: sessionId },
    data: { status: "ABANDONED" },
  });
}

export async function getRecentAscensionSessions(userId: string, limit = 20) {
  return prisma.ascensionSession.findMany({
    where: { userId, status: "COMPLETED" },
    orderBy: { completedAt: "desc" },
    take: limit,
  });
}

export type AscensionSuggestion = {
  discipline: AscensionDiscipline;
  rationale: string;
};

/**
 * Section 5: "The suggestion may use available history, progression, Recovery
 * context, and current choices. The recommendation is not a requirement."
 *
 * Returns null when there isn't enough evidence to support a suggestion — the
 * caller should show a neutral invitation instead (section 14), never invent one.
 */
export async function getSuggestedAscensionDiscipline(
  userId: string,
): Promise<AscensionSuggestion | null> {
  const since = startOfUtcDaysAgo(SUGGESTION_LOOKBACK_DAYS);

  const recent = await prisma.ascensionSession.findMany({
    where: { userId, status: "COMPLETED", completedAt: { gte: since } },
    orderBy: { completedAt: "desc" },
  });

  if (recent.length === 0) {
    return null;
  }

  const lastCompletedByDiscipline = new Map<AscensionDiscipline, Date>();

  for (const session of recent) {
    if (session.completedAt && !lastCompletedByDiscipline.has(session.discipline)) {
      lastCompletedByDiscipline.set(session.discipline, session.completedAt);
    }
  }

  const allDisciplines: AscensionDiscipline[] = ["RUN", "PRIME", "PUMP"];
  const neverDone = allDisciplines.find((d) => !lastCompletedByDiscipline.has(d));

  if (neverDone) {
    return {
      discipline: neverDone,
      rationale: `You haven't logged a ${neverDone} session in the last ${SUGGESTION_LOOKBACK_DAYS} days.`,
    };
  }

  let oldest: AscensionDiscipline = allDisciplines[0]!;
  let oldestDate = lastCompletedByDiscipline.get(oldest)!;

  for (const discipline of allDisciplines) {
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
