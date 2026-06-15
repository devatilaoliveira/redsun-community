# RedSun Rulebook Website, MVP Architecture Plan

## 1. Review Summary

This plan is coherent and suitable for an AI programming agent.

The architecture is intentionally designed around the following priorities:

1. Learn SSR with Next.js App Router.
2. Keep the project free or close to free during the MVP phase.
3. Store content locally as YAML or JSON at first.
4. Keep the content access layer abstracted so Supabase can replace local files later.
5. Prepare the project for a future RedSun AI bot using Gemini and Upstash Vector.
6. Keep all secrets server-side.
7. Avoid premature complexity such as accounts, CMS editing, campaign management, or public user-generated content.

The most important architectural decision is this:

> Pages must not read YAML files directly. Pages must use a content service. The content service must use a repository interface. The first implementation reads local YAML files. A future implementation can read from Supabase without changing page components.

This makes the project both simple now and migration-ready later.

---

## 2. MVP Goal

Build a personal SSR-first Next.js application for the RedSun tabletop RPG rulebook.

The app must allow the user to:

- Browse system rules.
- Browse universe lore.
- Browse races, callings, powers, equipment, monsters, and glossary terms.
- Search all content server-side.
- Validate local content files.
- Deploy to Vercel.
- Keep Gemini, Upstash, and future Supabase secrets server-side.
- Prepare the content model for future Supabase storage and AI vector indexing.

This is not a public-scale product. It is a personal learning project and rulebook platform.

---

## 3. Core Technical Decisions

| Area | Decision |
|---|---|
| Framework | Next.js with App Router |
| Rendering | SSR-first, force dynamic rendering |
| Hosting | Vercel Hobby |
| Content source now | Local YAML or JSON files in repository |
| Content source later | Supabase Free |
| Data access pattern | Repository interface behind content service |
| Validation | Zod schemas |
| Search MVP | Server-side local content search |
| AI bot later | Gemini API through server-side route |
| Vector store later | Upstash Vector |
| Secrets | Environment variables, server-side only |
| CMS | Not in MVP |
| Authentication | Not in MVP |

---

## 4. Rendering Strategy

Use SSR everywhere intentionally, even where static generation would be more efficient.

Reason:

- The app is for personal use.
- Traffic will be low.
- The main goal is learning SSR.
- Server-side content access is useful preparation for a future backend.

Every page that should be SSR can include:

```ts
export const dynamic = "force-dynamic";
```

Use this in content pages such as:

```text
/rules/[slug]
/lore/[slug]
/powers/[slug]
/monsters/[slug]
/search
/admin/content-check
```

---

## 5. Target Architecture

Current MVP flow:

```text
Browser requests /rules/aggravated-damage
Next.js SSR page reads slug
Page calls contentService.getBySlug("rules", slug)
Content service calls LocalYamlRepository
Repository reads content/rules/aggravated-damage.yml
Repository parses and validates content
Page renders HTML on the server
Browser receives HTML and hydrates interactive components
```

Future Supabase flow:

```text
Browser requests /rules/aggravated-damage
Next.js SSR page reads slug
Page calls contentService.getBySlug("rules", slug)
Content service calls SupabaseRepository
Repository queries Supabase content_entries table
Repository validates and normalizes data
Page renders HTML on the server
Browser receives HTML and hydrates interactive components
```

The page code should not change when switching from local YAML to Supabase.

---

## 6. Recommended Folder Structure

```text
redsun-rulebook/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── rules/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── lore/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── callings/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── powers/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── races/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── monsters/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── equipment/
│   │   └── page.tsx
│   │
│   ├── glossary/
│   │   └── page.tsx
│   │
│   ├── search/
│   │   └── page.tsx
│   │
│   ├── admin/
│   │   └── content-check/
│   │       └── page.tsx
│   │
│   └── api/
│       ├── ask-redsun/
│       │   └── route.ts
│       └── vector-search/
│           └── route.ts
│
├── content/
│   ├── rules/
│   ├── lore/
│   ├── callings/
│   ├── powers/
│   ├── races/
│   ├── monsters/
│   ├── equipment/
│   └── glossary/
│
├── lib/
│   ├── content/
│   │   ├── content-service.server.ts
│   │   ├── content-repository.interface.ts
│   │   ├── content-source.server.ts
│   │   ├── local-yaml.repository.server.ts
│   │   ├── supabase.repository.server.ts
│   │   ├── content-types.ts
│   │   ├── content-mappers.ts
│   │   ├── search-content.server.ts
│   │   └── validate-content.server.ts
│   │
│   ├── schemas/
│   │   ├── base.schema.ts
│   │   ├── rule.schema.ts
│   │   ├── lore.schema.ts
│   │   ├── power.schema.ts
│   │   ├── race.schema.ts
│   │   ├── monster.schema.ts
│   │   └── equipment.schema.ts
│   │
│   ├── ai/
│   │   ├── gemini.server.ts
│   │   ├── vector.server.ts
│   │   └── rag.server.ts
│   │
│   ├── supabase/
│   │   └── client.server.ts
│   │
│   └── utils/
│       ├── slug.ts
│       └── text.ts
│
├── scripts/
│   ├── validate-content.ts
│   ├── export-yaml-to-json.ts
│   ├── sync-content-to-supabase.ts
│   ├── build-search-index.ts
│   └── index-vector-store.ts
│
├── .env.local
├── .env.example
├── package.json
└── README.md
```

---

## 7. Content Repository Contract

Create a repository interface that both the local YAML repository and future Supabase repository must implement.

```ts
// lib/content/content-repository.interface.ts

import type { ContentCategory, ContentEntry } from "./content-types";

export interface ContentRepository {
  getAll(category?: ContentCategory): Promise<ContentEntry[]>;

  getBySlug(
    category: ContentCategory,
    slug: string
  ): Promise<ContentEntry | null>;

  search(query: string): Promise<ContentEntry[]>;

  getRelated(ids: string[]): Promise<ContentEntry[]>;
}
```

Agent requirement:

- Pages must only import `contentService`.
- Pages must never import `fs`, `yaml`, or Supabase directly.
- Repository implementations must be server-only.

---

## 8. Content Service

```ts
// lib/content/content-service.server.ts

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
```

---

## 9. Content Source Switch

Use an environment variable to choose the active repository.

```ts
// lib/content/content-source.server.ts

import { LocalYamlRepository } from "./local-yaml.repository.server";
import { SupabaseRepository } from "./supabase.repository.server";

export function getContentRepository() {
  const source = process.env.CONTENT_SOURCE ?? "local";

  if (source === "supabase") {
    return new SupabaseRepository();
  }

  return new LocalYamlRepository();
}
```

Current `.env.local`:

```env
CONTENT_SOURCE=local
```

Future `.env.local`:

```env
CONTENT_SOURCE=supabase
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Security requirement:

- `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to the browser.
- Do not prefix server secrets with `NEXT_PUBLIC_`.

---

## 10. Base Content Types

```ts
// lib/content/content-types.ts

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
```

Design note:

- Generic fields go at the root.
- Type-specific fields go inside `data`.
- This keeps YAML flexible and maps well to Supabase `jsonb` later.

---

## 11. YAML Content Format

Example power entry:

```yml
id: silent-step
slug: silent-step
title: Silent Step
category: powers
subcategory: silent-wind
type: power
status: published
visibility: public

summary: Allows the character to move without sound.

tags:
  - stealth
  - movement
  - combat

aliases:
  - silent movement
  - stealth step

related:
  - silent-wind-path
  - stealth-rules

content: |
  Silent Step allows the character to move without producing sound.

  This does not make the character invisible.

data:
  calling: silent-wind-path
  level: 1
  cost: "1 impetus"
  action: movement
  range: self
  duration: instant
  requirements:
    - Rapidez 1
```

Required conventions:

- Every content file must have `id`, `slug`, `title`, `category`, `type`, `status`, and `visibility`.
- `tags`, `aliases`, and `related` must always exist, even if empty.
- `slug` must match the route segment.
- `id` must be stable and never change lightly.
- `related` must contain IDs, not slugs.

---

## 12. Zod Validation

Create a base schema.

```ts
// lib/schemas/base.schema.ts

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

export const BaseContentSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
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
  data: z.record(z.unknown()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
```

Agent requirement:

- Local YAML repository must validate every parsed file.
- Invalid files must produce clear errors in the admin content check page.
- During development, validation errors may throw.
- For production, validation errors should be handled gracefully.

---

## 13. Local YAML Repository

```ts
// lib/content/local-yaml.repository.server.ts

import fs from "node:fs/promises";
import path from "node:path";
import yaml from "yaml";
import type { ContentCategory, ContentEntry } from "./content-types";
import type { ContentRepository } from "./content-repository.interface";
import { BaseContentSchema } from "@/lib/schemas/base.schema";

const CONTENT_DIR = path.join(process.cwd(), "content");

const ALL_CATEGORIES: ContentCategory[] = [
  "rules",
  "lore",
  "callings",
  "powers",
  "races",
  "monsters",
  "equipment",
  "glossary",
];

export class LocalYamlRepository implements ContentRepository {
  async getBySlug(category: ContentCategory, slug: string) {
    const entries = await this.getAll(category);
    return entries.find((entry) => entry.slug === slug) ?? null;
  }

  async getAll(category?: ContentCategory) {
    const categories = category ? [category] : ALL_CATEGORIES;
    const entries: ContentEntry[] = [];

    for (const currentCategory of categories) {
      const dir = path.join(CONTENT_DIR, currentCategory);

      try {
        const files = await fs.readdir(dir);

        for (const file of files) {
          if (!file.endsWith(".yml") && !file.endsWith(".yaml")) continue;

          const raw = await fs.readFile(path.join(dir, file), "utf8");
          const parsed = yaml.parse(raw);
          const validated = BaseContentSchema.parse(parsed);

          entries.push(validated as ContentEntry);
        }
      } catch {
        continue;
      }
    }

    return entries;
  }

  async search(query: string) {
    const entries = await this.getAll();
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return [];

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

  async getRelated(ids: string[]) {
    if (ids.length === 0) return [];

    const entries = await this.getAll();
    return entries.filter((entry) => ids.includes(entry.id));
  }
}
```

Implementation note:

- This is acceptable for personal use.
- Later, add caching if desired.
- Do not use this repository from client components.

---

## 14. Supabase Repository Placeholder

Create the file now, but it can throw until implemented.

```ts
// lib/content/supabase.repository.server.ts

import type { ContentCategory } from "./content-types";
import type { ContentRepository } from "./content-repository.interface";

export class SupabaseRepository implements ContentRepository {
  async getAll(category?: ContentCategory) {
    throw new Error("SupabaseRepository.getAll is not implemented yet.");
  }

  async getBySlug(category: ContentCategory, slug: string) {
    throw new Error("SupabaseRepository.getBySlug is not implemented yet.");
  }

  async search(query: string) {
    throw new Error("SupabaseRepository.search is not implemented yet.");
  }

  async getRelated(ids: string[]) {
    throw new Error("SupabaseRepository.getRelated is not implemented yet.");
  }
}
```

Later implementation should query a `content_entries` table.

---

## 15. Future Supabase Table Design

Use one flexible table first.

Table name:

```text
content_entries
```

Columns:

| Column | Type | Notes |
|---|---|---|
| id | text | Primary key |
| slug | text | Unique with category |
| title | text | Required |
| category | text | Required |
| subcategory | text | Optional |
| type | text | Required |
| status | text | draft or published |
| visibility | text | public, private, gm-only |
| summary | text | Optional |
| content | text | Optional |
| tags | text[] | Default empty |
| aliases | text[] | Default empty |
| related | text[] | Stores related IDs |
| data | jsonb | Type-specific fields |
| created_at | timestamptz | Default now |
| updated_at | timestamptz | Default now |

Recommended constraints later:

```sql
unique (category, slug)
```

Optional indexes later:

```sql
create index content_entries_category_idx on content_entries (category);
create index content_entries_slug_idx on content_entries (slug);
create index content_entries_tags_gin_idx on content_entries using gin (tags);
create index content_entries_data_gin_idx on content_entries using gin (data);
```

---

## 16. Page Implementation Example

```tsx
// app/rules/[slug]/page.tsx

import { notFound } from "next/navigation";
import { contentService } from "@/lib/content/content-service.server";

export const dynamic = "force-dynamic";

export default async function RulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const rule = await contentService.getBySlug("rules", slug);

  if (!rule) {
    notFound();
  }

  const related = await contentService.getRelated(rule.related);

  return (
    <main>
      <h1>{rule.title}</h1>

      {rule.summary && <p>{rule.summary}</p>}

      {rule.tags.length > 0 && (
        <ul>
          {rule.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      <article>
        {rule.content}
      </article>

      {related.length > 0 && (
        <section>
          <h2>Related</h2>
          <ul>
            {related.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
```

Agent requirement:

- Use the same page pattern for lore, powers, races, monsters, and callings.
- Use shared presentation components where possible.
- Do not overbuild design in the first pass.

---

## 17. Search MVP

Route:

```text
/search?q=damage
```

Search flow:

```text
Page reads query param
Page calls contentService.search(q)
Repository searches title, summary, content, category, subcategory, tags, and aliases
Page renders result cards
```

Search result should display:

- Title
- Category
- Subcategory if available
- Summary
- Tags
- Link to detail page

MVP search does not need:

- Fuzzy search
- Highlighting
- Pagination
- Vector search
- AI answers

Those can come later.

---

## 18. Admin Content Check Page

Route:

```text
/admin/content-check
```

Purpose:

- Learn SSR diagnostics.
- Validate content health.
- Prevent broken content structure.

The page should check:

- Invalid YAML.
- Invalid schema.
- Duplicate IDs.
- Duplicate slugs inside same category.
- Missing required fields.
- Broken `related` references.
- Empty tags.
- Empty summaries.
- Files whose names do not match their slug.
- Orphan content with no incoming references, optional warning.

Output format:

- Summary counts.
- Error list.
- Warning list.
- Valid content list.

MVP behavior:

- No authentication required while local-only and private.
- Add simple protection later if deployed publicly.

---

## 19. Future AI Bot Preparation

Do not build the full bot in phase 1.

Prepare these files:

```text
lib/ai/gemini.server.ts
lib/ai/vector.server.ts
lib/ai/rag.server.ts
app/api/ask-redsun/route.ts
scripts/index-vector-store.ts
```

Environment variables:

```env
GEMINI_API_KEY=
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=
```

Security rules:

- Do not use `NEXT_PUBLIC_` for Gemini or Upstash secrets.
- Do not call Gemini directly from client components.
- Do not call Upstash with secret tokens from the browser.
- AI and vector calls must happen inside server-side files or API routes.

Future RAG flow:

```text
User asks a question
POST /api/ask-redsun
Server embeds the question
Server queries Upstash Vector
Server retrieves relevant RedSun chunks
Server sends context and question to Gemini
Server returns answer with source links
```

Vector metadata should include:

```json
{
  "id": "aggravated-damage-001",
  "title": "Aggravated Damage",
  "category": "rules",
  "subcategory": "combat",
  "sourceUrl": "/rules/aggravated-damage",
  "tags": ["damage", "aggravated", "healing"]
}
```

---

## 20. Future Supabase Migration Plan

### Step 1, local content only

```env
CONTENT_SOURCE=local
```

All content is stored in the repository.

### Step 2, export normalized content

Create:

```text
scripts/export-yaml-to-json.ts
```

This script should:

- Read all YAML files.
- Validate with Zod.
- Normalize fields.
- Export one JSON file for inspection.

### Step 3, create Supabase table

Create `content_entries` with the schema described earlier.

### Step 4, sync YAML to Supabase

Create:

```text
scripts/sync-content-to-supabase.ts
```

This script should:

- Read all YAML files.
- Validate all entries.
- Convert `createdAt` to `created_at`.
- Convert `updatedAt` to `updated_at`.
- Upsert into Supabase by `id`.

### Step 5, implement SupabaseRepository

The repository must implement the same interface:

```ts
ContentRepository
```

### Step 6, switch content source

```env
CONTENT_SOURCE=supabase
```

No page should need to change.

---

## 21. MVP Implementation Phases

### Phase 1, Project Foundation

Tasks:

- Create Next.js project with App Router.
- Add TypeScript.
- Add basic layout.
- Add global CSS.
- Add `.env.example`.
- Add Vercel deployment.

Acceptance criteria:

- App runs locally.
- App deploys to Vercel.
- Home page renders through SSR.

### Phase 2, Content Infrastructure

Tasks:

- Add content folders.
- Add base content types.
- Add Zod base schema.
- Add repository interface.
- Add local YAML repository.
- Add content service.
- Add content source switch.

Acceptance criteria:

- `contentService.getAll()` returns local content.
- Invalid YAML content is detected.
- Pages do not import `fs` directly.

### Phase 3, Core Pages

Tasks:

- Add `/rules` index.
- Add `/rules/[slug]` detail.
- Add `/lore` index.
- Add `/lore/[slug]` detail.
- Add `/callings` and `/callings/[slug]`.
- Add `/powers` and `/powers/[slug]`.
- Add `/races` and `/races/[slug]`.
- Add `/monsters` and `/monsters/[slug]`.
- Add `/equipment`.
- Add `/glossary`.

Acceptance criteria:

- Each section reads through `contentService`.
- Missing content returns `notFound()`.
- Related content is displayed where available.

### Phase 4, Search

Tasks:

- Add `/search` route.
- Read `q` from search params.
- Search local content server-side.
- Render result cards.

Acceptance criteria:

- Searching for a title returns matching content.
- Searching for a tag returns matching content.
- Empty search returns empty state.

### Phase 5, Admin Content Check

Tasks:

- Add `/admin/content-check` route.
- Validate all files.
- Detect duplicate IDs.
- Detect duplicate category plus slug.
- Detect broken related IDs.
- Display errors and warnings.

Acceptance criteria:

- Page shows a summary.
- Invalid content is reported clearly.
- Broken relations are reported clearly.

### Phase 6, Future-Ready AI Structure

Tasks:

- Add placeholder Gemini service.
- Add placeholder vector service.
- Add placeholder RAG service.
- Add placeholder `/api/ask-redsun` route.
- Add `.env.example` entries for Gemini and Upstash.

Acceptance criteria:

- No secret is exposed to the browser.
- AI route exists but can return a placeholder response.
- Client components do not import AI services.

### Phase 7, Optional Supabase Preparation

Tasks:

- Add Supabase repository placeholder.
- Add Supabase server client placeholder.
- Add future SQL schema documentation.
- Add export script placeholder.
- Add sync script placeholder.

Acceptance criteria:

- `CONTENT_SOURCE=local` works.
- `CONTENT_SOURCE=supabase` fails with clear not implemented errors until implemented.
- No page changes are needed to support the future repository.

---

## 22. Things Not Included in MVP

Do not build these yet:

- Login.
- User profiles.
- CMS editor.
- Campaign manager.
- Character builder.
- Public comments.
- Homebrew sharing.
- Multiplayer dice rooms.
- Full AI chatbot.
- AI memory.
- Payment features.
- Complex permissions.

These features can be added after the rulebook structure is stable.

---

## 23. Agent Implementation Rules

An AI programming agent should follow these rules:

1. Do not read YAML directly from page components.
2. Do not import server-only files into client components.
3. Keep all content access behind `contentService`.
4. Keep repository implementations interchangeable.
5. Validate content with Zod.
6. Keep secrets in environment variables.
7. Do not prefix secrets with `NEXT_PUBLIC_`.
8. Use `.server.ts` suffix for server-only services.
9. Use `notFound()` for missing route content.
10. Keep MVP UI simple.
11. Do not introduce a database in phase 1.
12. Do not introduce authentication in phase 1.
13. Do not implement AI before content structure and search work.
14. Prefer explicit file paths and simple functions.
15. Add acceptance criteria for each phase before implementation.

---

## 24. Final MVP Definition

The MVP is complete when:

- The app deploys to Vercel.
- Pages are SSR-first.
- Content is stored locally as YAML or JSON.
- Content is accessed through a repository interface.
- Pages use `contentService`, not direct file access.
- Rules, lore, callings, powers, races, monsters, equipment, and glossary pages exist.
- Server-side search works.
- Content validation works.
- The project is prepared for Supabase without requiring page rewrites.
- The project is prepared for a future Gemini and Upstash Vector bot.
- No secrets are exposed to browser code.

---

## 25. Recommended First Coding Task

Start with this task:

```text
Create a Next.js App Router project with TypeScript. Implement the local YAML content repository, content service, base Zod schema, and one working SSR route at /rules/[slug]. Add one example YAML rule file. Do not implement Supabase or AI yet, only create placeholders where needed.
```

This gives a clean vertical slice:

```text
YAML file
Repository
Content service
SSR page
Rendered HTML
```

Once this works, duplicate the pattern for the remaining content categories.
