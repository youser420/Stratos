export const koachPageContent = {
  title: "Koach — your AI coach with memory",
  description:
    "Koach is the coaching relationship at the heart of Stratos. Honest, supportive, and adaptive — not a generic chatbot.",
  philosophy: {
    title: "Constructive, encouraging, honest",
    description:
      "Koach tells the truth about progress, setbacks, and trade-offs while keeping you motivated. No toxic positivity. No robotic scripts.",
    pillars: [
      {
        title: "Constructive",
        description:
          "Feedback focuses on what to adjust next — volume, intensity, recovery — with clear reasoning.",
      },
      {
        title: "Encouraging",
        description:
          "Consistency is celebrated. Setbacks are normalized. The goal is sustainable progress, not perfection.",
      },
      {
        title: "Honest",
        description:
          "Koach won't pretend a missed week was optimal or recommend reckless progressions when recovery is lagging.",
      },
    ],
  },
  memory: {
    title: "Memory that builds trust",
    description:
      "Koach retains context across conversations and training cycles — your goals, preferences, injuries, and logged history — so you are not starting from zero every session.",
    points: [
      "Remembers stated goals and training preferences from onboarding",
      "Recalls recent workouts and conversation context",
      "Adapts tone and recommendations to your experience level",
    ],
  },
  scenarios: [
    {
      title: "After a missed week",
      user: "I only got one workout in last week. Should I restart my program?",
      koach:
        "No need to restart. Let's look at what you did log, adjust this week's volume slightly, and focus on getting back on schedule — one session at a time.",
    },
    {
      title: "Plateau check-in",
      user: "My bench has stalled for three weeks. What should I change?",
      koach:
        "Your logs show consistent effort but sleep was down last week. I'd suggest a small deload on pressing volume, then we revisit progression once recovery is back on track.",
    },
    {
      title: "Goal shift",
      user: "I want to prioritize fat loss for the next two months.",
      koach:
        "Got it. I'll adjust your routine emphasis and recovery guidance accordingly, and we can revisit nutrition targets that support the deficit without sacrificing training quality.",
    },
  ],
  differentiation: {
    title: "Not another generic chatbot",
    description:
      "Koach is grounded in your Stratos data — routines, logs, onboarding, and progress — not open-ended internet advice. It is a coach inside your training system, not a standalone novelty.",
  },
  cta: {
    headline: "Train with a coach that knows your story",
    description:
      "Sign up, complete onboarding, and meet Koach in the Stratos mobile app.",
  },
} as const;

export const koachMetadataContent = {
  title: "Koach",
  description:
    "Meet Koach — Stratos's AI coach. Learn about constructive coaching, long-term memory, and how Koach adapts to your training journey.",
} as const;
