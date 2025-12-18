// app\about\surreal\page.js
import PageSection from '@/components/PageSection';
import Link from 'next/link';

export const metadata = {
  title: 'Le Surreal – Fiction catalyseuse d’action',
  description:
    'Transformer la puissance du récit en projets sociaux et politiques réalisables.'
};

export default function SurrealPage() {
  return (
    <PageSection>
      <h1>Le Surreal</h1>

      <p>
        Le Surreal transforme le récit en levier politique : un détournement
        créatif qui déverrouille l’imagination collective puis redirige l’élan
        vers des solutions réelles.
      </p>

      <h2>Méthode en trois temps</h2>
      <ol>
        <li>Observation lucide d’un problème concret</li>
        <li>
          Transposition dans une fiction frappante (spectacle, podcast, art
          numérique)
        </li>
        <li>
          Retour au réel : mobilisation, plaidoyer, lancement de projets (ex. 
          <Link href="/platforms/kristal-farms" className="text-primary">
            Kristal Farms
          </Link>
          )
        </li>
      </ol>

      <h2>Impacts attendus</h2>
      <ul>
        <li>Accroître l’adhésion populaire sans conflit frontal</li>
        <li>Faciliter l’adoption législative dès qu’une majorité est acquise</li>
        <li>Renouveler l’engagement citoyen par la créativité</li>
      </ul>
    </PageSection>
  );
}
