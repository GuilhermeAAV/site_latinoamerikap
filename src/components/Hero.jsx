import { PapelPicado } from './PapelPicado.jsx'
import { Flag, HERO_FLAGS } from './Flags.jsx'
import { useLang } from '../i18n.jsx'

export function Hero({ showFlags }) {
  const { t } = useLang()

  return (
    <header id="top" className="hero">
      <div className="hero-glow" aria-hidden="true"></div>
      <PapelPicado />
      <div className="hero-content">
        <p className="eyebrow">LatinoAmeriKap · Kap UCLouvain · Louvain-la-Neuve</p>
        <h1 className="hero-title">{t('hero.title')}</h1>
        <p className="hero-script">¡Ven a bailar, cocinar y charlar con nosotros!</p>
        <p className="hero-copy">{t('hero.copy')}</p>
        <div className="hero-ctas">
          <a href="#events" className="pill pill--ink">{t('hero.ctaEvents')}</a>
          <a href="#tables" className="pill pill--outline">{t('nav.tables')}</a>
        </div>
      </div>
      {showFlags && (
        <div className="hero-flags flags">
          {HERO_FLAGS.map((country) => (
            <Flag key={country} country={country} />
          ))}
          <span className="hero-flags-caption">{t('hero.flagsCaption')}</span>
        </div>
      )}
    </header>
  )
}
