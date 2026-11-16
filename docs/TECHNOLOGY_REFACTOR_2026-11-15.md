# Refactor Technology — 15 novembre 2026

## Fondement

- Source principale du répertoire : `repos(1).zip`, README de `Rejean-McCormick` (« kOA Ecosystem Map ») et README spécifiques des projets. Le répertoire web est une **sélection éditoriale**, pas la liste exhaustive des dépôts ou une preuve de qualification en production.
- Source du modèle EL : `Rejean-McCormick/Ame-Artificielle`, README `main`, vérifié le 15 novembre 2026. EL = graphe psycho-causal et réactions calculées. Les règles de sécurité sont une couche externe.
- Les liens internes sont réservés aux pages existantes ; les autres projets conduisent à leur dépôt documenté.

## Modifications

1. `/technology` : nouveau portail responsive, six catégories, catalogue consultable et recherche côté client.
2. `/technology/ame-artificielle` : architecture EL et distinction entre modèle, affects calculés, sécurité et hypothèses symboliques.
3. `/principles/logos` : titre public « Language & Myth », épisode de Moïse à la place de David ; URL historique conservée pour les liens entrants.
4. Retrait des pages `/technology/swarmcraft/**`, `/technology/voting-machine/**`, `/kreature/anatomie/memoire/swarmcraft` avec redirection permanente des anciennes URLs.
5. Mise à jour des liens et textes de Kréature, du menu et de l’aperçu Initiatives.
6. Le catalogue inclut des applications de création, d’éducation, de recherche et des infrastructures, sans fusionner leurs compétences.

## Vérifications effectuées

- Transpilation TypeScript des sources `app/`, `components/` et `lib/` : aucune erreur syntaxique signalée.
- `npm run architecture:validate` : **PASS** (24 chaînes).
- `node scripts/generate-ai-assets.mjs` : **PASS** (163 pages et actifs de découverte régénérés).
- `npm run context-packs:validate` : **ECHEC sur un invariant déjà présent dans le snapshot initial** : `power-dynamics-context-pack.txt: source working tree is not declared clean`. Le contrôle signale un état de provenance, qui ne doit pas être falsifié.
- L’installation des dépendances a expiré dans l’environnement de préparation ; le build complet Next.js et les captures Playwright n’ont pas été exécutés.

## Vérifications recommandées après application

- `npx tsc --noEmit`
- `npm run architecture:validate`
- `npm run context-packs:validate`
- `npm run build` (régénère les miroirs `/public`, `md-sitemap.xml`, `md-manifest.json`, et l’index AI)
- Vérifier Playwright en desktop et mobile pour `/technology`, `/technology/ame-artificielle`, `/principles/logos` et les redirections.

## Attention aux fichiers générés

Le snapshot inclut `public/md-manifest.json`, `public/md-sitemap.xml`, plusieurs miroirs markdown et des fichiers de corpus générés. **Ne pas considérer les versions présentes dans le snapshot comme définitives** : relancer `npm run build` sur le dépôt complet pour reconstruire ces actifs à partir des routes du nouveau code et vérifier l’absence de références aux routes retirées.
