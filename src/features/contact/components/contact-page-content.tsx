import Link from "next/link";

import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { ContactForm } from "@/features/contact/components/contact-form";
import { contactPageContent } from "@/features/contact/content/contact";

export function ContactPageContent() {
  return (
    <>
      <Section>
        <Container size="narrow" className="space-y-4 text-center">
          <Typography variant="h1">{contactPageContent.title}</Typography>
          <Typography variant="lead">{contactPageContent.description}</Typography>
        </Container>
      </Section>
      <Section variant="muted" containerSize="narrow">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <div className="space-y-4">
            <Typography variant="h2">{contactPageContent.support.title}</Typography>
            <Typography variant="body">{contactPageContent.support.body}</Typography>
            <Typography variant="muted">
              {contactPageContent.support.faqPrompt}{" "}
              <Link href="/faq" className="text-foreground hover:underline">
                FAQ page
              </Link>
              .
            </Typography>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
