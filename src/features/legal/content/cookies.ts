import type { LegalDocument } from "@/features/legal/types";

/** TODO: Legal review required before production launch. */
export const cookiesPolicy: LegalDocument = {
  title: "Cookie Policy",
  description:
    "How Stratos uses cookies and similar technologies on the website, and how you can manage your preferences.",
  lastUpdated: "2026-07-30",
  intro:
    "This Cookie Policy explains how Stratos uses cookies and similar storage on our website. Essential cookies keep the site working; optional analytics cookies help us understand usage only when you accept them in the cookie banner.",
  sections: [
    {
      id: "what-are-cookies",
      title: "What are cookies?",
      paragraphs: [
        "Cookies are small text files stored on your device when you visit a website. They help remember preferences, keep you signed in, and understand how the site is used.",
        "We also use browser local storage for cookie consent preferences so we do not show the banner on every visit after you choose.",
      ],
    },
    {
      id: "categories",
      title: "Cookie categories we use",
      paragraphs: ["Stratos groups cookies into the following categories:"],
      listItems: [
        "Essential — required for authentication, security, and core site functionality (for example, session cookies managed by Better Auth and onboarding completion state). These cannot be disabled while using signed-in features.",
        "Analytics — optional cookies or scripts that help us measure traffic and improve the website. These load only after you click Accept in the cookie banner.",
      ],
    },
    {
      id: "consent",
      title: "Managing your consent",
      paragraphs: [
        "When you first visit Stratos, a cookie banner explains our use of cookies and links to this policy. Click Accept to enable optional analytics. If you dismiss the banner without accepting, analytics remain disabled.",
        "You can clear site data in your browser to reset your choice and see the banner again.",
      ],
    },
    {
      id: "third-parties",
      title: "Third-party services",
      paragraphs: [
        "If we enable an analytics or error monitoring provider in the future, that provider may set its own cookies subject to their policies. We will update this page when such services are activated in production.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Cookie Policy when we add or change cookies on the website. Check the “Last updated” date at the top of this page for the latest version.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "Questions about cookies or consent can be sent through our contact page.",
      ],
    },
  ],
};

export const cookieCategories = [
  {
    name: "Essential",
    purpose: "Authentication, security, onboarding state, and core site functionality",
    required: true,
  },
  {
    name: "Analytics",
    purpose: "Optional usage measurement to improve the website",
    required: false,
  },
] as const;
