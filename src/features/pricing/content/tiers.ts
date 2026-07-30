export type PricingTier = {
  id: "free" | "premium";
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: readonly string[];
  cta: {
    label: string;
    href: string;
  };
  highlighted?: boolean;
};

/** TODO: Confirm final tier names, prices, and feature lists with product. */
export const pricingTiers: readonly PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    priceNote: "Forever",
    description:
      "Core coaching and logging to build consistency without upfront commitment.",
    features: [
      "Personalized workout routines from onboarding",
      "Workout logging and session history",
      "Koach AI coaching (core conversations)",
      "Basic dashboard and upcoming workouts",
      "Progressive overload tracking fundamentals",
    ],
    cta: {
      label: "Sign Up Free",
      href: "/signup",
    },
  },
  {
    id: "premium",
    name: "Premium",
    price: "TBD",
    priceNote: "Per month — billed in mobile app",
    description:
      "Deeper personalization, analytics, and advanced Koach for users ready to invest in their training.",
    features: [
      "Everything in Free",
      "Expanded Koach memory and adaptation signals",
      "Advanced dashboard analytics and trends",
      "Deeper routine personalization",
      "Priority access to new coaching features",
    ],
    cta: {
      label: "Sign Up to Start",
      href: "/signup",
    },
    highlighted: true,
  },
] as const;

export const billingFaqItems = [
  {
    question: "Where do I subscribe to Premium?",
    answer:
      "Premium subscriptions are managed in the Stratos mobile app through the App Store or Google Play after you create an account. The website shows tier comparison only — no web checkout in v1.",
  },
  {
    question: "Can I start on Free and upgrade later?",
    answer:
      "Yes. Sign up for free, complete onboarding, and download the app. Upgrade to Premium anytime from in-app subscription settings.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes. Cancel through your app store subscription settings. Access continues until the end of the current billing period.",
  },
  {
    question: "Are prices shown here final?",
    answer:
      "Pricing may vary by region and platform. Confirm current pricing in the mobile app before subscribing — displayed prices here are placeholders until product copy is finalized.",
  },
] as const;

export const pricingPageContent = {
  title: "Simple pricing, serious coaching",
  description:
    "Start free with core coaching and logging. Upgrade in the mobile app when you want deeper personalization and analytics.",
  subscriptionNote:
    "Subscriptions are completed in the Stratos mobile app. Create your account on the web, finish onboarding, then upgrade from in-app settings.",
  cta: {
    headline: "Start with a coach that adapts",
    description:
      "Create your free account, complete onboarding, and download the app to train with Koach.",
  },
} as const;

export const pricingMetadataContent = {
  title: "Pricing",
  description:
    "Compare Stratos Free and Premium tiers. Start with core AI coaching and logging, then upgrade in the mobile app for deeper personalization and analytics.",
} as const;
