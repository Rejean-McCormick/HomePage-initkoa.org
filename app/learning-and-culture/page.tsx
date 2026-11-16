import SiteLink from "@/components/SiteLink";
import { UNIVERSITY_URL } from "@/lib/site-navigation";

export const metadata = {
  title: "Learning & Culture — kOA",
  description: "Discover learning, publishing and creative pathways across the kOA ecosystem.",
  alternates: { canonical: "/learning-and-culture" },
};

export default function LearningAndCulture() {
  return (
    <main>
      <h1>Learning & Culture</h1>
      <p>Explore how people can learn a skill, share a method, publish a result or take part in a creative project.</p>
      <section id="learning">
        <h2>Learn and practise</h2>
        <p>Ékole is a learning engine. KonnectED is the learning and skills area within Konnaxion. Kin City is a virtual-city prototype exploring how people could navigate these kinds of experiences.</p>
        <ul>
          <li><SiteLink href="/technology#catalogue">Find Ékole and its learning tools in the catalog</SiteLink></li>
          <li><SiteLink href="/platforms/konnaxion">Explore Konnaxion and KonnectED</SiteLink></li>
          <li><SiteLink href="/infrastructures/kin-city">Read about the Kin City prototype</SiteLink></li>
        </ul>
      </section>
      <section id="publishing">
        <h2>Publish and pass on what you learn</h2>
        <p>King Klown Univers-City is the Moodle-based environment for courses, challenges, assemblies and educational resources. Spek and SemantiK Architect address different parts of publishing structured material and expressing it in human languages.</p>
        <ul>
          <li><SiteLink href={UNIVERSITY_URL}>Open King Klown Univers-City</SiteLink> (some areas may require sign-in)</li>
          <li><SiteLink href="/reading">Browse published reading material</SiteLink></li>
          <li><SiteLink href="/technology/architect">Read about structured multilingual rendering</SiteLink></li>
        </ul>
      </section>
      <section id="kreature">
        <h2>Explore King Klown and Kréature</h2>
        <p>King Klown uses stories, music and performance to make difficult ideas easier to approach. Kréature lets readers enter through story, practical method or technical anatomy. From there, explore a learning or project space to see where the ideas can be put to use.</p>
        <ul>
          <li><SiteLink href="/kreature">Read the Kréature guide</SiteLink></li>
          <li><SiteLink href="/play">Watch &amp; listen</SiteLink></li>
          <li><SiteLink href="/links">Find the King Klown channels</SiteLink></li>
        </ul>
      </section>
    </main>
  );
}
