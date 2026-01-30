# Bitsocial Landing Page

A premium dark-themed landing page for bitsocial.net built with Vite + React + TypeScript, featuring animated metallic effects and glassmorphism design.

## Tech Stack

- **Bun** - Package manager and runtime
- **Vite** - Build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing
- **Oxlint** - Fast linter
- **Oxfmt** - Code formatter
- **tsgo** - TypeScript type checker

## Features

- 🎨 Premium dark aesthetic with silver-rings-on-blue-globe motif
- ✨ Chrome shimmer text effects
- 🌐 Glassmorphism cards with silver borders
- 📱 Fully responsive design
- 🎭 Smooth animations and transitions
- 🗺️ Interactive roadmap timeline
- 📄 Three pages: Home, Docs, Apps

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
bitsocial-net/
├── public/
│   └── logo.png          # Logo asset
├── src/
│   ├── assets/
│   │   └── logo.png      # Logo for imports
│   ├── components/
│   │   ├── Topbar.tsx    # Navigation bar
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Features.tsx  # Features grid
│   │   ├── Roadmap.tsx   # Timeline roadmap
│   │   └── Footer.tsx    # Footer
│   ├── pages/
│   │   ├── Home.tsx      # Home page
│   │   ├── Docs.tsx      # Documentation page
│   │   └── Apps.tsx      # Apps showcase page
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── oxlint.json
├── oxfmt.json
├── tsgo.json
└── package.json
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

### Home (`/`)
- Hero section with animated logo
- Features showcase
- Roadmap timeline
- Footer

### Docs (`/docs`)
- Documentation placeholder
- Sidebar navigation (to be implemented)

### Apps (`/apps`)
- Grid of app cards
- Placeholder for Bitsocial clients

## License

Open source - see LICENSE file for details.
