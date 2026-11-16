import { ArrowDown, ArrowRight } from "lucide-react";
import SiteLink from "@/components/SiteLink";
import { capabilities, MOSAIC_URL, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site-navigation";

export const metadata = { title: SITE_TITLE, description: SITE_DESCRIPTION, alternates: { canonical: "/" } };

const connections = [
  { title: "Systems & responsibilities", description: "See how knowledge, language, collaboration and operations connect across separately governed systems.", href: "/ecosystem" },
  { title: "Learning & culture", description: "Explore how courses, publications, creative work and virtual spaces help people make knowledge their own.", href: "/learning-and-culture" },
  { title: "Infrastructure", description: "Explore the conditions for local use, resilient computing and energy that serves communities.", href: "/infrastructures" },
  { title: "Evidence & documentation", description: "Inspect public specifications, scoped tests, prototypes and the evidence behind each claim.", href: "/evidence" },
] as const;

export default function HomePage() {
  return (
    <main className="koa-home not-prose">
      <section className="koa-hero" aria-labelledby="home-title">
        <div className="koa-hero-content">
          <h1 id="home-title">Build on what others know and do.</h1>
          <div className="koa-hero-copy">
            <p>kOA brings together tools for learning, creating, making decisions and organizing work.</p>
            <p>It turns knowledge, skills and results into resources others can understand, verify, adapt and pass on.</p>
            <p>It is designed so people can take part in their own language and communities can retain control over their rules, data and tools.</p>
          </div>
          <div className="koa-actions">
            <a className="koa-button koa-button-primary" href="#capabilities">Explore what you can do <ArrowDown size={17} aria-hidden="true" /></a>
            <SiteLink className="koa-button koa-button-secondary" href="/ecosystem">See the ecosystem <ArrowRight size={17} aria-hidden="true" /></SiteLink>
          </div>
        </div>
      </section>

      <section id="capabilities" className="koa-section" aria-labelledby="capabilities-title">
        <h2 id="capabilities-title">What you can do</h2>
        <ul className="koa-capabilities">
          {capabilities.map((item) => (
            <li key={item.id} id={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <SiteLink href={item.href}>{item.link} <ArrowRight size={15} aria-hidden="true" /></SiteLink>
            </li>
          ))}
        </ul>
        <div className="koa-mosaic">
          <div>
            <h3>See how the capabilities work together</h3>
            <p>The Koali Scenario Mosaic illustrates possible uses across learning, culture, research, institutions and field work.</p>
          </div>
          <SiteLink className="koa-button koa-button-primary" href={MOSAIC_URL}>Explore the scenarios <ArrowRight size={17} aria-hidden="true" /></SiteLink>
        </div>
      </section>

      <section className="koa-section koa-connections" aria-labelledby="connections-title">
        <h2 id="connections-title">How the pieces connect</h2>
        <p>Return to a source, adapt the result to a new context and give the next person something they can build on.</p>
        <ul className="koa-connections-list">
          {connections.map((item) => (
            <li key={item.href}>
              <SiteLink href={item.href}>
                <span><strong>{item.title}</strong><span>{item.description}</span></span>
                <ArrowRight size={19} aria-hidden="true" />
              </SiteLink>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
