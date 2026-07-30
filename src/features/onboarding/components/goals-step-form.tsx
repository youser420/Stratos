"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getStepConfig } from "@/config/onboarding";
import { saveGoalsStep } from "@/features/onboarding/actions/onboarding.actions";
import { OnboardingStepShell } from "@/features/onboarding/components/onboarding-step-shell";
import {
  goalsSchema,
  type GoalsInput,
} from "@/features/onboarding/schemas";

const goalOptions = [
  { value: "fat_loss", label: "Fat loss" },
  { value: "muscle_building", label: "Muscle building" },
  { value: "general_fitness", label: "General fitness" },
] as const;

type GoalsStepFormProps = {
  defaultValues?: Partial<GoalsInput>;
};

export function GoalsStepForm({ defaultValues }: GoalsStepFormProps) {
  const step = getStepConfig("goals");
  const form = useForm<GoalsInput>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      primaryGoal: defaultValues?.primaryGoal,
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const primaryGoal = watch("primaryGoal");

  return (
    <OnboardingStepShell
      stepId="goals"
      title={step.title}
      description={step.description}
      form={form}
      onSave={saveGoalsStep}
    >
      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-foreground">Primary goal</legend>
        {goalOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 text-sm text-foreground"
          >
            <input
              type="radio"
              name="primaryGoal"
              checked={primaryGoal === option.value}
              onChange={() =>
                form.setValue("primaryGoal", option.value, { shouldValidate: true })
              }
              className="size-4 accent-primary"
            />
            {option.label}
          </label>
        ))}
        {errors.primaryGoal ? (
          <p className="text-xs text-destructive">{errors.primaryGoal.message}</p>
        ) : null}
      </fieldset>
    </OnboardingStepShell>
  );
}
