import "server-only";

type ContactInquiryPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * Delivers a contact inquiry. Email provider integration is TODO — logs in all
 * environments until CONTACT_* env vars and a mail provider are configured.
 */
export async function sendContactInquiry(payload: ContactInquiryPayload): Promise<void> {
  const recipient = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (recipient && from) {
    // TODO: Integrate email provider (Resend, SendGrid, etc.)
    console.info("[contact] Email delivery not configured; inquiry logged.", {
      to: recipient,
      from,
      subject: payload.subject,
      email: payload.email,
    });
  }

  console.info("[contact] New inquiry", {
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    messageLength: payload.message.length,
    at: new Date().toISOString(),
  });
}
