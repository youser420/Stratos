import { redirect } from "next/navigation";

import { EquipmentStepForm } from "@/features/onboarding";
import { getEquipmentDefaults } from "@/features/onboarding/lib/step-defaults";
import { getServerSession } from "@/server/auth/session";
import { getOrCreateOnboardingProfile } from "@/server/services/onboarding";

export default async function EquipmentStepPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/onboarding/equipment");
  }

  const profile = await getOrCreateOnboardingProfile(session.user.id);

  return <EquipmentStepForm defaultValues={getEquipmentDefaults(profile)} />;
}
