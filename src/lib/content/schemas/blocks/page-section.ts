import { z } from "zod";

import { PublicAssetPathSchema } from "../primitives";

export const SectionItemSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  icon: PublicAssetPathSchema.optional(),
});

export const PageSectionSchema = z.object({
  kicker: z.string().optional(),
  title: z.string().min(1),
  intro: z.string().optional(),
  body: z.array(z.string().min(1)).default([]),
  items: z.array(SectionItemSchema).default([]),
});

export type PageSection = z.infer<typeof PageSectionSchema>;
