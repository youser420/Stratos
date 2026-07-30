import { z } from "zod";

export const goalsSchema = z.object({
  primaryGoal: z.enum(["fat_loss", "muscle_building", "general_fitness"], {
    message: "Select a primary goal",
  }),
});

export type GoalsInput = z.infer<typeof goalsSchema>;

export const experienceSchema = z.object({
  level: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Select your experience level",
  }),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;

const scheduleDayValues = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type ScheduleDay = (typeof scheduleDayValues)[number];

export const scheduleSchema = z
  .object({
    daysPerWeek: z
      .number({ message: "Enter training days per week" })
      .int("Enter a whole number of days")
      .min(1, "Train at least 1 day per week")
      .max(7, "Cannot exceed 7 days per week"),
    preferredDays: z
      .array(z.enum(scheduleDayValues))
      .min(1, "Select at least one preferred day"),
  })
  .superRefine((value, ctx) => {
    if (Number.isNaN(value.daysPerWeek)) {
      ctx.addIssue({
        code: "custom",
        message: "Enter training days per week",
        path: ["daysPerWeek"],
      });
      return;
    }

    if (value.preferredDays.length > value.daysPerWeek) {
      ctx.addIssue({
        code: "custom",
        message: "Preferred days cannot exceed training days per week",
        path: ["preferredDays"],
      });
    }
  });

export type ScheduleInput = z.infer<typeof scheduleSchema>;

const equipmentAccessValues = [
  "commercial_gym",
  "home_gym",
  "dumbbells",
  "barbell",
  "machines",
  "bodyweight_only",
] as const;

export type EquipmentAccess = (typeof equipmentAccessValues)[number];

export const equipmentSchema = z.object({
  access: z
    .array(z.enum(equipmentAccessValues))
    .min(1, "Select at least one equipment option"),
});

export type EquipmentInput = z.infer<typeof equipmentSchema>;

export const constraintsSchema = z
  .object({
    hasConstraints: z.boolean(),
    notes: z.string().max(1000, "Notes are too long").optional(),
  })
  .superRefine((value, ctx) => {
    if (value.hasConstraints && !value.notes?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Describe your constraints or injuries",
        path: ["notes"],
      });
    }
  });

export type ConstraintsInput = z.infer<typeof constraintsSchema>;

export const preferencesSchema = z.object({
  nutritionFocus: z.enum(["balanced", "high_protein", "low_carb"], {
    message: "Select a nutrition focus",
  }),
  trainingStyle: z.enum(["strength", "hypertrophy", "mixed"], {
    message: "Select a training style",
  }),
});

export type PreferencesInput = z.infer<typeof preferencesSchema>;
