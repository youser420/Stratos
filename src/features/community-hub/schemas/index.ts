import { z } from "zod";

export const createPersonalGoalSchema = z.object({
  title: z.string().trim().min(1, "Give your goal a title.").max(200),
  description: z.string().trim().max(1000).optional(),
  targetDate: z.coerce.date().optional(),
});

export const updatePersonalGoalSchema = z.object({
  goalId: z.string().min(1),
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(1000).optional(),
  targetDate: z.coerce.date().nullable().optional(),
});

export const setPersonalGoalStatusSchema = z.object({
  goalId: z.string().min(1),
  status: z.enum(["ACTIVE", "PAUSED", "COMPLETED", "RETIRED"]),
});

export const logParticipationSchema = z.object({
  type: z.enum(["OUTREACH_EVENT", "LOCAL_OPPORTUNITY", "COMMUNITY_CHECK_IN"]),
  title: z.string().trim().min(1).max(200),
});
