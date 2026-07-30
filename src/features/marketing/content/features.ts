import {
  BrainIcon,
  ChartLineUpIcon,
  ChatCircleIcon,
  HeartIcon,
  NotebookIcon,
  TrendUpIcon,
  UsersThreeIcon,
  BarbellIcon,
  BowlFoodIcon,
} from "@phosphor-icons/react/dist/ssr";

export const featuresPageContent = {
  title: "Everything you need to train with intention",
  description:
    "Stratos combines adaptive programming, AI coaching, and progress tracking in one mobile-first platform — framed around outcomes, not feature checklists.",
  features: [
    {
      icon: BarbellIcon,
      title: "Personalized workouts",
      description:
        "Routines built around your goals, schedule, and equipment — then adjusted as you log sessions and improve.",
    },
    {
      icon: ChatCircleIcon,
      title: "Koach AI coach",
      description:
        "Constructive, encouraging, and honest guidance when you need motivation, accountability, or a plan change.",
    },
    {
      icon: HeartIcon,
      title: "Recovery recommendations",
      description:
        "Rest, deload, and mobility suggestions based on training load so consistency beats burnout.",
    },
    {
      icon: BowlFoodIcon,
      title: "Nutrition guidance",
      description:
        "High-level nutrition support aligned with your training phase — not a separate diet app to maintain.",
    },
    {
      icon: NotebookIcon,
      title: "Workout logging",
      description:
        "Log sets, reps, and weight in the gym. Every session feeds back into how Koach adapts your plan.",
    },
    {
      icon: TrendUpIcon,
      title: "Progressive overload tracking",
      description:
        "See strength and volume trends over time so improvements are visible — not guessed.",
    },
    {
      icon: ChartLineUpIcon,
      title: "Dashboard and analytics",
      description:
        "Track consistency, upcoming workouts, and progress summaries in the mobile app.",
    },
    {
      icon: UsersThreeIcon,
      title: "Community and Journey Board",
      description:
        "Share milestones and draw motivation from curated community highlights.",
    },
    {
      icon: BrainIcon,
      title: "Long-term memory",
      description:
        "Koach remembers your goals, preferences, and history so coaching feels personal across months — not just one chat.",
    },
  ],
  cta: {
    headline: "See how Stratos adapts to you",
    description:
      "Create your account, complete onboarding, and start training with a coach that evolves with your progress.",
  },
} as const;

export const featuresMetadataContent = {
  title: "Features",
  description:
    "Explore Stratos features: personalized workouts, Koach AI coaching, recovery, nutrition guidance, logging, progressive overload, analytics, and community.",
} as const;
