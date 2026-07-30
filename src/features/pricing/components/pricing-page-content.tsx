import { FAQAccordion } from "@/components/common/faq-accordion";
import { Grid } from "@/components/common/grid";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { CTA } from "@/features/marketing/components/cta";
import { PricingCard } from "@/features/pricing/components/pricing-card";
import {
  billingFaqItems,
  pricingPageContent,
  pricingTiers,
} from "@/features/pricing/content/tiers";

export function PricingPageContent() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <Typography variant="h1">{pricingPageContent.title}</Typography>
          <Typography variant="lead">{pricingPageContent.description}</Typography>
        </div>
      </Section>
      <Section variant="muted">
        <Grid cols={2}>
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </Grid>
        <Typography variant="muted" className="mx-auto mt-8 max-w-2xl text-center">
          {pricingPageContent.subscriptionNote}
        </Typography>
      </Section>
      <Section containerSize="narrow">
        <div className="space-y-4">
          <Typography variant="h2">Billing FAQ</Typography>
          <FAQAccordion items={billingFaqItems} />
        </div>
      </Section>
      <Section variant="muted">
        <CTA
          variant="signup"
          headline={pricingPageContent.cta.headline}
          description={pricingPageContent.cta.description}
        />
      </Section>
    </>
  );
}
