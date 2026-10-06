import "server-only";

import type { GoalStatus } from "@prisma/client";

import { prisma } from "@/server/db/prisma";
import { createJourneyMilestone } from "@/server/services/community/milestones-service";

export async function getPersonalGoals(userId: string) {
  return prisma.personalGoal.findMany({
    where: { userId },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });
}

export async function createPersonalGoal(
  userId: string,
  input: { title: string; description?: string; targetDate?: Date },
) {
  return prisma.personalGoal.create({
    data: {
      userId,
      title: input.title,
      description: input.description,
      targetDate: input.targetDate,
    },
  });
}

export async function updatePersonalGoal(
  userId: string,
  goalId: string,
  input: { title?: string; description?: string; targetDate?: Date | null },
) {
  const goal = await prisma.personalGoal.findFirst({ where: { id: goalId, userId } });

  if (!goal) {
    return null;
  }

  return prisma.personalGoal.update({
    where: { id: goalId },
    data: {
      title: input.title,
      description: input.description,
      targetDate: input.targetDate,
    },
  });
}

/**
 * Section 9: "The Individual creates, edits, completes, pauses, or retires
 * goals... STRATOS should not treat an unmet goal as failure or
 * noncompliance." Pausing or retiring a goal is a neutral status change,
 * never logged or framed as a shortfall. Completing one is meaningful
 * progress, so it also creates a traceable Journey Milestone.
 */
export async function setPersonalGoalStatus(
  userId: string,
  goalId: string,
  status: GoalStatus,
) {
  const goal = await prisma.personalGoal.findFirst({ where: { id: goalId, userId } });

  if (!goal) {
    return null;
  }

  const updated = await prisma.personalGoal.update({
    where: { id: goalId },
    data: {
      status,
      completedAt: status === "COMPLETED" ? new Date() : goal.completedAt,
    },
  });

  if (status === "COMPLETED" && goal.status !== "COMPLETED") {
    await createJourneyMilestone(userId, {
      title: `Completed goal: ${goal.title}`,
      description: goal.description ?? undefined,
      source: "GOAL",
      sourceRefId: goal.id,
    });
  }

  return updated;
}
