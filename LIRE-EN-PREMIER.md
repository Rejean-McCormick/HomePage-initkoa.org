# Overlay minimal — Kompendio mobile (17 novembre 2026)

Base : snapshot `11170931` + les overlays contrastes déjà appliqués.

**Deux fichiers à superposer** :
- `app/platforms/konnaxion/ethikos/kompendio/page.mdx`
- `public/platforms/konnaxion/ethikos/kompendio/index.html.md`

Correction : chemins internes trop longs remplacés par des liens à libellés courts pour éviter le débordement horizontal mobile de 71 px observé dans le dernier audit.

Aucun changement de couleur, de CSS, de logo, de navigation ou de JavaScript. Ne réapplique pas les anciens overlays visuels.

Après superposition : `npm run build` (régénère automatiquement les miroirs). Le test visuel final reste à faire localement.
