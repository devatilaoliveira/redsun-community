---
name: redsun-design-reference
description: Use when designing, restyling, or reviewing RedSun rulebook UI in this Next.js/Tailwind app and the work should preserve the intent of the copied legacy SCSS partials without adding Sass, Angular patterns, or a full design system.
---

# RedSun Design Reference

Use this skill as design guidance only. Do not reintroduce the legacy SCSS partials, Sass dependencies, Angular layout conventions, or copied theme files.

## Workflow

1. Keep implementation Tailwind-first in JSX and `app/globals.css`.
2. Use Server Components by default; add Client Components only for interaction.
3. Read `references/legacy-style-notes.md` when visual decisions involve colors, spacing, type, responsive behavior, or component fragments.
4. Convert only useful ideas into current project patterns:
   - Tailwind utilities for one-off layout and component styling.
   - Small React components when a pattern repeats.
   - CSS variables in `app/globals.css` only for stable global tokens.
   - `next/font/local` for local font files.
5. Keep RedSun rulebook usability ahead of decorative styling: readable content, semantic headings, obvious navigation, visible focus, and scrollable pages.

## Guardrails

- Do not add `.scss` files or install `sass`.
- Do not use Angular naming, lifecycle, services, modules, or component patterns.
- Do not apply `overflow: hidden` to `html` or `body`; rulebook pages must scroll.
- Do not add a theme system until explicitly requested.
- Do not copy the legacy blue/purple palette wholesale. Use it only as historical context.
- Prefer restrained red, parchment/off-white, dark ink, and neutral zinc tones unless the user asks for a bolder direction.

## Component Direction

Favor dense, readable reference UI:

- Page headers: compact label, clear `h1`, short summary.
- Cards: simple borders, radius `8px` or less, no nested cards.
- Tags: small rounded labels with accessible contrast.
- Content pages: max-width reading column, generous line height, clear section breaks.
- Navigation: links for routes, buttons for actions.

Use the decorative heading font sparingly for brand moments; keep body text in the readable sans font.
