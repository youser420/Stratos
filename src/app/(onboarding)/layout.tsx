import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { OnboardingLayout } from "@/components/layouts/onboarding-layout";
import { ONBOARDING_COMPLETE_PATH } from "@/config/onboarding";
import { isOnboardingComplete } from "@/server/auth/onboarding-gate";
import { getServerSession } from "@/server/auth/session";

const PATHNAME_HEADER = "x-pathname";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/onboarding");
  }

  const pathname = (await headers()).get(PATHNAME_HEADER) ?? "";
  const isCompletePage = pathname === ONBOARDING_COMPLETE_PATH;
  const complete = await isOnboardingComplete(session.user.id);

  if (complete && !isCompletePage) {
    redirect("/home");
  }

  return <OnboardingLayout>{children}</OnboardingLayout>;
}
