import { cn } from "@/utils/cn";

type OnboardingProgressProps = {
  currentStep?: number;
  totalSteps?: number;
  className?: string;
};

export function OnboardingProgress({
  currentStep = 1,
  totalSteps = 7,
  className,
}: OnboardingProgressProps) {
  const progress = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </p>
      <div
        className="h-1 w-full bg-muted"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Onboarding progress: step ${currentStep} of ${totalSteps}`}
      >
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
