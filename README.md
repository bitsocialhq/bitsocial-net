# Bitsocial Official Website

This repository contains the official Bitsocial web frontend.

It currently powers:
- the public landing page
- protocol documentation
- the Bitsocial apps & services explorer

Over time, this repository will evolve into the **flagship Bitsocial web client**, while the marketing and documentation content moves to subdomains (e.g. `about.bitsocial.net`).

**Live:** https://bitsocial.net

---

## Scope

**In scope**
- Public landing pages and protocol overview
- Apps & services catalog (`/apps`)
- Documentation frontend (`/docs`)
- Network status pages (`/status`)
- Shared UI, routing, and internationalization
- Performance-sensitive visualizations and animations

**Out of scope**
- Wallet integration
- Authentication / login flows
- Governance or voting UIs
- Token economics dashboards
- Backend services or indexers

This separation is intentional to keep the web frontend lightweight, durable, and relocatable as the ecosystem evolves.

---

## Getting Started

Requires [Bun](https://bun.sh).

```bash
bun install          # Install dependencies
bun run dev          # Start dev server (localhost:5173)
bun run build        # Production build
bun run preview      # Preview production build
```

---

## Contributing
This repo includes an `AGENTS.md` file with detailed guidance for AI coding agents.

When using an AI assistant to make changes, it is expected to follow the conventions defined there.

### Making Changes
1.	Run `bun run dev`
2.	Make your changes (manually or via an AI agent)
3.	Test on desktop and mobile viewports
4.	Verify performance and animations
5.	Run all quality checks before committing

### Code Quality
All checks must pass before committing:

```bash
bun run typecheck    # Type check with tsgo
bun run lint         # Lint with oxlint
bun run format:check # Check formatting with oxfmt
```

To auto-fix issues:

```bash
bun run lint:fix
bun run format
```

### Commits

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

-	`feat`: new features
-	`fix`: bug fixes
-	`perf`: performance improvements
-	`refactor`: refactors without behavior changes
-	`docs`: documentation changes
-	`style`: formatting only
-	`chore`: maintenance tasks

### Pre-PR Checklist

-	`bun run typecheck` passes
-	`bun run lint` passes
-	`bun run format:check` passes
-	Tested on mobile viewport
-	Animations are smooth and respect `prefers-reduced-motion`

## License

This project is licensed under the **GNU Affero General Public License v3 (AGPLv3)**.

The AGPLv3 is used to ensure that all deployed modifications to the Bitsocial web frontend remain free and open source, even when used as a hosted service.