INITKOA — Correction Vercel context-packs:validate

Cause : power-dynamics-context-pack.txt est un snapshot d'un dossier local,
avec source_mode=directory et working_tree_markdown=not-applicable.
L'ancien validateur exigeait clean meme lorsque Git ne s'applique pas.

Correctif :
- Exige toujours clean pour les packs issus de Git.
- Autorise uniquement les snapshots de dossier explicitement allowlistes
  dans tools/context_pack_policy.json et portant les marqueurs coherents.
- Laisse le contenu original, les hashes et la provenance inchanges.

Application depuis la racine du repository HomePage-initkoa.org :

  git apply fix-context-pack-directory-provenance.patch
  npm run context-packs:validate
  npm run build
  git add scripts/validate-context-packs.mjs tools/context_pack_policy.json
  git commit -m "fix: validate explicitly approved directory context packs"
  git push

Le patch a passe git apply --check sur l'arbre de reference.
Le validateur a passe 25 packs; 3 avertissements de taille restent.
Le build Next.js complet n'a pas pu etre teste dans cet environnement
(car npm install n'a pas abouti).
