import Link from "next/link";

import { MarketingLayout } from "@/components/layouts/marketing-layout";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export default function NotFound() {
  return (
    <MarketingLayout>
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <Typography variant="h1">Page not found</Typography>
        <Typography variant="lead" className="mt-4 max-w-md">
          The page you are looking for does not exist or may have been moved.
        </Typography>
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
          Back to home
        </Link>
      </section>
    </MarketingLayout>
  );
}
