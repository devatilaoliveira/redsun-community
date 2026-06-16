import fs from "node:fs/promises";
import path from "node:path";
import "server-only";
import { load } from "js-yaml";

import { BaseContentSchema } from "@/lib/schemas/base.schema";
import type { ContentRepository } from "./content-repository.interface";
import {
  CONTENT_CATEGORIES,
  type ContentCategory,
  type ContentEntry,
} from "./content-types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export class LocalYamlRepository implements ContentRepository {
  async getAll(category?: ContentCategory): Promise<ContentEntry[]> {
    const categories = category ? [category] : CONTENT_CATEGORIES;

    const entriesByCategory = await Promise.all(
      categories.map(async (currentCategory) => {
        const dir = path.join(CONTENT_DIR, currentCategory);

        let files: string[];
        try {
          files = await fs.readdir(dir);
        } catch {
          return [];
        }

        const contentFiles = files.filter(
          (file) => file.endsWith(".yml") || file.endsWith(".yaml"),
        );

        return Promise.all(
          contentFiles.map(async (file) => {
            const raw = await fs.readFile(path.join(dir, file), "utf8");
            const parsed = load(raw);
            return BaseContentSchema.parse(parsed);
          }),
        );
      }),
    );

    return entriesByCategory.flat();
  }

  async getBySlug(
    category: ContentCategory,
    slug: string,
  ): Promise<ContentEntry | null> {
    const entries = await this.getAll(category);
    return entries.find((entry) => entry.slug === slug) ?? null;
  }

  async search(query: string): Promise<ContentEntry[]> {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    const entries = await this.getAll();

    return entries.filter((entry) => {
      const haystack = [
        entry.title,
        entry.summary,
        entry.content,
        entry.category,
        entry.subcategory,
        ...entry.tags,
        ...entry.aliases,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }

  async getRelated(ids: string[]): Promise<ContentEntry[]> {
    if (ids.length === 0) {
      return [];
    }

    const idSet = new Set(ids);
    const entries = await this.getAll();
    return entries.filter((entry) => idSet.has(entry.id));
  }
}
