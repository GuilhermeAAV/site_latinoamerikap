import { EVENT_PLACEHOLDER } from './placeholders.js'

// Accents rotate fuchsia / verde / purpura (see styles.css `.accent-*`).
// Swap `imgSrc` for a real photo import when available (~3:2, shown 160px tall).
//
// Les champs { fr, es, pt, en } sont affichés via tr() (voir src/i18n.jsx) :
// une simple chaîne marche aussi, le français sert de repli.
export const EVENTS = [
  {
    id: 'carnaval',
    date: { fr: 'Jeu 24 sept · 21h', es: 'Jue 24 sept · 21h', pt: 'Qui 24 set · 21h', en: 'Thu Sep 24 · 9 pm' },
    title: 'Carnaval Latino',
    place: 'Salle La Boulite · LLN',
    desc: {
      fr: 'La grande soirée d’ouverture du quadri : salsa, reggaetón, cumbia et déguisements bienvenus.',
      es: 'La gran noche de apertura del cuatri: salsa, reggaetón, cumbia y disfraces bienvenidos.',
      pt: 'A grande noite de abertura do quadrimestre: salsa, reggaeton, cumbia e fantasias bem-vindas.',
      en: 'The big opening party of the term: salsa, reggaetón, cumbia — costumes welcome.',
    },
    accent: 'fuchsia',
    imgSrc: EVENT_PLACEHOLDER,
    imgAlt: {
      fr: 'Affiche du Carnaval Latino',
      es: 'Afiche del Carnaval Latino',
      pt: 'Cartaz do Carnaval Latino',
      en: 'Carnaval Latino poster',
    },
  },
  {
    id: 'cocina',
    date: { fr: 'Mar 6 oct · 19h', es: 'Mar 6 oct · 19h', pt: 'Ter 6 out · 19h', en: 'Tue Oct 6 · 7 pm' },
    title: { fr: 'Soirée Cocina', es: 'Noche Cocina', pt: 'Noite Cocina', en: 'Cocina Night' },
    place: 'Kot LatinoAmeriKap',
    desc: {
      fr: 'On cuisine ensemble arepas, empanadas et guacamole — puis on mange tout, claro.',
      es: 'Cocinamos juntos arepas, empanadas y guacamole — y luego nos lo comemos todo, claro.',
      pt: 'Cozinhamos juntos arepas, empanadas e guacamole — e depois comemos tudo, claro.',
      en: 'We cook arepas, empanadas and guacamole together — then eat it all, claro.',
    },
    accent: 'verde',
    imgSrc: EVENT_PLACEHOLDER,
    imgAlt: {
      fr: 'Photo d’une soirée Cocina au kot',
      es: 'Foto de una Noche Cocina en el kot',
      pt: 'Foto de uma Noite Cocina no kot',
      en: 'Photo of a Cocina Night at the kot',
    },
  },
  {
    id: 'cine',
    date: { fr: 'Mer 14 oct · 20h', es: 'Mié 14 oct · 20h', pt: 'Qua 14 out · 20h', en: 'Wed Oct 14 · 8 pm' },
    title: { fr: 'Ciné-club latino', es: 'Cineclub latino', pt: 'Cineclube latino', en: 'Latino film club' },
    place: 'Studio 12 · Place des Sciences',
    desc: {
      fr: 'Projection d’un classique du cinéma mexicain, sous-titré, suivie d’un débat (et de churros).',
      es: 'Proyección de un clásico del cine mexicano, subtitulado, seguida de un debate (y de churros).',
      pt: 'Exibição de um clássico do cinema mexicano, legendado, seguida de um debate (e de churros).',
      en: 'Screening of a Mexican film classic, subtitled, followed by a debate (and churros).',
    },
    accent: 'purpura',
    imgSrc: EVENT_PLACEHOLDER,
    imgAlt: {
      fr: 'Affiche du film du ciné-club latino',
      es: 'Afiche de la película del cineclub',
      pt: 'Cartaz do filme do cineclube',
      en: 'Film club poster',
    },
  },
]

export const TABLES = [
  {
    id: 'es',
    badge: 'ES',
    title: 'Mesa de conversación',
    schedule: {
      fr: 'Tous les lundis · 19h30',
      es: 'Todos los lunes · 19.30',
      pt: 'Toda segunda · 19h30',
      en: 'Mondays · 7:30 pm',
    },
    desc: {
      fr: 'Au kot, autour d’un maté ou d’une agua de jamaica. Thème différent chaque semaine.',
      es: 'En el kot, alrededor de un mate o de un agua de jamaica. Tema diferente cada semana.',
      pt: 'No kot, em volta de um mate ou de uma água de jamaica. Tema diferente a cada semana.',
      en: 'At the kot, over a mate or an agua de jamaica. A different theme every week.',
    },
  },
  {
    id: 'pt',
    badge: 'PT',
    title: 'Roda de conversa',
    schedule: {
      fr: 'Tous les mercredis · 19h30',
      es: 'Todos los miércoles · 19.30',
      pt: 'Toda quarta · 19h30',
      en: 'Wednesdays · 7:30 pm',
    },
    desc: {
      fr: 'Portugais du Brésil et du Portugal, musique et cafezinho compris. Sem estresse.',
      es: 'Portugués de Brasil y de Portugal, con música y cafezinho incluidos. Sem estresse.',
      pt: 'Português do Brasil e de Portugal, com música e cafezinho incluídos. Sem estresse.',
      en: 'Portuguese from Brazil and Portugal, music and cafezinho included. Sem estresse.',
    },
  },
]
