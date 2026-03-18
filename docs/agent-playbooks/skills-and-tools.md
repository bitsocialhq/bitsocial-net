# Skills and Tools

Use this playbook when setting up/adjusting skills and external tooling.

## Recommended Skills

### Context7 (library docs)

For up-to-date docs on libraries.

```bash
npx skills add https://github.com/intellectronica/agent-skills --skill context7
```

### agent-browser

Use `agent-browser` for browser automation, verification, screenshots, and web interaction.

```bash
bun add -g agent-browser
agent-browser install
```

### Vercel React Best Practices

For deeper React/Next performance guidance.

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

### Find Skills

Discover/install skills from the open ecosystem.

```bash
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```

## MCP Policy Rationale

Avoid GitHub MCP and browser MCP servers for this project because they add significant tool-schema/context overhead.

- GitHub operations: use `gh` CLI.
- Browser operations: use `agent-browser`.
