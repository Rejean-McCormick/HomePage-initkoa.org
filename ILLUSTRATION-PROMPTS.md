# Illustrations for the kOA homepage

Attach the supplied “King Klown unveils the kOA knowledge exchange” reference to each prompt. Once the crystal engraving is approved, use it as a second reference for the other two engravings. The page supplies its own text and controls.

## King Klown and the Kristal · hero.webp

Paint a horizontal editorial illustration at 1880 × 1132. Match King Klown’s profile, small gold crown, black-and-white hair, theatrical makeup and constellation-embroidered velvet coat in the reference. Place him on the left facing right. His gaze and open hand lead to a single emerald Kristal suspended in a brass astrolabe. Three facets reflect a library, a garden and a public square. A softly lit city recedes behind him. Keep the crown, face, hand and brass rings fully in frame with an 8% margin. Deep petrol green (#062f30) at the left and upper edges, warm ivory light, fine engraved grain. The hand and crystal should read clearly on a phone. Artwork only, free of lettering, borders, logos and interface elements.

## The crystal · kristal.webp

Create a vertical natural-history engraving at 600 × 700. One translucent emerald crystal rises at a slight angle from a rock base beside two small points. A clear facet reveals its inner layers. Use fine dark green crosshatching, a restrained emerald wash and flat ivory paper (#f7efdf). Centre the specimen with 12% breathing room. Keep its silhouette legible at thumbnail size. No captions, numbers, frame or watermark.

## Learning together · transmission.webp

Create a horizontal engraving at 900 × 705. Two gardeners place cuttings from the same plant side by side. One cutting rooted in water, the other in soil. Each gardener holds a specimen at the same height. Both look closely at the different roots. Frame them from the waist up. Use the same dark green line, restrained leaf-green wash and ivory paper as the crystal print. Allow 12% margin. No lettering, border or logo.

## A shared decision · decision.webp

Create a horizontal engraving at 830 × 670. A single brass balance seen from the front holds a sapling in one pan and a small bunch of root vegetables in the other. Keep the pans at comparable heights and the silhouette readable as a thumbnail. Match the other engravings with dark green ink, light hatching, muted ochre and emerald on flat ivory paper (#f7efdf). Centre the subject with 12% margin. No lettering, numbers, diagram labels, border or watermark.

## Integration

Export the four images as sRGB WebP files in public/atelier/. The current page displays crops from the supplied reference. Once the four standalone illustrations are ready, append the following rules to app/atelier.css. Check the hero at 360 px and update its accessible description if the composition changes.

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
