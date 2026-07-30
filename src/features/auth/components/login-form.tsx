"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resolvePostAuthRedirect } from "@/features/auth/actions/auth.actions";
import { AuthFormError } from "@/features/auth/components/auth-form-error";
import { signIn } from "@/features/auth/client";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/login";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginInput) {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const { error } = await signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setServerError(error.message ?? "Unable to sign in. Check your credentials.");
        return;
      }

      const redirectPath = await resolvePostAuthRedirect(
        searchParams.get("callbackUrl"),
      );

      window.location.assign(redirectPath);
    } catch {
      setServerError("Unable to sign in. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <Typography variant="h1">Log in</Typography>
        <Typography variant="muted">
          Welcome back. Sign in to continue to Stratos.
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
        <div className="space-y-2">
          <label htmlFor="password" className="text-xs font-medium text-foreground">
            Password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
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
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Log in"}
        </Button>
      </form>
      <div className="space-y-2 text-center text-xs text-muted-foreground">
        <p>
          <Link href="/forgot-password" className="text-foreground hover:underline">
            Forgot password?
          </Link>
        </p>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-foreground hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
