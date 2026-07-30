import { redirect } from "next/navigation";

import { OnboardingCompleteContent } from "@/features/onboarding";
import { getServerSession } from "@/server/auth/session";
import {
  getOrCreateOnboardingProfile,
  getResumePath,
  isOnboardingProfileComplete,
} from "@/server/services/onboarding";

export default async function OnboardingCompletePage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/onboarding/complete");
  }

  const profile = await getOrCreateOnboardingProfile(session.user.id);

  if (!isOnboardingProfileComplete(profile)) {
    redirect(getResumePath(profile));
  }

  return <OnboardingCompleteContent />;
}
