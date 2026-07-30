import Link from "next/link";

import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type VerifyEmailStatus = "pending" | "success" | "expired";

type VerifyEmailContentProps = {
  status: VerifyEmailStatus;
};

const statusCopy: Record<
  VerifyEmailStatus,
  { title: string; description: string }
> = {
  pending: {
    title: "Verify your email",
    description:
      "We sent a verification link to your email. Open the link to continue to onboarding.",
  },
  success: {
    title: "Email verified",
    description:
      "Your email is verified. You can continue to onboarding and download the app.",
  },
  expired: {
    title: "Verification link expired",
    description:
      "This verification link is no longer valid. Request a new verification email or sign in again.",
  },
};

export function VerifyEmailContent({ status }: VerifyEmailContentProps) {
  const copy = statusCopy[status];

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <Typography variant="h1">{copy.title}</Typography>
        <Typography variant="lead">{copy.description}</Typography>
      </div>
      {status === "pending" ? (
        <Typography variant="muted" className="text-xs">
          {/* TODO: Wire resend verification when Better Auth email flow is configured */}
          Didn&apos;t receive an email? Check spam or contact support.
        </Typography>
      ) : null}
      <div className="flex flex-col gap-3">
        {status === "success" ? (
          <Link href="/onboarding" className={cn(buttonVariants({ size: "lg" }), "justify-center")}>
            Continue to onboarding
          </Link>
        ) : (
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "justify-center")}>
            Back to login
          </Link>
        )}
      </div>
    </div>
  );
}

function resolveVerifyEmailStatus(error?: string): VerifyEmailStatus {
  if (error === "INVALID_TOKEN" || error === "EXPIRED") {
    return "expired";
  }

  return "pending";
}

type VerifyEmailPageContentProps = {
  error?: string;
  verified?: string;
};

export function VerifyEmailPageContent({
  error,
  verified,
}: VerifyEmailPageContentProps) {
  const status: VerifyEmailStatus = verified ? "success" : resolveVerifyEmailStatus(error);

  return <VerifyEmailContent status={status} />;
}
