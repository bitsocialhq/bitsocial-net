# Bitsocial Landing Page

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Route page components
├── lib/           # Utilities (cn, etc.)
├── assets/        # Imported static assets
└── index.css      # Global styles + Tailwind
```

| Purpose | File |
|---------|------|
| App routing | `src/app.tsx` |
| Global styles | `src/index.css` |
| Design tokens | `tailwind.config.ts` |
| Class utility | `src/lib/utils.ts` |
| Entry point | `src/main.tsx` |

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Start dev server (localhost:5173)
bun run build        # Type check + production build
bun run typecheck    # Type check with tsgo
bun run lint         # Lint with oxlint
bun run lint:fix     # Auto-fix lint issues
bun run format       # Format with oxfmt
bun run format:check # Check formatting
```

## Where This Project Is Weird

- **Bun, not npm or yarn.** Always `bun install`, `bun run`, etc.
- **`tsgo` (native TS), not `tsc`.** The typecheck command uses tsgo.
- **`oxlint` + `oxfmt`, not eslint + prettier.** Linting and formatting are Oxidation Compiler tools.
- **`@/` path alias.** Use `@/` for all imports from `src/`, never relative `../` paths.
- **Fonts loaded in `index.html`**, not imported in JS. Outfit (headings) and Inter (body).
- **Commitizen + Husky.** `git commit` triggers an interactive Commitizen prompt that will hang in a non-interactive shell. Agents must use `git commit --no-verify -m "message"` to bypass hooks. Humans can use `bun run commit` / `bunx cz` for the interactive flow.
- **Animations must respect `prefers-reduced-motion`.** Don't add animations without a reduced-motion fallback.
- **35 language files.** Don't hand-edit translation files across languages. Use `scripts/update-translations.js` to add/remove/audit keys (see the translations skill). Only edit individual language files for translation corrections.

## Out of Scope

This repo is the public-facing website only. Don't build or scaffold:
- Wallet integration
- Authentication / login flows
- Governance or voting UIs
- Token economics dashboards
- Backend services or indexers

This is intentional -- these live elsewhere in the ecosystem.

## React Doctor (Advisory)

React Doctor is advisory quality tooling for React architecture/perf/correctness checks.

**Standard commands:**
- `bun run doctor`, `bun run doctor:score`, `bun run doctor:verbose`

**Trigger rules:**
- Run after touching React UI logic (`components`, `hooks`, route/page/view files, state/store code used by UI).
- Run before opening PRs that include React behavior changes.

**Interpretation:**
- Treat diagnostics as actionable recommendations.
- Prioritize `error` diagnostics first, then `warning`.
- Score is informative only; no merge blocking based on score yet.

## Pre-PR Checks

All three must pass before committing:

```bash
bun run typecheck && bun run lint && bun run format:check
```

## Hooks (Auto-Run)

| Hook | Trigger | What it does |
|------|---------|--------------|
| `afterFileEdit` | After any file edit | Auto-formats JS/TS files with oxfmt |
| `stop` | When agent finishes | Runs build + lint + typecheck + audit |

Don't manually format files -- the hook handles it.

## Workflow Preferences

### Commits

Conventional Commits style. Title **must be wrapped in backticks**. Use `perf` for performance optimizations (not `fix`). Optional 2-3 sentence description (informal, no bullet points).

> **Commit title:** `feat: add glassmorphism card component`
>
> Created reusable `glass-card` component with blur backdrop and subtle border. Uses design tokens from `tailwind.config.ts`.

### Issues

Title as short as possible, **wrapped in backticks**. Description: 2-3 sentences about the problem (not the solution), written as if unfixed.

> **GitHub issue:**
> - **Title:** `Hero animation jank on mobile Safari`
> - **Description:** The chrome shimmer effect in `hero.tsx` causes frame drops on iOS Safari. The CSS animation isn't GPU-accelerated properly.

### Troubleshooting

When stuck on a bug, search the web. Developer communities often have fixes that aren't in training data.

## Browser Testing

Use `agent-browser` CLI, not Playwright MCP, Chrome DevTools MCP, Puppeteer, or Cursor's built-in browser. It uses compact snapshots + element refs instead of full DOM, which keeps agent context small.

```bash
agent-browser open http://localhost:5173
agent-browser snapshot -i
agent-browser click @e5
```

Install if missing: `bun add -g agent-browser && agent-browser install`

## Contributor Setup

AI agent configs (skills, hooks, agents, commands) live in `.cursor/` (gitignored). Contributors using other AI tools should copy to their tool's config directory:

```bash
# Example: Claude Code
cp -r .cursor/skills .claude/skills
cp -r .cursor/hooks .claude/hooks
cp .cursor/hooks.json .claude/hooks.json
```
