import { useEffect, useState } from 'react'
import { Nav } from './components/Nav.jsx'
import { Hero } from './components/Hero.jsx'
import { Events } from './components/Events.jsx'
import { Tables } from './components/Tables.jsx'
import { Kap } from './components/Kap.jsx'
import { TeamPage } from './components/TeamPage.jsx'
import { PuentePage } from './components/PuentePage.jsx'
import { Join } from './components/Join.jsx'
import { Footer } from './components/Footer.jsx'
import { PapelPicado } from './components/PapelPicado.jsx'
import { useLang } from './i18n.jsx'

// Build-time flags from the design handoff prototype.
const CONFIG = {
  grain: true, // fixed noise texture overlay
  showFlags: true, // flag chips in the hero and footer
  joinStyle: 'sunset', // 'sunset' (gradient) | 'crema' (flat, ink text)
}

// Hash convention: '#/...' is a page route (e.g. '#/le-kap'), any other
// hash ('#events', '#join'…) is an anchor on the landing page.
function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const { lang, t } = useLang()
  const hash = useHash()
  const isTeamPage = hash.startsWith('#/le-kap')
  const isPuentePage = hash.startsWith('#/puente-cultural')

  useEffect(() => {
    document.title = isTeamPage
      ? t('title.team')
      : isPuentePage
        ? t('title.puente')
        : t('title.home')
  }, [isTeamPage, isPuentePage, lang, t])

  // Scroll after the route renders: pages open at the top; coming back to
  // the landing with an anchor ('#events'…) scrolls to it once it exists.
  useEffect(() => {
    if (hash.startsWith('#/')) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    const target = id && id !== 'top' ? document.getElementById(id) : null
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [hash])

  return (
    <>
      {CONFIG.grain && <div className="grain" aria-hidden="true"></div>}
      <div className="container">
        <Nav />
        {isTeamPage ? (
          <TeamPage />
        ) : isPuentePage ? (
          <PuentePage />
        ) : (
          <>
            <Hero showFlags={CONFIG.showFlags} />
            <Events />
            <PapelPicado id="pp-sep" className="separator" />
            <Tables />
            <Kap />
          </>
        )}
        <Join style={CONFIG.joinStyle} />
      </div>
      <Footer showFlags={CONFIG.showFlags} />
    </>
  )
}
