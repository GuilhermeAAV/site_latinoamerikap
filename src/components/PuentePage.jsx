import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CONTACTS, KOT, COUNTRY_NAMES } from '../data/contacts.js'
import { memberPlaceholder } from '../data/placeholders.js'
import { Flag } from './Flags.jsx'
import { PapelPicado } from './PapelPicado.jsx'
import { useLang } from '../i18n.jsx'

const initials = (name) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// L'arc « puente » : une courbe de Bézier quadratique entre la ville
// d'origine et le kot, bombée vers le nord façon route aérienne.
function arcPoints(from, to) {
  const [lat1, lng1] = from
  const [lat2, lng2] = to
  const dLat = lat2 - lat1
  const dLng = lng2 - lng1
  const dist = Math.hypot(dLat, dLng)
  if (dist < 0.05) return null
  let pLat = -dLng / dist
  let pLng = dLat / dist
  if (pLat < 0) {
    pLat = -pLat
    pLng = -pLng
  }
  const k = dist * 0.18
  const cLat = (lat1 + lat2) / 2 + pLat * k
  const cLng = (lng1 + lng2) / 2 + pLng * k
  const pts = []
  const n = 48
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const u = 1 - t
    pts.push([
      u * u * lat1 + 2 * u * t * cLat + t * t * lat2,
      u * u * lng1 + 2 * u * t * cLng + t * t * lng2,
    ])
  }
  return pts
}

const FILTERS = [
  { id: 'todos', labelKey: 'puente.filterAll' },
  { id: 'actuel', labelKey: 'puente.filterActuel' },
  { id: 'alumni', labelKey: 'puente.filterAlumni' },
]

export function PuentePage() {
  const { t, tr } = useLang()
  const mapElRef = useRef(null)
  const mapRef = useRef(null)
  const layersRef = useRef({})
  const groupsRef = useRef({})
  const mapGridRef = useRef(null)
  const fichaRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('todos')

  const visible = useMemo(
    () => CONTACTS.filter((c) => filter === 'todos' || c.status === filter),
    [filter],
  )
  const selectedContact = CONTACTS.find((c) => c.id === selected) ?? null

  useEffect(() => {
    const map = L.map(mapElRef.current, {
      minZoom: 2,
      maxZoom: 13,
      maxBounds: [[-58, -135], [75, 55]],
      maxBoundsViscosity: 0.8,
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map)

    // Le kot : point d'arrivée de tous les arcs, marqué façon sticker.
    L.marker(KOT.coords, {
      icon: L.divIcon({
        className: 'pc-kot-icon',
        html: '<span class="pc-kot-dot"></span><span class="pc-kot-sticker">el kot</span>',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      }),
      interactive: false,
      keyboard: false,
      zIndexOffset: 1000,
    }).addTo(map)

    const groups = { actuel: L.layerGroup(), alumni: L.layerGroup() }
    const kotKey = KOT.coords.join(',')
    const seen = {}
    const layers = {}

    CONTACTS.forEach((c) => {
      const key = c.coords.join(',')
      const dups = (seen[key] = (seen[key] ?? 0) + 1)
      // Deux personnes de la même ville (ou la ville du kot) : on décale
      // légèrement le point pour que les deux restent cliquables.
      const shift = key === kotKey ? dups : dups - 1
      const coords =
        shift > 0
          ? [c.coords[0] - 0.45 * shift, c.coords[1] + 0.45 * shift]
          : c.coords

      const pts = arcPoints(coords, KOT.coords)
      const arc =
        pts &&
        L.polyline(pts, {
          className: 'pc-arc',
          color: '#F4772E',
          weight: 1.6,
          interactive: false,
        })

      const marker = L.marker(coords, {
        icon: L.divIcon({
          className: 'pc-pin-wrap',
          html: `<span class="pc-pin pc-pin--${c.status}"></span>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        }),
        title: `${c.name} — ${c.origin}`,
        alt: `${c.name} — ${c.origin}`,
        riseOnHover: true,
      })
      marker.on('click', () => {
        setSelected((prev) => (prev === c.id ? null : c.id))
        if (window.matchMedia('(max-width: 980px)').matches) {
          fichaRef.current?.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'nearest',
          })
        }
      })

      if (arc) arc.addTo(groups[c.status])
      marker.addTo(groups[c.status])
      layers[c.id] = { marker, arc, coords, status: c.status }
    })

    groups.actuel.addTo(map)
    groups.alumni.addTo(map)

    // Marge plus grande en haut pour que le sticker « el kot » ne soit
    // jamais coupé par le bord de la carte.
    map.fitBounds(
      L.latLngBounds([KOT.coords, ...Object.values(layers).map((l) => l.coords)]),
      { paddingTopLeft: [28, 64], paddingBottomRight: [28, 28] },
    )

    mapRef.current = map
    layersRef.current = layers
    groupsRef.current = groups
    return () => {
      map.remove()
      mapRef.current = null
      layersRef.current = {}
      groupsRef.current = {}
    }
  }, [])

  // Filtre : on ajoute/retire le groupe de calques correspondant.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    Object.entries(groupsRef.current).forEach(([status, group]) => {
      if (filter === 'todos' || filter === status) group.addTo(map)
      else group.remove()
    })
    setSelected((prev) => {
      const c = CONTACTS.find((x) => x.id === prev)
      return c && filter !== 'todos' && c.status !== filter ? null : prev
    })
  }, [filter])

  // Sélection : classe sur le pin + l'arc, léger recentrage de la carte.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.getContainer().classList.toggle('pc-has-sel', !!selected)
    Object.entries(layersRef.current).forEach(([id, ly]) => {
      const on = id === selected
      ly.marker.getElement()?.classList.toggle('is-sel', on)
      ly.marker.setZIndexOffset(on ? 500 : 0)
      ly.arc?.getElement()?.classList.toggle('is-sel', on)
    })
    if (selected) {
      const ly = layersRef.current[selected]
      if (ly) map.panTo(ly.coords, { animate: !prefersReducedMotion() })
    }
  }, [selected, filter])

  const selectFromGuia = (id) => {
    setSelected((prev) => (prev === id ? null : id))
    mapGridRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="pc-page">
      <header className="pc-head">
        <div className="section-head">
          <div>
            <p className="eyebrow eyebrow--puente">{t('puente.eyebrow')}</p>
            <h1 className="section-title pc-title">El mapa de la familia</h1>
          </div>
          <p className="section-aside pc-aside">cada punto, una historia</p>
        </div>
        <p className="pc-intro">{t('puente.intro')}</p>
        <div className="pc-filters" role="group" aria-label={t('puente.filtersAria')}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`pc-filter pc-filter--${f.id}`}
              aria-pressed={f.id === filter}
              onClick={() => setFilter(f.id)}
            >
              {f.id !== 'todos' && <span className="pc-filter-dot" aria-hidden="true"></span>}
              {t(f.labelKey)}
            </button>
          ))}
        </div>
      </header>

      <div className="pc-map-grid" ref={mapGridRef}>
        <div className="pc-map" ref={mapElRef} aria-label={t('puente.mapAria')}></div>
        <aside className="pc-ficha" ref={fichaRef} aria-live="polite">
          {selectedContact ? <Ficha contact={selectedContact} /> : <FichaEmpty />}
        </aside>
      </div>

      <PapelPicado id="pp-puente" className="pc-sep" />

      <section className="pc-guia" aria-label={t('puente.guiaAria')}>
        <p className="eyebrow eyebrow--puente">La guía</p>
        <h2 className="section-title pc-guia-title">{t('puente.guiaTitle')}</h2>
        <ul className="pc-guia-grid">
          {visible.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className="pc-guia-item"
                aria-pressed={c.id === selected}
                onClick={() => selectFromGuia(c.id)}
              >
                <span className={`pc-guia-dot pc-guia-dot--${c.status}`} aria-hidden="true"></span>
                <span className="pc-guia-text">
                  <span className="pc-guia-name">{c.name}</span>
                  <span className="pc-guia-meta">{c.origin} · {tr(c.role)}</span>
                </span>
                {c.country && <Flag country={c.country} width={20} height={13} />}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

function Ficha({ contact: c }) {
  const { t, tr } = useLang()

  return (
    <article className="pc-card">
      <img
        className="pc-card-photo"
        src={c.photo ?? memberPlaceholder(initials(c.name))}
        alt={`${t('team.portraitAlt')}${c.name}`}
        width="400"
        height="400"
      />
      <div className="pc-card-body">
        <p className={`pc-chip pc-chip--${c.status}`}>
          {c.status === 'actuel' ? `${t('puente.chipTeam')}${c.years}` : `Alumni · ${c.years}`}
        </p>
        <h2 className="pc-card-name">{c.name}</h2>
        <p className="pc-card-role">{tr(c.role)}</p>
        <p className="pc-card-origin">
          {c.country && <Flag country={c.country} width={20} height={13} />}
          {c.origin}, {tr(COUNTRY_NAMES[c.country])}
        </p>
        <p className="pc-card-desc">{tr(c.description)}</p>
        <div className="pc-card-contacts">
          <a href={`tel:${c.phone.replace(/\s/g, '')}`}>
            <PhoneIcon />
            {c.phone}
          </a>
          <a href={`mailto:${c.email}`}>
            <MailIcon />
            {c.email}
          </a>
          {c.instagram && (
            <a href={`https://instagram.com/${c.instagram}`} target="_blank" rel="noreferrer">
              <InstagramIcon />
              @{c.instagram}
            </a>
          )}
          {c.facebook && (
            <a href={`https://facebook.com/${c.facebook}`} target="_blank" rel="noreferrer">
              <FacebookIcon />
              {c.facebook}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function FichaEmpty() {
  const { t } = useLang()

  return (
    <div className="pc-card pc-card--empty">
      <svg className="pc-empty-arc" viewBox="0 0 96 44" width="96" height="44" aria-hidden="true">
        <path d="M6 38 Q 48 -14 90 38" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
        <circle cx="6" cy="38" r="4" fill="currentColor" />
        <circle cx="90" cy="38" r="4" fill="currentColor" />
      </svg>
      <p className="pc-empty-script">¿Quién será?</p>
      <p className="pc-empty-copy">{t('puente.emptyCopy')}</p>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
