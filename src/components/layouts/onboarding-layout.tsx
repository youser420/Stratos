import Link from "next/link";

import { Container } from "@/components/common/container";
import { OnboardingProgressBar } from "@/features/onboarding/components/onboarding-progress-bar";
import { siteConfig } from "@/config/site";

type OnboardingLayoutProps = {
  children: React.ReactNode;
};

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-border">
        <Container className="flex h-14 items-center">
          <Link
            href="/"
            className="font-heading text-sm font-semibold tracking-tight text-foreground"
          >
            {siteConfig.name}
          </Link>
        </Container>
      </header>
      <main className="flex flex-1 flex-col py-8">
        <Container size="narrow" className="space-y-8">
          <OnboardingProgressBar />
          {children}
        </Container>
      </main>
    </div>
  );
}
