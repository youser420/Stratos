import "server-only";

import { prisma } from "@/server/db/prisma";
import { toUtcDateOnly } from "@/utils/date";

export type ReflectionInput = {
  promptResponse?: string;
  moodTag?: string;
};

function todayKey(): Date {
  return toUtcDateOnly(new Date());
}

export async function getTodaysReflection(userId: string) {
  return prisma.reflection.findUnique({
    where: { userId_reflectionDate: { userId, reflectionDate: todayKey() } },
  });
}

/**
 * Section 8: "Reflection should remain voluntary, concise, nonjudgmental,
 * and easy to leave or return to." Saving a draft is how a partially
 * completed Current Check-In stays recoverable (section 12) rather than
 * being silently discarded.
 */
export async function saveReflectionDraft(userId: string, input: ReflectionInput) {
  const reflectionDate = todayKey();

  return prisma.reflection.upsert({
    where: { userId_reflectionDate: { userId, reflectionDate } },
    update: {
      promptResponse: input.promptResponse,
      moodTag: input.moodTag,
      isDraft: true,
    },
    create: {
      userId,
      reflectionDate,
      promptResponse: input.promptResponse,
      moodTag: input.moodTag,
      isDraft: true,
    },
  });
}

export async function submitTodaysReflection(userId: string, input: ReflectionInput) {
  const reflectionDate = todayKey();

  return prisma.reflection.upsert({
    where: { userId_reflectionDate: { userId, reflectionDate } },
    update: {
      promptResponse: input.promptResponse,
      moodTag: input.moodTag,
      isDraft: false,
      submittedAt: new Date(),
    },
    create: {
      userId,
      reflectionDate,
      promptResponse: input.promptResponse,
      moodTag: input.moodTag,
      isDraft: false,
      submittedAt: new Date(),
    },
  });
}

export async function getReflectionHistory(userId: string, limit = 30) {
  return prisma.reflection.findMany({
    where: { userId, isDraft: false },
    orderBy: { reflectionDate: "desc" },
    take: limit,
  });
}
