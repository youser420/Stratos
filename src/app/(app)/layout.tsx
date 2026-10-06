import { redirect } from "next/navigation";

import { AppLayout } from "@/components/layouts/app-layout";
import { getGreeting } from "@/features/landing";
import { isOnboardingComplete } from "@/server/auth/onboarding-gate";
import { getServerSession } from "@/server/auth/session";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/home");
  }

  const complete = await isOnboardingComplete(session.user.id);

  if (!complete) {
    redirect("/onboarding");
  }

  return <AppLayout greeting={getGreeting(session.user.name)}>{children}</AppLayout>;
}
