import { TEAM_PLACEHOLDER } from '../data/placeholders.js'
import { useContent } from '../content.jsx'
import { useLang } from '../i18n.jsx'

export function Kap() {
  const { t } = useLang()
  const { groupPhoto } = useContent()

  return (
    <section id="kap" className="section section--kap">
      <div className="kap-grid">
        <div>
          <p className="eyebrow eyebrow--kap">{t('nav.kap')}</p>
          <h2 className="section-title kap-title">{t('kap.title')}</h2>
          <p className="kap-copy">{t('kap.copy1')}</p>
          <p className="kap-copy kap-copy--muted">
            {t('kap.copy2')}
            <span className="kap-script">¡Todos son bienvenidos!</span>
          </p>
          <a href="#/le-kap" className="pill pill--purpura">{t('kap.cta')}</a>
        </div>
        <div className="kap-photo-wrap">
          <div className="kap-photo">
            <img
              className="img-slot"
              src={groupPhoto ?? TEAM_PLACEHOLDER}
              alt={t('kap.photoAlt')}
              width="840"
              height="840"
            />
          </div>
          <div className="kap-sticker" aria-hidden="true">desde 1998</div>
        </div>
      </div>
    </section>
  )
}
