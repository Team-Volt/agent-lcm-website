# Agent LCM Design System

## 0. Research Log

- Embedded references: shortlisted Linear, Vercel, and Supabase; chose Linear for its dark-native hierarchy, exact spacing, and code-first restraint.
- Real products: viewed OpenHands and Warp desktop screens from Lazyweb. Kept the direct hero-to-terminal story, large quiet type, and a clear install action; did not copy their assets or layouts.
- Image concepts: skipped because this site must stay light and the site workflow reserves one image generation for the social card. The live page uses CSS-built brand art.

## 1. Direction

An OLED-black field with a warm-white type system and a narrow signal-green ramp. The signature material is smoked glass with an inset top sheen. The memorable moment is a stream of separate agent sessions converging into one luminous local-memory core.

## 2. Audience and jobs

- Primary: developers who use more than one coding-agent harness.
- Job: understand the product in seconds, trust its local-first model, install it, or inspect the source.
- Accessibility: clear reading order, visible focus, high contrast, 44px targets, no meaning held only in color, reduced-motion support.

## 3. Tokens

- Canvas: `--bg`; raised surfaces: `--raised`, `--panel`, `--panel-top`, and `--panel-bottom`; copy: `--text`, `--soft`, `--muted`, and `--dim`.
- Signal ramp: `--signal` → `--signal-2`; `--signal-hover` is the active tint and `--signal-ink` is text drawn on signal fills.
- Hairlines and glass use `--line`, `--line-soft`, `--surface`, and `--surface-hover`. Glows use the same signal hues at low opacity.
- Type: Geist for display/body; Geist Mono for code and micro labels.
- Scale: 12, 14, 16, 18, 24, 40, 64, 88px. Tight display tracking; relaxed body leading.
- Space: 4px base; common steps 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Radius: `--radius-control`, `--radius-panel`, `--radius-hero`, and `--radius-pill`.
- Motion: `--motion-fast` and `--ease-out`; the hero uses the same easing at 560ms.
- Shared color, type, spacing, target-size, and layout values resolve through the semantic variables in `:root`. One-off component geometry stays with its component rule.

## 4. Layout and responsive behavior

- Maximum content width: 1180px.
- Desktop hero: editorial split, copy at 56%, memory visual at 44%.
- Sections follow the visitor path: hook → compatibility proof → why → install → trust → source.
- Under 768px, every split becomes one column; navigation labels reduce; type uses fluid clamps.

## 5. Primitives and states

- Brand lockup: the same `/agent-lcm-logo.svg` asset is used in the header, memory core, final action, and footer; decorative instances are hidden from assistive tech.
- Button: primary signal fill and quiet dark secondary; hover raises contrast, active compresses, focus uses a 2px signal ring.
- Code panel: mono copy, shell prompt, grouped commands, horizontal scroll on small screens.
- Memory visual: one bezel panel with source rows, a central core, and status labels; no interaction or false controls.
- Feature row: numbered editorial rows with a divider, not repeated cards.

## 6. Motion

- One hero entrance only: opacity plus 12px translate, 560ms custom cubic bezier.
- Interactive states use 180–240ms opacity/transform transitions.
- Reduced motion disables nonessential transforms and scroll behavior.

## 7. Content rules

- Use the repo's exact product description and commands.
- Say “local” only where the architecture supports it. Do not claim perfect secrecy or zero risk.
- Lead with outcome, then architecture, then install details.

## 8. Accepted debt

- No theme switcher, docs site, copy-to-clipboard script, or analytics in v1. Add only after real demand.
