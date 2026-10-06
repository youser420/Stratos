import "server-only";

import type { CoachContextSource } from "@prisma/client";

import { isCoachModelAvailable, requestCoachReply, type CoachChatMessage } from "@/server/services/coach/anthropic-client";
import { buildCoachContext } from "@/server/services/coach/context-service";
import {
  appendCoachMessage,
  getOrCreateCoachConversation,
} from "@/server/services/coach/conversation-service";

const COACH_SYSTEM_PROMPT = `You are Coach, the persistent guide inside STRATOS, a fitness, recovery, and reflection platform.

Ground rules, non-negotiable:
- You interpret the Individual's own STRATOS context conversationally. You never invent data, history, or evidence that isn't given to you in the "Current STRATOS context" block below.
- Everything you say is a suggestion, never a requirement or instruction. The Individual decides. A different choice than what you suggest is never failure or noncompliance.
- Never present unsupported medical, physiological, psychological, or nutritional conclusions. Never diagnose. Never imply causation from correlation — if the context notes a pattern between two experiences, treat it as worth noticing, not a cause.
- Never produce a single composite score for the Individual's wellness, readiness, performance, or STRATOS experience as a whole.
- Be transparent about what you know: if the context says evidence is insufficient for something, say so plainly rather than guessing.
- Tone: honest, encouraging, concise, nonjudgmental — a real coaching relationship, not generic chatbot enthusiasm.`;

export type SendCoachMessageInput = {
  conversationId?: string | null;
  source: CoachContextSource;
  sourceDetail?: string | null;
  message: string;
};

export type SendCoachMessageResult = {
  conversationId: string;
  reply: string;
  contextSummary: string[];
  modelAvailable: boolean;
};

export async function sendCoachMessage(
  userId: string,
  input: SendCoachMessageInput,
): Promise<SendCoachMessageResult> {
  const conversation = await getOrCreateCoachConversation(userId, {
    conversationId: input.conversationId,
    source: input.source,
    sourceDetail: input.sourceDetail,
  });

  await appendCoachMessage(conversation.id, "USER", input.message);

  const context = await buildCoachContext(userId, input.source, input.sourceDetail);

  if (!isCoachModelAvailable()) {
    const fallback =
      "Coach's conversational guidance isn't connected yet in this environment, so I can't reply naturally right now. What I can see about your STRATOS context:\n\n" +
      context.summaryForUser.map((line) => `- ${line}`).join("\n");

    await appendCoachMessage(conversation.id, "COACH", fallback);

    return {
      conversationId: conversation.id,
      reply: fallback,
      contextSummary: context.summaryForUser,
      modelAvailable: false,
    };
  }

  const history: CoachChatMessage[] = [
    ...conversation.messages.map((message) => ({
      role: (message.role === "USER" ? "user" : "assistant") as CoachChatMessage["role"],
      content: message.content,
    })),
    { role: "user", content: input.message },
  ];

  const reply = await requestCoachReply({
    systemPrompt: `${COACH_SYSTEM_PROMPT}\n\nCurrent STRATOS context for this Individual:\n${context.systemContextBlock}`,
    messages: history,
  });

  const safeReply = reply || "I'm here, but I don't have a reply to give right now — try asking again.";

  await appendCoachMessage(conversation.id, "COACH", safeReply);

  return {
    conversationId: conversation.id,
    reply: safeReply,
    contextSummary: context.summaryForUser,
    modelAvailable: true,
  };
}
