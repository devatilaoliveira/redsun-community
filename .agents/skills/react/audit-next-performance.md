---
name: audit-next-performance
description: Audit React and Next.js performance issues and recommend measurable improvements. Use when Codex must inspect Server/Client Component boundaries, App Router routes, Tailwind UI, images, metadata, streaming, data access, repeated content reads, bundle risk, rendering cost, or Core Web Vitals.
---

# Audit Next Performance

## Operating Principles

Treat performance as measured user experience, not a style preference.

Prefer official guidance first:

- Next.js docs for Server Components, Client Components, data fetching, caching, streaming, images, fonts, metadata, and route handlers.
- React docs for rendering, effects, memoization, and component composition.
- Web.dev Core Web Vitals guidance for loading, interactivity, and visual stability.

Separate observed evidence, likely risks, and measurements still needed.

## Workflow

1. Define the route, component, asset, or content flow under review.
2. Inspect Server and Client Component boundaries.
   - Keep non-interactive content server-rendered.
   - Avoid large client module graphs from broad `"use client"` files.
   - Keep providers as deep as practical.
3. Inspect data and content access.
   - Pages should call `contentService`.
   - Avoid duplicate local content reads in the same request where a simple shared helper or request-scoped cache would help.
   - Start independent server reads in parallel when useful.
   - Do not add persistent caching until invalidation rules are clear.
4. Inspect rendering cost.
   - Flag large repeated lists without stable keys.
   - Avoid unnecessary derived state in Client Components.
   - Avoid client effects for data that can be rendered on the server.
5. Inspect images, fonts, and layout stability.
   - Use `next/image` when optimization is useful.
   - Provide dimensions or stable constraints.
   - Prioritize only true above-the-fold LCP images.
   - Prevent layout shift in loading and content states.
6. Inspect loading strategy.
   - Use `loading.tsx` or `Suspense` only where it improves perceived performance.
   - Avoid hiding primary rulebook content behind client-only loading.
7. Recommend small, measurable improvements.

## Review Targets

Prioritize:

- `app/**/*.tsx`
- `app/layout.tsx`
- `app/globals.css`
- shared components
- `lib/content/**/*.ts`
- `next.config.ts`
- `package.json`
- public assets and image usage

Watch for:

- unnecessary `"use client"` at high levels
- client fetching for content that can be server-rendered
- direct file reads from route pages
- duplicate content reads
- large images without dimensions
- missing meaningful loading states for slow server content
- Tailwind class patterns that cause layout shift, overflow, or excessive DOM complexity
- third-party libraries imported into initial routes without clear need

## Output Format

When reviewing, report findings first:

- Severity: `high`, `medium`, `low`, or `info`.
- Location: file and component/service area.
- Performance area: server rendering, client bundle, data access, image, loading, layout stability, or perceived performance.
- Evidence: code behavior or measurement.
- User impact: what becomes slower or wasteful.
- Recommendation: smallest repository-consistent improvement.
- Verification: how to measure whether the change helped.

When editing, also report:

- files changed;
- behavior optimized;
- verification performed;
- remaining measurement gaps.

## Verification Constraint

Do not run tests or full builds. If measurement requires a production build, state that it was skipped by repository instruction.
