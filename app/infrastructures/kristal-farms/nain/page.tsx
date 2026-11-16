import SiteLink from "@/components/SiteLink";

export const metadata = {
  title: "Nain, Labrador — Kristal Farms concept scenario",
  description: "An exploratory scenario for combining renewable energy, logistics and computing near Nain, Labrador.",
  alternates: { canonical: "/infrastructures/kristal-farms/nain" },
};

export default function NainScenario() {
  return (
    <main>
      <p><SiteLink href="/infrastructures/kristal-farms">Kristal Farms</SiteLink> / Site concepts</p>
      <h1>Nain, Labrador</h1>
      <p><strong>Concept scenario</strong></p>
      <p>This scenario examines whether renewable generation, marine access and computing could be combined near Nain while protecting community needs. It is a starting point for evaluating feasibility and discussing priorities with the people and authorities concerned.</p>
      <h2>Questions the scenario raises</h2>
      <ul>
        <li>What energy could be available after community and essential needs are met?</li>
        <li>Which workloads would need continuous fibre, and which could run in batches?</li>
        <li>How would transport, cooling, land use and environmental conditions shape the choice?</li>
        <li>What decisions, consent, feasibility evidence and authorizations would be required before a proposal could proceed?</li>
      </ul>
      <p>Capacity, cost, ownership and financing would need to be established through site-specific evidence and commitments.</p>
      <p><SiteLink href="/infrastructures/kristal-farms/go-no-go">Review the go/no-go criteria</SiteLink>.</p>
    </main>
  );
}
