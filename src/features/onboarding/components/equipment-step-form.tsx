"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getStepConfig } from "@/config/onboarding";
import { saveEquipmentStep } from "@/features/onboarding/actions/onboarding.actions";
import { OnboardingStepShell } from "@/features/onboarding/components/onboarding-step-shell";
import {
  equipmentSchema,
  type EquipmentAccess,
  type EquipmentInput,
} from "@/features/onboarding/schemas";

const equipmentOptions = [
  { value: "commercial_gym", label: "Commercial gym membership" },
  { value: "home_gym", label: "Home gym setup" },
  { value: "dumbbells", label: "Dumbbells" },
  { value: "barbell", label: "Barbell" },
  { value: "machines", label: "Machines / cables" },
  { value: "bodyweight_only", label: "Bodyweight only" },
] as const satisfies ReadonlyArray<{ value: EquipmentAccess; label: string }>;

type EquipmentStepFormProps = {
  defaultValues?: Partial<EquipmentInput>;
};

export function EquipmentStepForm({ defaultValues }: EquipmentStepFormProps) {
  const step = getStepConfig("equipment");
  const form = useForm<EquipmentInput>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      access: defaultValues?.access ?? [],
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const access = watch("access");

  function toggleAccess(value: EquipmentAccess) {
    const next = access.includes(value)
      ? access.filter((item) => item !== value)
      : [...access, value];

    form.setValue("access", next, { shouldValidate: true });
  }

  return (
    <OnboardingStepShell
      stepId="equipment"
      title={step.title}
      description={step.description}
      form={form}
      onSave={saveEquipmentStep}
    >
      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-foreground">Equipment access</legend>
        {equipmentOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 text-sm text-foreground"
          >
            <input
              type="checkbox"
              checked={access.includes(option.value)}
              onChange={() => toggleAccess(option.value)}
              className="size-4 accent-primary"
            />
            {option.label}
          </label>
        ))}
        {errors.access ? (
          <p className="text-xs text-destructive">{errors.access.message}</p>
        ) : null}
      </fieldset>
    </OnboardingStepShell>
  );
}
