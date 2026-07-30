"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthFormError } from "@/features/auth/components/auth-form-error";
import { requestPasswordReset } from "@/features/auth/client";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/features/auth/schemas/forgot-password";

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordInput) {
    setServerError(null);

    const redirectTo = `${window.location.origin}/login`;

    const { error } = await requestPasswordReset({
      email: values.email,
      redirectTo,
    });

    if (error) {
      setServerError(error.message ?? "Unable to send reset email. Try again.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="space-y-4 text-center">
        <Typography variant="h1">Check your email</Typography>
        <Typography variant="lead">
          If an account exists for that address, we sent password reset
          instructions. Follow the link in the email to choose a new password.
        </Typography>
        <Link href="/login" className="text-xs text-foreground hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <Typography variant="h1">Reset your password</Typography>
        <Typography variant="muted">
          Enter your email and we&apos;ll send reset instructions if an account
          exists.
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {serverError ? <AuthFormError message={serverError} /> : null}
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-medium text-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" className="text-xs text-destructive">
              {errors.email.message}
            </p>
          ) : null}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>
      <p className="text-center text-xs text-muted-foreground">
        <Link href="/login" className="text-foreground hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
