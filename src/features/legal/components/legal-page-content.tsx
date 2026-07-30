import Link from "next/link";

import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Typography } from "@/components/common/typography";
import { cookieCategories } from "@/features/legal/content/cookies";
import type { LegalDocument } from "@/features/legal/types";

function formatLegalDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00.000Z`));
}

type LegalPageContentProps = {
  document: LegalDocument;
  showCookieCategories?: boolean;
};

export function LegalPageContent({
  document,
  showCookieCategories = false,
}: LegalPageContentProps) {
  return (
    <Section>
      <Container size="narrow" className="space-y-8">
        <div className="space-y-3">
          <Typography variant="h1">{document.title}</Typography>
          <Typography variant="muted">
            Last updated: {formatLegalDate(document.lastUpdated)}
          </Typography>
          {document.intro ? (
            <Typography variant="lead">{document.intro}</Typography>
          ) : null}
        </div>

        {showCookieCategories ? (
          <div className="space-y-4 border border-border bg-muted/30 p-6">
            <Typography variant="h2">Cookie categories</Typography>
            <div className="space-y-4">
              {cookieCategories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <Typography variant="h3">{category.name}</Typography>
                  <Typography variant="body">{category.purpose}</Typography>
                  <Typography variant="muted">
                    {category.required ? "Required" : "Optional — requires consent"}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <article className="space-y-8">
          {document.sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-3 scroll-mt-24">
              <Typography variant="h2">{section.title}</Typography>
              {section.paragraphs.map((paragraph) => (
                <Typography key={paragraph} variant="body" as="p">
                  {section.id === "contact" ? (
                    <>
                      {paragraph.replace("contact page", "")}
                      <Link href="/contact" className="text-foreground hover:underline">
                        contact page
                      </Link>
                      .
                    </>
                  ) : (
                    paragraph
                  )}
                </Typography>
              ))}
              {section.listItems ? (
                <ul className="list-disc space-y-2 pl-5">
                  {section.listItems.map((item) => (
                    <li key={item}>
                      <Typography variant="body" as="span">
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>
      </Container>
    </Section>
  );
}
