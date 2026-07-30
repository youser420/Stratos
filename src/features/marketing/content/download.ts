export const downloadPageContent = {
  title: "Download Stratos",
  description:
    "Get the mobile app to log workouts, talk with Koach, and track your progress. Use the same account you created on the web.",
  stores: {
    appStore: {
      label: "Download on the App Store",
      href: "#",
      note: "App Store link — TODO: add production URL",
    },
    playStore: {
      label: "Get it on Google Play",
      href: "#",
      note: "Google Play link — TODO: add production URL",
    },
  },
  loginReminder: {
    title: "Use your Stratos account",
    description:
      "Log in with the same email and password from web signup. Your onboarding data and plan sync to the app automatically.",
  },
  requirements: {
    title: "Device requirements",
    items: [
      "iOS 16 or later (iPhone) — App Store",
      "Android 10 or later — Google Play",
      "Active internet connection for sync and Koach conversations",
    ],
  },
  troubleshooting: {
    title: "Troubleshooting",
    items: [
      {
        question: "Wrong account logged in",
        answer:
          "Sign out in the app and log back in with the email used during web signup. If you have multiple accounts, verify the correct one in your email confirmation.",
      },
      {
        question: "Onboarding not complete",
        answer:
          "Finish onboarding on the web first. The app prompts incomplete users to return to the website onboarding flow.",
      },
      {
        question: "Plan not appearing after login",
        answer:
          "Pull to refresh on the dashboard. If the issue persists, log out and back in, or contact support with your account email.",
      },
    ],
  },
  cta: {
    headline: "New to Stratos?",
    description: "Create your account and complete onboarding before downloading the app.",
    primaryAction: { label: "Sign Up", href: "/signup" },
    secondaryAction: { label: "Log In", href: "/login" },
  },
} as const;

export const downloadMetadataContent = {
  title: "Download",
  description:
    "Download the Stratos mobile app for iOS and Android. Log workouts, chat with Koach, and track adaptive training progress.",
} as const;
