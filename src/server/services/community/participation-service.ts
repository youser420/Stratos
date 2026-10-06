import "server-only";

import type { ParticipationType } from "@prisma/client";

import { prisma } from "@/server/db/prisma";
import { startOfUtcDaysAgo } from "@/utils/date";

const ANALYTICS_WINDOW_DAYS = 90;

export async function logCommunityParticipation(
  userId: string,
  input: { type: ParticipationType; title: string },
) {
  return prisma.communityParticipation.create({
    data: { userId, type: input.type, title: input.title },
  });
}

export async function getRecentParticipation(userId: string, limit = 20) {
  return prisma.communityParticipation.findMany({
    where: { userId },
    orderBy: { occurredAt: "desc" },
    take: limit,
  });
}

export type ParticipationSummary = {
  hasEvidence: boolean;
  windowDays: number;
  totalCount: number;
  byType: { type: ParticipationType; count: number }[];
};

/**
 * Section 9: "May show frequency and types of voluntary participation over
 * time... Does not create a Community score, popularity score, or
 * participation requirement. An isolated absence or low participation
 * should not be interpreted negatively." This returns counts only — no
 * score, no ranking, no comparison to other users.
 */
export async function getParticipationSummary(userId: string): Promise<ParticipationSummary> {
  const since = startOfUtcDaysAgo(ANALYTICS_WINDOW_DAYS);

  const entries = await prisma.communityParticipation.findMany({
    where: { userId, occurredAt: { gte: since } },
  });

  if (entries.length === 0) {
    return { hasEvidence: false, windowDays: ANALYTICS_WINDOW_DAYS, totalCount: 0, byType: [] };
  }

  const counts = new Map<ParticipationType, number>();

  for (const entry of entries) {
    counts.set(entry.type, (counts.get(entry.type) ?? 0) + 1);
  }

  return {
    hasEvidence: true,
    windowDays: ANALYTICS_WINDOW_DAYS,
    totalCount: entries.length,
    byType: Array.from(counts.entries()).map(([type, count]) => ({ type, count })),
  };
}
