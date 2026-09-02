// Papel picado pennant strip. `variant="banner"` (hero & separator) has a
// hanging line and two punched circles per pennant; `variant="join"` is the
// lighter strip at the top of the join panel (one circle, no line).

const PATH_BANNER = 'M1 0 H49 V22 L25 42 L1 22 Z M25 7 a6 6 0 1 0 0.01 0 Z M25 24 a3 3 0 1 0 0.01 0 Z'
const PATH_JOIN = 'M1 0 H49 V22 L25 42 L1 22 Z M25 7 a6 6 0 1 0 0.01 0 Z'

export function PapelPicado({ id, variant = 'banner', className = '' }) {
  const join = variant === 'join'
  return (
    <svg
      className={`papel-picado ${className}`.trim()}
      viewBox="0 0 1200 44"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="50" height="44" patternUnits="userSpaceOnUse">
          <path d={join ? PATH_JOIN : PATH_BANNER} fill="currentColor" fillRule="evenodd" />
        </pattern>
      </defs>
      {!join && <line x1="0" y1="1.5" x2="1200" y2="1.5" stroke="currentColor" strokeWidth="3" />}
      <rect x="0" y={join ? 0 : 2} width="1200" height={join ? 44 : 42} fill={`url(#${id})`} />
    </svg>
  )
}
