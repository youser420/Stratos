import "server-only";

import type { MilestoneSource } from "@prisma/client";

import { prisma } from "@/server/db/prisma";

export async function getJourneyMilestones(userId: string, limit = 20) {
  return prisma.journeyMilestone.findMany({
    where: { userId },
    orderBy: { occurredAt: "desc" },
    take: limit,
  });
}

/**
 * Section 9: "Where a milestone is derived automatically, the supporting
 * evidence should remain identifiable." `sourceRefId` keeps that trace.
 * Milestones are never user-authored directly — they represent progress
 * already experienced, derived from an approved STRATOS experience (e.g. a
 * completed Personal Goal). See community goals-service.ts for the one
 * wired trigger in this build.
 */
export async function createJourneyMilestone(
  userId: string,
  input: { title: string; description?: string; source: MilestoneSource; sourceRefId?: string },
) {
  return prisma.journeyMilestone.create({
    data: {
      userId,
      title: input.title,
      description: input.description,
      source: input.source,
      sourceRefId: input.sourceRefId,
    },
  });
}
