import Link from "next/link";
import { DeviceMobileIcon, QrCodeIcon } from "@phosphor-icons/react/dist/ssr";

import { FAQAccordion } from "@/components/common/faq-accordion";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { buttonVariants } from "@/components/ui/button";
import { downloadPageContent } from "@/features/marketing/content/download";
import { CTA } from "@/features/marketing/components/cta";
import { cn } from "@/utils/cn";

export function DownloadPageContent() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <Typography variant="h1">{downloadPageContent.title}</Typography>
          <Typography variant="lead">{downloadPageContent.description}</Typography>
        </div>
      </Section>
      <Section variant="muted">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <Typography variant="h2">Get the app</Typography>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={downloadPageContent.stores.appStore.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "justify-center",
                )}
                aria-label={downloadPageContent.stores.appStore.label}
              >
                {downloadPageContent.stores.appStore.label}
              </Link>
              <Link
                href={downloadPageContent.stores.playStore.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "justify-center",
                )}
                aria-label={downloadPageContent.stores.playStore.label}
              >
                {downloadPageContent.stores.playStore.label}
              </Link>
            </div>
            <Typography variant="muted" className="text-xs">
              {downloadPageContent.stores.appStore.note}
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 border border-border bg-background p-8 text-center">
            <QrCodeIcon className="size-16 text-muted-foreground" aria-hidden />
            <Typography variant="muted">
              QR code placeholder — scan to download when store links are live.
            </Typography>
          </div>
        </div>
      </Section>
      <Section containerSize="narrow">
        <div className="space-y-4 border border-border bg-muted/30 p-6">
          <div className="flex items-center gap-3">
            <DeviceMobileIcon className="size-6 text-primary" aria-hidden />
            <Typography variant="h3">{downloadPageContent.loginReminder.title}</Typography>
          </div>
          <Typography variant="body">
            {downloadPageContent.loginReminder.description}
          </Typography>
        </div>
      </Section>
      <Section variant="muted" containerSize="narrow">
        <div className="space-y-4">
          <Typography variant="h2">{downloadPageContent.requirements.title}</Typography>
          <ul className="list-disc space-y-2 pl-5 text-sm text-foreground">
            {downloadPageContent.requirements.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>
      <Section containerSize="narrow">
        <div className="space-y-4">
          <Typography variant="h2">{downloadPageContent.troubleshooting.title}</Typography>
          <FAQAccordion items={downloadPageContent.troubleshooting.items} />
        </div>
      </Section>
      <Section variant="muted">
        <CTA
          variant="signup"
          headline={downloadPageContent.cta.headline}
          description={downloadPageContent.cta.description}
          primaryAction={downloadPageContent.cta.primaryAction}
          secondaryAction={downloadPageContent.cta.secondaryAction}
        />
      </Section>
    </>
  );
}
