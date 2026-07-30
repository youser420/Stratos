import { FAQAccordion } from "@/components/common/faq-accordion";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { faqPageContent } from "@/features/marketing/content/faq";
import { CTA } from "@/features/marketing/components/cta";

export function FaqPageContent() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <Typography variant="h1">{faqPageContent.title}</Typography>
          <Typography variant="lead">{faqPageContent.description}</Typography>
        </div>
      </Section>
      <Section variant="muted" containerSize="narrow">
        <div className="space-y-12">
          {faqPageContent.categories.map((category) => (
            <div key={category.title} className="space-y-4">
              <Typography variant="h2">{category.title}</Typography>
              <FAQAccordion items={category.items} />
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <CTA
          variant="signup"
          headline={faqPageContent.cta.headline}
          description={faqPageContent.cta.description}
          primaryAction={faqPageContent.cta.primaryAction}
          secondaryAction={faqPageContent.cta.secondaryAction}
        />
      </Section>
    </>
  );
}
