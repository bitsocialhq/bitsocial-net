# Agent Hooks Setup

If your AI coding assistant supports lifecycle hooks, configure these for this repo.

## Recommended Hooks

| Hook | Command | Purpose |
|---|---|---|
| `afterFileEdit` | `scripts/agent-hooks/format.sh` | Auto-format files after AI edits |
| `afterFileEdit` | `scripts/agent-hooks/bun-install.sh` | Run `bun install` when `package.json` changes |
| `stop` | `scripts/agent-hooks/sync-git-branches.sh` | Prune stale refs and delete integrated temporary task branches |
| `stop` | `scripts/agent-hooks/verify.sh` | Hard-gate build, lint, typecheck, and format checks; keep `bun audit` informational |

## Why

- Consistent formatting
- Lockfile stays in sync
- Build/lint/type issues caught early
- Security visibility via `bun audit`
- One shared hook implementation for both Codex and Cursor
- Temporary task branches stay aligned with the repo's worktree workflow

## Example Hook Scripts

### Format Hook

```bash
#!/bin/bash
# Auto-format JS/TS files after AI edits
# Hook receives JSON via stdin with file_path

input=$(cat)
file_path=$(echo "$input" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*:.*"\([^"]*\)"/\1/')

case "$file_path" in
  *.js|*.jsx|*.ts|*.tsx|*.mjs|*.cjs|*.json|*.css) bunx oxfmt "$file_path" 2>/dev/null ;;
esac
exit 0
```

### Verify Hook

```bash
#!/bin/bash
# Run build, lint, typecheck, format check, and security audit when agent finishes

cat > /dev/null  # consume stdin
status=0
bun run build || status=1
bun run lint || status=1
bun run typecheck || status=1
bun run format:check || status=1
echo "=== bun audit ===" && (bun audit || true)  # informational
exit $status
```

By default, `scripts/agent-hooks/verify.sh` exits non-zero when a required check fails. Set `AGENT_VERIFY_MODE=advisory` only when you intentionally need signal from a broken tree without blocking the hook.

### Bun Install Hook

```bash
#!/bin/bash
# Run bun install when package.json is changed
# Hook receives JSON via stdin with file_path

input=$(cat)
file_path=$(echo "$input" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*:.*"\([^"]*\)"/\1/')

if [ -z "$file_path" ]; then
  exit 0
fi

if [ "$file_path" = "package.json" ]; then
  cd "$(dirname "$0")/../.." || exit 0
  echo "package.json changed - running bun install to update bun.lock..."
  bun install
fi

exit 0
```

Configure hook wiring according to your agent tool docs (`hooks.json`, equivalent, etc.).

In this repo, `.codex/hooks/*.sh` and `.cursor/hooks/*.sh` should stay as thin wrappers that delegate to the shared implementations under `scripts/agent-hooks/`.
