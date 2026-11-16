# Refactor massif initkOA — livraison du 15 novembre 2026

## Fichiers remis

- `initkoa-code-refactor.patch` : patch Git du **code source**, compatible avec le snapshot fourni et avec les fichiers de la branche `main` du dépôt `Rejean-McCormick/HomePage-initkoa.org` comparés au 15 novembre 2026. Pas de modifications d'archives historiques ni de bruit de dates des fichiers générés.
- `SOURCE_MODIFIEE_COMPLET.zip` (livré séparément) : projet Next.js complet avec les changements appliqués et les actifs IA/Markdown déjà régénérés.
- `CHANGEMENTS.md` : audit, sources et état des validations.

## Application dans un clone Git propre

```bash
cd HomePage-initkoa.org
git status --short                 # vérifier que l'arbre est propre
git switch -c refactor/technology-catalog
git apply --check /chemin/vers/initkoa-code-refactor.patch
git apply /chemin/vers/initkoa-code-refactor.patch
npm install
npm run gen:ai                   # régénère le catalogue Markdown et les actifs IA
npm run architecture:validate
npm run context-packs:validate
npm run build
```

Le patch **supprime** les routes SwarmCraft et Voting Machine, mais garde des **redirections 301** dans `next.config.mjs` pour ne pas casser les URL historiques. La route `/principles/logos` est maintenue pour ses liens entrants, sans afficher « Logos » dans le titre public.

## Vérifications effectuées ici

- Patch testé par `git apply --check` et **appliqué avec succès** sur une copie vierge du snapshot Git.
- Transpilation/analyse syntaxique TypeScript : aucune erreur de parsing sur les composants concernés.
- `npm run architecture:validate` : **PASS** (24 chaînes, 53 rôles, 26 arêtes de conception).
- `node scripts/generate-ai-assets.mjs` : **PASS**, 163 pages prises en compte.
- `npm run context-packs:validate` : **échec préexistant** sur `power-dynamics-context-pack.txt` (« source working tree is not declared clean »). À vérifier/résoudre dans l'origine de cette documentation, sans modifier artificiellement le statut de provenance.
- Build Next.js et tests Playwright finaux **non exécutés** : l'installation des dépendances ne s'est pas terminée dans cet environnement. Ne pas traiter le patch comme une validation de déploiement.

## Traçabilité documentaire

Sources utilisées : ZIP `repos(1).zip`, README des projets (notamment `Ame-Artificielle`) et snapshot du site `znapshot_HomePage_11151935.zip`.
Le site présente un **inventaire éditorial de 52 entrées**, pas une déclaration que 52 produits sont qualifiés pour production.
Les Context Packs historiques ne sont pas réécrits automatiquement pour ne pas altérer leurs références passées, notamment les mentions archivées des projets retirés.
