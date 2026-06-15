# Legacy Style Notes

These notes summarize useful intent from the copied SCSS partials. They are reference material for Codex/design only, not app code.

## Breakpoints

The legacy partial used broad viewport bands:

- Small mobile: up to `360px`
- Mobile/tablet: `360px` to `1280px`
- Desktop: `1280px` to `2560px`
- Large desktop: `2560px` and up
- Max content width idea: `1920px`

In this Next/Tailwind app, prefer Tailwind responsive utilities and stable layout constraints. Do not recreate Sass mixins.

## Spacing And Radius

Useful spacing rhythm from the partials:

- `0`, `0.2rem`, `0.5rem`, `1rem`, `1.5rem`, `2rem`, `3rem`, `6rem`
- Radius: `0.375rem`, `0.5rem`, `0.75rem`, full pill radius
- Topbar height idea: `56px`

Map these to Tailwind classes where possible: `gap-2`, `gap-4`, `gap-6`, `p-4`, `p-6`, `rounded-md`, `rounded-lg`, `rounded-full`, `h-14`.

## Color Intent

The copied colors were dark, high-contrast, and game-like:

- Primary blue: `#63A6E9`
- Secondary purple: `#AC93E6`
- Danger/deep red: `#8B0000`
- Black: `#000000`
- Very dark gray: `#0F0F0F`
- Dark gray: `#2A292F`
- Medium gray: `#3A383F`
- Light gray: `#F2F4F7`
- Muted gray: `#89888D`
- Yellow accent: `#F2B71F`

For RedSun, treat these as mood references, not final tokens. Prefer readable rulebook colors:

- Background: parchment/off-white such as `#fffaf8`
- Text: dark ink/zinc such as `#18181b`
- Accent: restrained red/deep red
- Surfaces: white or very light neutral
- Borders: light zinc/neutral

Avoid a broad blue/purple theme unless explicitly requested.

## Typography

The copied partial defined:

- Body and heading default: Vend Sans
- Decorative family: Cinzel Decorative
- Body size: `1rem`
- Medium text: `1.125rem`
- Large text: `2rem`
- Line heights: `1.2`, `1.5`, `1.7`
- Weights: `400`, `500`, `600`, `700`

In this app, local fonts are loaded with `next/font/local` in `app/layout.tsx`.

Use Vend Sans for body text and most UI. Use Cinzel Decorative only for small brand flourishes or major RedSun display moments, not long text.

## Reset Notes

Keep useful reset ideas:

- `box-sizing: border-box`
- font smoothing
- media constrained to max width
- controls inherit font

Do not copy the legacy `overflow: hidden` reset. Rulebook pages need normal document scrolling.

## Fragment Patterns

Translate legacy mixin intent into React/Tailwind patterns:

- Main wrapper: full-height flex column, centered only when the screen is a dashboard or empty state.
- Main content: constrained max-width with responsive horizontal padding.
- Centered content: use flex/grid centering only for small empty states or dialogs.
- Toast container: defer until notifications exist; do not add infrastructure early.
