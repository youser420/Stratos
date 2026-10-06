"use server";

import { revalidatePath } from "next/cache";

import {
  createPersonalGoalSchema,
  logParticipationSchema,
  setPersonalGoalStatusSchema,
  updatePersonalGoalSchema,
} from "@/features/community-hub/schemas";
import { AppError } from "@/server/errors";
import { getServerSession } from "@/server/auth/session";
import {
  createPersonalGoal,
  getLocalOpportunities,
  logCommunityParticipation,
  setPersonalGoalStatus,
  updatePersonalGoal,
  type LocalOpportunitiesResult,
} from "@/server/services/community";

export type CommunityHubActionResult = { success: true } | { success: false; error: string };

async function requireSessionUserId() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  return session.user.id;
}

function revalidateCommunity() {
  revalidatePath("/home/community");
  revalidatePath("/home");
}

export async function createPersonalGoalAction(input: unknown): Promise<CommunityHubActionResult> {
  try {
    const parsed = createPersonalGoalSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    await createPersonalGoal(userId, parsed.data);
    revalidateCommunity();

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't create that goal." };
  }
}

export async function updatePersonalGoalAction(input: unknown): Promise<CommunityHubActionResult> {
  try {
    const parsed = updatePersonalGoalSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    const { goalId, ...rest } = parsed.data;
    const result = await updatePersonalGoal(userId, goalId, rest);

    if (!result) {
      return { success: false, error: "Goal not found." };
    }

    revalidateCommunity();

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't update that goal." };
  }
}

export async function setPersonalGoalStatusAction(
  input: unknown,
): Promise<CommunityHubActionResult> {
  try {
    const parsed = setPersonalGoalStatusSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    const result = await setPersonalGoalStatus(userId, parsed.data.goalId, parsed.data.status);

    if (!result) {
      return { success: false, error: "Goal not found." };
    }

    revalidateCommunity();

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't update that goal." };
  }
}

/**
 * Section 9/16: location is entirely optional and checked client-side —
 * this action never requests location itself, only reacts to what the
 * browser's own permission prompt already told the client.
 */
export async function getLocalOpportunitiesAction(
  hasLocationPermission: boolean,
): Promise<LocalOpportunitiesResult> {
  await requireSessionUserId();

  return getLocalOpportunities(hasLocationPermission);
}

export async function logParticipationAction(input: unknown): Promise<CommunityHubActionResult> {
  try {
    const parsed = logParticipationSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const userId = await requireSessionUserId();
    await logCommunityParticipation(userId, parsed.data);
    revalidateCommunity();

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Couldn't log that." };
  }
}
