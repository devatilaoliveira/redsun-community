---
name: audit-react-accessibility
description: Audit, review, and improve accessibility in React and Next.js App Router code. Use when Codex must inspect server/client components, route pages, shared UI, forms, navigation, dialogs, dynamic content, keyboard behavior, ARIA usage, focus management, metadata, or browser checks for accessibility.
---

# Audit React Accessibility

## Operating Principles

Treat accessibility as a user-flow quality requirement.

Prefer official guidance first:

- WAI/WCAG guidance for user impact and acceptance criteria.
- React guidance for forms, events, effects, and component composition.
- Next.js guidance for App Router, Server Components, Client Components, metadata, links, and images.

Do not claim full WCAG compliance from code inspection alone.

## Workflow

1. Define the route, component, or user flow in scope.
2. Inspect semantic structure first: landmarks, headings, lists, links, buttons, forms, labels, and errors.
3. Check keyboard access: tab order, focus visibility, Enter/Space behavior, Escape behavior, and no traps.
4. Check form accessibility: accessible names, associated descriptions, visible errors, and programmatic error relationships.
5. Check Server and Client Component boundaries:
   - Server-render stable content when possible.
   - Use Client Components only where interaction requires them.
   - Manage focus after client-side dialogs, menus, validation errors, or route-affecting interactions.
6. Check dynamic UI:
   - Use `aria-live` only for meaningful async status updates.
   - Preserve accessible loading, empty, and error states.
   - Ensure hidden content is actually hidden from both visual and assistive tech contexts when appropriate.
7. Check visual accessibility:
   - Color contrast.
   - Focus rings.
   - Text wrapping.
   - Responsive layout.
   - Zoom behavior.
   - Reduced motion.
8. Verify with the smallest useful method.

## Review Targets

Prioritize:

- `app/**/*.tsx`
- shared React components
- `app/layout.tsx`
- route `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`
- forms, search, navigation, menus, dialogs, and content cards
- Tailwind class combinations that affect contrast, focus, spacing, or responsive behavior

Watch for:

- clickable `div` or `span`
- icon-only buttons without names
- links used as buttons or buttons used as links
- inputs without labels
- errors not associated with fields
- focus lost after conditional rendering
- low-contrast text or focus indicators
- heading levels chosen for styling rather than structure
- content that exists only after client hydration when it should be server-rendered

## Output Format

When reviewing, report findings first:

- Severity: `critical`, `high`, `medium`, `low`, or `info`.
- Location: file and element/component.
- User impact: who is affected and how.
- Evidence: code or behavior supporting the finding.
- Recommended fix: small repository-consistent action.

When editing, also report:

- files changed;
- accessibility behavior improved;
- verification performed;
- remaining manual checks.
