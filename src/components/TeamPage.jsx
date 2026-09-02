import { useState } from 'react'
import { memberPlaceholder } from '../data/placeholders.js'
import { useContent } from '../content.jsx'
import { Flag } from './Flags.jsx'
import { PapelPicado } from './PapelPicado.jsx'
import { useLang } from '../i18n.jsx'

const initials = (name) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

export function TeamPage() {
  const { t, tr } = useLang()
  const { teamYears } = useContent()
  const [yearId, setYearId] = useState(teamYears[0]?.id)
  const year =
    teamYears.find((y) => y.id === yearId) ?? teamYears[0] ?? { id: '', label: '', members: [] }
  const isCurrent = year.id === teamYears[0]?.id

  return (
    <main className="lk-page">
      <header className="lk-head">
        <p className="eyebrow eyebrow--kap">{t('team.eyebrow')}</p>
        <h1 className="section-title lk-title">La familia {year.label}</h1>
        <p className="lk-intro">{t('team.intro')}</p>
        <div className="lk-years" role="group" aria-label={t('team.yearsAria')}>
          {teamYears.map((y) => (
            <button
              key={y.id}
              type="button"
              className="lk-year"
              aria-pressed={y.id === year.id}
              onClick={() => setYearId(y.id)}
            >
              {y.label}
            </button>
          ))}
        </div>
        {!isCurrent && (
          <p className="lk-past-note">
            {t('team.pastPre')}{year.label}{t('team.pastPost')}
          </p>
        )}
      </header>

      <PapelPicado id="pp-team" className="lk-sep" />

      <ul className="lk-cards" aria-label={t('team.cardsAria')}>
        {year.members.map((m, i) => (
          <li key={m.name} className={`lk-card lk-card--${m.accent}`}>
            <div className="lk-card-frame">
              <div className="lk-card-top">
                <span className="lk-card-num" aria-hidden="true">{i + 1}</span>
                {m.country && <Flag country={m.country} width={20} height={13} />}
              </div>
              <img
                className="lk-card-photo"
                src={m.photo ?? memberPlaceholder(initials(m.name))}
                alt={`${t('team.portraitAlt')}${m.name}`}
                width="400"
                height="400"
                loading="lazy"
              />
              <p className="lk-card-carta">{m.carta}</p>
              <h3 className="lk-card-name">{m.name}</h3>
              <p className="lk-card-meta">{tr(m.role)} · {m.origin}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
