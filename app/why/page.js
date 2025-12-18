// app\why\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Pourquoi KOA ?',
  description:
    'Approche systémique pour relever les crises climatiques, sociales et technologiques.'
};

export default function WhyKoaPage() {
  return (
    <PageSection>
      <h1>Pourquoi KOA ?</h1>

      <p>
        KOA naît d’un constat : les crises sont systémiques et imbriquées. La
        réponse doit donc être holistique — réunir technologie ouverte,
        intelligence collective et infrastructures vertes.
      </p>

      <h2>Piliers stratégiques</h2>
      <ul>
        <li>Konnaxion – partage et validation de la connaissance mondiale</li>
        <li>Kristal Farms – puissance de calcul durable et savoir libre</li>
        <li>Orgo – gouvernance agile, basée sur les rôles</li>
        <li>Ekoh – vote pondéré par compétence et éthique</li>
      </ul>

      <h2>Positionnement politique</h2>
      <p>
        KOA n’est pas un parti satirique ; c’est une offre de gouvernance prête
        à être entérinée par le suffrage universel. Notre objectif est
        d’appliquer ces solutions directement depuis les institutions, une fois
        la majorité démocratique obtenue.
      </p>
    </PageSection>
  );
}
