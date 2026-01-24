// app\why\page.js
// app/why/page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Why kOA?',
  description:
    'A systemic approach to solving governance, educational, economic, and social crises through meritocracy and technology.'
};

export default function WhyKoaPage() {
  return (
    <PageSection>
      {/* Main Title - Applied #1e6864 */}
      <h1 className="text-4xl font-bold mb-6 text-[#1e6864]">Why kOA?</h1>

      <p className="text-lg mb-8">
        kOA was born from a critical realization: our global crises are not isolated incidents but symptoms of <strong>obsolete operating systems</strong>. To solve them, we cannot merely patch the existing framework; we must upgrade the entire architecture of governance, education, and economy.
      </p>

      <hr className="my-8 border-gray-300" />

      {/* Section Title - Applied #1e6864 */}
      <h2 className="text-2xl font-semibold mb-4 text-[#1e6864]">The Diagnosis: Systemic Failure</h2>
      <p className="mb-6">
        We have identified fundamental flaws across five key pillars of society that prevent progress and perpetuate inequality.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Governance */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          {/* Card Title - Applied #1e6864 */}
          <h3 className="text-xl font-bold mb-3 text-[#1e6864]">Governance & Leadership</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Popularity over Competence:</strong> Systems favor charisma and wealth over qualifications and ethics.</li>
            <li><strong>Short-termism:</strong> Decisions are driven by election cycles rather than long-term societal health.</li>
            <li><strong>Polarization:</strong> Discourse is designed to divide, leaving citizens feeling powerless and apathetic.</li>
            <li><strong>Corruption:</strong> Lack of transparency allows elites to act against the public interest.</li>
          </ul>
        </div>

        {/* Education */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          {/* Card Title - Applied #1e6864 */}
          <h3 className="text-xl font-bold mb-3 text-[#1e6864]">Education & Human Potential</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Factory Model:</strong> Pacing is tailored to the average, stifling both gifted students and those needing support.</li>
            <li><strong>Wasted Talent:</strong> Rigid testing ignores diverse intelligences; merit is often overshadowed by networking.</li>
            <li><strong>Outdated Curricula:</strong> Schools fail to prepare students for modern automation and global challenges.</li>
          </ul>
        </div>

        {/* Economy */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          {/* Card Title - Applied #1e6864 */}
          <h3 className="text-xl font-bold mb-3 text-[#1e6864]">Economy & Innovation</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Wealth Concentration:</strong> Monopolies stifle small businesses; predatory loans trap individuals in debt.</li>
            <li><strong>Barrier to Entry:</strong> Fragmented systems prevent smaller players from competing in innovation.</li>
            <li><strong>Inefficiency:</strong> Workplace nepotism and bureaucracy kill productivity and employee morale.</li>
          </ul>
        </div>

        {/* Justice & Social */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          {/* Card Title - Applied #1e6864 */}
          <h3 className="text-xl font-bold mb-3 text-[#1e6864]">Justice & Society</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Bureaucratic Nightmare:</strong> Justice is slow, expensive, and inaccessible to the marginalized.</li>
            <li><strong>Social Isolation:</strong> Rigid social clustering limits cross-generational and cross-cultural collaboration.</li>
            <li><strong>Misinformation:</strong> A lack of reliable data filters leads to confusion and poor decision-making.</li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Section Title - Applied #1e6864 */}
      <h2 className="text-2xl font-semibold mb-4 text-[#1e6864]">The Solution: The kOA Ecosystem</h2>
      <p className="mb-6">
        kOA provides the tools to transition from these broken systems to a meritocratic, transparent, and collaborative future.
      </p>

      <div className="space-y-6">
        <div>
          {/* Item Title - Applied #1e6864 */}
          <h3 className="text-lg font-bold text-[#1e6864]">1. Governance via Orgo & Ekoh</h3>
          <p>
            Replacing popularity contests with <strong>weighted voting based on proven competence</strong>. We ensure long-term planning, reduce polarization through data-driven debate, and enforce transparency to eliminate corruption.
          </p>
        </div>

        <div>
          {/* Item Title - Applied #1e6864 */}
          <h3 className="text-lg font-bold text-[#1e6864]">2. Education via The Knowledge Platform</h3>
          <p>
            A dynamic, personalized learning environment that rewards <strong>actual merit</strong> and skill acquisition. We unlock human potential by making high-quality resources accessible to all, regardless of geography or status.
          </p>
        </div>

        <div>
          {/* Item Title - Applied #1e6864 */}
          <h3 className="text-lg font-bold text-[#1e6864]">3. Connection via Konnaxion</h3>
          <p>
            Breaking down silos. We connect individuals, disciplines, and nations to solve global problems (climate, pandemics, inequality) through <strong>collective intelligence</strong> rather than competition.
          </p>
        </div>

        <div>
          {/* Item Title - Applied #1e6864 */}
          <h3 className="text-lg font-bold text-[#1e6864]">4. Sustainability via Kristal Farms</h3>
          <p>
            Ensuring that technological progress does not come at the cost of the environment. We utilize sustainable computing power to drive innovation without ecological debt.
          </p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-slate-100 rounded-lg">
        {/* Box Title - Applied #1e6864 */}
        <h2 className="text-xl font-bold mb-2 text-[#1e6864]">Our Political Position</h2>
        <p>
          kOA is not a satirical project or a think-tank. It is a <strong>governance offering</strong> ready to be ratified by universal suffrage. Our goal is to implement these solutions directly through democratic institutions, transitioning power from elite interest groups back to competent, ethical citizens.
        </p>
      </div>
    </PageSection>
  );
}