export const dashboardContent = {
  title: "Welcome back",
  lead: "Your coaching profile lives in the Stratos app. Use this page to pick up where you left off on the web.",
  sections: {
    app: {
      title: "Train in the app",
      description:
        "Log workouts, chat with Koach, and track progress on your phone. Sign in with the same account you used here.",
    },
    account: {
      title: "Account status",
      onboardingComplete: "Onboarding complete — your starting plan is saved to your account.",
    },
  },
  actions: {
    download: { label: "Download app", href: "/download" },
  },
} as const;
