# Mise à jour ciblée — identité en-tête + logos par thème

**Base exacte :** `znapshot_HomePage_11171444.zip` (site principal Next.js).

Ce ZIP est un **overlay à extraire tel quel à la racine du dépôt**, où se trouve `package.json`.

## Modifications

- Restauration du lettrage original `The kOA` / `INITIATIVE` à partir du composant `Header.tsx` du snapshot `11151935` : graisse 700, 18 px pour la première ligne ; 12 px, graisse 500 et capitales espacées pour la seconde.
- Respect du **logo officiel fourni** (`logo_k(2).svg`) : même tracé géométrique, sans redessin.
- Thème **Light** : logo original vert `#1E6864` (`public/koa-mark.svg`).
- Thème **Dark** : même dessin blanc `#FFFFFF` (`public/koa-mark-dark.svg`).
- Thème **Neon** : même dessin menthe lumineuse `#7AFFD8` (`public/koa-mark-neon.svg`) + légère lueur CSS.
- Suppression de l'ancien fond blanc ajouté derrière le logo en mode Dark/Neon.
- Navigation, recherche, sélecteur de thème, liens, pages et contenus inchangés.

## Fichiers superposés

- `components/Header.tsx`
- `app/globals.css`
- `public/koa-mark.svg`
- `public/koa-mark-dark.svg`
- `public/koa-mark-neon.svg`

## Installation sous PowerShell

Fais une sauvegarde de tes modifications locales, puis extrais **le contenu** du ZIP dans `C:\mycode\HomePage\HomePage` en remplaçant les fichiers indiqués.

```powershell
cd C:\mycode\HomePage\HomePage
npm run build
npm run dev
```

Teste les trois thèmes sur `http://localhost:3000` et sur mobile. Le thème choisi est conservé par le mécanisme existant (`localStorage`).

**Note :** le SVG officiel reste l'icône/favicone par défaut du site ; les variantes s'appliquent au logo visible de l'en-tête. Les styles des autres pages ne sont pas modifiés.
