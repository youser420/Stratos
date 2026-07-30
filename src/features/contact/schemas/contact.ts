import { z } from "zod";

export const contactSubjectValues = [
  "general",
  "support",
  "billing",
  "business",
] as const;

export type ContactSubject = (typeof contactSubjectValues)[number];

export const contactSubjectOptions: ReadonlyArray<{
  value: ContactSubject;
  label: string;
}> = [
  { value: "general", label: "General inquiry" },
  { value: "support", label: "Product support" },
  { value: "billing", label: "Billing" },
  { value: "business", label: "Business / partnership" },
];

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.email("Enter a valid email address"),
  subject: z.enum(contactSubjectValues, "Select a subject"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
