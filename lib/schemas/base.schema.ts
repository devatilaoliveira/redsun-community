import { z } from "zod";

export const ContentCategorySchema = z.enum([
  "rules",
  "lore",
  "callings",
  "powers",
  "races",
  "monsters",
  "equipment",
  "glossary",
]);

export const ContentSlugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const BaseContentSchema = z.object({
  id: z.string().min(1),
  slug: ContentSlugSchema,
  title: z.string().min(1),
  category: ContentCategorySchema,
  subcategory: z.string().optional(),
  type: z.string().min(1),
  status: z.enum(["draft", "published"]),
  visibility: z.enum(["public", "private", "gm-only"]),
  summary: z.string().optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).default([]),
  aliases: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  data: z.record(z.string(), z.unknown()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
