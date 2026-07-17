export function generateUXRules() {
  return `# ════════════════════════════════════════════
# PART 5: UX INTERACTION RULES
# (Behavioral consistency — not just visual)
# ════════════════════════════════════════════

## WHY THIS EXISTS
Visual tokens make things LOOK consistent.
UX rules make things FEEL consistent.
A user should never be surprised by how something behaves.

# ────────────────────────────────────────────
# 5A: FEEDBACK HIERARCHY
# Every action needs feedback. Here is the exact pattern:
# ────────────────────────────────────────────

## Immediate feedback (0-100ms) — ALWAYS required
- Button click → visual press state (scale 0.97, opacity 0.9)
- Input focus → border color changes to --primary
- Toggle → immediate visual state change
- Checkbox → immediate check
- Link hover → underline or color shift

## Short feedback (100-300ms) — for state changes
- Form submit → button shows loading spinner
- Dropdown open → smooth expand animation
- Tab switch → content fade transition
- Toast appears → slides in from corner

## Confirmation feedback (300-2000ms) — for results
- Success → green toast with checkmark
- Error → red toast with X, form fields highlight
- Loading → skeleton screens, never blank
- Empty state → illustration + helpful text, never blank

## RULE: Never leave user wondering if action registered.

# ────────────────────────────────────────────
# 5B: COMPONENT BEHAVIOR CONTRACTS
# Each component type has ONE behavior. Always.
# ────────────────────────────────────────────

## BUTTON
States:       default → hover → active → loading → disabled
Hover:        background lightens/darkens 10%, cursor pointer
Active:       scale(0.97), instant
Loading:      spinner left of text, text remains, disabled
Disabled:     opacity 0.5, cursor not-allowed, no hover effect
Icon buttons: square aspect ratio, tooltip on hover always
Size rule:    min touch target 44x44px on mobile

## INPUT / TEXTAREA
States:       default → focus → error → disabled → readonly
Default:      border --border, background --surface
Focus:        border --primary, ring 2px --primary at 20% opacity
Error:        border --error, ring 2px --error at 20% opacity
             error message appears below, color --error, text-sm
Disabled:     opacity 0.5, cursor not-allowed, background dimmed
Placeholder:  color --text-muted always
Label:        always above input, never inside (except search)
Required:     asterisk (*) after label text, color --error

## DROPDOWN / SELECT / COMBOBOX
Trigger:      looks exactly like an input, has chevron icon right
Open:         appears below trigger (flips above if no space)
Animation:    scale from 0.95→1 + opacity 0→1, duration fast
Items:        padding py-2 px-3, hover background --surface
Selected:     checkmark icon on right, text color --primary
Search:       if >10 items, show search input at top
Close:        click outside, Escape key, item selection
Z-index:      always above everything else (z-50 minimum)
RULE:         NEVER use native <select> element for custom UI

## MODAL / DIALOG
Trigger:      always a button, never auto-open
Backdrop:     --background at 60% opacity, blur(4px)
Animation:    scale 0.95→1 + fade, duration 200ms
Position:     centered, max-w-lg default, max-h-[90vh]
Close:        X button top-right, Escape key, backdrop click
Scroll:       body scroll locked when open, content scrolls inside
Mobile:       becomes full bottom sheet below md breakpoint
RULE:         use vaul for mobile sheets, radix for desktop modals

## TOAST / NOTIFICATION
Position:     bottom-right desktop, bottom-center mobile
Max shown:    3 at once, queue rest
Duration:     success=3s, info=4s, error=6s (needs action)
Dismiss:      click to dismiss always, X button
Stack:        newest on top, older stack below
DO NOT:       auto-dismiss errors (user must acknowledge)
RULE:         use sonner always, never custom toast

## NAVIGATION / TABS
Active state: clear visual indicator (not just color change alone)
             underline OR background OR both — pick one, use always
Hover:        subtle background change
Mobile:       horizontal scroll if tabs overflow, never wrap
RULE:         active tab must be visually obvious at a glance

## TABLE / DATA LIST
Hover row:    background --surface on hover
Selected row: background --primary at 10% opacity
Loading:      skeleton rows, same height as real rows
Empty:        centered empty state with icon + message
Sort:         arrow icon in header, both directions shown
Overflow:     horizontal scroll on mobile, never cut off

## FORM
Layout:       single column always (two-column only if space forces)
Submission:   disable all inputs during submit
Errors:       show inline under each field, show summary at top
Success:      clear form OR navigate away — never just toast
Labels:       every input has a label, no exceptions
Grouping:     related fields grouped with subtle separator
Autofocus:    first input in modal/form autofocused

## LOADING STATES
Content:      skeleton screens (match real layout shape)
Buttons:      spinner inline, text stays, width stays same
Whole page:   progress bar at very top (nprogress style)
Images:       blur placeholder → real image fade
RULE:         no layout shift during loading ever

## EMPTY STATES
Never:        blank white space
Always:       icon/illustration + heading + helper text + CTA
Example:      "No results found" + "Try adjusting your search" + "Clear filters"

## ERROR STATES
404:          friendly, humor optional, always has back/home button
500:          apologetic, never technical, show support link
Form error:   specific per field, never generic "something went wrong"
Network:      detect offline, show banner, retry button

# ────────────────────────────────────────────
# 5C: LAYOUT RULES
# ────────────────────────────────────────────

## HIERARCHY — always establish in this order
1. ONE primary action per screen (biggest, --primary color)
2. ONE or TWO secondary actions (outlined or ghost)
3. Destructive action (--error color, requires confirmation)
4. Navigation actions (text links)

## VISUAL WEIGHT SCALE
Hero heading:  text-5xl → text-7xl, font-bold, leading-tight
Section title: text-3xl → text-4xl, font-semibold
Card title:    text-xl → text-2xl, font-semibold
Body:          text-base, font-normal, leading-relaxed
Caption:       text-sm, --text-muted
Label:         text-sm, font-medium
Badge:         text-xs, font-medium

## WHITE SPACE RULE
Between sections:  spacing-section (128px)
Between elements:  gap-6 or gap-8
Inside cards:      p-6
Inside modals:     p-6 header, p-6 content, p-4 footer
Between label/input: mb-2

## GRID SYSTEM
Max container: 1280px
Columns:       12 column grid
Gutter:        gap-6 (24px)
Breakpoints:   sm=640 md=768 lg=1024 xl=1280 2xl=1536

# ────────────────────────────────────────────
# 5D: ACCESSIBILITY RULES (non-negotiable)
# ────────────────────────────────────────────

- All images: descriptive alt text (empty alt="" for decorative)
- All buttons: descriptive aria-label if icon-only
- All modals: focus trap inside when open
- All modals: return focus to trigger when closed
- All inputs: label connected via htmlFor/id
- Color contrast: minimum 4.5:1 body text, 3:1 large text
- Interactive elements: min 44x44px touch target
- All animations: @media (prefers-reduced-motion: reduce) fallback
- Tab order: logical, matches visual order
- No keyboard trap: except intentional (modal)

# ────────────────────────────────────────────
# 5E: RESPONSIVE RULES
# ────────────────────────────────────────────

Mobile First Order:
1. Stack everything vertically on mobile
2. Adjust at md (768px) for tablets
3. Adjust at lg (1024px) for desktop
4. Adjust at xl (1280px) for wide screens

Mobile-specific:
- Bottom navigation instead of sidebar
- Full-width buttons and inputs
- Larger touch targets (48px min)
- Modal becomes bottom sheet
- Horizontal scroll instead of pagination for tabs
- Collapsible sections for long content

# ────────────────────────────────────────────
# 5F: COPY / TEXT RULES
# ────────────────────────────────────────────

Buttons:      verb first ("Save changes" not "Changes saved")
Labels:       noun ("Email address" not "Enter your email address")
Errors:       what went wrong + how to fix it
Empty states: what it is + why empty + what to do
Loading:      what is loading ("Loading dashboard..." not "Loading...")
Headings:     sentence case always (not Title Case For Everything)
`
}
