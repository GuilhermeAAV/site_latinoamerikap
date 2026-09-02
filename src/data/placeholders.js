// Inline SVG placeholders shown when no photo has been uploaded yet
// via Pages CMS (event posters, team group photo, member portraits).

const svgPlaceholder = (w, h) => {
  const cy = Math.round(h * 0.44)
  const r = Math.round(Math.min(w, h) * 0.05) + 6
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>` +
    `<rect width='${w}' height='${h}' fill='#F3E4CE'/>` +
    `<circle cx='${w / 2}' cy='${cy}' r='${r}' fill='#E7D6BE'/>` +
    `<text x='${w / 2}' y='${cy + r + 52}' text-anchor='middle' font-family='sans-serif'` +
    ` font-size='${w > 700 ? 26 : 19}' font-weight='600' fill='#6B4A38'>Photo à venir</text>` +
    `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const EVENT_PLACEHOLDER = svgPlaceholder(600, 400)
export const TEAM_PLACEHOLDER = svgPlaceholder(840, 840)

// Portrait placeholder for a team member without a photo yet: their
// initials in a circle, same beige family as the other placeholders.
export const memberPlaceholder = (initials) => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>` +
    `<rect width='400' height='400' fill='#F3E4CE'/>` +
    `<circle cx='200' cy='200' r='96' fill='#E7D6BE'/>` +
    `<text x='200' y='222' text-anchor='middle' font-family='sans-serif'` +
    ` font-size='64' font-weight='700' fill='#6B4A38'>${initials}</text>` +
    `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
