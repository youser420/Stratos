"use server";

import { revalidatePath } from "next/cache";

import {
  abandonAscensionSessionSchema,
  completeAscensionSessionSchema,
  startAscensionSessionSchema,
} from "@/features/ascension/schemas";
import { AppError } from "@/server/errors";
import { getServerSession } from "@/server/auth/session";
import {
  abandonAscensionSession,
  completeAscensionSession,
  startAscensionSession,
} from "@/server/services/ascension";

export type AscensionActionResult =
  | { success: true }
  | { success: false; error: string };

async function requireSessionUserId() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  return session.user.id;
}

export async function startAscensionSessionAction(input: unknown): Promise<AscensionActionResult> {
  try {
    const parsed = startAscensionSessionSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    await startAscensionSession(userId, parsed.data.discipline);
    revalidatePath("/home/ascension");
    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't start that Ascension session." };
  }
}

export async function completeAscensionSessionAction(
  input: unknown,
): Promise<AscensionActionResult> {
  try {
    const parsed = completeAscensionSessionSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    const result = await completeAscensionSession(userId, parsed.data.sessionId, {
      durationMinutes: parsed.data.durationMinutes,
      notes: parsed.data.notes,
    });

    if (!result) {
      return { success: false, error: "Session not found." };
    }

    revalidatePath("/home/ascension");
    revalidatePath("/home/ascension/analytics");
    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't complete that Ascension session." };
  }
}

export async function abandonAscensionSessionAction(
  input: unknown,
): Promise<AscensionActionResult> {
  try {
    const parsed = abandonAscensionSessionSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    const result = await abandonAscensionSession(userId, parsed.data.sessionId);

    if (!result) {
      return { success: false, error: "Session not found." };
    }

    revalidatePath("/home/ascension");
    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't update that Ascension session." };
  }
}
