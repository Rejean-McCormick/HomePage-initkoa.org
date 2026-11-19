import SiteLink from "@/components/SiteLink";

export const metadata = {
  title: "Kristal Farms — kOA",
  description: "Research into flexible computing near renewable energy, with priority for local community needs.",
  alternates: { canonical: "/infrastructures/kristal-farms" },
};

export default function KristalFarms() {
  return (
    <main>
      <h1>Kristal Farms</h1>
      <p>Where can useful computing run, and who benefits? Kristal Farms studies the placement of flexible computing near renewable energy while protecting community and essential electricity needs.</p>
      <p><strong>Status: research and design.</strong> Site selection, engineering, community decisions, authorizations and measured performance belong to individual proposals.</p>
      <section aria-labelledby="readiness-title" className="rounded-xl border p-5 not-prose">
        <h2 id="readiness-title" className="mt-0 text-xl font-semibold">Feasibility and evidence checklist</h2>
        <p>Research/design status. No site-specific production capacity, cost, heat-reuse yield or community authorization is certified by this overview.</p>
        <ul className="mb-0">
          <li>Energy and thermal balance: site measurements and seasonal demand needed.</li>
          <li>Cost and operations: budget, logistics and maintenance still need site-specific validation.</li>
          <li>Community consent and environmental permitting: prerequisites, not assumptions.</li>
          <li>Decision gate: consult the documented go/no-go criteria before any deployment claim.</li>
        </ul>
        <p className="mb-0"><SiteLink href="/infrastructures/kristal-farms/go-no-go">Review criteria and open questions</SiteLink>.</p>
      </section>
      <h2>Computing connected to the network</h2>
      <p>Some workloads need persistent connectivity. A connected site would evaluate power, cooling, fibre and logistics together. Heat recovery depends on local demand and site design.</p>
      <ul>
        <li><SiteLink href="/infrastructures/kristal-farms/infrastructure">Read the infrastructure design</SiteLink></li>
        <li><SiteLink href="/infrastructures/kristal-farms/fiber-and-network">Explore fibre and connectivity</SiteLink></li>
        <li><SiteLink href="/infrastructures/kristal-farms/heat-first-design">Read the heat-reuse design</SiteLink></li>
      </ul>
      <h2>Computing with intermittent connectivity</h2>
      <p>Other workloads could run in batches and transfer results later. Kristal Wink is a proposed wind-capable configuration for flexible workloads and transportable knowledge artifacts.</p>
      <h2>Community priorities and site evidence</h2>
      <p>Local demand, consent, siting, energy supply and environmental conditions shape which options can proceed. The project documentation includes scenario studies and conditions for moving forward.</p>
      <ul>
        <li><SiteLink href="/infrastructures/kristal-farms/governance">Read the governance proposals</SiteLink></li>
        <li><SiteLink href="/infrastructures/kristal-farms/go-no-go">Review the go/no-go criteria</SiteLink></li>
        <li><SiteLink href="/infrastructures/kristal-farms/nain">Nain, Labrador — concept scenario</SiteLink></li>
      </ul>
      <p><SiteLink href="/evidence">See the kOA evidence and documentation guide</SiteLink>.</p>
    </main>
  );
}
