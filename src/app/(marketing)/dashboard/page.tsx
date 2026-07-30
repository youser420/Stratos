import { redirect } from "next/navigation";

import { DashboardContent, dashboardMetadata } from "@/features/dashboard";
import { isOnboardingComplete } from "@/server/auth/onboarding-gate";
import { getServerSession } from "@/server/auth/session";

export const metadata = dashboardMetadata;

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const onboardingComplete = await isOnboardingComplete(session.user.id);

  if (!onboardingComplete) {
    redirect("/onboarding");
  }

  return (
    <DashboardContent userName={session.user.name} />
  );
}
