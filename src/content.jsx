// ============================================================
// Contenu éditable sans toucher au code — événements, tables,
// équipe, points du puente.
//
// La source de vérité est public/content/*.json (+ les photos dans
// public/media/), édités par le comité via app.pagescms.org (voir
// .pages.yml et GUIDE-CONTENU.md). Au démarrage, le site charge :
//   1. si VITE_CONTENT_BASE est défini (build de production, voir
//      .env.production) : la version publiée sur GitHub — le contenu
//      se met donc à jour sans redéployer le site (~5 min de cache) ;
//   2. sinon, ou si GitHub est injoignable : la copie locale
//      embarquée dans le build.
// ============================================================

import { createContext, useContext, useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_CONTENT_BASE ?? ''

// Chemin de photo uploadée via le CMS ('/media/…') → URL complète.
// Quand le contenu vient de GitHub, les photos aussi : une photo
// ajoutée après le dernier déploiement n'existe pas dans le build.
const mediaUrl = (path) => (path && BASE ? `${BASE}${path}` : path || null)

async function fetchJson(name) {
  if (BASE) {
    try {
      const res = await fetch(`${BASE}/content/${name}.json`, { cache: 'no-cache' })
      if (res.ok) return await res.json()
    } catch {
      /* réseau ou GitHub indisponible : copie locale ci-dessous */
    }
  }
  const res = await fetch(`${import.meta.env.BASE_URL}content/${name}.json`)
  if (!res.ok) throw new Error(`content/${name}.json → HTTP ${res.status}`)
  return res.json()
}

// Champ multilingue venant du CMS : les langues laissées vides ('')
// doivent disparaître pour que tr() retombe sur le français.
function cleanText(field) {
  if (field == null) return null
  if (typeof field === 'string') return field.trim() || null
  const out = {}
  for (const [k, v] of Object.entries(field)) {
    if (typeof v === 'string' && v.trim()) out[k] = v
  }
  return Object.keys(out).length ? out : null
}

const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Les couleurs des cartes alternent (classes .accent-* et .lk-card--*
// dans styles.css) : les éditeurs n'ont pas de couleur à choisir.
const EVENT_ACCENTS = ['fuchsia', 'verde', 'purpura']
const MEMBER_ACCENTS = ['rojo', 'fuchsia', 'verde', 'purpura', 'teal']

function normalize({ events, tables, team, puente }) {
  const seen = new Set()
  const contacts = (puente.contacts ?? [])
    .map((c, i) => {
      let id = slug(c.name ?? '') || `contacto-${i}`
      if (seen.has(id)) id = `${id}-${i}`
      seen.add(id)
      return {
        ...c,
        id,
        status: c.status === 'alumni' ? 'alumni' : 'actuel',
        years: c.years || '',
        role: cleanText(c.role),
        description: cleanText(c.description),
        coords: [Number(c.lat), Number(c.lng)],
        phone: c.phone || null,
        email: c.email || null,
        instagram: c.instagram || null,
        facebook: c.facebook || null,
        photo: mediaUrl(c.photo),
      }
    })
    .filter((c) => Number.isFinite(c.coords[0]) && Number.isFinite(c.coords[1]))

  const members = (team.members ?? []).filter((m) => m.name && m.year)
  const yearLabels = [...new Set(members.map((m) => m.year))].sort((a, b) =>
    b.localeCompare(a, 'fr', { numeric: true }),
  )

  return {
    events: (events.events ?? [])
      .filter((e) => cleanText(e.title))
      .map((e, i) => ({
        id: `event-${i}`,
        title: cleanText(e.title),
        date: cleanText(e.date),
        place: e.place || '',
        desc: cleanText(e.desc),
        image: mediaUrl(e.image),
        accent: EVENT_ACCENTS[i % EVENT_ACCENTS.length],
      })),
    tables: (tables.tables ?? []).map((t, i) => ({
      id: `table-${i}`,
      badge: t.badge || '',
      title: cleanText(t.title),
      schedule: cleanText(t.schedule),
      desc: cleanText(t.desc),
    })),
    groupPhoto: mediaUrl(team.groupPhoto),
    teamYears: yearLabels.map((label) => ({
      id: label,
      label,
      members: members
        .filter((m) => m.year === label)
        .map((m, i) => ({
          ...m,
          role: cleanText(m.role),
          photo: mediaUrl(m.photo),
          accent: MEMBER_ACCENTS[i % MEMBER_ACCENTS.length],
        })),
    })),
    contacts,
  }
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true
    Promise.all(['events', 'tables', 'team', 'puente'].map(fetchJson))
      .then(([events, tables, team, puente]) => {
        if (alive) setContent(normalize({ events, tables, team, puente }))
      })
      .catch(() => alive && setError(true))
    return () => {
      alive = false
    }
  }, [])

  if (error) {
    return (
      <p className="content-error" role="alert">
        El sitio no quiere despertarse… Impossible de charger le contenu, réessaie dans un instant.
      </p>
    )
  }
  if (!content) return null
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext)
}
