import { z } from "zod";

import { RECOVERY_DISCIPLINE_IDS } from "@/config/sphere";

export const startRecoverySessionSchema = z.object({
  discipline: z.enum(RECOVERY_DISCIPLINE_IDS),
});

export const completeRecoverySessionSchema = z.object({
  sessionId: z.string().min(1),
  durationMinutes: z.coerce.number().int().min(1).max(600).optional(),
  notes: z.string().max(1000).optional(),
});

export const abandonRecoverySessionSchema = z.object({
  sessionId: z.string().min(1),
});
