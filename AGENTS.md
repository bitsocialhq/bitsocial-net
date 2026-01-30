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

- **Animated section**: `src/components/Hero.tsx` - motion variants, responsive sizing
- **Card grid with stagger**: `src/components/Features.tsx` - whileInView, viewport once
- **Page composition**: `src/pages/Home.tsx` - Topbar + sections + Footer
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
rg -n "Route path=" src/App.tsx

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
| App routing | `src/App.tsx` |
| Global styles | `src/index.css` |
| Design tokens | `tailwind.config.ts` |
| Class utility | `src/lib/utils.ts` |
| Entry point | `src/main.tsx` |

## Adding New Components

1. Create file in `src/components/ComponentName.tsx`
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

1. Create file in `src/pages/PageName.tsx`
2. Add route in `src/App.tsx`
3. Include `<Topbar />` and `<Footer />` for consistency
4. Reference `src/pages/Home.tsx` for page structure

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
