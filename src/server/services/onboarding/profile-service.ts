import "server-only";

import type { OnboardingProfile, Prisma } from "@prisma/client";

import {
  ONBOARDING_COMPLETE_PATH,
  ONBOARDING_STEP_IDS,
  getNextStepPath,
  getStepPath,
  type OnboardingStepId,
} from "@/config/onboarding";
import { prisma } from "@/server/db/prisma";

type OnboardingProfileRecord = OnboardingProfile;

function getStepData(profile: OnboardingProfileRecord, stepId: OnboardingStepId) {
  return profile[stepId];
}

function isStepComplete(
  profile: OnboardingProfileRecord,
  stepId: OnboardingStepId,
): boolean {
  return getStepData(profile, stepId) !== null;
}

export function getFirstIncompleteStep(
  profile: OnboardingProfileRecord,
): OnboardingStepId {
  for (const stepId of ONBOARDING_STEP_IDS) {
    if (!isStepComplete(profile, stepId)) {
      return stepId;
    }
  }

  return "preferences";
}

export function getResumePath(profile: OnboardingProfileRecord): string {
  if (profile.completedAt) {
    return ONBOARDING_COMPLETE_PATH;
  }

  return getStepPath(getFirstIncompleteStep(profile));
}

export async function getOrCreateOnboardingProfile(userId: string) {
  return prisma.onboardingProfile.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      currentStep: "goals",
    },
  });
}

export async function getOnboardingProfile(userId: string) {
  return prisma.onboardingProfile.findUnique({
    where: { userId },
  });
}

export async function saveOnboardingStepData(
  userId: string,
  stepId: OnboardingStepId,
  data: Prisma.InputJsonValue,
) {
  const nextStep = getNextStepPath(stepId);
  const currentStep =
    nextStep === ONBOARDING_COMPLETE_PATH ? "preferences" : nextStep.slice("/onboarding/".length);

  return prisma.onboardingProfile.upsert({
    where: { userId },
    update: {
      [stepId]: data,
      currentStep,
    },
    create: {
      userId,
      [stepId]: data,
      currentStep,
    },
  });
}

export async function markOnboardingComplete(userId: string) {
  return prisma.onboardingProfile.upsert({
    where: { userId },
    update: {
      completedAt: new Date(),
      currentStep: "preferences",
    },
    create: {
      userId,
      completedAt: new Date(),
      currentStep: "preferences",
    },
  });
}

export function isOnboardingProfileComplete(
  profile: OnboardingProfileRecord | null,
): boolean {
  return Boolean(profile?.completedAt);
}
