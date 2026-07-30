export type FAQCategory = {
  title: string;
  items: {
    question: string;
    answer: string;
  }[];
};

export const faqPageContent = {
  title: "Frequently asked questions",
  description:
    "Answers to common questions about Stratos, Koach, onboarding, pricing, and your account.",
  categories: [
    {
      title: "Product",
      items: [
        {
          question: "What is Stratos?",
          answer:
            "Stratos is an AI-powered fitness platform with personalized workouts, workout logging, and Koach — an adaptive AI coach. The mobile app is the primary experience; the website supports discovery and onboarding.",
        },
        {
          question: "Is Stratos a workout generator?",
          answer:
            "No. Stratos is a continuous coaching relationship. Your routine adapts over time based on logged sessions, recovery, and feedback — not a static plan generated once.",
        },
        {
          question: "Do I need the mobile app?",
          answer:
            "Yes for full coaching, logging, and analytics. You can sign up and complete onboarding on the web, then download the app to train and talk with Koach.",
        },
      ],
    },
    {
      title: "Koach and AI",
      items: [
        {
          question: "What is Koach?",
          answer:
            "Koach is Stratos's AI coach. It provides constructive, encouraging, and honest guidance and remembers your goals, preferences, and training history over time.",
        },
        {
          question: "Does Koach replace a human trainer?",
          answer:
            "Koach is designed for scalable daily coaching and accountability. It is not medical advice and does not replace qualified professionals for injury rehabilitation or clinical nutrition.",
        },
        {
          question: "How is my conversation data used?",
          answer:
            "Conversation and training data personalize your coaching experience within Stratos. See our Privacy Policy for details on data handling — legal copy is pending final review.",
        },
      ],
    },
    {
      title: "Onboarding and download",
      items: [
        {
          question: "What happens after I sign up?",
          answer:
            "You complete a web onboarding flow covering goals, experience, schedule, equipment, constraints, and preferences. Then you receive a plan summary and are prompted to download the mobile app.",
        },
        {
          question: "Can I use the same account on web and mobile?",
          answer:
            "Yes. Your Stratos account is shared across the website and mobile app. Log in with the same credentials everywhere.",
        },
        {
          question: "I downloaded the app but don't see my plan.",
          answer:
            "Make sure you are logged into the same account used during web signup and that onboarding is complete. Visit the Download page for troubleshooting steps.",
        },
      ],
    },
    {
      title: "Pricing and subscriptions",
      items: [
        {
          question: "Is Stratos free?",
          answer:
            "Stratos offers a free tier with core coaching and logging. Premium unlocks deeper personalization, analytics, and advanced Koach features — see the Pricing page for details.",
        },
        {
          question: "Where do I manage my subscription?",
          answer:
            "Subscription management primarily happens in the mobile app through the App Store or Google Play, depending on your device.",
        },
        {
          question: "Can I cancel anytime?",
          answer:
            "Yes. Cancel through your app store subscription settings. Access continues until the end of the current billing period.",
        },
      ],
    },
    {
      title: "Data and account",
      items: [
        {
          question: "How do I reset my password?",
          answer:
            "Use the Forgot Password link on the login page to receive a reset email. If you don't receive it, check spam or contact support.",
        },
        {
          question: "Can I delete my account?",
          answer:
            "Account deletion requests can be submitted through Contact or in-app settings when available. Data retention details are in our Privacy Policy.",
        },
      ],
    },
  ] satisfies FAQCategory[],
  cta: {
    headline: "Still have questions?",
    description: "Sign up to get started or reach out through our contact page.",
    primaryAction: { label: "Sign Up", href: "/signup" },
    secondaryAction: { label: "Contact us", href: "/contact" },
  },
} as const;

export const faqMetadataContent = {
  title: "FAQ",
  description:
    "Frequently asked questions about Stratos, Koach AI coaching, onboarding, app download, pricing, and account management.",
} as const;
