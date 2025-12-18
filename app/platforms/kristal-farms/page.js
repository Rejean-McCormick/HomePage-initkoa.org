// app\platforms\kristal-farms\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Kristal Farms – Infrastructure IA verte & encyclopédie ouverte',
  description:
    'Centres de données neutres en carbone et bibliothèque mondiale de Kristaux de savoir.',
};

export default function KristalFarmsPage() {
  return (
    <PageSection>
      <h1>Kristal Farms</h1>

      <p>
        Kristal Farms conjugue deux dimensions complémentaires : des fermes de
        calcul intensif alimentées à 100 % par hydroélectricité, et une
        encyclopédie ouverte constituée de « Kristaux », unités structurées de
        connaissance générées et enrichies par l’IA et la communauté.
      </p>

      <h2>Infrastructure technologique</h2>
      <ul>
        <li>
          <strong>Modules conteneurisés</strong> installés au pied de barrages
          nord‑américains : accès direct à l’énergie et refroidissement naturel.
        </li>
        <li>
          <strong>Neutralité carbone</strong> — aucun recours aux énergies
          fossiles ; chaleur récupérée pour chauffer serres agricoles locales.
        </li>
        <li>
          <strong>Souveraineté numérique</strong> — colocation « black box » :
          seul le client détient la clé de déchiffrement de ses données.
        </li>
      </ul>

      <h2>Les Kristaux</h2>
      <p>
        Chaque Kristal est un « livre d’instructions » auto‑contenu : définitions
        normalisées, références, procédure de mise en œuvre et métadonnées
        d’audit. Ces blocs facilitent l’échange de connaissances, la formation
        et la réutilisation directe dans les projets d’innovation.
      </p>

      <h2>Gouvernance et partenariats</h2>
      <ul>
        <li>
          <strong>Hydro‑Québec &amp; BC Hydro</strong> pour l’énergie renouvelable
          et la maintenance des sites.
        </li>
        <li>
          <strong>Communautés autochtones</strong> co‑propriétaires des centres ;
          revenus réinvestis localement selon leurs priorités.
        </li>
        <li>
          <strong>Fournisseurs technologiques</strong> : Schneider, HPE, NVIDIA,
          AMD, etc., pour le matériel haute performance.
        </li>
        <li>
          <strong>Gouvernance ouverte</strong> via la plateforme&nbsp;Konnaxion :
          décisions prises collectivement avec l’ensemble des parties prenantes.
        </li>
      </ul>

      <h2>Impact sociétal</h2>
      <p>
        Kristal Farms réduit l’empreinte écologique du numérique, crée des
        emplois qualifiés en régions isolées et met gratuitement à disposition
        une bibliothèque universelle de savoirs structurés. La capacité de
        calcul verte ainsi générée alimente l’ensemble des projets d’IA du
        Mouvement&nbsp;KOA.
      </p>
    </PageSection>
  );
}
