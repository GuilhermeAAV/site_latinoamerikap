# Handoff: LatinoAmeriKap — Landing Page

## Overview
Landing page for LatinoAmeriKap, the UCLouvain kot-à-projet (student association) dedicated to Latin American culture in Louvain-la-Neuve. Sections: hero, upcoming events, weekly conversation tables (ES/PT), about-the-kap, join CTA, footer. Copy is in French with Spanish accent phrases.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate these designs in your codebase's environment** (React, Vue, Astro, plain HTML/CSS…) using its established patterns. If no environment exists yet, pick what fits a small static site best (e.g. Astro or plain HTML + CSS, no framework needed — the page has almost no state).

- `LatinoAmeriKap.html` — standalone bundled page: **open this in a browser to see the design**. Self-contained (fonts inlined).
- `LatinoAmeriKap Landing.dc.html` — authoring source (design-tool format; markup with inline styles is inside the `<x-dc>` block — useful for reading exact styles, not for shipping).

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and shadows are final. Recreate pixel-perfectly.

## Design Tokens
Colors:
- Crema (page bg): #FBF3E7
- Card bg: #FFFDF8 · card border: #E7D6BE
- Ink (text): #2E1B12 · muted text: #6B4A38
- Warm white (text on dark/gradient): #FFF7EE
- Rojo #E5372A (primary / links; hover #B22A20)
- Naranja #F4772E · Amarillo #F7C948 (yellow CTA pill)
- Fuchsia #E3315F (events accent) · Teal #2FB3C9 (tables accent)
- Verde #3FA65A · Púrpura #9B45D6 (kap accent, focus ring)
- Footer bg: #2E1B12
Gradients:
- Hero "sunset": linear-gradient(100deg, #E5372A 0%, #F4772E 45%, #F7C948 100%)
- Join band "sunset": linear-gradient(115deg, #E5372A 0%, #9B45D6 100%) (alt: flat #F3E4CE with ink text)
Typography (Google Fonts):
- Display: Bricolage Grotesque 800, letter-spacing -0.02/-0.03em (h1 72/1.02, h2 44–48, card h3 24–26)
- Body: Plus Jakarta Sans 400–700 (body 15–17px, line-height 1.55–1.65)
- Accent script: Caveat 600, 24–32px (Spanish interjections)
- Eyebrows: 12px / 700 / uppercase / letter-spacing 0.15em
Radii: cards 18px · big panels 26px · pills 9999px · logo mark 9px
Shadows (warm brown, never gray):
- Card: 0 10px 30px rgba(120,60,20,.10) · hover: 0 16px 36px rgba(120,60,20,.16) + translateY(-3px)
- Panel: 0 18px 44px rgba(120,60,20,.18)
Layout: max-width 1180px, 28px side padding; sections ~88px top padding; grids use gap 24px, auto-fit minmax(300–320px).

## Screens / Views (single page)
1. **Nav** — logo (30px gradient rounded square + wordmark) left; links + yellow "Rejoindre" pill right. 14px/600 links in ink.
2. **Hero** — sunset-gradient rounded panel (26px), papel picado SVG banner strip along the top edge (pennant shapes with punched circles, warm-white ~85% opacity), eyebrow, 72px headline "La cultura latina, à Louvain-la-Neuve", Caveat subline, body copy, two pill CTAs (ink/yellow solid + outlined translucent), row of small Latin American flag chips (SVG, 26×18, 3px radius) at the bottom.
3. **Events** — eyebrow (fuchsia) + h2 + Caveat aside; 3 cards in auto-fit grid. Each card: 160px image slot, 8px accent bar, date eyebrow in accent color, h3, venue (muted), description, accent pill button. Accents rotate: fuchsia / verde / púrpura.
4. **Papel picado separator** — same SVG motif in fuchsia, full-width, between events and tables.
5. **Conversation tables** — teal accent; two cards, each with a 54px teal circle badge (ES / PT), title (Mesa de conversación / Roda de conversa), teal uppercase schedule line, description.
6. **Le kap (about)** — two columns (stack under ~900px): text + purple pill CTA; right column a 420px photo rotated 1.5deg with a yellow Caveat sticker "desde 1998" rotated -3deg overlapping bottom-left.
7. **Join band** — gradient rounded panel, centered; papel picado strip at top (55% white); Caveat lead, 48px h2, copy, two pill CTAs (mailto + Instagram outline).
8. **Footer** — ink bg, warm-white text; brand block left, two link columns right; bottom row: small flag chips + copyright line.

## Interactions & Behavior
- Anchor navigation only (`#events`, `#tables`, `#kap`, `#join`) with scroll-margin-top 20px.
- Card hover: lift + deeper shadow. Pill hover: brightness(1.05–1.15). Links: red, underline on hover.
- Focus-visible: 3px #9B45D6 outline, 2px offset.
- ::selection yellow bg / ink text. prefers-reduced-motion: disable transitions.
- Fixed full-page grain overlay: SVG fractal-noise data-URI, opacity 0.05, pointer-events none (optional flag).
- No forms, no JS state — a static page is fine.

## State Management
None required. Optional build-time flags used in the prototype: grain on/off, flags on/off, join band style (sunset gradient vs flat crema).

## Assets
- Google Fonts: Bricolage Grotesque, Plus Jakarta Sans, Caveat.
- Flag chips + papel picado banners: inline SVG (recreate from the reference HTML — self-contained, no external files).
- Photos: placeholders only. Real photos needed for: 3 event cards (~3:2, 160px tall crop) and the team photo (~420px tall). Alt text in French.

## Files
- `LatinoAmeriKap.html` — standalone preview (open in browser)
- `LatinoAmeriKap Landing.dc.html` — authoring source with exact inline styles
