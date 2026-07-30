"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { getStepConfig } from "@/config/onboarding";
import { saveScheduleStep } from "@/features/onboarding/actions/onboarding.actions";
import { OnboardingStepShell } from "@/features/onboarding/components/onboarding-step-shell";
import {
  scheduleSchema,
  type ScheduleDay,
  type ScheduleInput,
} from "@/features/onboarding/schemas";

const dayOptions = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
] as const satisfies ReadonlyArray<{ value: ScheduleDay; label: string }>;

type ScheduleStepFormProps = {
  defaultValues?: Partial<ScheduleInput>;
};

export function ScheduleStepForm({ defaultValues }: ScheduleStepFormProps) {
  const step = getStepConfig("schedule");
  const form = useForm<ScheduleInput>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      daysPerWeek: defaultValues?.daysPerWeek ?? 3,
      preferredDays: defaultValues?.preferredDays ?? [],
    },
  });

  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const preferredDays = watch("preferredDays");

  function togglePreferredDay(day: ScheduleDay) {
    const next = preferredDays.includes(day)
      ? preferredDays.filter((value) => value !== day)
      : [...preferredDays, day];

    form.setValue("preferredDays", next, { shouldValidate: true });
  }

  return (
    <OnboardingStepShell
      stepId="schedule"
      title={step.title}
      description={step.description}
      form={form}
      onSave={saveScheduleStep}
    >
      <div className="space-y-2">
        <label htmlFor="daysPerWeek" className="text-xs font-medium text-foreground">
          Training days per week
        </label>
        <Input
          id="daysPerWeek"
          type="number"
          min={1}
          max={7}
          inputMode="numeric"
          aria-invalid={Boolean(errors.daysPerWeek)}
          {...register("daysPerWeek", { valueAsNumber: true })}
        />
        {errors.daysPerWeek ? (
          <p className="text-xs text-destructive">{errors.daysPerWeek.message}</p>
        ) : null}
      </div>
      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-foreground">Preferred training days</legend>
        <div className="grid grid-cols-2 gap-2">
          {dayOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <input
                type="checkbox"
                checked={preferredDays.includes(option.value)}
                onChange={() => togglePreferredDay(option.value)}
                className="size-4 accent-primary"
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.preferredDays ? (
          <p className="text-xs text-destructive">{errors.preferredDays.message}</p>
        ) : null}
      </fieldset>
    </OnboardingStepShell>
  );
}
