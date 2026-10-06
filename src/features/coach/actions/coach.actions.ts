"use server";

import { sendCoachMessageSchema } from "@/features/coach/schemas";
import { AppError } from "@/server/errors";
import { getServerSession } from "@/server/auth/session";
import { sendCoachMessage } from "@/server/services/coach";

export type SendCoachMessageActionResult =
  | {
      success: true;
      conversationId: string;
      reply: string;
      contextSummary: string[];
      modelAvailable: boolean;
    }
  | { success: false; error: string };

async function requireSessionUserId() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  return session.user.id;
}

export async function sendCoachMessageAction(
  input: unknown,
): Promise<SendCoachMessageActionResult> {
  try {
    const parsed = sendCoachMessageSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    const result = await sendCoachMessage(userId, parsed.data);

    return {
      success: true,
      conversationId: result.conversationId,
      reply: result.reply,
      contextSummary: result.contextSummary,
      modelAvailable: result.modelAvailable,
    };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Coach couldn't respond right now. Try again in a moment." };
  }
}
