"use client";

import Link from "next/link";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRef, useState } from "react";
import type { FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";

import { Typography } from "@/components/common/typography";
import { Button, buttonVariants } from "@/components/ui/button";
import { AuthFormError } from "@/features/auth/components/auth-form-error";
import type { SaveOnboardingStepResult } from "@/features/onboarding/actions/onboarding.actions";
import {
  getPreviousStepPath,
  type OnboardingStepId,
} from "@/config/onboarding";
import { cn } from "@/utils/cn";

type OnboardingStepShellProps<TFieldValues extends FieldValues> = {
  stepId: OnboardingStepId;
  title: string;
  description: string;
  form: UseFormReturn<TFieldValues>;
  onSave: (values: TFieldValues) => Promise<SaveOnboardingStepResult | void>;
  children: React.ReactNode;
};

function getFirstValidationMessage<TFieldValues extends FieldValues>(
  errors: FieldErrors<TFieldValues>,
): string {
  for (const value of Object.values(errors)) {
    if (!value) {
      continue;
    }

    if (typeof value === "object" && "message" in value && value.message) {
      return String(value.message);
    }
  }

  return "Complete the required fields to continue.";
}

export function OnboardingStepShell<TFieldValues extends FieldValues>({
  stepId,
  title,
  description,
  form,
  onSave,
  children,
}: OnboardingStepShellProps<TFieldValues>) {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const submittingRef = useRef(false);
  const previousPath = getPreviousStepPath(stepId);

  const { handleSubmit } = form;

  async function onSubmit(values: TFieldValues) {
    if (submittingRef.current) {
      return;
    }

    submittingRef.current = true;
    setIsSaving(true);
    setFormError(null);

    try {
      const result = await onSave(values);

      if (result?.success === false) {
        setFormError(result.error);
      }
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }

      setFormError("Unable to save. Try again.");
    } finally {
      submittingRef.current = false;
      setIsSaving(false);
    }
  }

  function onInvalid(errors: FieldErrors<TFieldValues>) {
    setFormError(getFirstValidationMessage(errors));
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Typography variant="h1">{title}</Typography>
        <Typography variant="lead">{description}</Typography>
      </div>
      <form
        key={stepId}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="space-y-6"
        noValidate
      >
        {formError ? <AuthFormError message={formError} /> : null}
        <div className="space-y-4">{children}</div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {previousPath ? (
            <Link
              href={previousPath}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Back
            </Link>
          ) : (
            <span />
          )}
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
