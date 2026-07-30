import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  acceptTerms: z.boolean().refine((value) => value, {
    message: "You must accept the Terms and Privacy Policy",
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
