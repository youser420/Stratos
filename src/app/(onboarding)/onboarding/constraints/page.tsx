import { redirect } from "next/navigation";

import { ConstraintsStepForm } from "@/features/onboarding";
import { getConstraintsDefaults } from "@/features/onboarding/lib/step-defaults";
import { getServerSession } from "@/server/auth/session";
import { getOrCreateOnboardingProfile } from "@/server/services/onboarding";

export default async function ConstraintsStepPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/onboarding/constraints");
  }

  const profile = await getOrCreateOnboardingProfile(session.user.id);

  return <ConstraintsStepForm defaultValues={getConstraintsDefaults(profile)} />;
}
