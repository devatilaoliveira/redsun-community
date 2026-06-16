import { cache } from "react";
import "server-only";

import { ContentSlugSchema } from "@/lib/schemas/base.schema";
import { getContentRepository } from "./content-source.server";
import type { ContentCategory } from "./content-types";

const repository = getContentRepository();

export const contentService = {
  getAll: cache((category?: ContentCategory) => repository.getAll(category)),

  getBySlug: cache((category: ContentCategory, slug: string) => {
    const parsedSlug = ContentSlugSchema.safeParse(slug);

    if (!parsedSlug.success) {
      return Promise.resolve(null);
    }

    return repository.getBySlug(category, parsedSlug.data);
  }),

  search: cache((query: string) => repository.search(query)),

  getRelated: cache((ids: string[]) => repository.getRelated(ids)),
};
