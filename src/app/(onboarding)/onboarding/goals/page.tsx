import { redirect } from "next/navigation";

import { GoalsStepForm } from "@/features/onboarding";
import { getGoalsDefaults } from "@/features/onboarding/lib/step-defaults";
import { getServerSession } from "@/server/auth/session";
import { getOrCreateOnboardingProfile } from "@/server/services/onboarding";

export default async function GoalsStepPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/onboarding/goals");
  }

  const profile = await getOrCreateOnboardingProfile(session.user.id);

  return <GoalsStepForm defaultValues={getGoalsDefaults(profile)} />;
}
