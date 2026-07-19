---
name: Kissaten Tycoon
description: A warm, tactile management desk for understandable business decisions.
colors:
  canvas: "oklch(1 0 0)"
  ink: "oklch(0.141 0.005 285.823)"
  surface: "oklch(1 0 0)"
  surface-ink: "oklch(0.141 0.005 285.823)"
  decision-blue: "oklch(0.488 0.243 264.376)"
  decision-blue-ink: "oklch(0.97 0.014 254.604)"
  quiet-surface: "oklch(0.967 0.001 286.375)"
  quiet-surface-ink: "oklch(0.21 0.006 285.885)"
  muted-ink: "oklch(0.552 0.016 285.938)"
  critical: "oklch(0.577 0.245 27.325)"
  rule: "oklch(0.92 0.004 286.32)"
  focus-ring: "oklch(0.705 0.015 286.067)"
  chart-air: "oklch(0.828 0.111 230.318)"
  chart-sky: "oklch(0.685 0.169 237.323)"
  chart-river: "oklch(0.588 0.158 241.966)"
  chart-deep: "oklch(0.5 0.134 242.749)"
  chart-ink: "oklch(0.443 0.11 240.79)"
  dark-canvas: "oklch(0.141 0.005 285.823)"
  dark-ink: "oklch(0.985 0 0)"
  dark-surface: "oklch(0.21 0.006 285.885)"
  dark-decision-blue: "oklch(0.424 0.199 265.638)"
  dark-quiet-surface: "oklch(0.274 0.006 286.033)"
  dark-muted-ink: "oklch(0.705 0.015 286.067)"
  dark-critical: "oklch(0.704 0.191 22.216)"
typography:
  display:
    fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "normal"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.24em"
  numeric:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
rounded:
  sm: "calc(0.45rem * 0.6)"
  md: "calc(0.45rem * 0.8)"
  lg: "0.45rem"
  xl: "calc(0.45rem * 1.4)"
  2xl: "calc(0.45rem * 1.8)"
spacing:
  compact: "0.5rem"
  control: "0.75rem"
  inset: "1rem"
  panel: "1.25rem"
  section: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.decision-blue}"
    textColor: "{colors.decision-blue-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.2xl}"
    padding: "0.5rem 0.75rem"
    height: "2rem"
  button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.2xl}"
    padding: "0.5rem 0.75rem"
    height: "2rem"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface-ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.panel}"
  toggle-selected:
    backgroundColor: "{colors.decision-blue}"
    textColor: "{colors.decision-blue-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    height: "4rem"
  toggle-selected-subtle:
    backgroundColor: "{colors.quiet-surface}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    height: "4rem"
---

# Design System: Kissaten Tycoon

## Overview

**Creative North Star: "The Owner's Ledger"**

The interface should feel like a calm working surface behind the counter: orderly enough to compare numbers, tactile enough to feel like a game, and warm enough to invite reflection after a difficult quarter. Nostalgia comes from editorial serif moments, ledger-like mono data, deliberate rules, and the rhythm of a physical management desk. It must never depend on faux paper, decorative Japanese motifs, or ornamental clutter.

This is a product interface, so design serves the decision loop. Current state stays visible on the left, events and explanations occupy the narrative center, and decisions remain available on the right at wide viewports. Below the extra-large breakpoint, these regions stack into one readable flow. Dense information is welcome when it supports comparison, but each panel must have a distinct job; unnecessary card-heavy layouts are prohibited.

The system is flat and restrained. White and near-white surfaces carry most of the screen, ink establishes hierarchy, and Decision Blue is reserved for actions, selections, trends, and high-value state. Warmth comes from voice, typography, and pacing rather than beige backgrounds or atmospheric effects. Motion is limited to fast state feedback and must respect reduced-motion settings.

**Key Characteristics:**

- Calm, information-dense, and legible at a glance.
- Tactile through borders, control states, and the circular quarter stamp.
- Editorial in narrative moments; utilitarian in labels and financial data.
- Explicit about cause, consequence, uncertainty, and final actions.
- Responsive by rearranging structure, not by scaling typography with viewport width.

## Colors

The palette is a neutral working surface with one concentrated blue voice. The theme is already expressed as semantic OKLCH variables in `app/globals.css`; those variables remain the implementation source of truth.

### Primary

- **Decision Blue** (`decision-blue`, `oklch(0.488 0.243 264.376)`): Primary actions, selected options, quarter progress, trends, and high-value financial emphasis. It signals agency or active state, never decoration.
- **Decision Blue Ink** (`decision-blue-ink`, `oklch(0.97 0.014 254.604)`): Text and icons placed on Decision Blue.

### Secondary

- **Quiet Surface** (`quiet-surface`, `oklch(0.967 0.001 286.375)`): Subdued explanations, secondary panels, inactive tracks, and gentle section distinction.
- **Quiet Surface Ink** (`quiet-surface-ink`, `oklch(0.21 0.006 285.885)`): Strong text on secondary surfaces.

### Tertiary

- **Critical Red** (`critical`, `oklch(0.577 0.245 27.325)`): Errors and destructive states only. It must not compete with Decision Blue for ordinary attention.
- **Chart Air through Chart Ink** (`chart-air` to `chart-ink`): The existing five-step blue data palette. Use ordered lightness deliberately and pair every chart state with a text label, shape, or direct value.

### Neutral

- **Counter White** (`canvas` and `surface`, `oklch(1 0 0)`): Page and panel backgrounds in the light theme.
- **Sumi Ink** (`ink`, `oklch(0.141 0.005 285.823)`): Primary text, important borders, and the strongest inactive state.
- **Muted Ledger Ink** (`muted-ink`, `oklch(0.552 0.016 285.938)`): Supporting labels and descriptions. Do not use it below AA contrast at the rendered size.
- **Stone Rule** (`rule`, `oklch(0.92 0.004 286.32)`): Panel borders, separators, and input boundaries.
- **Focus Halo** (`focus-ring`, `oklch(0.705 0.015 286.067)`): Visible keyboard focus and interactive affordance feedback.

### Named Rules

**The One Active Ink Rule.** Decision Blue is for actions, selections, and state. If it does not indicate agency or meaningful status, use ink or a neutral surface.

**The Warmth Without Beige Rule.** Nostalgia comes from type, language, spacing, and interaction. The page background stays chromatically neutral.

**The Semantic Contrast Rule.** Never communicate selection, warnings, trends, or turn status with color alone; pair color with labels, values, icons, position, or shape.

## Typography

**Display Font:** UI Serif with Georgia and Cambria fallbacks

**Body Font:** IBM Plex Sans with system sans-serif fallbacks

**Label/Mono Font:** JetBrains Mono with system monospace fallbacks

**Character:** Serif type gives events, debriefs, and the Kissaten identity an editorial, reflective voice. IBM Plex Sans handles decisions and explanations with practical clarity. JetBrains Mono makes financial data, quarter labels, compact metadata, and calculation-oriented text feel inspectable.

### Hierarchy

- **Display** (700, `3rem`, line-height `1`): Major financial values and rare identity moments. Do not use display sizing inside ordinary controls or compact panels.
- **Headline** (700, `1.875rem`, line-height `1.25`): Market events and primary narrative headings.
- **Title** (700, `1rem`, line-height `1.5`): Decision labels, state labels, and component titles.
- **Body** (400, `1rem`, line-height `1.5`): Explanations and supporting prose. Long explanatory copy should remain within `65-75ch`; debrief copy may use a relaxed line-height up to `2rem`.
- **Label** (700, `0.75rem`, letter-spacing `0.24em`, uppercase): Sparse ledger labels such as "Cash on hand" and "Q3 decisions." Do not apply this treatment to every heading.
- **Numeric** (700, `1rem` base): Currency, ratios, counts, and concise calculation notes. Major values may step up to `3rem` while retaining the mono family.

### Named Rules

**The Two Voices Rule.** Serif is for identity, events, and reflection; sans and mono are for action, explanation, and numerical truth. Never use display serif for control labels.

**The Ledger Label Rule.** Uppercase tracked mono labels are a deliberate, scarce pattern. Repeating them above every section turns the interface into generic dashboard scaffolding.

## Elevation

The dashboard is flat by default. Depth is created through full borders, tonal surface shifts, spacing, and overlap-free structure rather than ambient card shadows. Dashboard panels explicitly remove the shadcn card shadow. The slider thumb is the only current lifted control and uses a compact shadow so it remains visibly draggable.

### Shadow Vocabulary

- **Control Lift** (`shadow-md` on the slider thumb): Reserved for a draggable control that benefits from physical separation. Do not apply it to panels, buttons, or inactive options.
- **Panel Rest** (`shadow: none`): The standard dashboard container treatment; use Stone Rule borders and tonal layering instead.

### Named Rules

**The Flat Working Surface Rule.** Panels rest on the page without decorative elevation. Shadows are functional feedback, not atmosphere.

**The Border-or-Shadow Rule.** Never pair a one-pixel decorative border with a wide soft shadow. Pick the structural border or a compact functional shadow.

## Components

The component language is tactile, restrained, and familiar. Standard controls should behave like standard controls, with complete keyboard, focus, disabled, invalid, and selected states.

### Buttons

- **Shape:** Compact controls use the existing softly rounded `2xl` token (`calc(0.45rem * 1.8)`). The quarter commit action is a deliberate circular exception because it behaves like a stamp.
- **Primary:** Decision Blue background, Decision Blue Ink text, `2rem` default height, and `0.75rem` horizontal padding. Reserve it for a clear command or active commitment.
- **Hover / Focus:** Hover darkens or reduces the primary fill to `80%`; focus uses a visible three-pixel ring at `30%` Focus Halo. Active controls move by one pixel only. Disabled controls retain their shape and use `50%` opacity.
- **Secondary / Ghost / Outline:** Outline buttons use Counter White with a Stone Rule border and shift to Quiet Surface on hover. Ghost controls gain a Quiet Surface only in response to interaction.
- **Commit Stamp:** The circular `5rem` control is paired with explicit "Commit Quarter" text and a finality warning. The circle alone must never carry the meaning of the action.

### Chips

- **Style:** Badges are compact, full-pill labels with `0.5rem` horizontal padding and a `1.25rem` height. Use mono type for prices, business concepts, and calculation metadata.
- **State:** Filled Decision Blue badges mark active concepts or important status; Quiet Surface badges carry secondary context. Chips are not a substitute for headings or buttons.

### Cards / Containers

- **Corner Style:** Dashboard panels use gently curved `xl` corners (`calc(0.45rem * 1.4)`); nested content regions use `lg` corners (`0.45rem`).
- **Background:** Counter White is the default. Quiet Surface at `30-40%` opacity distinguishes debrief and conversational content without creating another elevated layer.
- **Shadow Strategy:** No panel shadows. See the Flat Working Surface Rule.
- **Border:** Use a complete one-pixel Stone Rule border for bounded tools. Dashed separators may organize ledger-like rows inside a panel.
- **Internal Padding:** `1.25rem` is the default panel inset; `1rem` is the compact inset for subordinate content.
- **Composition:** Never put a generic card inside another generic card. Use unframed sections and separators inside a bounded panel.

### Inputs / Fields

- **Style:** Sliders use a four-pixel Quiet Surface track, Decision Blue range, and a one-rem white thumb. Choice groups use equal-height `4rem` options with full borders and clear labels.
- **Focus:** Every slider thumb and toggle uses the Focus Halo ring. Keyboard focus must remain visible against both selected and unselected surfaces.
- **Error / Disabled:** Invalid controls use Critical Red with text that explains the problem. Disabled controls use reduced opacity but retain readable labels and must not be mistaken for selected state.
- **Selection:** Major choices fill with Decision Blue and Decision Blue Ink. Lower-emphasis choices use a Decision Blue tint plus a Decision Blue border. Always expose selection through `aria-pressed` or the equivalent semantic state.

### Navigation

- **Style:** The top bar uses a strong two-pixel ink rule, a serif product mark, circular quarter progression, and a right-aligned location/season label. It is a status rail, not marketing navigation.
- **Active State:** Completed quarters use Sumi Ink fill; the current quarter uses Decision Blue text, border, and focus-like halo; future quarters remain neutral.
- **Responsive Treatment:** Quarter progression is hidden below large viewports and location context below medium viewports. A future mobile treatment must preserve current-quarter status elsewhere rather than simply removing it.

### Decision Rail

The right rail is the signature tool surface. Each decision section contains a clear label, current value where applicable, one control family, a concise consequence note, and a dashed ledger separator. Controls must not calculate authoritative results in the UI; they only collect choices and display values supplied by the application or simulation layers.

### Event and Debrief Surfaces

Events use stronger headline hierarchy and a tinted Decision Blue surface. Debriefs use a quiet tonal surface, readable prose, concept chips, and a final reflective question in serif italic. The current event implementation uses a four-pixel colored side stripe; that is a legacy exception and should be replaced in future UI work with a complete border, leading icon, or stronger label treatment.

## Do's and Don'ts

### Do:

- **Do** preserve a visible chain from current state to player decision to result to explanation.
- **Do** use the semantic variables from `app/globals.css`; future palette changes should happen at the token layer rather than inside components.
- **Do** keep financial values, units, and quarter context explicit and use mono typography for scan-friendly comparison.
- **Do** use complete borders, tonal layering, and spacing to structure the dashboard without unnecessary elevation.
- **Do** meet WCAG 2.2 AA for contrast and interaction, preserve visible keyboard focus, and provide non-color status cues.
- **Do** keep motion within `150-250ms`, use it for state feedback only, and provide a reduced-motion alternative.
- **Do** preserve the distinction between engine-owned numerical truth and AI-generated explanation.

### Don't:

- **Don't** make Kissaten Tycoon look like a generic SaaS dashboard; avoid interchangeable metric cards, enterprise analytics chrome, and anonymous blue-gradient styling.
- **Don't** borrow from crypto dashboards: no ticker-wall density, speculative urgency, glowing charts, or finance-bro visual language.
- **Don't** use casino-style mobile-game patterns such as flashing rewards, confetti loops, artificial urgency, loot-box framing, or manipulative countdowns.
- **Don't** use neon cyberpunk styling, excessive glassmorphism, or decorative blur as atmosphere.
- **Don't** build unnecessary card-heavy layouts or put cards inside cards. Each bounded panel must have a distinct gameplay role.
- **Don't** use colored side-stripe borders greater than one pixel on cards, alerts, events, or callouts. Replace the current event exception with a full border, tint, icon, or label during a future implementation pass.
- **Don't** turn nostalgia into faux paper texture, ornamental clutter, stereotyped Japanese decoration, or beige-by-default surfaces.
- **Don't** use gradient text, oversized corner radii, decorative grid backgrounds, or wide soft shadows paired with borders.
- **Don't** hide status, selection, trends, or warnings behind color alone.
