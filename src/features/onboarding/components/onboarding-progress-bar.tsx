"use client";

import { usePathname } from "next/navigation";

import { OnboardingProgress } from "@/components/common/onboarding-progress";
import {
  ONBOARDING_FORM_STEP_COUNT,
  getStepIndexFromPath,
} from "@/config/onboarding";

export function OnboardingProgressBar() {
  const pathname = usePathname();
  const currentStep = getStepIndexFromPath(pathname);

  return (
    <OnboardingProgress
      currentStep={currentStep}
      totalSteps={ONBOARDING_FORM_STEP_COUNT}
    />
  );
}
