// Données fixes du site — les seules qui se modifient encore dans le
// code. Le contenu courant (événements, équipe, points du puente)
// s'édite via Pages CMS : voir public/content/*.json et .pages.yml.

// Le point d'arrivée de tous les arcs du puente : le kot, à
// Louvain-la-Neuve.
export const KOT = {
  name: 'LatinoAmeriKap — Louvain-la-Neuve',
  coords: [50.6686, 4.6118],
}

// Nom des pays affiché sur la fiche, par clé de drapeau (multilingue).
// Un nouveau pays demande aussi son drapeau dans src/components/Flags.jsx
// et une entrée dans le select « pays » de .pages.yml.
export const COUNTRY_NAMES = {
  colombia: { fr: 'Colombie', es: 'Colombia', pt: 'Colômbia', en: 'Colombia' },
  mexique: { fr: 'Mexique', es: 'México', pt: 'México', en: 'Mexico' },
  argentine: { fr: 'Argentine', es: 'Argentina', pt: 'Argentina', en: 'Argentina' },
  bresil: { fr: 'Brésil', es: 'Brasil', pt: 'Brasil', en: 'Brazil' },
  perou: { fr: 'Pérou', es: 'Perú', pt: 'Peru', en: 'Peru' },
  venezuela: { fr: 'Venezuela', es: 'Venezuela', pt: 'Venezuela', en: 'Venezuela' },
  bolivie: { fr: 'Bolivie', es: 'Bolivia', pt: 'Bolívia', en: 'Bolivia' },
  chili: { fr: 'Chili', es: 'Chile', pt: 'Chile', en: 'Chile' },
  belgique: { fr: 'Belgique', es: 'Bélgica', pt: 'Bélgica', en: 'Belgium' },
}
