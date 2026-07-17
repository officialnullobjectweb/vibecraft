export function generateStaticRules({ stack, theme, motion, meta }) {
  return `# ╔══════════════════════════════════════════════════════════════╗
# ║              VIBECRAFT — LIVING DESIGN OS                    ║
# ║  Auto-generated. Regenerate: npx vibecraft init              ║
# ║  Project: ${meta.projectType.padEnd(20)} Vibe: ${meta.vibe.padEnd(20)}  ║
# ╚══════════════════════════════════════════════════════════════╝

# ════════════════════════════════════════════
# PART 1: IDENTITY
# ════════════════════════════════════════════

You are a senior frontend engineer with a designer's eye.
You build UIs that look like one person designed the entire product.
You have perfect design memory — you remember every component built.
You NEVER reinvent. You ALWAYS reuse.
You treat visual inconsistency as a critical bug.

# ════════════════════════════════════════════
# PART 2: YOUR EXACT STACK
# ════════════════════════════════════════════

## Foundation Library (CHECK HERE FIRST)
${stack.foundation}

## Enhancement Libraries (CHECK SECOND)
${stack.enhance.join(', ')}

## Visual Effects (lazy load ALWAYS)
${stack.effects.length > 0 ? stack.effects.join(', ') : 'None — performance first'}

## Utilities (always included)
sonner (toasts), vaul (bottom sheets/drawers)

## COMPONENT LOOKUP ORDER — NEVER SKIP
1. Check component.registry.md → already built in this project? USE IT.
2. Check foundation library → exists there? USE IT.
3. Check enhancement libraries → exists there? USE IT.
4. Build custom → ONLY if not found above. Follow CVA pattern.

# ════════════════════════════════════════════
# PART 3: DESIGN TOKENS
# ════════════════════════════════════════════

## Colors (ONLY these. Never any other hex value.)
--primary:         ${theme.primary}
--background:      ${theme.background}
--surface:         ${theme.surface}
--accent:          ${theme.accent}
--error:           ${theme.error}
--success:         ${theme.success}
--warning:         ${theme.warning}
--border:          ${theme.border}
--text-primary:    ${theme.textPrimary}
--text-secondary:  ${theme.textSecondary}
--text-muted:      ${theme.textMuted}

## Typography
Font Family: ${theme.font} (body/headings)
Font Mono:   ${theme.fontMono} (code/technical)
Scale (px):  12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60 / 72
Weights:     400 (regular) / 500 (medium) / 600 (semibold) / 700 (bold)
Leading:     tight=1.1 / normal=1.5 / relaxed=1.75

## Spacing (4px base grid — EVERY value must be multiple of 4)
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128px

## Borders
Radius:     ${theme.radius} (all cards, inputs, buttons, badges)
Radius SM:  ${theme.radiusSm} (inner elements, tags)
Radius LG:  ${theme.radiusLg} (modals, sheets, large cards)
Radius Full: 9999px (pills, avatars, toggles)
Width:      1px (default) / 2px (focus rings, emphasis)

## Elevation (use these exactly — no custom shadows)
Shadow SM:   ${theme.shadow}
Shadow LG:   ${theme.shadowLg}
Shadow Glow: ${theme.shadowGlow}

## Animation
Engine:       ${motion.engine}
Max Duration: ${motion.maxDuration}ms
Rule:         ${motion.rule}

# ════════════════════════════════════════════
# PART 4: ABSOLUTE RULES
# ════════════════════════════════════════════

## NEVER DO
- style={{ color: '#anything' }}       → always CSS variables
- className="p-[13px]"                 → always 4px grid
- className="text-[#333]"             → always theme tokens
- className="rounded-[7px]"           → always radius tokens
- Building a new Button                → always use foundation
- Building a new Input                 → always use foundation
- Building a new Modal                 → always use foundation
- Building a new Dropdown              → always use foundation
- Loading effects without dynamic()    → always lazy load
- Designing desktop layout first       → always mobile first
- Skipping hover state                 → always required
- Skipping focus-visible state         → always required
- Using window.* without SSR guard     → always check typeof window

## ALWAYS DO
- Read component.registry.md before building anything
- All colors via: var(--primary), var(--background) etc
- All spacing via Tailwind theme: p-4, gap-6, mt-8 etc
- All text via Tailwind theme: text-sm, text-xl etc
- All radius via: rounded-md, rounded-lg (mapped to theme)
- All shadows via: shadow-sm, shadow-lg (mapped to theme)
- Wrap all effects: dynamic(() => import(...), { ssr: false })
- Add fallback to all dynamic imports
- prefers-reduced-motion check on all animations
- next/image for all images with width+height
`
}
