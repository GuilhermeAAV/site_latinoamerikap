// ⚠️ Équipe d'exemple — remplace les membres par la vraie équipe.
//
// Chaque année académique = une entrée dans TEAM_YEARS (la plus récente en
// premier : c'est elle qui s'affiche par défaut). Pour une nouvelle année,
// copie le bloc de l'année précédente et mets à jour les membres.
//
// Un membre :
//   name    — prénom + nom
//   carta   — titre façon carte de lotería, en majuscules (LA PRESIDENTA…)
//   role    — l'intitulé du rôle : une entrée de ROLES (multilingue,
//             voir src/data/roles.js) ou une simple chaîne
//   pole    — type de rôle, détermine la couleur d'accent de la carte
//             (bureau / fiesta / cocina / comm / tables, voir POLE_ACCENTS)
//   origin  — ville ou région d'origine
//   country — clé de drapeau (voir src/components/Flags.jsx) ou null
//   photo   — import d'une vraie photo (carrée de préférence) ou null
//             → null affiche un placeholder avec les initiales

import { ROLES } from './roles.js'

// Couleur d'accent de chaque carte selon le type de rôle
// (classes `.lk-card--*` dans styles.css).
export const POLE_ACCENTS = {
  bureau: 'rojo',
  fiesta: 'fuchsia',
  cocina: 'verde',
  comm: 'purpura',
  tables: 'teal',
}

export const TEAM_YEARS = [
  {
    id: '2025-2026',
    label: '2025–2026',
    members: [
      // Bureau
      { name: 'Camila Rodríguez', carta: 'LA PRESIDENTA', role: ROLES.copresidenta, pole: 'bureau', origin: 'Bogotá', country: 'colombia', photo: null },
      { name: 'Diego Fernández', carta: 'EL PRESIDENTE', role: ROLES.copresidente, pole: 'bureau', origin: 'Mexico', country: 'mexique', photo: null },
      { name: 'Thomas Peeters', carta: 'EL TESORERO', role: ROLES.tresorier, pole: 'bureau', origin: 'Louvain-la-Neuve', country: 'belgique', photo: null },
      { name: 'Valentina Suárez', carta: 'LA SECRETARIA', role: ROLES.secretaire, pole: 'bureau', origin: 'Lima', country: 'perou', photo: null },
      // Fiesta & événements
      { name: 'Mateo Álvarez', carta: 'EL RUMBERO', role: ROLES.events, pole: 'fiesta', origin: 'Cali', country: 'colombia', photo: null },
      { name: 'Lucía Herrera', carta: 'LA RUMBERA', role: ROLES.events, pole: 'fiesta', origin: 'Buenos Aires', country: 'argentine', photo: null },
      // Cocina & bar
      { name: 'Ana Beatriz Costa', carta: 'LA COCINERA', role: ROLES.cuisine, pole: 'cocina', origin: 'São Paulo', country: 'bresil', photo: null },
      { name: 'Nicolás Vargas', carta: 'EL CANTINERO', role: ROLES.bar, pole: 'cocina', origin: 'Caracas', country: 'venezuela', photo: null },
      // Communication
      { name: 'Emma Dubois', carta: 'LA PREGONERA', role: ROLES.comm, pole: 'comm', origin: 'Namur', country: 'belgique', photo: null },
      { name: 'Santiago Rojas', carta: 'EL PINTOR', role: ROLES.graphisme, pole: 'comm', origin: 'Santiago', country: 'chili', photo: null },
      // Tables de conversation
      { name: 'Sofía Mendoza', carta: 'LA PROFE', role: ROLES.tableEs, pole: 'tables', origin: 'La Paz', country: 'bolivie', photo: null },
      { name: 'João Almeida', carta: 'O PROFESSOR', role: ROLES.rodaPt, pole: 'tables', origin: 'Rio de Janeiro', country: 'bresil', photo: null },
    ],
  },
  {
    id: '2024-2025',
    label: '2024–2025',
    members: [
      { name: 'Isabela Moreno', carta: 'LA PRESIDENTA', role: ROLES.presidenta, pole: 'bureau', origin: 'Medellín', country: 'colombia', photo: null },
      { name: 'Julien Lambert', carta: 'EL TESORERO', role: ROLES.tresorier, pole: 'bureau', origin: 'Bruxelles', country: 'belgique', photo: null },
      { name: 'Renata Oliveira', carta: 'LA SECRETARIA', role: ROLES.secretaire, pole: 'bureau', origin: 'Belo Horizonte', country: 'bresil', photo: null },
      { name: 'Andrés Quispe', carta: 'EL RUMBERO', role: ROLES.events, pole: 'fiesta', origin: 'Cusco', country: 'perou', photo: null },
      { name: 'Marina López', carta: 'LA RUMBERA', role: ROLES.events, pole: 'fiesta', origin: 'Córdoba', country: 'argentine', photo: null },
      { name: 'Gabriel Torres', carta: 'EL COCINERO', role: ROLES.cuisine, pole: 'cocina', origin: 'Guadalajara', country: 'mexique', photo: null },
      { name: 'Laura Vandenberg', carta: 'LA CANTINERA', role: ROLES.bar, pole: 'cocina', origin: 'Anvers', country: 'belgique', photo: null },
      { name: 'Paula Castillo', carta: 'LA PREGONERA', role: ROLES.comm, pole: 'comm', origin: 'Valparaíso', country: 'chili', photo: null },
      { name: 'Alejandro Ruiz', carta: 'EL PROFE', role: ROLES.tableEs, pole: 'tables', origin: 'Caracas', country: 'venezuela', photo: null },
      { name: 'Beatriz Santos', carta: 'A PROFESSORA', role: ROLES.rodaPt, pole: 'tables', origin: 'Salvador', country: 'bresil', photo: null },
    ],
  },
]
