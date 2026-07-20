import { z } from "zod";

export const SeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});
