import {
  LegalPageContent,
  cookiesMetadata,
  cookiesPolicy,
} from "@/features/legal";

export const metadata = cookiesMetadata;

export default function CookiesPage() {
  return <LegalPageContent document={cookiesPolicy} showCookieCategories />;
}
