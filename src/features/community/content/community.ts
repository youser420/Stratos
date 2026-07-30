import type { JourneyBoardHighlight } from "@/features/community/types";

export const journeyBoardHighlights: readonly JourneyBoardHighlight[] = [
  {
    id: "streak-30",
    title: "First 30-day streak",
    description:
      "Logged training consistently for a month — a milestone that started with three days per week and stuck.",
    milestoneType: "streak",
    memberLabel: "Alex M.",
    timeframe: "Month 1",
  },
  {
    id: "squat-pr",
    title: "New squat personal best",
    description:
      "Progressive overload paid off after Koach adjusted volume during a recovery week.",
    milestoneType: "personal_best",
    memberLabel: "Jordan T.",
    timeframe: "Week 12",
  },
  {
    id: "deload-return",
    title: "Stronger after deload",
    description:
      "Took a planned deload, came back with better bar speed and renewed motivation.",
    milestoneType: "consistency",
    memberLabel: "Sam R.",
    timeframe: "Week 9",
  },
  {
    id: "fat-loss-goal",
    title: "Fat loss checkpoint",
    description:
      "Hit a mid-program checkpoint while maintaining strength on compound lifts.",
    milestoneType: "goal",
    memberLabel: "Riley K.",
    timeframe: "Week 16",
  },
  {
    id: "beginner-program",
    title: "Finished beginner block",
    description:
      "Completed the first structured training block after returning from a long break.",
    milestoneType: "program",
    memberLabel: "Casey L.",
    timeframe: "Week 8",
  },
  {
    id: "consistency-90",
    title: "90% session completion",
    description:
      "Maintained nine out of ten planned sessions for eight weeks — consistency over perfection.",
    milestoneType: "consistency",
    memberLabel: "Morgan P.",
    timeframe: "Week 8",
  },
];

export const communityPageContent = {
  title: "Community",
  lead: "The Journey Board is where Stratos members celebrate milestones — streaks, personal bests, and the small wins that keep training sustainable.",
  intro: {
    title: "What is the Journey Board?",
    paragraphs: [
      "The Journey Board is Stratos' community surface for progress highlights. In the mobile app, members share milestones from their training journey — first weeks completed, strength gains, consistency streaks, and goal checkpoints.",
      "On the web, we showcase curated highlights for inspiration and social proof. There is no full feed or posting here — the complete Journey Board experience lives in the app after you sign up and download Stratos.",
    ],
  },
  howItWorks: {
    title: "How sharing works",
    steps: [
      {
        title: "Train with Koach",
        description:
          "Log workouts and chat with Koach in the app. Your history builds the context for meaningful milestones.",
      },
      {
        title: "Unlock milestones",
        description:
          "Stratos recognizes achievements like streaks, personal records, and program completions automatically.",
      },
      {
        title: "Share on the Journey Board",
        description:
          "Choose to share highlights with the community for accountability and motivation — full controls are in the app.",
      },
    ],
  },
  highlights: {
    title: "Curated highlights",
    description:
      "A sample of recent milestones from the Stratos community. Names are abbreviated for privacy.",
  },
  cta: {
    headline: "Join the community in the app",
    description:
      "Sign up on the web, complete onboarding, and download Stratos to share your own Journey Board milestones.",
  },
} as const;
