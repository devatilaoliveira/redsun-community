import type { ContentCategory, ContentEntry } from "./content-types";

export interface ContentRepository {
  getAll(category?: ContentCategory): Promise<ContentEntry[]>;

  getBySlug(
    category: ContentCategory,
    slug: string,
  ): Promise<ContentEntry | null>;

  search(query: string): Promise<ContentEntry[]>;

  getRelated(ids: string[]): Promise<ContentEntry[]>;
}
