# VibeCraft

**Make your AI build consistent UIs — every time.**

When you use Cursor, Windsurf, Copilot, or Claude Code to build a website, the AI starts fresh every time. It forgets what it built before. So buttons look different on page 1 vs page 2. Colors are slightly off. Nothing feels like one person designed it.

VibeCraft fixes that. It writes a **design rulebook** into your project that AI agents read before they write any code.

## How it works

```bash
curl -fsSL https://raw.githubusercontent.com/officialnullobjectweb/vibecraft/main/install.sh | bash
vibecraft init
```

Answer 3 questions:

```
? What are you building?  →  SaaS Dashboard / App
? What should it feel like?  →  Clean & Minimal
? How much animation?  →  Subtle — Micro only
```

That's it. VibeCraft creates design files that your AI reads automatically.

From now on, when you ask the AI to build a button, a form, a modal, a navbar — they'll all look like they belong together.

## What you get

| File | What it does |
|------|-------------|
| `.cursorrules` | Cursor reads this before every response |
| `.windsurfrules` | Windsurf reads this before every response |
| `CLAUDE.md` | Claude Code reads this before every response |
| `AGENTS.md` | General AI agent instructions |
| `.clinerules` | Cline reads this before every response |
| `.github/copilot-instructions.md` | GitHub Copilot reads this |

Each file contains:

- **Your exact colors** — not vague guidelines, actual hex values
- **Your spacing grid** — everything is multiples of 4px
- **Your typography** — fonts, sizes, weights
- **Your component rules** — how buttons click, how forms validate, how modals open
- **Your live component registry** — a growing list of everything you've built

## Commands

| Command | What it does |
|---------|-------------|
| `vibecraft init` | First-time setup — 3 questions |
| `vibecraft scan` | Find existing components, add to registry |
| `vibecraft watch` | Watch for new components, auto-update |
| `vibecraft add` | Manually add a component to the registry |

## Example

Before VibeCraft:
```
You: "Add a signup form"
AI: builds a form with blue buttons, rounded inputs, dark theme
You: "Add a settings page"
AI: builds a new form with green buttons, square inputs, light theme
Same project. Looks like two people built it.
```

After VibeCraft:
```
You: "Add a signup form"
AI: reads rules → knows colors, spacing, button style → builds consistent form
You: "Add a settings page"
AI: reads rules → reuses same components → looks like same designer
```

## Delete it

**VibeCraft doesn't install anything permanently.** It's a CLI tool that runs once.

```bash
# VibeCraft wrote these files — just delete them:
rm .cursorrules .windsurfrules CLAUDE.md AGENTS.md .clinerules
rm -rf .github/copilot-instructions.md  # if it exists

# That's it. No traces. No background processes. No config files.
# Your project is exactly as it was before.
```

No services running. No databases. No accounts. No telemetry. Nothing stored anywhere. Just text files that your AI reads.

## Is it working?

After running `vibecraft init`, ask your AI:

> "What are my project's colors and font?"

If it answers with your chosen theme — it's working.

Or open `.cursorrules` and look for your design tokens near the top.

## Why this exists

AI has no memory between sessions. Every prompt is a blank slate. So AI:
1. Doesn't know what components already exist → rebuilds instead of reusing
2. Makes new visual decisions every time → inconsistency
3. Ignores libraries it can't see → custom everything

VibeCraft solves all three by writing your design decisions into files the AI reads automatically.

## License

MIT
