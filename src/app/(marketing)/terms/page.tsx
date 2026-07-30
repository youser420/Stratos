import { LegalPageContent, termsMetadata, termsOfService } from "@/features/legal";

export const metadata = termsMetadata;

export default function TermsPage() {
  return <LegalPageContent document={termsOfService} />;
}
