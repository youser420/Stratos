"use server";

import { revalidatePath } from "next/cache";

import {
  abandonRecoverySessionSchema,
  completeRecoverySessionSchema,
  startRecoverySessionSchema,
} from "@/features/recovery/schemas";
import { AppError } from "@/server/errors";
import { getServerSession } from "@/server/auth/session";
import {
  abandonRecoverySession,
  completeRecoverySession,
  startRecoverySession,
} from "@/server/services/recovery";

export type RecoveryActionResult = { success: true } | { success: false; error: string };

async function requireSessionUserId() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  return session.user.id;
}

export async function startRecoverySessionAction(input: unknown): Promise<RecoveryActionResult> {
  try {
    const parsed = startRecoverySessionSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    await startRecoverySession(userId, parsed.data.discipline);
    revalidatePath("/home/recovery");
    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't start that Recovery session." };
  }
}

export async function completeRecoverySessionAction(input: unknown): Promise<RecoveryActionResult> {
  try {
    const parsed = completeRecoverySessionSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    const result = await completeRecoverySession(userId, parsed.data.sessionId, {
      durationMinutes: parsed.data.durationMinutes,
      notes: parsed.data.notes,
    });

    if (!result) {
      return { success: false, error: "Session not found." };
    }

    revalidatePath("/home/recovery");
    revalidatePath("/home/recovery/analytics");
    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't complete that Recovery session." };
  }
}

export async function abandonRecoverySessionAction(input: unknown): Promise<RecoveryActionResult> {
  try {
    const parsed = abandonRecoverySessionSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    const result = await abandonRecoverySession(userId, parsed.data.sessionId);

    if (!result) {
      return { success: false, error: "Session not found." };
    }

    revalidatePath("/home/recovery");
    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't update that Recovery session." };
  }
}
