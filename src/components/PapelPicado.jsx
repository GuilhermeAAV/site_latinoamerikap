// Papel picado pennant strip. The pennant is a CSS mask tile that repeats at
// its natural proportions, scaled to the strip's height (see .papel-picado in
// styles.css) — so the garland never stretches or compresses, whatever the
// viewport width. `variant="banner"` (hero & separators) has a hanging line
// and two punched circles per pennant; `variant="join"` is the lighter strip
// at the top of the join panel (one circle, no line).

export function PapelPicado({ variant = 'banner', className = '' }) {
  return (
    <div
      className={`papel-picado papel-picado--${variant} ${className}`.trim()}
      aria-hidden="true"
    ></div>
  )
}
