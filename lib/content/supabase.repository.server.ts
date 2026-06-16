import "server-only";

import type { ContentRepository } from "./content-repository.interface";
import type { ContentCategory, ContentEntry } from "./content-types";

export class SupabaseRepository implements ContentRepository {
  async getAll(_category?: ContentCategory): Promise<ContentEntry[]> {
    throw new Error("SupabaseRepository.getAll is not implemented yet.");
  }

  async getBySlug(
    _category: ContentCategory,
    _slug: string,
  ): Promise<ContentEntry | null> {
    throw new Error("SupabaseRepository.getBySlug is not implemented yet.");
  }

  async search(_query: string): Promise<ContentEntry[]> {
    throw new Error("SupabaseRepository.search is not implemented yet.");
  }

  async getRelated(_ids: string[]): Promise<ContentEntry[]> {
    throw new Error("SupabaseRepository.getRelated is not implemented yet.");
  }
}
