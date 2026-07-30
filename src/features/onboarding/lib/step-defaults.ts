import type { OnboardingProfile } from "@prisma/client";

import {
  constraintsSchema,
  equipmentSchema,
  experienceSchema,
  goalsSchema,
  preferencesSchema,
  scheduleSchema,
} from "@/features/onboarding/schemas";

function parseJsonStep<T>(
  value: unknown,
  schema: { safeParse: (input: unknown) => { success: boolean; data?: T } },
): T | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  const parsed = schema.safeParse(value);

  return parsed.success ? parsed.data : undefined;
}

export function getGoalsDefaults(profile: OnboardingProfile | null) {
  return parseJsonStep(profile?.goals, goalsSchema);
}

export function getExperienceDefaults(profile: OnboardingProfile | null) {
  return parseJsonStep(profile?.experience, experienceSchema);
}

export function getScheduleDefaults(profile: OnboardingProfile | null) {
  return parseJsonStep(profile?.schedule, scheduleSchema);
}

export function getEquipmentDefaults(profile: OnboardingProfile | null) {
  return parseJsonStep(profile?.equipment, equipmentSchema);
}

export function getConstraintsDefaults(profile: OnboardingProfile | null) {
  return parseJsonStep(profile?.constraints, constraintsSchema);
}

export function getPreferencesDefaults(profile: OnboardingProfile | null) {
  return parseJsonStep(profile?.preferences, preferencesSchema);
}
