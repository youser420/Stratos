import { CTA } from "@/features/marketing/components/cta";
import { Typography } from "@/components/common/typography";

export function OnboardingCompleteContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Typography variant="h1">Your plan is ready</Typography>
        <Typography variant="lead">
          Koach has enough context to build your starting routine. Download the
          Stratos app to log workouts, chat with Koach, and track progress.
        </Typography>
      </div>
      <div className="space-y-2 border border-border bg-muted/30 p-4">
        <Typography variant="label" as="p">
          What happens next
        </Typography>
        <Typography variant="muted" as="p">
          Your onboarding answers are saved to your account. The mobile app will
          sync your profile and initial plan on first login.
        </Typography>
      </div>
      <CTA
        variant="download"
        headline="Take Stratos to the gym"
        description="Download the app and sign in with the same account you used here."
        showSecondary={false}
      />
    </div>
  );
}
