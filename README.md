# Bitsocial Landing Page

A premium dark-themed landing page for bitsocial.net built with Vite + React + TypeScript, featuring animated metallic effects and glassmorphism design.

## Tech Stack

| Category | Tools |
|----------|-------|
| Runtime | Bun |
| Build | Rolldown-Vite |
| Framework | React 18, TypeScript |
| Styling | TailwindCSS, tailwindcss-animate |
| Animation | Framer Motion, GSAP |
| 3D Graphics | Three.js |
| UI Components | Radix UI, Lucide icons |
| Routing | React Router |
| Code Quality | Oxlint, Oxfmt, tsgo |

## Features

- 3D animated planet graphic with orbiting rings (Three.js)
- Interactive mesh network visualization
- Chrome shimmer text effects
- Glassmorphism cards with silver borders
- Dark/light theme toggle
- Fully responsive design
- Smooth scroll-triggered animations
- Three pages: Home, Docs, Apps

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (latest version)

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

### Code Quality

```bash
# Lint code
bun run lint

# Fix linting issues
bun run lint:fix

# Format code
bun run format

# Check formatting
bun run format:check

# Type check
bun run typecheck
```

## Project Structure

```
src/
├── components/
│   ├── topbar.tsx           # Navigation bar
│   ├── hero.tsx             # Hero section with CTA
│   ├── features.tsx         # Features grid
│   ├── roadmap.tsx          # Timeline roadmap
│   ├── footer.tsx           # Footer
│   ├── mode-toggle.tsx      # Dark/light theme toggle
│   ├── theme-provider.tsx   # Theme context provider
│   ├── planet-graphic/      # 3D globe with Three.js
│   ├── mesh-network/        # Network visualization
│   └── ui/                  # Radix-based primitives
├── pages/
│   ├── home.tsx             # Home page
│   ├── docs.tsx             # Documentation page
│   └── apps.tsx             # Apps showcase page
├── lib/
│   └── utils.ts             # cn() and utilities
├── app.tsx                  # Router + providers
├── main.tsx                 # Entry point
└── index.css                # Global styles + Tailwind
```

## Design System

### Color Palette

- `bg-primary`: #0a0a0a (Deep black background)
- `bg-secondary`: #111111 (Card backgrounds)
- `blue-core`: #1a4fd0 (Logo sphere blue)
- `blue-glow`: #2563eb (Accent blue)
- `silver-dark`: #6b7280 (Muted silver)
- `silver-mid`: #9ca3af (Mid silver)
- `silver-bright`: #e5e7eb (Bright silver/white)

### Typography

- **Display/Hero**: Outfit (geometric, bold)
- **Body**: Inter (refined letter-spacing)

## Pages

| Route | Page | Content |
|-------|------|---------|
| `/` | Home | Hero with 3D planet, features grid, roadmap timeline |
| `/docs` | Docs | Documentation (placeholder) |
| `/apps` | Apps | App showcase grid (placeholder) |
