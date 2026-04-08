# Design Brief

## Direction

Professional & Approachable — A meeting scheduler for MaxFort School Rohini that balances institutional authority with visitor accessibility through clean, modern design.

## Tone

Refined minimalism: crisp, spacious layout emphasizing clarity without coldness. Cool blue primary paired with warm amber accents for human touch.

## Differentiation

Dual-zone visual hierarchy: admin dashboard uses strong borders and dense information layout; public booking page uses airy cards and simplified forms. Meeting type indicators (online/physical) are visually distinct.

## Color Palette

| Token      | OKLCH           | Role                             |
| ---------- | --------------- | -------------------------------- |
| background | 0.98 0.008 230  | Light cream off-white (primary)  |
| foreground | 0.18 0.015 230  | Deep blue-grey text              |
| card       | 1.0 0.004 230   | Pure white surfaces              |
| primary    | 0.42 0.14 240   | Deep ocean blue (trust, authority)|
| accent     | 0.72 0.15 85    | Warm amber (CTAs, highlights)    |
| muted      | 0.94 0.01 230   | Subtle grey background           |
| destructive| 0.55 0.22 25    | Red for cancellations            |

## Typography

- Display: Fraunces — serif headers for section titles and booking confirmation
- Body: General Sans — clean sans-serif for forms, lists, and body text
- Scale: hero `text-4xl font-bold tracking-tight`, h2 `text-2xl font-semibold`, labels `text-sm font-semibold uppercase tracking-widest`, body `text-base leading-relaxed`

## Elevation & Depth

Subtle card depth using light shadows (`shadow-sm`) and gentle borders. No dramatic shadows or layering. Border-radius kept conservative (`rounded-sm` 0.5rem) for professional feel. Structural zones separated by background color shifts, not just borders.

## Structural Zones

| Zone    | Background       | Border                | Notes                               |
| ------- | ---------------- | --------------------- | ----------------------------------- |
| Header  | card (white)     | border-b 1px          | Navigation, branding, user controls |
| Content | background       | —                     | Main area; alt-zones use muted bg   |
| Sidebar | card (admin)     | border-r 1px          | Navigation, filters (admin only)    |
| Footer  | muted/40 opacity | border-t 1px          | Links, copyright (if present)       |

## Spacing & Rhythm

Generous spacing (gap: `4–6` units between sections, `2–3` within cards). Button height 44–48px for touch targets. Compact information density in admin dashboard; spacious white space in public booking forms. Consistent 0.5rem border radius throughout.

## Component Patterns

- Buttons: primary (ocean blue bg, white text), secondary (muted bg, blue text), accent (amber bg, dark text). Hover: lightness –10%, no scale animation.
- Cards: white background, subtle border, no shadow. Rounded corners. Hover: border color shifts to primary.
- Input fields: white background, 1px grey border, blue ring on focus. Min 44px height.
- Meeting type badges: `online` = teal pill, `physical` = warm grey pill. Rounded full.

## Motion

Entrance: fade-in over 200ms on page load and modal open. Hover: smooth color transition (250ms) on interactive elements. Form submission: scale button slightly (98% → 100%) with active state. No decorative animations.

## Constraints

- No gradients, patterns, or decorative overlays. Single flat colors only.
- Use semantic tokens exclusively; no arbitrary color values or hex literals.
- Min contrast AA+ (foreground-on-background: 0.80 lightness delta).
- Touch targets minimum 44x44px.

## Signature Detail

Meeting type indicators with minimal inline icons or colored badges — visitors instantly understand online vs. physical without cognitive load. Warm accent color on CTAs breaks cool palette monotony.
