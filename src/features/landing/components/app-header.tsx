"use client";

import Link from "next/link";
import { ChatCircleDotsIcon } from "@phosphor-icons/react";

import { buildCoachHref } from "@/config/coach";
import { BrandLogo } from "@/components/common/brand-logo";
import { Container } from "@/components/common/container";
import { HeaderUtilityNav } from "@/components/common/header-utility-nav";
import { Typography } from "@/components/common/typography";
import { useCoachUI } from "@/components/providers/coach-ui-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type AppHeaderProps = {
  greeting: string;
};

/**
 * Section 1: "Provides access to Profile and Global Navigation." Section 11
 * (Coach Responsive Behavior): a tablet entry point opens the collapsible
 * pane; mobile has no persistent pane at all, so it links straight to the
 * dedicated full-screen Coach experience instead.
 */
export function AppHeader({ greeting }: AppHeaderProps) {
  const { setTabletPaneOpen, lastOpenRequest } = useCoachUI();

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/75">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-6">
            <BrandLogo href="/home" />
            <Typography variant="muted" className="hidden truncate sm:block">
              {greeting}
            </Typography>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="hidden md:inline-flex lg:hidden"
              onClick={() => setTabletPaneOpen(true)}
            >
              <ChatCircleDotsIcon data-icon="inline-start" />
              Coach
            </Button>
            <Link
              href={buildCoachHref(lastOpenRequest.source, lastOpenRequest.sourceDetail)}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "md:hidden")}
            >
              <ChatCircleDotsIcon data-icon="inline-start" />
              Coach
            </Link>
            <HeaderUtilityNav isAuthenticated className="hidden sm:flex" />
          </div>
        </div>
      </Container>
    </header>
  );
}
