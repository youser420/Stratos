import {
  VerifyEmailPageContent,
  verifyEmailMetadata,
} from "@/features/auth";

export const metadata = verifyEmailMetadata;

type VerifyEmailPageProps = {
  searchParams: Promise<{
    error?: string;
    verified?: string;
  }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams;

  return (
    <VerifyEmailPageContent
      error={params.error}
      verified={params.verified}
    />
  );
}
