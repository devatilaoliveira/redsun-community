import { z } from "zod";

import { NavigationSchema } from "./navigation";
import {
  DateOnlySchema,
  KebabSlugSchema,
  LinkPathSchema,
  PagePathSchema,
  PublicAssetPathSchema,
} from "./primitives";
import { SeoSchema } from "./seo";
import { PageSectionSchema } from "./blocks/page-section";

export const PlaceholderSchema = z.object({
  message: z.string().min(1),
});

export const HomeBannerSchema = z.object({
  kicker: z.string().optional(),
  title: z.string().min(1),
  intro: z.string().min(1),
  primaryLink: z
    .object({
      label: z.string().min(1),
      href: LinkPathSchema,
    })
    .optional(),
  actions: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.union([LinkPathSchema, z.url()]),
        download: z.boolean().default(false),
        disabled: z.boolean().default(false),
      }),
    )
    .default([]),
});

export const FeatureCardSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  href: LinkPathSchema.optional(),
  icon: PublicAssetPathSchema.optional(),
});

export const PageContentSchema = z.object({
  slug: KebabSlugSchema,
  path: PagePathSchema,
  lastModified: DateOnlySchema.optional(),
  navigation: NavigationSchema,
  seo: SeoSchema,
  placeholder: PlaceholderSchema,
  homeBanner: HomeBannerSchema.optional(),
  featureCards: z.array(FeatureCardSchema).default([]),
  sections: z.array(PageSectionSchema).default([]),
});

export type PageContent = z.infer<typeof PageContentSchema>;
export type FeatureCard = z.infer<typeof FeatureCardSchema>;
