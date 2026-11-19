# Les illustrations de l’accueil kOA

Quatre images maîtresses. Joindre la maquette fournie « King Klown unveils the kOA knowledge exchange » à chaque génération. Pour les trois gravures, joindre aussi la première gravure approuvée afin de retrouver son trait et sa densité. Les textes et les commandes sont déjà présents en HTML.

## 1. King Klown présente le Kristal · hero.webp

> Peins une illustration horizontale de 1880 × 1132, destinée à la moitié droite d’une couverture éditoriale. Reprends le King Klown de la référence : profil tourné vers la droite, petite couronne d’or, cheveux noirs et blancs, maquillage théâtral, manteau de velours noir brodé de fines constellations. Dans le tiers gauche, son regard mène à sa main ouverte, puis à un unique cristal émeraude translucide suspendu dans un astrolabe de laiton, dans le tiers supérieur droit. Garde la tête, la couronne, la main et l’astrolabe entiers avec 8 % de marge. Dans la pierre, trois facettes distinctes reflètent la bibliothèque, le jardin et la place publique de la cité. Dans le fond, une cité de terrasses et de bibliothèques habitées, fin d’après-midi, architecture précise mais de contraste doux. Le cristal est le point le plus lumineux. Bord gauche et haut du ciel vert pétrole profond #062f30 pour se fondre dans la page. Gravure peinte, lumière ivoire, laiton patiné, grain fin. Image seule, sans caractères, lettrage, cadre, interface, logo, ni filigrane.

**À vérifier** à 360 px de large : le geste et la direction du regard se lisent encore. Le même cadrage s’affiche sous le texte sur téléphone.

## 2. D’où vient cette idée ? · kristal.webp

> Crée une planche naturaliste verticale de 600 × 700. Un cristal d’émeraude principal, facetté et légèrement incliné, naît d’un socle de roche avec deux petites pointes. Une facette transparente laisse voir les strates internes. Silhouette reconnaissable à la taille d’un timbre. Gravure au burin, hachures espacées à l’encre vert-noir, léger lavis émeraude, fond ivoire uni #f7efdf. Motif centré avec 12 % de respiration, ombre gravée courte sous le socle. Même vocabulaire graphique que les petites gravures de la référence. Image seule, sans légende, caractères, numéros, cadre, logo ni filigrane.

## 3. Apprendre ensemble · transmission.webp

> Crée une vignette gravée horizontale de 900 × 705. Deux jardiniers posent côte à côte deux boutures issues de la même plante, l’une enracinée dans l’eau, l’autre dans la terre. Chacun tient son échantillon à la même hauteur ; leurs regards se rejoignent sur les racines. Composition à mi-corps, silhouettes dégagées, visages expressifs. Burin fin, hachures d’encre vert-noir, touches émeraude sur les feuilles, papier ivoire uni #f7efdf. Même échelle de trait que la gravure du cristal. Laisse 12 % de marge. Aucun texte, symbole typographique, cadre, logo ou filigrane.

## 4. Décider ensemble · decision.webp

> Crée une vignette gravée horizontale de 830 × 670. Une seule balance de laiton, vue de face. Dans le plateau gauche, une jeune pousse d’arbre ; dans le droit, un petit bouquet de légumes-racines. Plateaux à hauteur comparable. Silhouette claire sur papier ivoire uni #f7efdf ; dessin au burin vert-noir, hachures légères et touches de vert sourd et d’ocre. Composition centrée avec 12 % de marge, lisible en miniature. Même série éditoriale que le cristal et les jardiniers. Image seule, sans texte, chiffres, diagramme, encadrement, logo ni filigrane.

## Intégration

Exporter les quatre fichiers en WebP sRGB dans `public/atelier/`. Viser 300 ko pour la scène et 60 ko par vignette, puis contrôler le rendu du visage et des hachures. Les styles actuels cadrent la planche de référence. Une fois les quatre images livrées, ajouter ces règles à la fin de `app/atelier.css` :

```css
.atelier-scene {
  --hero-image: url('/atelier/hero.webp');
  --hero-size: cover;
  --hero-position: center;
}
.art-kristal { --print-image: url('/atelier/kristal.webp'); }
.art-people { --print-image: url('/atelier/transmission.webp'); }
.art-vote { --print-image: url('/atelier/decision.webp'); }
.atelier-print { background-size: contain; background-position: center; background-repeat: no-repeat; }
```

Les vignettes accompagnent des liens dont le titre donne déjà le sens. La scène principale possède une description accessible dans `app/page.tsx` ; l’ajuster si la composition finale change.
