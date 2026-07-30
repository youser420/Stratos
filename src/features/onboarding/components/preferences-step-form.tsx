"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getStepConfig } from "@/config/onboarding";
import { savePreferencesStep } from "@/features/onboarding/actions/onboarding.actions";
import { OnboardingStepShell } from "@/features/onboarding/components/onboarding-step-shell";
import {
  preferencesSchema,
  type PreferencesInput,
} from "@/features/onboarding/schemas";

const nutritionOptions = [
  { value: "balanced", label: "Balanced" },
  { value: "high_protein", label: "High protein" },
  { value: "low_carb", label: "Lower carb" },
] as const;

const trainingOptions = [
  { value: "strength", label: "Strength focused" },
  { value: "hypertrophy", label: "Hypertrophy focused" },
  { value: "mixed", label: "Mixed strength and hypertrophy" },
] as const;

type PreferencesStepFormProps = {
  defaultValues?: Partial<PreferencesInput>;
};

export function PreferencesStepForm({ defaultValues }: PreferencesStepFormProps) {
  const step = getStepConfig("preferences");
  const form = useForm<PreferencesInput>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      nutritionFocus: defaultValues?.nutritionFocus,
      trainingStyle: defaultValues?.trainingStyle,
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const nutritionFocus = watch("nutritionFocus");
  const trainingStyle = watch("trainingStyle");

  return (
    <OnboardingStepShell
      stepId="preferences"
      title={step.title}
      description={step.description}
      form={form}
      onSave={savePreferencesStep}
    >
      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-foreground">Nutrition focus</legend>
        {nutritionOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 text-sm text-foreground"
          >
            <input
              type="radio"
              name="nutritionFocus"
              checked={nutritionFocus === option.value}
              onChange={() =>
                form.setValue("nutritionFocus", option.value, { shouldValidate: true })
              }
              className="size-4 accent-primary"
            />
            {option.label}
          </label>
        ))}
        {errors.nutritionFocus ? (
          <p className="text-xs text-destructive">{errors.nutritionFocus.message}</p>
        ) : null}
      </fieldset>
      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-foreground">Training style</legend>
        {trainingOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 text-sm text-foreground"
          >
            <input
              type="radio"
              name="trainingStyle"
              checked={trainingStyle === option.value}
              onChange={() =>
                form.setValue("trainingStyle", option.value, { shouldValidate: true })
              }
              className="size-4 accent-primary"
            />
            {option.label}
          </label>
        ))}
        {errors.trainingStyle ? (
          <p className="text-xs text-destructive">{errors.trainingStyle.message}</p>
        ) : null}
      </fieldset>
    </OnboardingStepShell>
  );
}
