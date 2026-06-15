---
name: review-next-security
description: Review React and Next.js code for defensive security issues. Use when Codex must inspect Server/Client Component boundaries, route handlers, environment variables, content rendering, route/search params, server-only modules, future Supabase/Gemini/Upstash usage, CSP, external links, or dependency risk.
---

# Review Next Security

## Operating Principles

Treat this as a repository-grounded defensive security review. Anchor claims to code evidence and keep assumptions explicit.

Prefer official guidance first:

- Next.js docs for Server Components, Client Components, route handlers, environment variables, data security, and CSP.
- React docs for rendering and escaping.
- OWASP Top 10 for web risk framing.

Do not provide offensive exploitation guidance.

## Workflow

1. Define the feature, route, component, or server helper under review.
2. Map trust boundaries:
   - route params
   - search params
   - local YAML or JSON content
   - future Supabase rows
   - future Gemini responses
   - future Upstash vector results
   - browser storage
   - environment variables
3. Inspect Server and Client Component boundaries.
   - Server-only helpers must not be imported into Client Components.
   - Secrets must remain in server files and route handlers.
   - Browser code must not call privileged Supabase, Gemini, or Upstash clients.
4. Inspect content rendering.
   - Prefer React text rendering, which escapes strings.
   - Avoid `dangerouslySetInnerHTML`.
   - If markdown or rich HTML rendering is introduced, require explicit sanitization and review.
5. Inspect route handlers.
   - Validate request methods, body shape, and query params.
   - Return generic user-facing errors.
   - Do not leak stack traces or secrets.
6. Inspect config.
   - Do not prefix secrets with `NEXT_PUBLIC_`.
   - Keep `.env.local` untracked.
   - Review CSP only when deployment context requires it.
7. Prioritize realistic risks.

## Review Targets

Prioritize:

- `app/**/*.tsx`
- `app/**/route.ts`
- `lib/**/*.server.ts`
- `lib/content/**/*.ts`
- `lib/ai/**/*.ts`
- `lib/supabase/**/*.ts`
- `.env.example`
- `next.config.ts`
- `package.json`

Watch for:

- server secrets in client modules
- broad `"use client"` files importing server helpers
- `dangerouslySetInnerHTML`
- direct rendering of unvalidated content
- unvalidated route params or request bodies
- user-controlled redirects
- external links missing `rel="noopener noreferrer"`
- verbose errors exposed to users
- client-only authorization assumptions
- service role keys or AI tokens exposed with `NEXT_PUBLIC_`

## Output Format

When reviewing, report findings first:

- Severity: `critical`, `high`, `medium`, `low`, or `info`.
- Location: file and symbol/component/route.
- Risk: realistic attacker goal and affected asset.
- Evidence: code behavior supporting the finding.
- Assumptions: anything not proven from the repo.
- Recommendation: concrete repository-consistent mitigation.

When editing, also report:

- files changed;
- risk reduced;
- verification performed;
- remaining deployment, CSP, backend, or manual review assumptions.

## Quality Bar

Do not claim the app is secure in isolation. Server rendering and React escaping help, but validation, authorization, rate limiting, secret handling, deployment headers, and dependency management still matter.
