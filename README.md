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

## Editable content (no code needed)

Events, conversation tables, the team (with photos) and the Puente
cultural map points live in [public/content/](public/content/) as JSON,
plus uploaded photos in `public/media/`. The committee edits them
through [Pages CMS](https://app.pagescms.org) — forms are defined in
[.pages.yml](.pages.yml), and **[GUIDE-CONTENU.md](GUIDE-CONTENU.md)**
explains the whole workflow for editors (in French).

At runtime the site fetches that content ([src/content.jsx](src/content.jsx)):

- production builds load it **from this GitHub repo** (see
  [.env.production](.env.production)), so a CMS edit is live in ~5
  minutes without redeploying the hosted site;
- `npm run dev` uses the local copies, which also ship in the build as a
  fallback if GitHub is unreachable.

This means the host only ever needs to serve the static `dist/` folder
once — content updates never require their involvement.

## Structure

- [src/App.jsx](src/App.jsx) — page assembly + the handoff's build-time flags (`grain`, `showFlags`, `joinStyle`)
- [src/content.jsx](src/content.jsx) — loads and normalizes the editable content
- [src/styles.css](src/styles.css) — all styles; design tokens as CSS custom properties at the top
- [src/components/](src/components/) — Nav, Hero, Events, Tables, Kap, Join, Footer, plus shared
  [PapelPicado.jsx](src/components/PapelPicado.jsx) (pennant strips) and [Flags.jsx](src/components/Flags.jsx) (flag chips)
- [src/data/site.js](src/data/site.js) — the fixed data still edited in code: the kot's coordinates
  and country names
- [src/data/placeholders.js](src/data/placeholders.js) — SVG placeholders shown until photos are uploaded

## Design flags (from the handoff prototype)

Edit `CONFIG` in [src/App.jsx](src/App.jsx):

- `grain` — fixed noise texture overlay on/off
- `showFlags` — flag chips in hero and footer on/off
- `joinStyle` — `'sunset'` (red→purple gradient) or `'crema'` (flat, ink text)
