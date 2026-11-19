import SiteLink from "@/components/SiteLink";
import "./atelier.css";

const title = "kOA — Nos savoirs en commun";
const description = "Avec kOA, des observations, des expériences et des points de vue se cristallisent autour d’une question commune.";

export const metadata = {
  title, description, alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", locale: "fr_CA", type: "website" },
};

export default function HomePage() {
  return (
    <main lang="fr" className="koa-home atelier not-prose">
      <section className="atelier-hero" aria-labelledby="home-title">
        <div className="atelier-intro">
          <p className="atelier-signature">Une création de King Klown</p>
          <h1 id="home-title">Nos savoirs <em>en commun.</em></h1>
          <p className="atelier-lead">kOA est une infrastructure où des savoirs se cristallisent autour d’une question commune. Chaque Kristal garde la trace de ce qui se rejoint, de ce qui diverge et des sources de chacun.</p>
          <div className="atelier-actions">
            <SiteLink className="atelier-primary" href="/technology/kristal">Comprendre les Kristals <span aria-hidden="true">→</span></SiteLink>
            <a href="#exemple">Suivre un exemple <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="atelier-scene" role="img" aria-label="King Klown, couronné, présente un cristal suspendu dans un astrolabe au-dessus d’une cité." />
      </section>

      <section id="capabilities" className="atelier-paper" aria-labelledby="parcours-title">
        <div className="atelier-wrap">
          <h2 id="parcours-title">Par où veux-tu commencer&nbsp;?</h2>
          <div className="atelier-paths">
            <SiteLink href="/technology/kristal" className="atelier-card" id="understand">
              <span className="atelier-print art-kristal" aria-hidden="true" />
              <h3>D’où vient cette idée&nbsp;?</h3>
              <p>Dans un Kristal, une idée reste liée à ses sources, aux corrections qu’elle a reçues et aux questions qu’elle soulève encore.</p>
              <span className="atelier-link">Explorer le modèle Kristal <b aria-hidden="true">↗</b></span>
            </SiteLink>
            <SiteLink href="/learning-and-culture#learning" className="atelier-card" id="learn">
              <span className="atelier-print art-people" aria-hidden="true" />
              <h3>Qu’apprend-on en pratiquant ensemble&nbsp;?</h3>
              <p>Deux personnes connaissent deux façons de faire. En les essayant côte à côte, elles découvrent ce que chacune permet.</p>
              <span className="atelier-link">Découvrir les parcours d’apprentissage <b aria-hidden="true">↗</b></span>
            </SiteLink>
            <SiteLink href="/ecosystem/functional-chains/FC-07" className="atelier-card" id="choose">
              <span className="atelier-print art-vote" aria-hidden="true" />
              <h3>Comment décider ensemble&nbsp;?</h3>
              <p>Le parcours de décision montre comment un groupe compare ses options et documente les raisons de son choix.</p>
              <span className="atelier-link">Lire le parcours de décision <b aria-hidden="true">↗</b></span>
            </SiteLink>
          </div>
        </div>
      </section>

      <section id="exemple" className="atelier-case" aria-labelledby="case-title">
        <div className="atelier-wrap atelier-columns">
          <div>
            <p className="atelier-signature">Un scénario illustratif</p>
            <h2 id="case-title">Que planter dans le jardin du quartier&nbsp;?</h2>
            <p>Au printemps, des voisins hésitent entre un verger et un potager. L’une connaît le terrain depuis vingt ans. Un autre vient d’y passer son premier hiver. Que voient-ils quand ils mettent leurs observations en commun ?</p>
            <SiteLink className="atelier-case-link" href="https://koaliscenariomosaic.netlify.app/">Explorer d’autres scénarios <span aria-hidden="true">↗</span></SiteLink>
          </div>
          <ol className="atelier-steps">
            <li><h3>Rassembler les observations</h3><p>Une voisine note les heures d’ombre. Un jardinier apporte ses relevés de sol. Chaque observation garde sa date et sa source.</p></li>
            <li><h3>Faire apparaître une option</h3><p>En superposant les relevés et les souvenirs de crue, le groupe repère une bande de terre ensoleillée qui reste sèche au printemps. Il propose d’y essayer un potager.</p></li>
            <li><h3>Cristalliser ce qui se dégage</h3><p>Le groupe rassemble la carte, les témoignages et la proposition dans un Kristal. Une question y reste ouverte : cette bande de terre restera-t-elle assez humide en août ?</p></li>
          </ol>
        </div>
      </section>

      <section className="atelier-foot" aria-label="Pour aller plus loin">
        <div className="atelier-wrap">
          <h2>Poursuivre l’exploration</h2>
          <nav aria-label="Ressources kOA">
            <SiteLink href="/initiative">L’initiative</SiteLink>
            <SiteLink href="/connections">La carte de l’écosystème</SiteLink>
            <SiteLink href="/evidence">Les preuves et les essais</SiteLink>
            <SiteLink href="/reading">Lire</SiteLink>
            <SiteLink href="/play">Regarder et écouter</SiteLink>
          </nav>
          <details className="atelier-directory">
            <summary>Tous les usages de kOA</summary>
            <nav aria-label="Tous les usages">
              <SiteLink href="/technology/kristal">Retrouver une source</SiteLink>
              <SiteLink href="/learning-and-culture#learning">Apprendre et transmettre</SiteLink>
              <SiteLink id="create" href="/platforms/konnaxion">Créer à plusieurs</SiteLink>
              <SiteLink href="/ecosystem/functional-chains/FC-07">Décider ensemble</SiteLink>
              <SiteLink id="act" href="/platforms/orgo">Organiser le travail</SiteLink>
              <SiteLink id="respond" href="/ecosystem/functional-chains/FC-08">Coordonner une réponse</SiteLink>
              <SiteLink id="remember" href="/evidence">Documenter les résultats</SiteLink>
              <SiteLink id="publish" href="/learning-and-culture#publishing">Publier et diffuser</SiteLink>
            </nav>
          </details>
        </div>
      </section>
    </main>
  );
}
