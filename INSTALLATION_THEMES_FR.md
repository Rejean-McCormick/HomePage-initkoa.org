# Thèmes Light / Dark / Neon — kOA Initiative

Base de mise à jour : `znapshot_HomePage_11170931.zip` + correctif de contraste + correctif typographique déjà appliqués.

## Installation sur Windows

Extraire **le contenu de cet overlay**, avec les dossiers `app/` et `components/`, à la racine du dépôt Next.js contenant `package.json`. Sauvegarder les fichiers remplacés. Ne pas extraire l'overlay dans un sous-dossier.

```powershell
cd C:\mycode\HomePage\HomePage
npm run build
npm run dev
```

Visiter `http://localhost:3000`. Dans l'en-tête, choisir **Light**, **Dark** ou **Neon**. Le choix est conservé dans le stockage local du navigateur (`koa-theme`) ; par défaut, Light utilise un fond blanc neutre `#FAFBFA`.

## Modifications

- `app/globals.css` : palettes et styles contextuels des trois modes, sans surcharger globalement les couleurs des liens/boutons.
- `app/layout.tsx` : fonds dynamiques et préchargement du thème préféré avant l'affichage (dans le respect de la CSP actuelle).
- `components/Header.tsx` : sélecteur de thème accessible et mémorisation locale.
- `components/Card.tsx`, `components/PageSection.js` : couleurs basées sur les variables de thème.

Le logo officiel **n'est pas remplacé**. Aucun fichier de marque, contenu ou configuration de déploiement n'est modifié.

## Contrôles

- Syntaxe CSS et TSX vérifiée localement.
- Contraste des couleurs principales : texte blanc sur `#1E6864` = 6,52:1 ; textes sur fonds Light/Dark/Neon >= 14:1.
- Le build Next.js et les captures de toutes les pages n'ont pas été exécutés ici : tester localement les pages `/, /initiative, /ecosystem, /connections` en bureau/mobile avant déploiement Vercel.

Pour revenir au thème Light, choisir « Light » dans le sélecteur. Pour annuler complètement la fonctionnalité, restaurer les cinq fichiers précédents.
