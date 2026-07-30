import { redirect } from "next/navigation";

import { AuthLayout } from "@/components/layouts/auth-layout";
import { syncOnboardingCompleteCookie } from "@/features/auth/actions/auth.actions";
import { getPostAuthRedirectPath } from "@/server/auth/onboarding-gate";
import { getServerSession } from "@/server/auth/session";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (session?.user) {
    await syncOnboardingCompleteCookie();
    redirect(await getPostAuthRedirectPath(session.user.id));
  }

  return <AuthLayout>{children}</AuthLayout>;
}
