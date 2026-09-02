import logo from '../assets/latinoamerikap.png'
import { LANGS, useLang } from '../i18n.jsx'

export function Nav() {
  const { lang, setLang, t } = useLang()

  return (
    <nav className="nav" aria-label="Navigation principale">
      <a href="#top" className="nav-brand">
        <img className="nav-logo" src={logo} alt="" width="400" height="433" />
        <span className="nav-wordmark">LatinoAmeriKap</span>
      </a>
      <div className="nav-links">
        <a href="#events">{t('nav.events')}</a>
        <a href="#tables">{t('nav.tables')}</a>
        <a href="#/le-kap">{t('nav.kap')}</a>
        <a href="#/puente-cultural">{t('nav.puente')}</a>
        <a href="#join" className="nav-cta">{t('nav.join')}</a>
      </div>
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
    </nav>
  )
}
