import { useEffect, useRef, useState } from 'react'
import logo from '../assets/latinoamerikap.png'
import { LANGS, useLang } from '../i18n.jsx'
import { PapelPicado } from './PapelPicado.jsx'

function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <div className="lang-switch" role="group" aria-label={t('nav.langAria')}>
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          className="lang-btn"
          aria-pressed={l.id === lang}
          onClick={() => setLang(l.id)}
          lang={l.id}
          title={l.name}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

export function Nav() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const burgerRef = useRef(null)
  const closeRef = useRef(null)
  const wasOpen = useRef(false)
  const close = () => setOpen(false)

  // Tiroir ouvert : scroll de la page verrouillé (body.drawer-open, voir
  // styles.css) et focus déplacé sur le bouton fermer — rendu au hamburger
  // à la fermeture.
  useEffect(() => {
    document.body.classList.toggle('drawer-open', open)
    if (open) {
      closeRef.current?.focus()
      wasOpen.current = true
    } else if (wasOpen.current) {
      burgerRef.current?.focus()
      wasOpen.current = false
    }
    return () => document.body.classList.remove('drawer-open')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Mêmes liens dans la rangée desktop et dans le tiroir mobile.
  const links = (
    <>
      <a href="#events" onClick={close}>{t('nav.events')}</a>
      <a href="#tables" onClick={close}>{t('nav.tables')}</a>
      <a href="#/le-kap" onClick={close}>{t('nav.kap')}</a>
      <a href="#/puente-cultural" onClick={close}>{t('nav.puente')}</a>
      <a href="#join" className="nav-cta" onClick={close}>{t('nav.join')}</a>
    </>
  )

  return (
    <nav className="nav" aria-label="Navigation principale">
      <a href="#top" className="nav-brand" onClick={close}>
        <img className="nav-logo" src={logo} alt="" width="400" height="433" />
        <span className="nav-wordmark">LatinoAmeriKap</span>
      </a>

      {/* Desktop : rangée de liens + sélecteur de langue */}
      <div className="nav-links">{links}</div>
      <LangSwitch />

      {/* Mobile : hamburger + tiroir latéral */}
      <button
        ref={burgerRef}
        type="button"
        className="nav-burger"
        aria-expanded={open}
        aria-controls="nav-drawer"
        aria-label={t('nav.menuOpen')}
        onClick={() => setOpen((o) => !o)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={open ? 'nav-scrim is-open' : 'nav-scrim'}
        onClick={close}
        aria-hidden="true"
      ></div>
      <div id="nav-drawer" className={open ? 'nav-drawer is-open' : 'nav-drawer'}>
        <PapelPicado className="nav-drawer-picado" />
        <button
          ref={closeRef}
          type="button"
          className="nav-drawer-close"
          aria-label={t('nav.menuClose')}
          onClick={close}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="nav-drawer-links">{links}</div>
        <div className="nav-drawer-foot">
          <LangSwitch />
        </div>
      </div>
    </nav>
  )
}
