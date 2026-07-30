import Link from "next/link";

import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import { dashboardContent } from "@/features/dashboard/content/dashboard";
import { CTA } from "@/features/marketing/components/cta";
import { cn } from "@/utils/cn";

type DashboardContentProps = {
  userName: string | null;
};

export function DashboardContent({ userName }: DashboardContentProps) {
  const greeting = userName ? `${dashboardContent.title}, ${userName}` : dashboardContent.title;

  return (
    <>
      <Section>
        <Container size="narrow" className="space-y-4">
          <Typography variant="h1">{greeting}</Typography>
          <Typography variant="lead">{dashboardContent.lead}</Typography>
        </Container>
      </Section>
      <Section variant="muted">
        <Container size="narrow" className="space-y-6">
          <div className="space-y-2 border border-border bg-background p-6">
            <Typography variant="h2">{dashboardContent.sections.account.title}</Typography>
            <Typography variant="muted">
              {dashboardContent.sections.account.onboardingComplete}
            </Typography>
          </div>
          <div className="space-y-2 border border-border bg-background p-6">
            <Typography variant="h2">{dashboardContent.sections.app.title}</Typography>
            <Typography variant="muted">
              {dashboardContent.sections.app.description}
            </Typography>
            <Link
              href={dashboardContent.actions.download.href}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {dashboardContent.actions.download.label}
            </Link>
          </div>
        </Container>
      </Section>
      <Section containerSize="narrow">
        <CTA
          variant="download"
          headline="Ready for your next session?"
          description="Download Stratos and sign in with this account to start training with Koach."
          showSecondary={false}
        />
      </Section>
    </>
  );
}
