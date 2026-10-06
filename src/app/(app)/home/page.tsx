import { redirect } from "next/navigation";

import { LandingContent, landingMetadata } from "@/features/landing";
import { getServerSession } from "@/server/auth/session";
import { getLandingState } from "@/server/services/landing";

export const metadata = landingMetadata;

export default async function HomePage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/home");
  }

  const landingState = await getLandingState(session.user.id, session.user.name);

  return <LandingContent landingState={landingState} />;
}
