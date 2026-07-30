import { redirect } from "next/navigation";

import { ExperienceStepForm } from "@/features/onboarding";
import { getExperienceDefaults } from "@/features/onboarding/lib/step-defaults";
import { getServerSession } from "@/server/auth/session";
import { getOrCreateOnboardingProfile } from "@/server/services/onboarding";

export default async function ExperienceStepPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/onboarding/experience");
  }

  const profile = await getOrCreateOnboardingProfile(session.user.id);

  return <ExperienceStepForm defaultValues={getExperienceDefaults(profile)} />;
}
