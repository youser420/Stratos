import { z } from "zod";

import { COACH_SOURCE_IDS } from "@/config/coach";

export const sendCoachMessageSchema = z.object({
  conversationId: z.string().min(1).optional(),
  source: z.enum(COACH_SOURCE_IDS),
  sourceDetail: z.string().max(200).optional(),
  message: z.string().trim().min(1, "Write a message before sending.").max(4000),
});

export type SendCoachMessageFormInput = z.infer<typeof sendCoachMessageSchema>;
