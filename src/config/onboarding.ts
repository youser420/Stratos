export const ONBOARDING_STEP_IDS = [
  "goals",
  "experience",
  "schedule",
  "equipment",
  "constraints",
  "preferences",
] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEP_IDS)[number];

export type OnboardingStepConfig = {
  id: OnboardingStepId;
  path: `/onboarding/${OnboardingStepId}`;
  title: string;
  description: string;
  stepNumber: number;
};

export const ONBOARDING_STEPS: readonly OnboardingStepConfig[] = [
  {
    id: "goals",
    path: "/onboarding/goals",
    title: "Your goals",
    description: "What do you want to achieve with Stratos?",
    stepNumber: 1,
  },
  {
    id: "experience",
    path: "/onboarding/experience",
    title: "Training experience",
    description: "Help Koach calibrate intensity and progression.",
    stepNumber: 2,
  },
  {
    id: "schedule",
    path: "/onboarding/schedule",
    title: "Your schedule",
    description: "When can you realistically train each week?",
    stepNumber: 3,
  },
  {
    id: "equipment",
    path: "/onboarding/equipment",
    title: "Available equipment",
    description: "Tell us what you have access to for workouts.",
    stepNumber: 4,
  },
  {
    id: "constraints",
    path: "/onboarding/constraints",
    title: "Constraints and limitations",
    description: "Injuries or limitations Koach should remember.",
    stepNumber: 5,
  },
  {
    id: "preferences",
    path: "/onboarding/preferences",
    title: "Preferences",
    description: "Nutrition and training preferences for personalization.",
    stepNumber: 6,
  },
] as const;

export const ONBOARDING_COMPLETE_PATH = "/onboarding/complete" as const;

export const ONBOARDING_ENTRY_PATH = "/onboarding" as const;

export const ONBOARDING_FORM_STEP_COUNT = ONBOARDING_STEPS.length;

export const ONBOARDING_COMPLETE_COOKIE = "stratos_onboarding_complete";

export function getStepConfig(stepId: OnboardingStepId): OnboardingStepConfig {
  const step = ONBOARDING_STEPS.find((item) => item.id === stepId);

  if (!step) {
    throw new Error(`Unknown onboarding step: ${stepId}`);
  }

  return step;
}

export function getStepPath(stepId: OnboardingStepId): `/onboarding/${OnboardingStepId}` {
  return getStepConfig(stepId).path;
}

export function getStepIndexFromPath(pathname: string): number {
  const step = ONBOARDING_STEPS.find((item) => pathname === item.path);

  if (step) {
    return step.stepNumber;
  }

  if (pathname === ONBOARDING_COMPLETE_PATH) {
    return ONBOARDING_FORM_STEP_COUNT;
  }

  return 1;
}

export function getPreviousStepPath(
  stepId: OnboardingStepId,
): `/onboarding/${OnboardingStepId}` | null {
  const index = ONBOARDING_STEP_IDS.indexOf(stepId);

  if (index <= 0) {
    return null;
  }

  return getStepPath(ONBOARDING_STEP_IDS[index - 1]!);
}

export function getNextStepPath(
  stepId: OnboardingStepId,
): `/onboarding/${OnboardingStepId}` | typeof ONBOARDING_COMPLETE_PATH {
  const index = ONBOARDING_STEP_IDS.indexOf(stepId);

  if (index === -1 || index === ONBOARDING_STEP_IDS.length - 1) {
    return ONBOARDING_COMPLETE_PATH;
  }

  return getStepPath(ONBOARDING_STEP_IDS[index + 1]!);
}

export function isOnboardingStepId(value: string): value is OnboardingStepId {
  return ONBOARDING_STEP_IDS.includes(value as OnboardingStepId);
}

export function getStepIdFromPathname(pathname: string): OnboardingStepId | null {
  const step = ONBOARDING_STEPS.find((item) => item.path === pathname);

  return step?.id ?? null;
}
