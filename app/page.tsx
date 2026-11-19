import SiteLink from "@/components/SiteLink";
import "./atelier.css";

const title = "kOA — Knowledge in Common";
const description = "kOA is an infrastructure where observations, experience and different perspectives crystallize around a shared question.";

export const metadata = {
  title, description, alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", locale: "en_CA", type: "website" },
};

export default function HomePage() {
  return (
    <main lang="en" className="koa-home atelier not-prose">
      <section className="atelier-hero" aria-labelledby="home-title">
        <div className="atelier-intro">
          <p className="atelier-signature">A creation by King Klown</p>
          <h1 id="home-title">Knowledge <em>in common.</em></h1>
          <p className="atelier-lead">kOA is an infrastructure where different kinds of knowledge crystallize around a shared question. Each Kristal records where people’s accounts converge, where they differ and what each draws on.</p>
          <div className="atelier-actions">
            <SiteLink className="atelier-primary" href="/technology/kristal">How Kristals work <span aria-hidden="true">→</span></SiteLink>
            <a href="#exemple">A worked example <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="atelier-scene" role="img" aria-label="King Klown holds out his hand beneath a crystal suspended in a brass astrolabe above a city." />
      </section>

      <section id="capabilities" className="atelier-paper" aria-labelledby="parcours-title">
        <div className="atelier-wrap">
          <h2 id="parcours-title">Where would you like to begin?</h2>
          <div className="atelier-paths">
            <SiteLink href="/technology/kristal" className="atelier-card" id="understand">
              <span className="atelier-print art-kristal" aria-hidden="true" />
              <h3>Where does this idea come from?</h3>
              <p>In a Kristal, an idea stays connected to its sources, the corrections made along the way and the questions still open.</p>
              <span className="atelier-link">The Kristal model <b aria-hidden="true">↗</b></span>
            </SiteLink>
            <SiteLink href="/learning-and-culture#learning" className="atelier-card" id="learn">
              <span className="atelier-print art-people" aria-hidden="true" />
              <h3>What do we learn by practising together?</h3>
              <p>Two people know different ways to do the same thing. Trying them side by side reveals what each method makes possible.</p>
              <span className="atelier-link">Learning pathways <b aria-hidden="true">↗</b></span>
            </SiteLink>
            <SiteLink href="/ecosystem/functional-chains/FC-07" className="atelier-card" id="choose">
              <span className="atelier-print art-vote" aria-hidden="true" />
              <h3>How do we decide together?</h3>
              <p>The decision workflow shows how a group compares options and records the reasons for its choice.</p>
              <span className="atelier-link">The decision workflow <b aria-hidden="true">↗</b></span>
            </SiteLink>
          </div>
        </div>
      </section>

      <section id="exemple" className="atelier-case" aria-labelledby="case-title">
        <div className="atelier-wrap atelier-columns">
          <div>
            <p className="atelier-signature">An illustrative scenario</p>
            <h2 id="case-title">What should grow in the neighbourhood garden?</h2>
            <p>In spring, neighbours are weighing an orchard against a vegetable garden. One has known the plot for twenty years. Another has just spent his first winter there. What comes into view when they put their observations together?</p>
            <SiteLink className="atelier-case-link" href="https://koaliscenariomosaic.netlify.app/">More scenarios <span aria-hidden="true">↗</span></SiteLink>
          </div>
          <ol className="atelier-steps">
            <li><h3>The observations come together</h3><p>One neighbour records the hours of shade. A gardener brings soil readings. Each observation keeps its date and source.</p></li>
            <li><h3>An option emerges</h3><p>The group overlays the readings with neighbours’ recollections of flooding. A sunny strip stays dry in spring. They propose trying a vegetable bed there.</p></li>
            <li><h3>The findings crystallize</h3><p>The group brings the map, the accounts and the proposal together in a Kristal. One question stays open. Will that strip hold enough moisture in August?</p></li>
          </ol>
        </div>
      </section>

      <section className="atelier-foot" aria-label="Further reading">
        <div className="atelier-wrap">
          <h2>Elsewhere in kOA</h2>
          <nav aria-label="kOA resources">
            <SiteLink href="/initiative">The initiative</SiteLink>
            <SiteLink href="/connections">Ecosystem map</SiteLink>
            <SiteLink href="/evidence">Evidence and tests</SiteLink>
            <SiteLink href="/reading">Reading library</SiteLink>
            <SiteLink href="/play">Audio and video</SiteLink>
          </nav>
          <details className="atelier-directory">
            <summary>All kOA capabilities</summary>
            <nav aria-label="All capabilities">
              <SiteLink href="/technology/kristal">Tracing a source</SiteLink>
              <SiteLink href="/learning-and-culture#learning">Learning and sharing</SiteLink>
              <SiteLink id="create" href="/platforms/konnaxion">Creating together</SiteLink>
              <SiteLink href="/ecosystem/functional-chains/FC-07">Making decisions together</SiteLink>
              <SiteLink id="act" href="/platforms/orgo">Organizing work</SiteLink>
              <SiteLink id="respond" href="/ecosystem/functional-chains/FC-08">Coordinating a response</SiteLink>
              <SiteLink id="remember" href="/evidence">Documenting results</SiteLink>
              <SiteLink id="publish" href="/learning-and-culture#publishing">Publishing and distribution</SiteLink>
            </nav>
          </details>
        </div>
      </section>
    </main>
  );
}
