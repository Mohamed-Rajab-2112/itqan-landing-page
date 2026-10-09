---
name: Itqan Design System
description: The Calibrated Blueprint — Precision engineering and diagnostic inspection visual system for high-conversion PropTech.
colors:
  primary: "#1A2B4C"
  primary-dark: "#101B30"
  primary-light: "#253C66"
  accent: "#F5A623"
  accent-hover: "#E09415"
  accent-light: "#FEF7ED"
  teal-trust: "#0D9488"
  teal-trust-dark: "#0F766E"
  teal-trust-bg: "#F0FDFA"
  blueprint-navy: "#0F2744"
  laser-red: "#EF4444"
  surface-ground: "#F8F9FA"
  surface-card: "#FFFFFF"
  border-subtle: "#E2E8F0"
  text-primary: "#1E293B"
  text-muted: "#64748B"
typography:
  display:
    fontFamily: "Cairo, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.35
    letterSpacing: "normal"
  headline:
    fontFamily: "Cairo, sans-serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  title:
    fontFamily: "Cairo, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "normal"
  body:
    fontFamily: "Cairo, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Cairo, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  button-secondary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  card-default:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.lg}"
    padding: "24px"
  badge-qc:
    backgroundColor: "{colors.teal-trust-bg}"
    textColor: "{colors.teal-trust}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
---

# Design System: Itqan (إتقان)

## Overview

**Creative North Star: "The Calibrated Blueprint"**

The visual language of Itqan embodies the rigorous, objective authority of certified civil and electromechanical engineering inspection. Instead of generic contractor sales aesthetics or playful startup decor, every pixel evokes the precision of an architectural drawing office, a structural testing laboratory, and the crisp diagnostic clarity of calibrated measurement instruments.

Surfaces are planar, pristine, and grounded in a clean off-white field accented by architectural blueprints, subtle 24px CAD grids, and hairline engineering borders. Trust is conveyed not through loud decorative effects or ungrounded neon glows, but through immaculate typographic rhythm, high-contrast readability under bright sunlight, and authentic quality-control motifs: official dashed accreditation stamps (`ITQAN QC #2026`), calibrated laser-level lines, and verified specification indicators.

**Key Characteristics:**
- **Scientific Rigor:** CAD grid textures (24×24px at 4% opacity), technical hairline brackets, and instrument-inspired visual badges.
- **Precision Typography:** Cairo font strictly calibrated for Arabic right-to-left line heights (1.4× min for titles, 1.7× for body) to avoid diacritic clipping.
- **Focused Contrast:** Deep Naval Blue foundation (#1A2B4C) paired with high-visibility Safety Gold (#F5A623) reserved exclusively for key conversion paths.
- **Zero Decorative Slop:** No dark zero-offset glowing shadows, no purple/pink gradients, and no frivolous floating shapes without diagnostic meaning.

## Colors

The palette balances authoritative engineering stability with decisive conversion focus and official inspection accreditation.

### Primary
- **Deep Engineering Navy** (`#1A2B4C`): The bedrock color. Applied to headers, dominant cards, primary text, brand badges, and architectural anchor sections.
- **Midnight Blueprint Navy** (`#101B30`): Used for deep-toned hero backdrops, footers, and inverted technical contrast blocks.
- **Steel Navy** (`#253C66`): Mid-tone navy used for secondary interactive states, icon containers, and subtle hover borders.

### Secondary
- **Safety Gold** (`#F5A623`): High-visibility conversion accent. Evokes certified engineering instruments, laser levels, and urgent attention. Used strictly for primary CTAs, active selection rings, and key value propositions.
- **Safety Gold Hover** (`#E09415`): Darker pressed/hover state for primary action buttons.
- **Safety Gold Soft Tint** (`#FEF7ED`): Ambient background for callout containers and conversion highlight banners.

### Tertiary
- **Accreditation Teal** (`#0D9488`): Official inspection verification color. Signifies certified standards (الكود المصري للبناء), passed tests, and QC stamps.
- **Accreditation Teal Tint** (`#F0FDFA`): Background fill for certified badge capsules and guarantee blocks.
- **Laser Axis Red** (`#EF4444`): Strictly reserved for the laser-level alignment indicator line and critical warning callouts.

### Neutral
- **Clean Ground Off-White** (`#F8F9FA`): Base canvas background providing calm readability and anti-glare mobile comfort.
- **Pure Surface White** (`#FFFFFF`): Elevated card and container background.
- **Technical Slate** (`#1E293B`): Body text color offering crisp WCAG AAA contrast against light backgrounds.
- **Muted Blueprint Grey** (`#64748B`): Secondary labels, timestamps, and descriptive sub-notes.
- **Hairline Border Grey** (`#E2E8F0`): 1px structural container boundary defining crisp geometry.

### Named Rules
**The 10% Accent Doctrine.** Safety Gold (#F5A623) must occupy no more than 10% of any viewport. It is a precision conversion tool; overusing it dilutes its urgency and cheapens the engineering authority.
**The Verified QC Rule.** Teal (#0D9488) is exclusively reserved for authentic engineering claims, test reports, and official certifications. Never use green/teal for non-verified decorative elements.

## Typography

**Display & Headline Font:** Cairo (`weights: 700, 800, 900`)  
**Body & UI Font:** Cairo (`weights: 400, 500, 600`)  

**Character:** Cairo provides geometric Arabic letterforms with clear architectural counters and balanced baseline weight, matching the precision of engineering drawings while remaining effortlessly legible on compact mobile screens.

### Hierarchy
- **Display** (800 / Black, `clamp(2rem, 5vw, 3.25rem)`, `line-height: 1.35`): Hero headlines. Tight vertical cadence with strict line height to avoid awkward wrapping.
- **Headline** (700 / Bold, `clamp(1.5rem, 3.5vw, 2.25rem)`, `line-height: 1.4`): Section headings and milestone value propositions.
- **Title** (700 / Bold, `1.25rem` / `20px`, `line-height: 1.5`): Card titles, inspection feature names, and dialog headers.
- **Body** (500 / Medium, `1rem` / `16px`, `line-height: 1.7`): Editorial body copy, FAQ answers, and explanatory paragraphs. Max line length: 65–75ch.
- **Label** (600 / Semi-Bold, `0.875rem` / `14px`, `line-height: 1.4`): Input labels, badge stamps, and technical meta indicators.

### Named Rules
**The Arabic Diacritic Clearance Rule.** Arabic typography in Cairo requires a minimum `line-height: 1.35` on headings and `line-height: 1.65–1.7` on body text. Tighter line-heights cause letter ascenders, descenders, and hamzas to clip against adjacent lines.
**The Heading Continuity Rule.** Never skip heading levels (e.g. `<h1>` directly to `<h3>`). Maintain strict sequential structure (`h1` &rarr; `h2` &rarr; `h3`) for document accessibility and screen reader navigation.

## Layout

The spatial model uses an 8px base rhythm with a strict Right-to-Left (RTL) reading flow and mobile-first container ergonomics.

- **Mobile Viewport (<640px):** Single-column stack, full-width touch targets (minimum 48px height), 16px horizontal edge padding, and sticky bottom conversion trigger with safe-area spacing.
- **Tablet Viewport (640px–1024px):** 2-column balanced grids, 24px gutters, max-width 720px containers.
- **Desktop Viewport (>1024px):** 3-column feature grids, max-width 1200px centered canvas, 32px gutters.
- **Blueprint CAD Grid Motif:** Subtle 24×24px hairline grid overlay (`rgba(26, 43, 76, 0.04)`) applied to section headers and technical inspection proof zones to reinforce the engineering drawing aesthetic.

## Elevation & Depth

Surfaces are planar and flat at rest, relying on 1px crisp boundaries (`#E2E8F0`) rather than heavy drop shadows to create spatial separation.

### Shadow Vocabulary
- **Card Subtle** (`box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.08)`): Resting state for content containers.
- **Card Elevated** (`box-shadow: 0 12px 36px -8px rgba(26, 43, 76, 0.09)`): Interactive hover state for actionable inspection cards.
- **CTA Focus Ring** (`box-shadow: 0 0 0 3px rgba(245, 166, 35, 0.45)`): Accessible focus indicator for keyboards and active touches.

### Named Rules
**The Flat-By-Default Rule.** Surfaces remain flat with crisp hairline borders at rest. Shadows appear only dynamically in response to user interaction (hover, active press, floating sticky bars).
**No Zero-Offset Dark Glows.** Never use zero-offset colored shadows (e.g. `box-shadow: 0 0 15px #F5A623`). Lighting must be directional, natural, and restrained.

## Shapes

- **Corner Radius Scale:**
  - Micro / Badges: `6px` (`rounded-sm` equivalent)
  - Interactive Buttons & Inputs: `10px` (`rounded-md` equivalent)
  - Cards & Containers: `16px` (`rounded-2xl` equivalent)
  - Pills / Status Chips: `9999px` (`rounded-full`)
- **CAD Bracket Geometry:** Technical cards incorporate subtle L-shaped CAD corner marks (`.cad-bracket`) on opposite diagonal corners, referencing architectural site plans.
- **Dashed Inspection Stamp Border:** Official QC seals use `2px dashed #0D9488` with a slight natural tilt (-4deg) mimicking a physical site inspector stamp.

## Components

### Buttons
- **Primary Action (CTA):**
  - **Background:** Safety Gold (`#F5A623`) with hover transition to `#E09415`.
  - **Text:** Midnight Navy (`#101B30`), Cairo Bold (700), 16px.
  - **Padding:** `16px 32px` (mobile: full-width, minimum 48px touch target).
  - **Radius:** `10px`.
  - **Interaction:** Smooth scale `transform: translateY(-1px)` on hover, with accessible amber focus ring.
- **Secondary Action:**
  - **Background:** Deep Navy (`#1A2B4C`) or transparent with 1.5px border `#1A2B4C`.
  - **Text:** Surface White (`#FFFFFF`) or Deep Navy (`#1A2B4C`).
  - **Radius:** `10px`.

### Cards & Containers
- **Background:** Pure White (`#FFFFFF`) on Ground Off-White (`#F8F9FA`).
- **Border:** `1px solid rgba(226, 232, 240, 0.8)`.
- **Internal Padding:** `20px` on mobile, `28px` on desktop.
- **Rule:** Avoid nested cards (cards within cards). Use typographic hierarchy, hairline dividers (`<hr class="border-slate-100">`), and whitespace to organize child items.

### Inputs & Select Fields
- **Background:** White (`#FFFFFF`).
- **Border:** `1.5px solid #CBD5E1`, transitioning to `#1A2B4C` on focus.
- **Radius:** `10px`.
- **Padding:** `14px 16px`.
- **Focus State:** 2px outline in Safety Gold (`#F5A623`) with `outline-offset: 2px`.
- **Direction:** Strictly `dir="rtl"` with mobile keypad optimization (`inputmode="tel"` for phone numbers).

### Accreditation QC Stamp
- **Border:** `2px dashed #0D9488`.
- **Fill:** `rgba(240, 253, 250, 0.95)`.
- **Text:** Dark Emerald (`#0F766E`), uppercase Cairo Bold.
- **Transform:** `-4deg` resting tilt, straightening to `0deg` on hover.

### Laser Level Axis Line
- **Visual:** 2px horizontal line with red laser gradient (`linear-gradient(90deg, transparent 0%, #EF4444 30%, #EF4444 70%, transparent 100%)`).
- **Role:** Visual separator demonstrating horizontal orthogonality and leveling.

## Do's and Don'ts

### Do:
- **Do** maintain strict sequential heading hierarchy (`h1` &rarr; `h2` &rarr; `h3`) on all sections.
- **Do** ensure all phone and booking inputs have `inputmode="tel"` and `dir="rtl"`.
- **Do** preserve minimum 48px touch targets for all mobile actions.
- **Do** ground cards with 1px hairline borders (`#E2E8F0`) before considering drop shadows.
- **Do** use authentic engineering terminology and calibrated instrument names (Bosch laser, 15-bar hydraulic pump, El Sewedy copper check).

### Don't:
- **Don't** nest cards inside cards; flatten container hierarchy using whitespace and dividers.
- **Don't** use colored zero-offset glow shadows (`box-shadow: 0 0 Xpx ...`) or artificial neon halos.
- **Don't** use decorative purple, magenta, or pastel rainbow gradients.
- **Don't** reduce Arabic heading line-height below 1.35; doing so clips Cairo letter diacritics.
- **Don't** let primary accent gold (#F5A623) bleed into non-actionable background cards or body text.
