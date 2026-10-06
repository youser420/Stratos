import "server-only";

import type { CoachContextSource, CoachMessageRole } from "@prisma/client";

import { prisma } from "@/server/db/prisma";

export async function getCoachConversation(userId: string, conversationId: string) {
  return prisma.coachConversation.findFirst({
    where: { id: conversationId, userId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
}

export async function getOrCreateCoachConversation(
  userId: string,
  input: { conversationId?: string | null; source: CoachContextSource; sourceDetail?: string | null },
) {
  if (input.conversationId) {
    const existing = await getCoachConversation(userId, input.conversationId);
    if (existing) {
      return existing;
    }
  }

  const created = await prisma.coachConversation.create({
    data: {
      userId,
      sourceContext: input.source,
      sourceDetail: input.sourceDetail,
    },
    include: { messages: true },
  });

  return created;
}

export async function appendCoachMessage(
  conversationId: string,
  role: CoachMessageRole,
  content: string,
) {
  const [message] = await prisma.$transaction([
    prisma.coachMessage.create({ data: { conversationId, role, content } }),
    prisma.coachConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    }),
  ]);

  return message;
}

export async function getRecentCoachConversations(userId: string, limit = 10) {
  return prisma.coachConversation.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });
}
