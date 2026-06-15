---
name: redsun-design
description: Convert generic UI suggestions, mockups, snippets, or component ideas into RedSun Next.js, React, and Tailwind patterns. Use when adapting layout, styling, accessibility, dark/light theme, content cards, rulebook pages, navigation, search, or design-system suggestions for this repository.
---

# RedSun Design

## Operating Principles

Treat generic UI suggestions as design intent, not code to copy directly.

Prefer this repository's product reality:

- SSR-first rulebook browsing.
- Dense but readable reference content.
- Tailwind CSS for UI.
- Semantic HTML for accessibility and SEO.
- Small reusable React components when patterns repeat.
- Simple MVP visual language before a full design system.

Do not introduce a parallel design system, CSS framework, heavy animation library, or complex theme architecture before the core content experience is stable.

## Visual Direction

The RedSun site should feel like a clear tabletop rulebook reference:

- readable long-form content;
- fast scanning of categories, tags, summaries, and related content;
- strong hierarchy for rules and lore;
- restrained color;
- accessible contrast;
- responsive layouts that work well on mobile and desktop.

Avoid decorative UI that competes with the rulebook content.

## Workflow

1. Understand the UI request.
   - Identify route, component, or page type.
   - Decide whether this is review, guidance, or implementation.
2. Inspect existing patterns.
   - Check nearby pages and shared components.
   - Reuse layout, card, heading, nav, and tag patterns before creating new ones.
3. Map design intent to React components.
   - Use server-rendered components for static content.
   - Use Client Components only for interaction.
   - Extract reusable components only when repeated or likely to repeat.
4. Map styling to Tailwind.
   - Prefer utility classes for layout, spacing, typography, color, and responsive behavior.
   - Keep class lists readable.
   - Use CSS modules only when Tailwind becomes too noisy or cannot express the behavior cleanly.
5. Preserve accessibility and SEO.
   - Use meaningful headings.
   - Use `main`, `nav`, `section`, `article`, `aside`, `ul`, and `li` where appropriate.
   - Use buttons for actions and links for navigation.
   - Keep focus states visible.
   - Ensure content remains useful without relying on client-only rendering.
6. Keep performance in mind.
   - Avoid unnecessary client JavaScript.
   - Avoid large decorative images.
   - Use stable dimensions for media and layout containers.

## Suggested Rulebook Components

Prefer building toward simple primitives such as:

- `PageShell`
- `SectionHeader`
- `ContentCard`
- `ContentGrid`
- `TagList`
- `RelatedContentList`
- `SearchForm`
- `SearchResultCard`
- `MetadataList`
- `RuleArticle`
- `Callout`

Create them only as actual reuse appears.

## Tailwind Guidance

Prefer:

```tsx
<article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
  <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
    Aggravated Damage
  </h2>
  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
    Damage that is difficult to heal and often tied to supernatural harm.
  </p>
</article>
```

Avoid:

```tsx
<div className="card" onClick={openRule}>
  <div className="title">Aggravated Damage</div>
</div>
```

The first example is semantic, accessible, and explicit. The second hides semantics and keyboard behavior.

## Output Format

When reviewing or converting without editing code, explain:

- which generic elements map to React components;
- which Tailwind classes or component patterns should express the design;
- what accessibility changes are required;
- what SEO or SSR implications exist;
- any tradeoff where a reusable component is justified.

When editing code, also report:

- files changed;
- components reused or created;
- accessibility behavior preserved or improved;
- visual/manual checks performed;
- remaining assumptions.
