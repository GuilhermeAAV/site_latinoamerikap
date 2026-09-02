# LatinoAmeriKap — Landing page

React (Vite) site implementing the design in
[design_handoff_latinoamerikap_landing/](design_handoff_latinoamerikap_landing/).

## Getting started

```sh
npm install
npm run dev      # dev server with hot reload
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Structure

- [src/App.jsx](src/App.jsx) — page assembly + the handoff's build-time flags (`grain`, `showFlags`, `joinStyle`)
- [src/styles.css](src/styles.css) — all styles; design tokens as CSS custom properties at the top
- [src/components/](src/components/) — Nav, Hero, Events, Tables, Kap, Join, Footer, plus shared
  [PapelPicado.jsx](src/components/PapelPicado.jsx) (pennant strips) and [Flags.jsx](src/components/Flags.jsx) (flag chips)
- [src/data/events.js](src/data/events.js) — event and conversation-table content
- [src/data/placeholders.js](src/data/placeholders.js) — SVG photo placeholders

## Swapping in real photos

The four photos are placeholders. Put real images in `src/assets/`, import them, and use
them as `imgSrc` in [src/data/events.js](src/data/events.js) (3 event cards, ~3:2, shown
160px tall) and as `src` of the team photo in [src/components/Kap.jsx](src/components/Kap.jsx)
(shown 420px tall). `object-fit: cover` handles the cropping; keep the French `alt` text.

## Design flags (from the handoff prototype)

Edit `CONFIG` in [src/App.jsx](src/App.jsx):

- `grain` — fixed noise texture overlay on/off
- `showFlags` — flag chips in hero and footer on/off
- `joinStyle` — `'sunset'` (red→purple gradient) or `'crema'` (flat, ink text)
