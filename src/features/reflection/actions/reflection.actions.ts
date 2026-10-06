"use server";

import { revalidatePath } from "next/cache";

import { reflectionInputSchema } from "@/features/reflection/schemas";
import { AppError } from "@/server/errors";
import { getServerSession } from "@/server/auth/session";
import { saveReflectionDraft, submitTodaysReflection } from "@/server/services/reflection";

export type ReflectionActionResult = { success: true } | { success: false; error: string };

async function requireSessionUserId() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  return session.user.id;
}

export async function saveReflectionDraftAction(input: unknown): Promise<ReflectionActionResult> {
  try {
    const parsed = reflectionInputSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    await saveReflectionDraft(userId, parsed.data);
    revalidatePath("/home/reflection");
    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't save your draft." };
  }
}

export async function submitReflectionAction(input: unknown): Promise<ReflectionActionResult> {
  try {
    const parsed = reflectionInputSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    await submitTodaysReflection(userId, parsed.data);
    revalidatePath("/home/reflection");
    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't submit today's Reflection." };
  }
}
