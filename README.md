# RedSun Rulebook Website

Personal SSR-first rulebook site for the RedSun tabletop RPG.

The MVP reads local YAML content through a repository-backed content service:

```text
app route/page -> contentService -> ContentRepository -> local YAML
```

Pages should not read files directly. Repository implementations live under
`lib/content/`, and local content lives under `content/`.

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful first routes:

- `/`
- `/rules`
- `/rules/aggravated-damage`

## Content Source

Use `.env.local` for local overrides:

```env
CONTENT_SOURCE=local
```

`CONTENT_SOURCE=supabase` is reserved for a future repository implementation and
currently fails with a clear not-implemented error.

## Verification

Repository instructions prohibit running tests and build commands from the agent
environment. Use static inspection and manual browser checks for this MVP.
