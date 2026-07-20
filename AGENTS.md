<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This repository uses Next.js 16.2.9 and React 19.2.4. Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. APIs, route conventions, caching behavior, metadata, and server/client component rules may differ from older Next.js knowledge.
<!-- END:nextjs-agent-rules -->

# Repository Agent Rules

This repository is a single web application: the RedSun rulebook website.

The app is built with Next.js App Router, React, TypeScript, and Tailwind CSS. There is no separate API application, backend service, or database project in this repository during the MVP.

## Baseline

- Treat this `AGENTS.md` file as always-on baseline guidance.
- Treat files under `.agents/` as optional layers unless the session launcher explicitly activates them.
- Do not use app-local `AGENTS.md` files; the root file is the single repository entrypoint.
- When optional layers are activated, prefer instructions in this order:
  1. Explicit task and user instructions.
  2. Skill-specific files.
  3. Core files.
  4. Project-specific files.
  5. Stack-specific files.

## Product Direction

- Build a personal SSR-first rulebook website for the RedSun tabletop RPG.
- Keep the MVP simple: local YAML or JSON content, server-side search, content validation, and deployment to Vercel.
- Prepare for future Supabase, Gemini, and Upstash Vector integrations without implementing them before the content structure is stable.
- Do not introduce authentication, accounts, CMS editing, campaign tools, character builders, comments, payments, or a full AI chatbot during the MVP unless explicitly requested.

## Verification Constraint

- Do not run tests for this application at all.
- Do not run full frontend build commands from the agent environment, such as `npm run build` or `next build`; this environment is known to fail build-like commands with `spawn EPERM`.
- Prefer static inspection, targeted TypeScript or lint commands only if explicitly requested, and browser/manual checks when relevant.
- If verification is skipped, report that no tests were run by project instruction.

## App Selection

Use `scripts/codexLaucher.ps1` from the repository root to start a layered Codex session.

This repository has only one app context, so the launcher does not need `-App web`, `-App api`, `-App all`, or `-App repo`.

Default active layers:

- Shared engineering baseline: `.agents/core/methodical.md`
- RedSun web project map: `.agents/projects/redsun-web.md`
- RedSun content domain map: `.agents/projects/domain-map.md`
- React and Next.js stack rules: `.agents/stacks/react.md`

Optional skill layers:

- Accessibility audit: `.agents/skills/react/audit-react-accessibility.md`
- Performance audit: `.agents/skills/react/audit-next-performance.md`
- Security review: `.agents/skills/react/review-next-security.md`
- RedSun design adaptation: `.agents/skills/react/redsun-design.md`

## Layer Index

- Shared engineering baseline: `.agents/core/methodical.md`
- Teaching mode: `.agents/core/teacher.md`
- RedSun web project map: `.agents/projects/redsun-web.md`
- Content and domain boundaries: `.agents/projects/domain-map.md`
- React and Next.js stack rules: `.agents/stacks/react.md`
- React/Next skill layers: `.agents/skills/react/*.md`
