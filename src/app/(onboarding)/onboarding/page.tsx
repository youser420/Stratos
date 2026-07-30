import { redirect } from "next/navigation";

import { getServerSession } from "@/server/auth/session";
import {
  getOrCreateOnboardingProfile,
  getResumePath,
} from "@/server/services/onboarding";

export default async function OnboardingIndexPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/onboarding");
  }

  const profile = await getOrCreateOnboardingProfile(session.user.id);

  redirect(getResumePath(profile));
}
