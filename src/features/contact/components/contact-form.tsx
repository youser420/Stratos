"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/features/contact/actions/contact.actions";
import {
  contactFormSchema,
  contactSubjectOptions,
  type ContactFormInput,
} from "@/features/contact/schemas/contact";
import { cn } from "@/utils/cn";

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "general",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormInput) {
    setServerError(null);

    const result = await submitContactForm(values);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="space-y-4 border border-border bg-muted/30 p-6 text-center">
        <Typography variant="h2">Message sent</Typography>
        <Typography variant="lead">
          Thanks for reaching out. We&apos;ll get back to you at the email you provided.
        </Typography>
        <Link href="/faq" className="text-xs text-foreground hover:underline">
          Browse FAQ while you wait
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {serverError ? (
        <div
          role="alert"
          className="border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
        >
          {serverError}
        </div>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="contact-name" className="text-xs font-medium text-foreground">
          Name
        </label>
        <Input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p id="contact-name-error" className="text-xs text-destructive">
            {errors.name.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-email" className="text-xs font-medium text-foreground">
          Email
        </label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="contact-email-error" className="text-xs text-destructive">
            {errors.email.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-subject" className="text-xs font-medium text-foreground">
          Subject
        </label>
        <select
          id="contact-subject"
          className={cn(
            "flex h-9 w-full rounded-none border border-input bg-transparent px-2.5 py-1 text-xs outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50",
            errors.subject && "border-destructive ring-1 ring-destructive/20",
          )}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          {...register("subject")}
        >
          {contactSubjectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.subject ? (
          <p id="contact-subject-error" className="text-xs text-destructive">
            {errors.subject.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-xs font-medium text-foreground">
          Message
        </label>
        <Textarea
          id="contact-message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-xs text-destructive">
            {errors.message.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
