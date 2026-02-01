# Bitsocial Landing Page

## Project Snapshot

Single-package React landing page for bitsocial.net. Premium dark theme with glassmorphism and chrome shimmer effects. Uses Bun runtime, Vite bundler, TailwindCSS styling, and Framer Motion animations.

## Setup Commands

```bash
bun install          # Install dependencies
bun run dev          # Start dev server (localhost:5173)
bun run build        # Type check + production build
bun run preview      # Preview production build
```

## Code Quality Commands

```bash
bun run typecheck    # Type check with tsgo
bun run lint         # Lint with oxlint
bun run lint:fix     # Auto-fix lint issues
bun run format       # Format with oxfmt
bun run format:check # Check formatting
```

## Universal Conventions

- **Components**: Function components with `export default`
- **Styling**: TailwindCSS utilities; avoid inline styles
- **Imports**: Use `@/` alias for `src/` paths (e.g., `@/lib/utils`)
- **Animations**: Framer Motion `motion` components
- **Class merging**: Use `cn()` from `@/lib/utils` for conditional classes

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Route page components
├── lib/           # Utilities (cn, etc.)
├── assets/        # Imported static assets
└── index.css      # Global styles + Tailwind
```

## Component Patterns

### DO: Follow These Examples

- **Animated section**: `src/components/hero.tsx` - motion variants, responsive sizing
- **Card grid with stagger**: `src/components/features.tsx` - whileInView, viewport once
- **Page composition**: `src/pages/home.tsx` - Topbar + sections + Footer
- **Class utilities**: `src/lib/utils.ts` - cn() for clsx + tailwind-merge

### DON'T

- Class components (use function components)
- CSS modules or styled-components (use Tailwind)
- Direct DOM manipulation (use React state/refs)
- Hardcoded colors (use design tokens from `tailwind.config.ts`)

## Design System

### Colors (from `tailwind.config.ts`)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | #0a0a0a | Page background |
| `bg-secondary` | #111111 | Card backgrounds |
| `blue-core` | #1a4fd0 | Logo sphere blue |
| `blue-glow` | #2563eb | Accent/hover states |
| `silver-dark` | #6b7280 | Muted text, borders |
| `silver-mid` | #9ca3af | Body text |
| `silver-bright` | #e5e7eb | Headings, emphasis |

### CSS Utilities (from `src/index.css`)

| Class | Effect |
|-------|--------|
| `.chrome-text` | Animated silver shimmer gradient |
| `.glass-card` | Glassmorphism: blur + border + semi-transparent |
| `.ring-glow` | Blue glow on hover |

### Typography

- **Headings**: `font-display` (Outfit)
- **Body**: `font-body` (Inter)

## JIT Index

### Quick Find Commands

```bash
# Find component by name
rg -n "export default function" src/components/

# Find page routes
rg -n "Route path=" src/app.tsx

# Find Tailwind custom classes
rg -n "@apply" src/index.css

# Find motion animations
rg -n "motion\." src/components/

# Find design tokens
rg -n "colors:" tailwind.config.ts
```

### Key Files

| Purpose | File |
|---------|------|
| App routing | `src/app.tsx` |
| Global styles | `src/index.css` |
| Design tokens | `tailwind.config.ts` |
| Class utility | `src/lib/utils.ts` |
| Entry point | `src/main.tsx` |

## Adding New Components

1. Create file in `src/components/component-name.tsx` (use kebab-case)
2. Use function component with `export default`
3. Import motion from `framer-motion` for animations
4. Use design tokens, not hardcoded colors
5. Add viewport-triggered animations with `whileInView`

Example structure:

```tsx
import { motion } from "framer-motion";

export default function ComponentName() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-24 px-6"
    >
      {/* Content */}
    </motion.section>
  );
}
```

## Adding New Pages

1. Create file in `src/pages/page-name.tsx` (use kebab-case)
2. Add route in `src/app.tsx`
3. Include `<Topbar />` and `<Footer />` for consistency
4. Reference `src/pages/home.tsx` for page structure

## Common Gotchas

- **Path alias**: Use `@/` not `../` for imports from src
- **Fonts**: Outfit and Inter are loaded via Google Fonts in `index.html`
- **Build**: Uses `rolldown-vite` not standard Vite CLI
- **Type checker**: Uses `tsgo` (native TS) not `tsc`

## Pre-PR Checks

```bash
bun run typecheck && bun run lint && bun run format:check
```

All three must pass before committing.

## Definition of Done

- [ ] Type check passes (`bun run typecheck`)
- [ ] Lint passes (`bun run lint`)
- [ ] Format check passes (`bun run format:check`)
- [ ] Responsive design tested (mobile + desktop)
- [ ] Animations smooth (60fps)

---

## AI Agent Configuration (Contributors)

This project includes recommended AI agent configurations (skills, hooks, agents, commands) stored in `.cursor/` (gitignored). Contributors using AI coding tools should copy these to their tool's config directory.

### Tool-Specific Directories

| Tool | Config Directory |
|------|------------------|
| Cursor | `.cursor/` |
| Claude Code | `.claude/` |
| Codex CLI | `.codex/` |

Copy the contents from `.cursor/` to your tool's directory, or symlink if your tool supports it.

### Available Hooks

Scripts triggered automatically by agent actions (copy `hooks/` folder and `hooks.json`):

| Hook | Trigger | Script | Purpose |
|------|---------|--------|---------|
| `afterFileEdit` | After any file edit | `hooks/format.sh` | Auto-format JS/TS files with oxfmt |
| `stop` | When agent finishes | `hooks/verify.sh` | Run build + lint + typecheck + audit |

### Available Agents

Custom agent definitions (copy `agents/` folder):

| Agent | Description |
|-------|-------------|
| `code-quality` | Runs format/verify hooks, analyzes output, auto-fixes issues |
| `plan-implementer` | Executes markdown plans in parallel with sub-agents (max 4) |
| `react-patterns-enforcer` | Enforces React best practices, prevents useState/useEffect anti-patterns |

### Available Commands

Slash commands (copy `commands/` folder):

| Command | Purpose |
|---------|---------|
| `/commit` | Create Conventional Commits with proper formatting |
| `/deslop` | Remove AI-generated code slop (extra comments, defensive checks, `any` casts) |

### Available Skills

Reusable skill definitions (copy `skills/` folder):

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `commit-format` | Writing commits | Conventional Commits format with backtick-wrapped titles |
| `issue-format` | Creating issues | GitHub issue title/description formatting |
| `context7` | Looking up docs | Fetch current library documentation via Context7 API |
| `frontend-design` | Building UI | Create distinctive, production-grade interfaces (avoid AI slop aesthetics) |
| `find-skills` | "How do I...?" | Discover installable skills from marketplace |
| `programmatic-seo` | SEO at scale | Template-driven page generation for SEO |
| `seo-audit` | SEO review | Technical SEO analysis and diagnostics |
| `seo-fundamentals` | SEO questions | Core SEO principles (E-E-A-T, Core Web Vitals) |
| `vercel-react-best-practices` | React perf | 57 Vercel Engineering rules for React/Next.js optimization |

### Vercel React Best Practices Rules

The `vercel-react-best-practices` skill includes 57+ performance rules in `skills/vercel-react-best-practices/rules/`:

| Category | Priority | Rules |
|----------|----------|-------|
| Async/Waterfalls | CRITICAL | `async-*` - parallel fetching, suspense boundaries |
| Bundle Size | CRITICAL | `bundle-*` - dynamic imports, barrel files, preload |
| Server-Side | HIGH | `server-*` - caching, serialization, parallel fetch |
| Client Data | MEDIUM-HIGH | `client-*` - SWR dedup, event listeners |
| Re-renders | MEDIUM | `rerender-*` - derived state, memo, transitions |
| Rendering | MEDIUM | `rendering-*` - content-visibility, hydration |
| JS Performance | LOW-MEDIUM | `js-*` - loops, caching, Set/Map lookups |
| Advanced | LOW | `advanced-*` - refs, init-once patterns |

### Setup for New Contributors

```bash
# Example: Copy configs for Claude Code
cp -r .cursor/skills .claude/skills
cp -r .cursor/hooks .claude/hooks
cp .cursor/hooks.json .claude/hooks.json

# Or symlink (if tool supports)
ln -s ../.cursor/skills .claude/skills
```

Verify your tool recognizes the configs by checking if skills appear in your agent's available tools.
