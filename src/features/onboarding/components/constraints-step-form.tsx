"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { getStepConfig } from "@/config/onboarding";
import { saveConstraintsStep } from "@/features/onboarding/actions/onboarding.actions";
import { OnboardingStepShell } from "@/features/onboarding/components/onboarding-step-shell";
import {
  constraintsSchema,
  type ConstraintsInput,
} from "@/features/onboarding/schemas";

type ConstraintsStepFormProps = {
  defaultValues?: Partial<ConstraintsInput>;
};

export function ConstraintsStepForm({ defaultValues }: ConstraintsStepFormProps) {
  const step = getStepConfig("constraints");
  const form = useForm<ConstraintsInput>({
    resolver: zodResolver(constraintsSchema),
    defaultValues: {
      hasConstraints: defaultValues?.hasConstraints ?? false,
      notes: defaultValues?.notes ?? "",
    },
  });

  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const hasConstraints = watch("hasConstraints");

  return (
    <OnboardingStepShell
      stepId="constraints"
      title={step.title}
      description={step.description}
      form={form}
      onSave={saveConstraintsStep}
    >
      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-foreground">
          Do you have injuries or limitations?
        </legend>
        <label className="flex items-center gap-3 text-sm text-foreground">
          <input
            type="radio"
            name="hasConstraints"
            checked={hasConstraints === false}
            onChange={() => form.setValue("hasConstraints", false, { shouldValidate: true })}
            className="size-4 accent-primary"
          />
          No significant constraints
        </label>
        <label className="flex items-center gap-3 text-sm text-foreground">
          <input
            type="radio"
            name="hasConstraints"
            checked={hasConstraints === true}
            onChange={() => form.setValue("hasConstraints", true, { shouldValidate: true })}
            className="size-4 accent-primary"
          />
          Yes — Koach should account for these
        </label>
      </fieldset>
      {hasConstraints ? (
        <div className="space-y-2">
          <label htmlFor="notes" className="text-xs font-medium text-foreground">
            Describe constraints
          </label>
          <Textarea
            id="notes"
            rows={4}
            placeholder="e.g. Shoulder impingement, lower back sensitivity..."
            aria-invalid={Boolean(errors.notes)}
            {...register("notes")}
          />
          {errors.notes ? (
            <p className="text-xs text-destructive">{errors.notes.message}</p>
          ) : null}
        </div>
      ) : null}
    </OnboardingStepShell>
  );
}
