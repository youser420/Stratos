import "server-only";

import {
  getOnboardingProfile,
  isOnboardingProfileComplete,
} from "@/server/services/onboarding";

export async function isOnboardingComplete(userId: string): Promise<boolean> {
  const profile = await getOnboardingProfile(userId);

  return isOnboardingProfileComplete(profile);
}

export async function getPostAuthRedirectPath(userId: string): Promise<string> {
  const complete = await isOnboardingComplete(userId);

  return complete ? "/dashboard" : "/onboarding";
}
