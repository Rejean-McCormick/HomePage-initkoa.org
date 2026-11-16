import SiteLink from "@/components/SiteLink";

export const metadata = {
  title: "Kréature — kOA",
  description: "An English guide to the stories, methods and technical references of Kréature.",
  alternates: { canonical: "/kreature" },
};

export default function KreatureGuide() {
  return (
    <main>
      <h1>Kréature</h1>
      <p>Kréature uses story, imagery and practical methods to explain how people can build and learn together. King Klown is one of its voices.</p>
      <h2>Choose a way in</h2>
      <ul>
        <li><SiteLink href="/kreature/mythos" hrefLang="fr">Read the mythos</SiteLink> (French original)</li>
        <li><SiteLink href="/kreature/rituels" hrefLang="fr">Explore the methods and rituals</SiteLink> (French original)</li>
        <li><SiteLink href="/kreature/anatomie" hrefLang="fr">Read the technical anatomy</SiteLink> (French original)</li>
        <li><SiteLink href="/kreature/original" hrefLang="fr">Open the original Kréature introduction</SiteLink> (French)</li>
      </ul>
      <h2>Follow the idea into practice</h2>
      <p>Explore learning and publishing pathways, media and virtual spaces to see where people can take the ideas further.</p>
      <ul>
        <li><SiteLink href="/learning-and-culture">Explore learning and culture</SiteLink></li>
        <li><SiteLink href="/infrastructures/kin-city">Explore Kin City</SiteLink></li>
        <li><SiteLink href="/play">Watch &amp; listen</SiteLink></li>
      </ul>
    </main>
  );
}
