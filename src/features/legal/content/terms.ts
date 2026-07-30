import type { LegalDocument } from "@/features/legal/types";

/** TODO: Legal review required before production launch. */
export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  description:
    "Terms governing your use of the Stratos website, account, and mobile application.",
  lastUpdated: "2026-07-30",
  intro:
    "These Terms of Service (“Terms”) govern your access to and use of Stratos, including our website, account registration, onboarding, and mobile application. By creating an account or using Stratos, you agree to these Terms. This is placeholder copy pending formal legal review.",
  sections: [
    {
      id: "eligibility",
      title: "Eligibility",
      paragraphs: [
        "You must be at least 16 years old and able to form a binding contract to use Stratos. If you use Stratos on behalf of an organization, you represent that you have authority to bind that organization to these Terms.",
      ],
    },
    {
      id: "account",
      title: "Your account",
      paragraphs: [
        "You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us promptly if you suspect unauthorized access.",
        "You agree to provide accurate information during signup and onboarding so Koach and Stratos can personalize your training responsibly.",
      ],
    },
    {
      id: "health-disclaimer",
      title: "Health and fitness disclaimer",
      paragraphs: [
        "Stratos and Koach provide fitness guidance and coaching support. They are not a substitute for professional medical advice, diagnosis, or treatment.",
        "Consult a qualified healthcare provider before starting or changing an exercise program, especially if you have a medical condition, injury, or pregnancy. Stop training and seek medical attention if you experience pain, dizziness, or other concerning symptoms.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      paragraphs: ["You agree not to:"],
      listItems: [
        "Use Stratos for unlawful purposes or in violation of applicable laws",
        "Attempt to access another user’s account or our systems without authorization",
        "Upload harmful code, spam, or abusive content through support or community features",
        "Reverse engineer, scrape, or misuse the service in ways that harm Stratos or other users",
      ],
    },
    {
      id: "subscriptions",
      title: "Subscriptions and billing",
      paragraphs: [
        "Stratos may offer free and paid tiers. Subscription purchase, renewal, and cancellation for Premium features are managed in the mobile app and applicable app store policies unless otherwise stated on our Pricing page.",
        "Prices and features may change with notice where required by law or platform policy.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      paragraphs: [
        "Stratos, Koach, logos, software, and content are owned by us or our licensors and protected by intellectual property laws. We grant you a limited, personal, non-transferable license to use the service for your own training purposes in accordance with these Terms.",
      ],
    },
    {
      id: "termination",
      title: "Suspension and termination",
      paragraphs: [
        "You may stop using Stratos at any time. We may suspend or terminate access if you violate these Terms, create risk for other users, or where required by law.",
        "Sections that by nature should survive termination (including disclaimers and limitations of liability) will continue to apply.",
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      paragraphs: [
        "Stratos is provided “as is” and “as available” without warranties of any kind, whether express or implied, including fitness for a particular purpose and non-infringement, to the fullest extent permitted by law.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, Stratos and its affiliates will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or goodwill, arising from your use of the service.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these Terms",
      paragraphs: [
        "We may update these Terms from time to time. Continued use after the effective date of updated Terms constitutes acceptance, except where additional consent is required by law.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "Questions about these Terms can be sent through our contact page.",
      ],
    },
  ],
};
