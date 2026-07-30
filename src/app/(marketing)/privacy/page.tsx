import { LegalPageContent, privacyMetadata, privacyPolicy } from "@/features/legal";

export const metadata = privacyMetadata;

export default function PrivacyPage() {
  return <LegalPageContent document={privacyPolicy} />;
}
