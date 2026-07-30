"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ONBOARDING_COMPLETE_COOKIE,
  ONBOARDING_COMPLETE_PATH,
  getNextStepPath,
  isOnboardingStepId,
  type OnboardingStepId,
} from "@/config/onboarding";
import {
  constraintsSchema,
  equipmentSchema,
  experienceSchema,
  goalsSchema,
  preferencesSchema,
  scheduleSchema,
} from "@/features/onboarding/schemas";
import { AppError } from "@/server/errors";
import { getServerSession } from "@/server/auth/session";
import {
  getOrCreateOnboardingProfile,
  markOnboardingComplete,
  saveOnboardingStepData,
} from "@/server/services/onboarding";
import type { z } from "zod";

const stepSchemas = {
  goals: goalsSchema,
  experience: experienceSchema,
  schedule: scheduleSchema,
  equipment: equipmentSchema,
  constraints: constraintsSchema,
  preferences: preferencesSchema,
} as const satisfies Record<OnboardingStepId, z.ZodType>;

export type SaveOnboardingStepResult = { success: false; error: string };

export type CompleteOnboardingResult =
  | { success: true }
  | { success: false; error: string };

async function requireSessionUserId() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  return session.user.id;
}

function getFirstIncompleteStepMessage(
  profile: Awaited<ReturnType<typeof getOrCreateOnboardingProfile>>,
): string | null {
  for (const stepId of Object.keys(stepSchemas) as OnboardingStepId[]) {
    if (profile[stepId] === null) {
      return `Finish the ${stepId} step before completing onboarding.`;
    }
  }

  return null;
}

async function saveOnboardingStepInternal(
  stepId: OnboardingStepId,
  input: unknown,
): Promise<SaveOnboardingStepResult | void> {
  try {
    if (!isOnboardingStepId(stepId)) {
      return { success: false, error: "Invalid onboarding step" };
    }

    const userId = await requireSessionUserId();
    const schema = stepSchemas[stepId];
    const parsed = schema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    await saveOnboardingStepData(userId, stepId, parsed.data);
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Unable to save onboarding step" };
  }

  redirect(getNextStepPath(stepId));
}

export async function saveGoalsStep(input: unknown) {
  return saveOnboardingStepInternal("goals", input);
}

export async function saveExperienceStep(input: unknown) {
  return saveOnboardingStepInternal("experience", input);
}

export async function saveScheduleStep(input: unknown) {
  return saveOnboardingStepInternal("schedule", input);
}

export async function saveEquipmentStep(input: unknown) {
  return saveOnboardingStepInternal("equipment", input);
}

export async function saveConstraintsStep(input: unknown) {
  return saveOnboardingStepInternal("constraints", input);
}

export async function savePreferencesStep(input: unknown): Promise<SaveOnboardingStepResult | void> {
  try {
    const userId = await requireSessionUserId();
    const parsed = preferencesSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const profile = await saveOnboardingStepData(userId, "preferences", parsed.data);
    const incompleteMessage = getFirstIncompleteStepMessage(profile);

    if (incompleteMessage) {
      return { success: false, error: incompleteMessage };
    }

    await markOnboardingComplete(userId);

    const cookieStore = await cookies();
    cookieStore.set(ONBOARDING_COMPLETE_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Unable to complete onboarding" };
  }

  redirect(ONBOARDING_COMPLETE_PATH);
}

export async function completeOnboarding(): Promise<CompleteOnboardingResult> {
  try {
    const userId = await requireSessionUserId();
    const profile = await getOrCreateOnboardingProfile(userId);

    for (const stepId of Object.keys(stepSchemas) as OnboardingStepId[]) {
      if (profile[stepId] === null) {
        const message = getFirstIncompleteStepMessage(profile);
        return { success: false, error: message ?? "Finish all onboarding steps first." };
      }
    }

    await markOnboardingComplete(userId);

    const cookieStore = await cookies();
    cookieStore.set(ONBOARDING_COMPLETE_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Unable to complete onboarding" };
  }
}

export async function ensureOnboardingComplete() {
  const result = await completeOnboarding();

  if (!result.success) {
    throw new AppError(result.error, "ONBOARDING_INCOMPLETE", 400);
  }
}
