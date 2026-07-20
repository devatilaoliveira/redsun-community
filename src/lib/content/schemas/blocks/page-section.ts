import { z } from "zod";

import { LinkPathSchema, PublicAssetPathSchema } from "../primitives";

export const PageSubsectionSchema = z.object({
  title: z.string().min(1),
  body: z.array(z.string().min(1)).default([]),
  bullets: z.array(z.string().min(1)).default([]),
});

export const SectionItemSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  href: LinkPathSchema.optional(),
  icon: PublicAssetPathSchema.optional(),
});

export const PageSectionSchema = z.object({
  kicker: z.string().optional(),
  title: z.string().min(1),
  intro: z.string().optional(),
  body: z.array(z.string().min(1)).default([]),
  items: z.array(SectionItemSchema).default([]),
  subsections: z.array(PageSubsectionSchema).default([]),
});

export type PageSection = z.infer<typeof PageSectionSchema>;
