import { redirect } from "next/navigation";

import { PreferencesStepForm } from "@/features/onboarding";
import { getPreferencesDefaults } from "@/features/onboarding/lib/step-defaults";
import { getServerSession } from "@/server/auth/session";
import { getOrCreateOnboardingProfile } from "@/server/services/onboarding";

export default async function PreferencesStepPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/onboarding/preferences");
  }

  const profile = await getOrCreateOnboardingProfile(session.user.id);

  return (
    <PreferencesStepForm defaultValues={getPreferencesDefaults(profile)} />
  );
}
