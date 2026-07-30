import type { LegalDocument } from "@/features/legal/types";

/** TODO: Legal review required before production launch. */
export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How Stratos collects, uses, and protects your personal information when you use our website and mobile app.",
  lastUpdated: "2026-07-30",
  intro:
    "This Privacy Policy describes how Stratos (“we”, “us”, or “our”) handles information when you visit our website, create an account, complete onboarding, or use the Stratos mobile application. This is placeholder copy pending formal legal review.",
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: [
        "We collect information you provide directly, such as your name, email address, and onboarding responses (goals, experience, schedule, equipment, and preferences).",
        "When you use the mobile app, we also collect workout logs, chat messages with Koach, and progress data needed to personalize your training plan.",
        "We automatically collect limited technical data on the website, such as device type, browser, and pages visited, when analytics cookies are enabled with your consent.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use information",
      paragraphs: ["We use your information to:"],
      listItems: [
        "Create and secure your account",
        "Personalize workouts, recovery guidance, and Koach coaching",
        "Improve product quality and fix issues",
        "Respond to support requests submitted through our contact form",
        "Send service-related emails such as verification and password reset messages",
      ],
    },
    {
      id: "sharing",
      title: "How we share information",
      paragraphs: [
        "We do not sell your personal information. We share data only with service providers that help us operate Stratos (for example, hosting, authentication, and email delivery), and only as needed to provide the service.",
        "We may disclose information if required by law or to protect the rights, safety, and security of Stratos and our users.",
      ],
    },
    {
      id: "retention",
      title: "Data retention",
      paragraphs: [
        "We retain account and training data while your account is active. You may request deletion of your account and associated data by contacting us.",
        "Support inquiries submitted through the contact form may be retained for a reasonable period to resolve your request and improve support quality.",
      ],
    },
    {
      id: "your-rights",
      title: "Your choices and rights",
      paragraphs: [
        "Depending on your location, you may have rights to access, correct, delete, or export your personal data, and to object to or restrict certain processing.",
        "You can manage optional analytics cookies through our cookie banner or the Cookies Policy page. Essential cookies required for authentication and security cannot be disabled while using signed-in features.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We use industry-standard measures to protect your data, including encrypted connections and secure session handling. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Stratos is not directed to children under 16. We do not knowingly collect personal information from children. Contact us if you believe a child has provided us with personal data.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. We will post the revised policy on this page and update the “Last updated” date. Material changes may also be communicated by email or in-app notice where appropriate.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      paragraphs: [
        "Questions about this Privacy Policy or your data can be sent through our contact page.",
      ],
    },
  ],
};
