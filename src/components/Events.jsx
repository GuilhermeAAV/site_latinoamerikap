import { EVENT_PLACEHOLDER } from '../data/placeholders.js'
import { useContent } from '../content.jsx'
import { useLang } from '../i18n.jsx'

function EventCard({ event }) {
  const { t, tr } = useLang()

  return (
    <article className={`event-card accent-${event.accent}`}>
      <div className="event-media">
        <img className="img-slot" src={event.image ?? EVENT_PLACEHOLDER} alt={tr(event.title)} width="600" height="400" />
      </div>
      <div className="event-bar" aria-hidden="true"></div>
      <div className="event-body">
        <span className="event-date">{tr(event.date)}</span>
        <h3 className="event-title">{tr(event.title)}</h3>
        <p className="event-place">{tr(event.place)}</p>
        <p className="event-desc">{tr(event.desc)}</p>
        <div>
          <a href="#join" className={`event-btn accent-${event.accent}`}>{t('events.join')}</a>
        </div>
      </div>
    </article>
  )
}

export function Events() {
  const { t } = useLang()
  const { events } = useContent()

  return (
    <section id="events" className="section section--events">
      <div className="section-head">
        <div>
          <p className="eyebrow eyebrow--events">{t('events.eyebrow')}</p>
          <h2 className="section-title">{t('events.title')}</h2>
        </div>
        <p className="section-aside">¡No te lo pierdas!</p>
      </div>
      <div className="events-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <p className="events-note">
        {t('events.notePre')}<a href="https://www.instagram.com/latinoamerikap/" target="_blank" rel="noreferrer">Instagram</a>.
      </p>
    </section>
  )
}
