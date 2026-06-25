# AGENTS.md

## Cursor Cloud specific instructions

BoomerBall is a single-page web app (Vite + React 19 + TypeScript) with no
backend; all analytics are computed client-side, so there are no databases or
external services to start. Standard commands are documented in `README.md` and
`package.json` `scripts`.

- Dev server: `npm run dev` serves on `http://localhost:5173/`. It does not
  auto-expose on the network; pass `-- --host` only if you need LAN access.
- Linting uses `oxlint` (config in `.oxlintrc.json`), not ESLint.
- `npm run build` runs `tsc -b` first, so type errors will fail the build even
  when the dev server runs fine.
