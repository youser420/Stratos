import { Section } from "@/components/common/section";
import { homeFinalCta } from "@/features/marketing/content/home";
import { CTA } from "@/features/marketing/components/cta";

export function FinalCtaSection() {
  return (
    <Section variant="warm">
      <CTA
        variant="signup"
        tone="panel"
        headline={homeFinalCta.headline}
        description={homeFinalCta.description}
      />
    </Section>
  );
}
