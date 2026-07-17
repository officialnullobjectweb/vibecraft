# VibeCraft 2.0 — Living Design OS

**AI-native design governance.** VibeCraft writes a living design system into your project — design tokens, UX contracts, and a live component registry — so every AI agent (Cursor, Windsurf, Copilot, Claude Code) builds screens that look like one designer built the whole thing.

## The Problem

AI agents have no memory between sessions. Every prompt is a blank slate. So they:
1. **Don't know what already exists** → rebuild instead of reuse
2. **Make new decisions every time** → visual inconsistency
3. **Ignore libraries they don't "see"** → custom everything

## The Solution

VibeCraft writes into the agent instruction files (`.cursorrules`, `CLAUDE.md`, `AGENTS.md`, etc.) that every AI reads before acting:

- **Design tokens** — exact colors, spacing, typography, shadows, radii
- **UX behavior contracts** — how buttons click, modals animate, forms validate
- **Component registry** — a live inventory of everything you've built (auto-updating)

## Quick Start

```bash
# 1. Install in your project (no global install needed)
npx vibecraft init

# 2. After answering 3 questions, VibeCraft writes your design system
#    into all agent instruction files

# 3. Start building — AI now reads your design system before every action

# 4. (Optional) Keep registry in sync as you build
npx vibecraft watch
```

## Commands

| Command | What it does |
|---------|-------------|
| `npx vibecraft init` | Interactive setup — pick stack, vibe, motion level |
| `npx vibecraft scan` | Scan project for existing components, update registry |
| `npx vibecraft watch` | Watch filesystem, auto-update registry on changes |
| `npx vibecraft add` | Manually register a component |

## What Gets Generated

VibeCraft writes to **all** of these agent instruction files:

- `.cursorrules` (Cursor)
- `.windsurfrules` (Windsurf)
- `CLAUDE.md` (Claude Code)
- `.github/copilot-instructions.md` (GitHub Copilot)
- `AGENTS.md` (general)
- `.clinerules` (Cline)

Each file contains:

### Part 1–4: Stack, Tokens & Rules
Your chosen foundation library (shadcn, magicui, aceternity, heroui), exact color palette, typography scale, spacing grid, elevation system, and animation rules. Plus absolute rules about what to never do (`style={{}}`, `p-[13px]`, etc.).

### Part 5: UX Interaction Contracts
Behavioral consistency — how every button, input, modal, dropdown, toast, table, and form behaves. Feedback timing. Loading states. Empty states. Error states. Accessibility. Responsive patterns. Copywriting rules.

### Part 6: Component Registry (Living)
Auto-updating inventory of every component in your project. AI reads this before building anything and imports existing components instead of rebuilding them. Grows as you build — more use = more consistency.

## Project Types

- Landing Page / Marketing
- SaaS Dashboard / App
- Portfolio / Creative
- E-commerce
- AI Product
- Developer Tool

## Color Themes

- Clean & Minimal
- Bold & Energetic
- Dark & Futuristic
- Elegant & Premium
- Playful & Fun
- Brutalist & Raw

## Animation Levels

- None — Static (CSS only)
- Subtle — Micro only (motion.dev)
- Moderate — Transitions (motion + GSAP scroll)
- Cinematic — Full (GSAP + motion + Lenis)

## How It Works

```
npx vibecraft init
  → 3 questions
  → selects exact stack
  → generates design tokens
  → generates UX rules
  → generates empty registry
  → writes to all agent files

npx vibecraft watch
  → runs in background
  → scans components on every change
  → updates registry live

AI reads rules + registry before every action
  → knows what exists
  → reuses instead of rebuilds
  → consistency compounds
```

## Why This Architecture

Built on 7 mental models:

- **Chesterton's Fence** — AI ignores libraries because it doesn't know what exists. Fix: living registry.
- **Theory of Constraints** — Bottleneck is component decision-making. Fix: lookup order rules.
- **Second-Order Effects** — Visual rules alone fail because behavior still varies. Fix: UX contracts.
- **Jobs To Be Done** — User wants "one designer feel." Fix: behavioral consistency layer.
- **Map ≠ Territory** — Rules get ignored at complexity. Fix: structural rules.
- **Inversion** — Three ways it fails: no awareness, reinvention, inconsistency. Fix all three.
- **Network Effects** — System self-improves. More use = better consistency.
