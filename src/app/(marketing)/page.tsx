import { redirect } from "next/navigation";

import { HomePageContent, homeMetadata } from "@/features/marketing";
import { getPostAuthRedirectPath } from "@/server/auth/onboarding-gate";
import { getServerSession } from "@/server/auth/session";

export const metadata = homeMetadata;

export default async function HomePage() {
  const session = await getServerSession();

  if (session?.user) {
    redirect(await getPostAuthRedirectPath(session.user.id));
  }

  return <HomePageContent />;
}
