# React And Next.js Stack Defaults

Apply this file for all implementation work in this repository.

## Installed Stack

- Next.js 16.2.9
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- App Router

Before changing framework code, read the relevant guide in `node_modules/next/dist/docs/`.

## Framework Defaults

- Use App Router conventions in `app/`.
- Pages, layouts, and most route-level components are Server Components by default.
- Add `"use client"` only where the component needs state, event handlers, effects, browser APIs, or client-only libraries.
- Keep the `"use client"` boundary as small as practical because everything imported by that module enters the client bundle.
- Use `params` and `searchParams` as promises where this Next.js version expects them.
- Use route handlers in `app/**/route.ts` for server API endpoints.
- Do not use Pages Router patterns unless the repository explicitly adds `pages/`.

## SSR And SEO First

- Prefer server-rendered content pages for rulebook routes.
- Use `metadata` for static metadata and `generateMetadata` for content-driven metadata.
- Use `notFound()` for missing content detail routes.
- Keep primary content visible in the initial server-rendered HTML.
- Use semantic headings and landmarks that support both accessibility and SEO.
- Do not hide meaningful rulebook content behind client-only rendering.

## Data And Content Access

- Pages call `contentService`; pages do not import `fs`, `yaml`, Supabase clients, AI clients, or vector clients directly.
- Server-only content modules should import `server-only` when available or use clear `.server.ts` naming.
- Validate local content with Zod before rendering.
- Keep repository implementations interchangeable.
- Use simple request-scoped memoization such as React `cache` only when duplicate server reads are proven or likely.

## Tailwind UI

- Use Tailwind utilities for the main UI.
- Keep global CSS limited to Tailwind imports, base document styling, CSS variables, and truly global rules.
- Prefer reusable React components over repeated long utility strings when a UI pattern repeats.
- Use `next/image` for meaningful images when image optimization is useful.
- Include explicit image dimensions or stable layout constraints to prevent layout shift.

## Performance

- Keep Server Components as the default to reduce client JavaScript.
- Avoid broad client providers at the root unless necessary.
- Place providers as deep as practical.
- Avoid fetching the same content separately in parent and child components.
- Start independent server reads in parallel when it materially reduces wait time.
- Use `loading.tsx` or `Suspense` for meaningful streaming states only when they improve UX.
- Do not add caching layers before the data source and invalidation rules are clear.

## Accessibility

- Prefer native semantic HTML.
- Use buttons for actions and links for navigation.
- Ensure every form control has an accessible label.
- Ensure icon-only controls have accessible names.
- Preserve visible focus states.
- Keep heading order meaningful for rulebook browsing.
- Treat ARIA as a supplement, not a replacement for correct HTML.

## Security

- Server secrets stay server-side and must not use `NEXT_PUBLIC_`.
- Client Components must not import privileged server helpers.
- Validate and normalize content before rendering.
- Avoid `dangerouslySetInnerHTML`. If rich content rendering becomes necessary, use a sanitization and rendering strategy that is explicitly reviewed.
- External links opened in a new tab need `rel="noopener noreferrer"`.
- Consider CSP through `next.config.ts` or `proxy.ts` only when the deployment need is clear.

## Verification

- Do not run tests.
- Do not run `next build` or `npm run build` from the agent environment.
- Use code inspection and small manual checks.
- If a dev server is needed for visual review, start `npm run dev` only when appropriate and stop or report the session state clearly.
