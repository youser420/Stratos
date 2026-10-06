import { redirect } from "next/navigation";

import { BasecampContent, basecampMetadata } from "@/features/basecamp";
import { getServerSession } from "@/server/auth/session";
import { getBasecampSnapshot } from "@/server/services/basecamp";

export const metadata = basecampMetadata;

export default async function BasecampPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/home/basecamp");
  }

  const snapshot = await getBasecampSnapshot(session.user.id);

  return <BasecampContent snapshot={snapshot} />;
}
