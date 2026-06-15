import { getContentRepository } from "./content-source.server";
import type { ContentCategory } from "./content-types";

const repository = getContentRepository();

export const contentService = {
  getAll(category?: ContentCategory) {
    return repository.getAll(category);
  },

  getBySlug(category: ContentCategory, slug: string) {
    return repository.getBySlug(category, slug);
  },

  search(query: string) {
    return repository.search(query);
  },

  getRelated(ids: string[]) {
    return repository.getRelated(ids);
  },
};
