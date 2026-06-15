# RedSun Web Project Rules

Apply this file when working in the RedSun rulebook website.

## Project Reality

- This is a single Next.js web application.
- The stack is Next.js App Router, React, TypeScript, and Tailwind CSS.
- There is no Angular app, Spring Boot API, database service, or app-selection split in this repository.
- The MVP content source is local YAML or JSON in the repository.
- Future Supabase, Gemini, and Upstash Vector integrations must remain behind server-side abstractions.

## Product Goal

Build an SSR-first RedSun tabletop RPG rulebook site that lets the owner browse and search rules, lore, callings, powers, races, monsters, equipment, and glossary content.

The MVP optimizes for:

- learning Next.js SSR and App Router;
- simple local content authoring;
- strong content validation;
- SEO-friendly pages;
- low or free hosting on Vercel;
- future migration to Supabase without route rewrites;
- future AI retrieval without exposing secrets.

## Project Conventions

- Use App Router routes under `app/`.
- Keep route pages focused on request params, metadata, content service calls, and rendering.
- Keep content access behind `contentService`.
- Keep repository contracts under `lib/content/`.
- Keep server-only modules suffixed with `.server.ts` where practical.
- Keep shared presentation components small and explicit.
- Use Tailwind utilities for most UI styling.
- Use CSS modules only when Tailwind utilities become unreadable or insufficient.
- Preserve accessible semantic HTML before adding ARIA.

## Required Architecture

Pages must use this dependency direction:

```text
app route/page -> contentService -> ContentRepository -> local YAML/JSON now, Supabase later
```

Do not use this direction:

```text
app route/page -> fs/yaml/supabase directly
```

The core rule is simple: pages know content intent; repositories know content storage.

## Rendering And SEO

- Prefer Server Components by default.
- Use Client Components only for interaction, browser APIs, local state, effects, or client-only libraries.
- The site is SSR-first by design. Content pages may use `export const dynamic = "force-dynamic"` when the page should render per request.
- Use `metadata` or `generateMetadata` for SEO titles and descriptions.
- Content detail pages should derive metadata from validated content when possible.
- Missing content should call `notFound()`.

## Tailwind And UI

- Prefer Tailwind utilities in JSX for layout, spacing, typography, and color.
- Keep reusable UI as React components when a pattern repeats.
- Avoid introducing a full design system before the rulebook content experience is stable.
- Use restrained, readable UI suitable for browsing rules and reference material.
- Keep dark/light choices deliberate and accessible if themes are introduced.

## Security

- Never expose server secrets to client code.
- Do not use `NEXT_PUBLIC_` for Supabase service role keys, Gemini keys, or Upstash tokens.
- Do not call Gemini, Upstash, or Supabase privileged clients from Client Components.
- Treat route params, search params, YAML/JSON content, and future API responses as untrusted until validated or normalized.

## Verification

- Do not run tests for this application.
- Do not run `npm run build`, `next build`, or equivalent build commands from the agent environment.
- Prefer code inspection and targeted manual browser checks when the change affects visible UI.
- Report explicitly that tests were not run due to repository instruction.
