import {
  ArrowsClockwiseIcon,
  ChartLineUpIcon,
  HeartIcon,
} from "@phosphor-icons/react/dist/ssr";

export const homeHero = {
  headline: "Your AI coach that adapts as you grow",
  subheadline:
    "Stratos delivers personalized workouts, recovery guidance, and nutrition support through Koach — an AI coach that remembers your history and evolves with your progress.",
  primaryCta: { label: "Sign Up", href: "/signup" },
  secondaryCta: { label: "Download App", href: "/download" },
  stats: [
    { value: "24/7", label: "Koach coaching" },
    { value: "100%", label: "Personalized plans" },
    { value: "Adaptive", label: "Progressive overload" },
  ],
} as const;

export const homeAdaptation = {
  title: "Coaching that evolves with you",
  description:
    "Unlike static workout generators, Stratos continuously adjusts your training based on what you actually do — not just what you planned on day one.",
  features: [
    {
      icon: ChartLineUpIcon,
      title: "Progress-driven adjustments",
      description:
        "Your routine updates as strength, volume, and consistency change — keeping progressive overload on track.",
    },
    {
      icon: HeartIcon,
      title: "Recovery-aware planning",
      description:
        "Training load, rest, and feedback inform deloads and intensity so you stay consistent without burning out.",
    },
    {
      icon: ArrowsClockwiseIcon,
      title: "Goals that shift with life",
      description:
        "Fat loss, muscle building, or general fitness — Koach adapts recommendations as your priorities change.",
    },
  ],
} as const;

export const homeKoach = {
  title: "Meet Koach",
  description:
    "Koach is your AI coach — constructive, encouraging, and honest. It remembers your goals, preferences, injuries, and workout history so every conversation feels personal, not generic.",
  highlights: [
    "Long-term memory of your training journey",
    "Honest feedback with supportive guidance",
    "Nutrition and recovery aligned to your routine",
  ],
  cta: { label: "Learn about Koach", href: "/koach" },
} as const;

export const homeSocialProof = {
  title: "Built for people who show up",
  description:
    "Stratos helps lifters stay consistent with coaching that adapts — not another abandoned plan.",
  testimonials: [
    {
      quote:
        "Finally an app that adjusts when I miss a session instead of making me feel behind.",
      author: "Alex M.",
      role: "Intermediate lifter",
    },
    {
      quote:
        "Koach remembers my shoulder issue and keeps my routine sensible without me repeating myself.",
      author: "Jordan T.",
      role: "Returning to training",
    },
    {
      quote:
        "The weekly routine changes feel intentional — like a coach watching my log, not a template.",
      author: "Sam R.",
      role: "Fat loss focus",
    },
  ],
} as const;

export const homeJourneyBoard = {
  title: "Journey Board highlights",
  description:
    "See milestones and progress stories from the Stratos community. Share your wins and stay motivated alongside others building lasting habits.",
  highlights: [
    {
      title: "First 30-day streak",
      description: "Consistency milestone unlocked after a month of logged sessions.",
    },
    {
      title: "New personal best",
      description: "Progressive overload payoff — a tracked strength gain worth celebrating.",
    },
    {
      title: "Routine refresh",
      description: "Koach adapted the plan after a deload week and came back stronger.",
    },
  ],
  cta: { label: "Explore community", href: "/community" },
} as const;

export const homePricing = {
  title: "Start free, upgrade when you're ready",
  description:
    "Core coaching and workout logging are free. Premium unlocks deeper personalization, analytics, and advanced Koach features — with full subscription management in the mobile app.",
  cta: { label: "View pricing", href: "/pricing" },
} as const;

export const homeFinalCta = {
  headline: "Ready to train with a coach that remembers?",
  description:
    "Create your account, complete onboarding, and take Stratos with you to the gym.",
} as const;

export const homeMetadataContent = {
  title: "AI Fitness Coaching That Adapts With You",
  description:
    "Stratos is an AI-powered fitness platform with Koach — a coach that adapts workouts, recovery, and nutrition to your progress. Sign up and download the app.",
} as const;
