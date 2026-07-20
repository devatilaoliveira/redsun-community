import { z } from "zod";

export const NavigationGroupSchema = z.enum(["primary", "legal", "hidden"]);

export const NavigationSchema = z.object({
  label: z.string().min(1),
  group: NavigationGroupSchema,
  order: z.number().int(),
});

export type NavigationGroup = z.infer<typeof NavigationGroupSchema>;
