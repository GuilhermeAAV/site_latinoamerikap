import { PapelPicado } from './PapelPicado.jsx'
import { useLang } from '../i18n.jsx'

export function Join({ style = 'sunset' }) {
  const { t } = useLang()

  return (
    <section id="join" className="section section--join">
      <div className={`join-panel${style === 'crema' ? ' join-panel--crema' : ''}`}>
        <PapelPicado id="pp-join" variant="join" />
        <p className="join-script">¿Te unes a la fiesta?</p>
        <h2 className="join-title">{t('join.title')}</h2>
        <p className="join-copy">{t('join.copy')}</p>
        <div className="join-ctas">
          <a href="mailto:latinoamerikap@uclouvain.be" className="pill pill--ink">{t('join.cta')}</a>
          <a href="https://www.instagram.com/latinoamerikap/" target="_blank" rel="noreferrer" className="pill pill--join-outline">@latinoamerikap</a>
        </div>
      </div>
    </section>
  )
}
