"use server";

import { contactFormSchema } from "@/features/contact/schemas/contact";
import { sendContactInquiry } from "@/server/services/contact";

export type SubmitContactFormResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactForm(
  input: unknown,
): Promise<SubmitContactFormResult> {
  const parsed = contactFormSchema.safeParse(input);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      success: false,
      error: firstIssue?.message ?? "Invalid form submission",
    };
  }

  try {
    await sendContactInquiry(parsed.data);
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Unable to send your message. Please try again later.",
    };
  }
}
