# RedSun Domain Map

Use this layer when tracing content flows, deciding where code belongs, or preserving boundaries for future Supabase and AI integrations.

## Core Domain

The application domain is the RedSun tabletop RPG rulebook.

Primary content categories:

- `rules`
- `lore`
- `callings`
- `powers`
- `races`
- `monsters`
- `equipment`
- `glossary`

Each content entry should have stable identity, routeable metadata, searchable text, and future-ready structured data.

## Current MVP Flow

- Browser requests a Next.js App Router page.
- Page reads route params or search params.
- Page calls `contentService`.
- `contentService` calls the active `ContentRepository`.
- The MVP repository reads local YAML or JSON files from `content/`.
- Parsed content is validated with Zod.
- The page renders HTML on the server.

Pages must not read YAML, JSON files, Supabase, Gemini, or Upstash directly.

## Future Flow

The repository implementation can later change from local files to Supabase.

The page layer should not change when switching content sources. Keep this contract stable:

- `contentService.getAll(category?)`
- `contentService.getBySlug(category, slug)`
- `contentService.search(query)`
- `contentService.getRelated(ids)`

## Content Boundaries

- `app/` owns routes, layouts, metadata, loading states, error states, and route handlers.
- `lib/content/` owns content access, repository selection, repository contracts, search, validation, and content normalization.
- `lib/schemas/` owns Zod schemas for base content and category-specific content.
- `content/` owns local MVP content files only.
- `lib/ai/` owns future Gemini, vector, and RAG server-side helpers.
- `lib/supabase/` owns future Supabase server clients only.
- `scripts/` owns local maintenance scripts such as validation, export, sync, and vector indexing.

## Server-Only Rules

- Repository implementations must be server-only.
- File-system access must stay in `.server.ts` files.
- Supabase service role keys, Gemini keys, and Upstash tokens must stay server-side.
- Never prefix server secrets with `NEXT_PUBLIC_`.
- Client components must not import server-only content, AI, vector, Supabase, or file-system modules.

## Content Rules

- Every content file must include `id`, `slug`, `title`, `category`, `type`, `status`, and `visibility`.
- `tags`, `aliases`, and `related` must always exist, even when empty.
- `slug` must match the route segment.
- `id` must be stable and should not change casually.
- `related` must contain content IDs, not slugs.
- Generic fields belong at the root of the entry.
- Category-specific fields belong inside `data`.

## Search Rules

MVP search is server-side and simple.

Search should inspect:

- title
- summary
- content
- category
- subcategory
- tags
- aliases

Do not introduce fuzzy search, vector search, pagination, or AI answers until the basic content structure and route pages are stable.

## Admin Content Check

The `/admin/content-check` route exists to validate local content health.

It should report:

- invalid YAML or JSON
- schema errors
- duplicate IDs
- duplicate category plus slug pairs
- broken `related` references
- filenames that do not match slugs
- missing summaries or empty tags as warnings

No authentication is required during the local private MVP. Add protection later if the deployed site becomes public.
