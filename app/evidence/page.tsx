import SiteLink from "@/components/SiteLink";
import { MOSAIC_URL } from "@/lib/site-navigation";

export const metadata = {
  title: "Evidence & Documentation — kOA",
  description: "Find specifications, dated tests, prototypes, and scenarios for the kOA ecosystem.",
  alternates: { canonical: "/evidence" },
};

export default function Evidence() {
  return (
    <main>
      <h1>Evidence &amp; Documentation</h1>
      <p>Start with the claim you want to examine and choose the evidence that can answer it.</p>
      <h2>Specifications and responsibilities</h2>
      <p>The public architecture map describes the intended system and the responsibilities of its components.</p>
      <p><SiteLink href="/ecosystem/functional-chains">Browse the functional chains</SiteLink> · <SiteLink href="/technology/context-packs">Open the Context Packs</SiteLink></p>
      <h2>Interactive ecosystem map</h2>
      <p>The public kOA Graph lets you explore dated architectural paths, owner boundaries and linked documentation. It is a navigational record, not a claim that all systems are deployed or qualified.</p>
      <p><SiteLink href="/connections?type=journeys">Browse the interconnected journeys</SiteLink></p>
      <h2>Engineering evidence</h2>
      <p>The public audit links systems to scoped tests and dated records. Check the tested versions, environment and outcome before drawing conclusions about current operation.</p>
      <p><SiteLink href="/connections?type=evidence">Find the public engineering audit and application records</SiteLink></p>
      <h2>Prototypes and scenario examples</h2>
      <p>Kin City documents a virtual-city prototype. The Mosaic illustrates workflows across different domains. Kristal Farms documents research, concepts and site questions.</p>
      <ul>
        <li><SiteLink href={MOSAIC_URL}>Explore scenario examples</SiteLink></li>
        <li><SiteLink href="/infrastructures/kin-city">Review Kin City’s status</SiteLink></li>
        <li><SiteLink href="/infrastructures/kristal-farms">Review the Kristal Farms research</SiteLink></li>
      </ul>
      <h2>Published reading</h2>
      <p><SiteLink href="/reading">Browse the reading library and its sources</SiteLink>.</p>
    </main>
  );
}
