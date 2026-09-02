import { Flag, FOOTER_FLAGS } from './Flags.jsx'
import logo from '../assets/latinoamerikap.png'
import { useLang } from '../i18n.jsx'

export function Footer({ showFlags }) {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <img className="footer-logo" src={logo} alt="" width="400" height="433" />
          <div>
            <p className="footer-brand-name">LatinoAmeriKap</p>
            <p className="footer-brand-sub">
              Kot-à-projet · UCLouvain<br />{t('footer.sub')}
            </p>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <a href="#events">{t('nav.events')}</a>
            <a href="#tables">{t('nav.tables')}</a>
            <a href="#/le-kap">{t('footer.team')}</a>
            <a href="#/puente-cultural">{t('footer.puente')}</a>
          </div>
          <div className="footer-col">
            <a href="mailto:latinoamerikap@uclouvain.be">latinoamerikap@uclouvain.be</a>
            <a href="https://instagram.com">Instagram</a>
            <a href="https://facebook.com">Facebook</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {showFlags && (
          <div className="footer-flags flags">
            {FOOTER_FLAGS.map((country) => (
              <Flag key={country} country={country} width={22} height={15} />
            ))}
          </div>
        )}
        <p className="footer-copyright">{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}
