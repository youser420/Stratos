import { z } from "zod";

export const MOOD_TAGS = [
  "energized",
  "steady",
  "motivated",
  "sore",
  "drained",
  "overwhelmed",
] as const;

export const reflectionInputSchema = z.object({
  promptResponse: z.string().trim().max(2000).optional(),
  moodTag: z.enum(MOOD_TAGS).optional(),
});

export type ReflectionFormInput = z.infer<typeof reflectionInputSchema>;
