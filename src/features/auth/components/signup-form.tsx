"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resolvePostAuthRedirect } from "@/features/auth/actions/auth.actions";
import { AuthFormError } from "@/features/auth/components/auth-form-error";
import { signUp } from "@/features/auth/client";
import { signUpSchema, type SignUpInput } from "@/features/auth/schemas/signup";
import { cn } from "@/utils/cn";

export function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  async function onSubmit(values: SignUpInput) {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const { error } = await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (error) {
        setServerError(error.message ?? "Unable to create account. Try again.");
        return;
      }

      const redirectPath = await resolvePostAuthRedirect("/onboarding");
      window.location.assign(redirectPath);
    } catch {
      setServerError("Unable to create account. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <Typography variant="h1">Create your account</Typography>
        <Typography variant="muted">
          Start with Stratos and complete onboarding to get your personalized plan.
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {serverError ? <AuthFormError message={serverError} /> : null}
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-medium text-foreground">
            Name
          </label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" className="text-xs text-destructive">
              {errors.name.message}
            </p>
          ) : null}
        </div>
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
        <div className="space-y-2">
          <label htmlFor="password" className="text-xs font-medium text-foreground">
            Password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          {errors.password ? (
            <p id="password-error" className="text-xs text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="flex items-start gap-3 text-xs text-muted-foreground">
            <input
              type="checkbox"
              className={cn(
                "mt-0.5 size-4 shrink-0 accent-primary",
                errors.acceptTerms && "outline outline-1 outline-destructive",
              )}
              aria-invalid={Boolean(errors.acceptTerms)}
              aria-describedby={errors.acceptTerms ? "terms-error" : undefined}
              {...register("acceptTerms")}
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-foreground hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-foreground hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.acceptTerms ? (
            <p id="terms-error" className="text-xs text-destructive">
              {errors.acceptTerms.message}
            </p>
          ) : null}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Sign up"}
        </Button>
      </form>
      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
