import Link from "next/link";

import { Container } from "@/components/common/container";
import { BrandLogo } from "@/components/common/brand-logo";
import { Typography } from "@/components/common/typography";
import { siteConfig } from "@/config/site";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div
        className="pointer-events-none absolute inset-0 gym-grid-pattern opacity-[0.04]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 gym-radial-glow opacity-60"
        aria-hidden
      />
      <header className="relative border-b border-border/80 bg-background/80 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between">
          <BrandLogo href="/" />
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
          >
            Back to home
          </Link>
        </Container>
      </header>
      <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6 rounded-none border border-border bg-card/80 p-8 shadow-sm backdrop-blur-sm">
          {children}
        </div>
      </main>
      <footer className="relative border-t border-border py-6">
        <Container>
          <Typography variant="muted" className="text-center">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </Typography>
        </Container>
      </footer>
    </div>
  );
}
