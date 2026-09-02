// Latin American flag chips, drawn inline (24×16 viewBox, per the design handoff).

const FLAG_SHAPES = {
  colombia: (
    <>
      <rect width="24" height="8" fill="#FCD116" />
      <rect y="8" width="24" height="4" fill="#003893" />
      <rect y="12" width="24" height="4" fill="#CE1126" />
    </>
  ),
  mexique: (
    <>
      <rect width="8" height="16" fill="#006847" />
      <rect x="8" width="8" height="16" fill="#FFFDF8" />
      <rect x="16" width="8" height="16" fill="#CE1126" />
    </>
  ),
  argentine: (
    <>
      <rect width="24" height="16" fill="#74ACDF" />
      <rect y="5.3" width="24" height="5.3" fill="#FFFDF8" />
      <circle cx="12" cy="8" r="2" fill="#F6B40E" />
    </>
  ),
  bresil: (
    <>
      <rect width="24" height="16" fill="#009C3B" />
      <path d="M12 2 L21 8 L12 14 L3 8 Z" fill="#FFDF00" />
      <circle cx="12" cy="8" r="3" fill="#002776" />
    </>
  ),
  perou: (
    <>
      <rect width="8" height="16" fill="#D91023" />
      <rect x="8" width="8" height="16" fill="#FFFDF8" />
      <rect x="16" width="8" height="16" fill="#D91023" />
    </>
  ),
  venezuela: (
    <>
      <rect width="24" height="5.3" fill="#FCD116" />
      <rect y="5.3" width="24" height="5.3" fill="#003893" />
      <rect y="10.6" width="24" height="5.4" fill="#CE1126" />
    </>
  ),
  bolivie: (
    <>
      <rect width="24" height="5.3" fill="#D52B1E" />
      <rect y="5.3" width="24" height="5.3" fill="#F9E300" />
      <rect y="10.6" width="24" height="5.4" fill="#007934" />
    </>
  ),
  chili: (
    <>
      <rect width="24" height="8" fill="#FFFDF8" />
      <rect y="8" width="24" height="8" fill="#D52B1E" />
      <rect width="8" height="8" fill="#0039A6" />
    </>
  ),
  // Not in the hero/footer strips — used on the team page for the
  // Belgian members of the comité.
  belgique: (
    <>
      <rect width="8" height="16" fill="#2E1B12" />
      <rect x="8" width="8" height="16" fill="#FDDA24" />
      <rect x="16" width="8" height="16" fill="#EF3340" />
    </>
  ),
}

export const HERO_FLAGS = ['colombia', 'mexique', 'argentine', 'bresil', 'perou', 'venezuela', 'bolivie', 'chili']
export const FOOTER_FLAGS = ['colombia', 'mexique', 'argentine', 'bresil', 'perou', 'venezuela']

export function Flag({ country, width = 26, height = 18 }) {
  return (
    <svg className="flag" width={width} height={height} viewBox="0 0 24 16" aria-hidden="true">
      {FLAG_SHAPES[country]}
    </svg>
  )
}
