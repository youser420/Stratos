import "server-only";

import Anthropic from "@anthropic-ai/sdk";

import { env } from "@/config/env";

let client: Anthropic | null = null;

export function isCoachModelAvailable(): boolean {
  return Boolean(env.ANTHROPIC_API_KEY);
}

function getClient(): Anthropic {
  if (!env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  client ??= new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  return client;
}

const COACH_MODEL = "claude-sonnet-4-5" as const;
const MAX_RESPONSE_TOKENS = 600;

export type CoachChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function requestCoachReply(input: {
  systemPrompt: string;
  messages: CoachChatMessage[];
}): Promise<string> {
  const anthropic = getClient();

  const response = await anthropic.messages.create({
    model: COACH_MODEL,
    max_tokens: MAX_RESPONSE_TOKENS,
    system: input.systemPrompt,
    messages: input.messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
  });

  const textBlock = response.content.find((block) => block.type === "text");

  return textBlock?.text ?? "";
}
