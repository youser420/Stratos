import { redirect } from "next/navigation";

import { ScheduleStepForm } from "@/features/onboarding";
import { getScheduleDefaults } from "@/features/onboarding/lib/step-defaults";
import { getServerSession } from "@/server/auth/session";
import { getOrCreateOnboardingProfile } from "@/server/services/onboarding";

export default async function ScheduleStepPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/onboarding/schedule");
  }

  const profile = await getOrCreateOnboardingProfile(session.user.id);

  return <ScheduleStepForm defaultValues={getScheduleDefaults(profile)} />;
}
