import { z } from "zod";

import { ASCENSION_DISCIPLINE_IDS } from "@/config/sphere";

export const startAscensionSessionSchema = z.object({
  discipline: z.enum(ASCENSION_DISCIPLINE_IDS),
});

export const completeAscensionSessionSchema = z.object({
  sessionId: z.string().min(1),
  durationMinutes: z.coerce.number().int().min(1).max(600).optional(),
  notes: z.string().max(1000).optional(),
});

export const abandonAscensionSessionSchema = z.object({
  sessionId: z.string().min(1),
});

export type StartAscensionSessionInput = z.infer<typeof startAscensionSessionSchema>;
export type CompleteAscensionSessionInput = z.infer<typeof completeAscensionSessionSchema>;
