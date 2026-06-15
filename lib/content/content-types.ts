export type ContentCategory =
  | "rules"
  | "lore"
  | "callings"
  | "powers"
  | "races"
  | "monsters"
  | "equipment"
  | "glossary";

export interface ContentEntry {
  id: string;
  slug: string;
  title: string;
  category: ContentCategory;
  subcategory?: string;
  type: string;
  status: "draft" | "published";
  visibility: "public" | "private" | "gm-only";
  summary?: string;
  content?: string;
  tags: string[];
  aliases: string[];
  related: string[];
  data?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export const CONTENT_CATEGORIES: ContentCategory[] = [
  "rules",
  "lore",
  "callings",
  "powers",
  "races",
  "monsters",
  "equipment",
  "glossary",
];
