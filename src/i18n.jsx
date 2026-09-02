// ============================================================
// i18n maison — quatre langues : fr (défaut), es, pt, en.
//
// Deux outils, fournis par le hook useLang() :
//   t('cle')   — textes d'interface, définis dans STRINGS ci-dessous
//   tr(champ)  — champs de données multilingues ({ fr, es, pt, en })
//                ou simples chaînes ; si la traduction manque,
//                on retombe sur le français.
//
// La langue choisie est mémorisée dans localStorage ('lak-lang').
// ============================================================

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const LANGS = [
  { id: 'fr', label: 'FR', name: 'Français' },
  { id: 'es', label: 'ES', name: 'Español' },
  { id: 'pt', label: 'PT', name: 'Português' },
  { id: 'en', label: 'EN', name: 'English' },
]

const STRINGS = {
  // ---- Titres d'onglet ----
  'title.home': {
    fr: 'LatinoAmeriKap — La cultura latina à Louvain-la-Neuve',
    es: 'LatinoAmeriKap — La cultura latina en Louvain-la-Neuve',
    pt: 'LatinoAmeriKap — A cultura latina em Louvain-la-Neuve',
    en: 'LatinoAmeriKap — La cultura latina in Louvain-la-Neuve',
  },
  'title.team': {
    fr: 'L’équipe — LatinoAmeriKap',
    es: 'El equipo — LatinoAmeriKap',
    pt: 'A equipe — LatinoAmeriKap',
    en: 'The team — LatinoAmeriKap',
  },
  'title.puente': {
    fr: 'Puente cultural · Contactos — LatinoAmeriKap',
    es: 'Puente cultural · Contactos — LatinoAmeriKap',
    pt: 'Puente cultural · Contatos — LatinoAmeriKap',
    en: 'Puente cultural · Contacts — LatinoAmeriKap',
  },

  // ---- Nav ----
  'nav.events': { fr: 'Événements', es: 'Eventos', pt: 'Eventos', en: 'Events' },
  'nav.tables': {
    fr: 'Tables de conversation',
    es: 'Mesas de conversación',
    pt: 'Rodas de conversa',
    en: 'Conversation tables',
  },
  'nav.kap': { fr: 'Le kap', es: 'Le kap', pt: 'Le kap', en: 'Le kap' },
  'nav.puente': { fr: 'Puente cultural', es: 'Puente cultural', pt: 'Puente cultural', en: 'Puente cultural' },
  'nav.join': { fr: 'Rejoindre', es: 'Únete', pt: 'Participe', en: 'Join' },
  'nav.langAria': { fr: 'Choisir la langue', es: 'Elegir idioma', pt: 'Escolher idioma', en: 'Choose language' },

  // ---- Hero ----
  'hero.title': {
    fr: 'La cultura latina, à Louvain‑la‑Neuve',
    es: 'La cultura latina, en Louvain‑la‑Neuve',
    pt: 'A cultura latina, em Louvain‑la‑Neuve',
    en: 'La cultura latina, in Louvain‑la‑Neuve',
  },
  'hero.copy': {
    fr: 'Le kot-à-projet qui fait vivre l’Amérique latine sur le campus : fiestas, soirées cuisine et tables de conversation en espagnol et en portugais. Ouvert à toutes et tous.',
    es: 'El kot-à-projet que hace vivir América Latina en el campus: fiestas, noches de cocina y mesas de conversación en español y portugués. Abierto a todo el mundo.',
    pt: 'O kot-à-projet que faz a América Latina viver no campus: festas, noites de cozinha e rodas de conversa em espanhol e português. Aberto a todos.',
    en: 'The kot-à-projet that brings Latin America to campus: fiestas, cooking nights and conversation tables in Spanish and Portuguese. Open to everyone.',
  },
  'hero.ctaEvents': { fr: 'Voir les événements', es: 'Ver los eventos', pt: 'Ver os eventos', en: 'See the events' },
  'hero.flagsCaption': {
    fr: '…et toute l’América Latina',
    es: '…y toda América Latina',
    pt: '…e toda a América Latina',
    en: '…and all of América Latina',
  },

  // ---- Événements ----
  'events.eyebrow': { fr: 'Agenda du quadri', es: 'Agenda del cuatri', pt: 'Agenda do quadrimestre', en: 'This term’s agenda' },
  'events.title': { fr: 'Prochains événements', es: 'Próximos eventos', pt: 'Próximos eventos', en: 'Upcoming events' },
  'events.join': { fr: 'Je participe', es: 'Me apunto', pt: 'Eu vou', en: 'Count me in' },
  'events.notePre': {
    fr: 'Le programme complet est publié chaque mois sur notre ',
    es: 'El programa completo se publica cada mes en nuestro ',
    pt: 'O programa completo é publicado todos os meses no nosso ',
    en: 'The full program is published every month on our ',
  },

  // ---- Tables de conversation ----
  'tables.eyebrow': { fr: 'Chaque semaine', es: 'Cada semana', pt: 'Toda semana', en: 'Every week' },
  'tables.intro': {
    fr: 'Pratique ton espagnol ou ton portugais autour d’un verre, dans une ambiance détendue. Tous les niveaux sont bienvenus — des natifs animent chaque table.',
    es: 'Practica tu español o tu portugués con un vaso en la mano, en un ambiente relajado. Todos los niveles son bienvenidos: cada mesa la animan nativos.',
    pt: 'Pratique seu espanhol ou seu português com um copo na mão, num ambiente descontraído. Todos os níveis são bem-vindos — cada roda é animada por nativos.',
    en: 'Practice your Spanish or Portuguese over a drink, in a relaxed atmosphere. All levels welcome — native speakers host every table.',
  },

  // ---- Le kap (à propos) ----
  'kap.title': {
    fr: 'Un kot-à-projet, douze passionné·es, un continent',
    es: 'Un kot-à-projet, doce personas apasionadas, un continente',
    pt: 'Um kot-à-projet, doze pessoas apaixonadas, um continente',
    en: 'One kot-à-projet, twelve passionate students, one continent',
  },
  'kap.copy1': {
    fr: 'LatinoAmeriKap est le kot-à-projet de l’UCLouvain dédié aux cultures d’Amérique latine. Étudiant·es latinos et belges y organisent ensemble des événements ouverts à tout le campus : de la salsa à la cumbia, des arepas au ceviche, du cinéma aux débats.',
    es: 'LatinoAmeriKap es el kot-à-projet de la UCLouvain dedicado a las culturas de América Latina. Estudiantes latinos y belgas organizan juntos eventos abiertos a todo el campus: de la salsa a la cumbia, de las arepas al ceviche, del cine a los debates.',
    pt: 'O LatinoAmeriKap é o kot-à-projet da UCLouvain dedicado às culturas da América Latina. Estudantes latinos e belgas organizam juntos eventos abertos a todo o campus: da salsa à cumbia, das arepas ao ceviche, do cinema aos debates.',
    en: 'LatinoAmeriKap is UCLouvain’s kot-à-projet dedicated to Latin American cultures. Latino and Belgian students organise events open to the whole campus: from salsa to cumbia, arepas to ceviche, films to debates.',
  },
  'kap.copy2': {
    fr: 'Pas besoin de parler espagnol ni de savoir danser — juste d’avoir envie de découvrir. ',
    es: 'No hace falta hablar español ni saber bailar: solo tener ganas de descubrir. ',
    pt: 'Não precisa falar espanhol nem saber dançar — só ter vontade de descobrir. ',
    en: 'No need to speak Spanish or know how to dance — just bring your curiosity. ',
  },
  'kap.cta': { fr: 'Rencontrer l’équipe', es: 'Conoce al equipo', pt: 'Conheça a equipe', en: 'Meet the team' },
  'kap.photoAlt': {
    fr: 'Photo de l’équipe du kap (soirée, cuisine, fiesta…)',
    es: 'Foto del equipo del kap (fiesta, cocina…)',
    pt: 'Foto da equipe do kap (festa, cozinha…)',
    en: 'Photo of the kap team (party, cooking, fiesta…)',
  },

  // ---- Bandeau « rejoindre » ----
  'join.title': {
    fr: 'Rejoins LatinoAmeriKap',
    es: 'Únete a LatinoAmeriKap',
    pt: 'Junte-se ao LatinoAmeriKap',
    en: 'Join LatinoAmeriKap',
  },
  'join.copy': {
    fr: 'Membre, bénévole d’un soir ou simple curieux·se : écris-nous, passe au kot, ou viens directement à la prochaine table de conversation.',
    es: 'Miembro, voluntario de una noche o simple curioso: escríbenos, pasa por el kot o ven directamente a la próxima mesa de conversación.',
    pt: 'Membro, voluntário de uma noite ou só curioso: escreva para a gente, passe no kot ou venha direto à próxima roda de conversa.',
    en: 'Member, one-night volunteer or just curious: write to us, drop by the kot, or come straight to the next conversation table.',
  },
  'join.cta': { fr: 'Écris-nous', es: 'Escríbenos', pt: 'Escreva-nos', en: 'Email us' },

  // ---- Footer ----
  'footer.sub': {
    fr: 'Louvain-la-Neuve, Belgique',
    es: 'Louvain-la-Neuve, Bélgica',
    pt: 'Louvain-la-Neuve, Bélgica',
    en: 'Louvain-la-Neuve, Belgium',
  },
  'footer.team': { fr: 'L’équipe du kap', es: 'El equipo del kap', pt: 'A equipe do kap', en: 'The kap team' },
  'footer.puente': {
    fr: 'Puente cultural · contactos',
    es: 'Puente cultural · contactos',
    pt: 'Puente cultural · contatos',
    en: 'Puente cultural · contacts',
  },
  'footer.copyright': {
    fr: '© 2026 LatinoAmeriKap — hecho con cariño à LLN',
    es: '© 2026 LatinoAmeriKap — hecho con cariño en LLN',
    pt: '© 2026 LatinoAmeriKap — hecho con cariño em LLN',
    en: '© 2026 LatinoAmeriKap — hecho con cariño in LLN',
  },

  // ---- Page équipe ----
  'team.eyebrow': { fr: 'Le kap · l’équipe', es: 'Le kap · el equipo', pt: 'Le kap · a equipe', en: 'Le kap · the team' },
  'team.intro': {
    fr: 'Un kot-à-projet, c’est d’abord un comité : des étudiant·es qui vivent ensemble au kot et font tourner le projet pendant une année académique. Voici les cartes du jeu de cette année — chacune avec son rôle.',
    es: 'Un kot-à-projet es, ante todo, un comité: estudiantes que viven juntos en el kot y hacen funcionar el proyecto durante un año académico. Aquí están las cartas del juego de este año, cada una con su rol.',
    pt: 'Um kot-à-projet é, antes de tudo, um comitê: estudantes que moram juntos no kot e fazem o projeto rodar durante um ano acadêmico. Aqui estão as cartas do baralho deste ano — cada uma com seu papel.',
    en: 'A kot-à-projet is first of all a committee: students who live together at the kot and run the project for an academic year. Here is this year’s deck of cards — each with its own role.',
  },
  'team.yearsAria': {
    fr: 'Choisir l’année du comité',
    es: 'Elegir el año del comité',
    pt: 'Escolher o ano do comitê',
    en: 'Choose the committee year',
  },
  'team.pastPre': { fr: 'Comité ', es: 'Comité ', pt: 'Comitê ', en: 'Committee ' },
  'team.pastPost': {
    fr: ' — aujourd’hui alumni. Gracias por todo.',
    es: ' — hoy alumni. Gracias por todo.',
    pt: ' — hoje alumni. Gracias por todo.',
    en: ' — alumni today. Gracias por todo.',
  },
  'team.cardsAria': { fr: 'Membres du comité', es: 'Miembros del comité', pt: 'Membros do comitê', en: 'Committee members' },
  'team.portraitAlt': { fr: 'Portrait de ', es: 'Retrato de ', pt: 'Retrato de ', en: 'Portrait of ' },

  // ---- Puente cultural ----
  'puente.eyebrow': {
    fr: 'Puente cultural · contactos',
    es: 'Puente cultural · contactos',
    pt: 'Puente cultural · contatos',
    en: 'Puente cultural · contacts',
  },
  'puente.intro': {
    fr: 'Chaque membre du kap est parti de quelque part : une ville, un quartier, une histoire. Cette carte relie leurs origines à Louvain-la-Neuve — clique sur un point pour faire connaissance et prendre contact.',
    es: 'Cada miembro del kap salió de algún lugar: una ciudad, un barrio, una historia. Este mapa conecta sus orígenes con Louvain-la-Neuve — haz clic en un punto para conocerle y ponerte en contacto.',
    pt: 'Cada membro do kap partiu de algum lugar: uma cidade, um bairro, uma história. Este mapa liga suas origens a Louvain-la-Neuve — clique em um ponto para conhecer a pessoa e entrar em contato.',
    en: 'Every kap member started somewhere: a city, a neighbourhood, a story. This map links their origins to Louvain-la-Neuve — click a dot to meet them and get in touch.',
  },
  'puente.filterAll': { fr: 'Todo el mundo', es: 'Todo el mundo', pt: 'Todo o mundo', en: 'The whole world' },
  'puente.filterActuel': { fr: 'Team actuelle', es: 'Team actual', pt: 'Team atual', en: 'Current team' },
  'puente.filterAlumni': { fr: 'Alumni', es: 'Alumni', pt: 'Alumni', en: 'Alumni' },
  'puente.filtersAria': { fr: 'Filtrer les contacts', es: 'Filtrar los contactos', pt: 'Filtrar os contatos', en: 'Filter contacts' },
  'puente.mapAria': {
    fr: 'Carte des villes d’origine des membres, reliées à Louvain-la-Neuve',
    es: 'Mapa de las ciudades de origen de los miembros, conectadas con Louvain-la-Neuve',
    pt: 'Mapa das cidades de origem dos membros, ligadas a Louvain-la-Neuve',
    en: 'Map of members’ home cities, linked to Louvain-la-Neuve',
  },
  'puente.chipTeam': { fr: 'Team ', es: 'Team ', pt: 'Team ', en: 'Team ' },
  'puente.emptyCopy': {
    fr: 'Choisis un point sur la carte ou un nom dans la guía — la fiche de contact apparaîtra ici.',
    es: 'Elige un punto en el mapa o un nombre en la guía: la ficha de contacto aparecerá aquí.',
    pt: 'Escolha um ponto no mapa ou um nome na guía — a ficha de contato aparecerá aqui.',
    en: 'Pick a dot on the map or a name in the guía — the contact card will appear here.',
  },
  'puente.guiaTitle': {
    fr: 'Les mêmes, en liste',
    es: 'Los mismos, en lista',
    pt: 'Os mesmos, em lista',
    en: 'Same people, as a list',
  },
  'puente.guiaAria': {
    fr: 'Tous les contacts, en liste',
    es: 'Todos los contactos, en lista',
    pt: 'Todos os contatos, em lista',
    en: 'All contacts, as a list',
  },
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lak-lang')
      if (LANGS.some((l) => l.id === saved)) return saved
    } catch { /* stockage indisponible : on reste en français */ }
    return 'fr'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lak-lang', lang)
    } catch { /* idem */ }
  }, [lang])

  const value = useMemo(() => {
    const t = (key) => STRINGS[key]?.[lang] ?? STRINGS[key]?.fr ?? key
    const tr = (field) => {
      if (field == null) return ''
      if (typeof field === 'string') return field
      return field[lang] ?? field.fr ?? Object.values(field)[0] ?? ''
    }
    return { lang, setLang, t, tr }
  }, [lang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
