import { redirect } from "next/navigation";

/**
 * `/dashboard` is superseded by the STRATOS Landing Page at `/home` (see
 * docs/implementation/STRATOS_LANDING_PAGE_ARCHITECTURE.md). This redirect
 * stays so old links and bookmarks keep working.
 */
export default function DashboardPage() {
  redirect("/home");
}
