# Passe de cohérence visuelle — kOA Initiative

Base visée : `znapshot_HomePage_11170931.zip`

## Objectif

Rendre l’interface plus cohérente avec la couleur de marque `#1E6864` et réduire les disparités visuelles sans refondre le contenu.

## Corrections incluses

- suppression de la dominante bleue/cyan sur les pages rendues dans `site-shell`
- harmonisation des teintes de fond, bordures et panneaux
- unification de la typographie : sans-serif pour l’interface, serif pour les titres
- amélioration du shell global et du footer
- cartes et sections réutilisables rendues plus homogènes
- réinjection du logo officiel `public/koa-mark.svg`

## Fichiers modifiés

- `app/globals.css`
- `app/layout.tsx`
- `components/Card.tsx`
- `components/PageSection.js`
- `public/koa-mark.svg`

## Installation

Décompresser cet overlay à la racine du dépôt Next.js, en acceptant l’écrasement des fichiers.
