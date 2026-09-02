# Modifier le site sans toucher au code

Les événements, les tables de conversation, l'équipe (avec les photos) et
les points de la carte du Puente cultural s'éditent en ligne, par
formulaire, sur **[app.pagescms.org](https://app.pagescms.org)**. Aucune
connaissance technique nécessaire.

Chaque « Enregistrer » est en ligne sur le site en **~5 minutes**, sans
rien redéployer. Et tout est historisé : en cas d'erreur, on peut
toujours revenir en arrière (demande à la personne qui gère le repo
GitHub).

## Première mise en place (une seule fois, par le/la responsable)

1. Va sur [app.pagescms.org](https://app.pagescms.org) et connecte-toi
   **avec le compte GitHub** qui a accès au repo
   `GuilhermeAAV/site_latinoamerikap`.
2. Autorise l'application GitHub de Pages CMS sur ce repo quand c'est
   proposé.
3. Ouvre le repo dans Pages CMS : les sections **Événements**, **Tables
   de conversation**, **Équipe** et **Puente cultural** apparaissent
   (elles sont définies dans le fichier `.pages.yml`).

## Inviter le comité (pas besoin de compte GitHub)

Dans Pages CMS, ouvre les réglages du repo → **Collaborators** → invite
chaque membre **par son adresse e-mail**. La personne reçoit une
invitation et se connecte ensuite avec son e-mail — elle ne verra jamais
GitHub. En fin de mandat, supprime simplement son invitation.

## Ce que chaque section permet

### Événements
Les cartes de la page d'accueil, dans l'ordre d'affichage. Pour chaque
événement : titre, date (texte libre, ex. « Jeu 24 sept · 21h »), lieu,
description, et **l'affiche en glisser-déposer** (format paysage ~3:2 de
préférence). Les couleurs des cartes alternent toutes seules.

### Tables de conversation
Le badge (ES, PT…), le titre, l'horaire et la description de chaque table.

### Équipe
La **photo de groupe** de la page d'accueil, puis la liste des membres :
nom, année académique, carte de lotería (LA PRESIDENTA…), rôle, pôle
(qui donne la couleur de la carte), ville, pays et photo. Le site groupe
automatiquement par année, la plus récente d'abord — pour un nouveau
comité, il suffit d'ajouter les membres avec la nouvelle année (ex.
« 2026–2027 », écrite exactement pareil pour tout le monde).

### Puente cultural
Un point sur la carte par personne, avec sa fiche (rôle, bio, contacts,
photo). Pour placer le point : **clic droit sur sa ville dans Google
Maps** → les deux nombres en haut du menu sont la **latitude** puis la
**longitude**, à recopier dans les deux champs du formulaire.

## Les langues

Les champs de texte existent en FR / ES / PT / EN. Seul le **français
est obligatoire** : une langue laissée vide affiche le français à la
place. Traduis quand tu peux, mais rien ne casse si tu ne le fais pas.

## Ce qui demande encore de passer par le code

- Ajouter un **pays** qui n'est pas dans la liste (il faut dessiner son
  drapeau dans `src/components/Flags.jsx`, le déclarer dans
  `src/data/site.js` et l'ajouter au select de `.pages.yml`).
- Les **textes fixes** du site (titres de sections, menu, page
  « rejoindre »…) : ils vivent dans `src/i18n.jsx`.
- Le design, la mise en page, la position du kot sur la carte.
