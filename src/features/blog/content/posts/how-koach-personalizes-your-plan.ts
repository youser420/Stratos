import type { BlogPost } from "@/features/blog/types";

export const howKoachPersonalizesYourPlan: BlogPost = {
  slug: "how-koach-personalizes-your-plan",
  title: "How Koach personalizes your plan",
  excerpt:
    "What happens after onboarding — and why your first week of training is shaped by more than a template.",
  publishedAt: "2026-07-22",
  author: {
    name: "Stratos Team",
    role: "Product",
  },
  body: [
    {
      type: "paragraph",
      text: "Koach is not a static workout generator. It uses the context you provide during onboarding — goals, experience, schedule, equipment, and constraints — to set a starting point that fits your real life.",
    },
    {
      type: "heading",
      text: "Onboarding is the first input layer",
    },
    {
      type: "paragraph",
      text: "Your answers establish guardrails: how often you can train, what equipment you have access to, and any limitations Koach should remember. That keeps recommendations realistic on day one.",
    },
    {
      type: "heading",
      text: "Feedback closes the loop",
    },
    {
      type: "paragraph",
      text: "As you log sessions and chat with Koach in the app, the plan adjusts. Miss a week because of travel? Koach recalibrates instead of dumping you back into an unrealistic schedule.",
    },
    {
      type: "heading",
      text: "The website sets the foundation",
    },
    {
      type: "paragraph",
      text: "Web onboarding captures the profile your account needs before you download the app. Sign in on mobile with the same account and your plan is ready to go.",
    },
  ],
};
