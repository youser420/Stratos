"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Typography } from "@/components/common/typography";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <Typography variant="h1">Something went wrong</Typography>
      <Typography variant="lead" className="mt-4 max-w-md">
        An unexpected error occurred. You can try again or return to the home
        page.
      </Typography>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button type="button" size="lg" onClick={reset}>
          Try again
        </Button>
        <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
