# Ajustement typographique kOA — 17 novembre 2026

**Base requise :** site Next.js avec l'overlay `initkoa-correctif-contraste-brand-overlay.zip` déjà appliqué. Cet overlay contient une version complète de `app/globals.css` construite à partir de cette base.

## Installation

Extraire ce ZIP à la **racine du repo HomePage** (là où se trouve `package.json`), en remplaçant `app/globals.css`. L'autre fichier est cette notice.

## Changements ciblés

- Titres des sections d'accueil : maximum 44 px au lieu d'environ 54 px.
- Titre principal de l'accueil : maximum 76 px au lieu d'environ 102 px.
- Paragraphe de la présentation originale : 16–17 px plutôt que 18 px.
- Navigation : 14 px, espaces verticaux plus modérés.
- Titre de `/connections` : maximum 48 px au lieu de 67 px.
- Typographies, boutons, palettes et logo officiel inchangés.

## Vérification

```powershell
cd C:\mycode\HomePage\HomePage
npm run build
npm run dev
```

Vérifier les pages `/`, `/#capabilities` et `/connections` sur ordinateur et mobile. Les changements sont localisés au CSS, mais doivent être confirmés visuellement sur Vercel après déploiement.
