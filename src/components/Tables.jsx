import { useContent } from '../content.jsx'
import { useLang } from '../i18n.jsx'

export function Tables() {
  const { t, tr } = useLang()
  const { tables } = useContent()

  return (
    <section id="tables" className="section section--tables">
      <p className="eyebrow eyebrow--tables">{t('tables.eyebrow')}</p>
      <h2 className="section-title">{t('nav.tables')}</h2>
      <p className="tables-intro">{t('tables.intro')}</p>
      <div className="tables-grid">
        {tables.map((table) => (
          <article key={table.id} className="table-card">
            <span className="table-badge" aria-hidden="true">{table.badge}</span>
            <div>
              <h3 className="table-title">{tr(table.title)}</h3>
              <p className="table-schedule">{tr(table.schedule)}</p>
              <p className="table-desc">{tr(table.desc)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
