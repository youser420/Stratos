"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getStepConfig } from "@/config/onboarding";
import { saveExperienceStep } from "@/features/onboarding/actions/onboarding.actions";
import { OnboardingStepShell } from "@/features/onboarding/components/onboarding-step-shell";
import {
  experienceSchema,
  type ExperienceInput,
} from "@/features/onboarding/schemas";

const levelOptions = [
  { value: "beginner", label: "Beginner — new or returning after a long break" },
  { value: "intermediate", label: "Intermediate — consistent training experience" },
  { value: "advanced", label: "Advanced — structured training for years" },
] as const;

type ExperienceStepFormProps = {
  defaultValues?: Partial<ExperienceInput>;
};

export function ExperienceStepForm({ defaultValues }: ExperienceStepFormProps) {
  const step = getStepConfig("experience");
  const form = useForm<ExperienceInput>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      level: defaultValues?.level,
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const level = watch("level");

  return (
    <OnboardingStepShell
      stepId="experience"
      title={step.title}
      description={step.description}
      form={form}
      onSave={saveExperienceStep}
    >
      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-foreground">Experience level</legend>
        {levelOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-3 text-sm text-foreground"
          >
            <input
              type="radio"
              name="level"
              checked={level === option.value}
              onChange={() =>
                form.setValue("level", option.value, { shouldValidate: true })
              }
              className="mt-1 size-4 accent-primary"
            />
            {option.label}
          </label>
        ))}
        {errors.level ? (
          <p className="text-xs text-destructive">{errors.level.message}</p>
        ) : null}
      </fieldset>
    </OnboardingStepShell>
  );
}
