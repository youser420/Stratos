import type { BlogPost } from "@/features/blog/types";

export const trainingScheduleThatSticks: BlogPost = {
  slug: "training-schedule-that-sticks",
  title: "Building a training schedule that sticks",
  excerpt:
    "Three practical rules for choosing training days you will actually follow — not just aspire to.",
  publishedAt: "2026-07-28",
  author: {
    name: "Stratos Team",
    role: "Coaching",
  },
  body: [
    {
      type: "paragraph",
      text: "The best program is the one you can repeat next month. Most plans fail because they assume a perfect calendar — not the one you live with.",
    },
    {
      type: "heading",
      text: "Match frequency to recovery",
    },
    {
      type: "paragraph",
      text: "Three focused sessions often beat five rushed ones. During Stratos onboarding, pick a days-per-week target that leaves room for sleep, work, and family — not just gym time.",
    },
    {
      type: "heading",
      text: "Anchor days to existing habits",
    },
    {
      type: "paragraph",
      text: "Stack training onto routines you already keep. Tuesday and Thursday after work, Saturday morning — predictable beats optimal when you are building momentum.",
    },
    {
      type: "heading",
      text: "Plan for interruptions",
    },
    {
      type: "paragraph",
      text: "Travel, illness, and busy seasons happen. A flexible schedule with Koach means a missed session adjusts the week instead of ending the streak mentally.",
    },
  ],
};
