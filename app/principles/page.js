import PageSection from '../../components/PageSection';

export const metadata = {
  title: 'Our Principles – King Klown & KOA',
  description: 'Radical Lucidity, Integral Cooperation, and Open Technology.',
};

export default function PrinciplesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-8">Core Principles</h1>
      
      <p className="text-xl text-gray-600 mb-12">
        We do not adhere to traditional left/right ideologies. 
        Instead, we operate on three foundational axioms designed for the 21st century.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-3 text-primary">1. Radical Lucidity</h2>
          <p>
            We must face reality as it is, not as we wish it to be. This means accepting 
            hard data about climate change, resource scarcity, and technological disruption, 
            and crafting policy based on evidence rather than wishful thinking.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-primary">2. Integral Cooperation</h2>
          <p>
            Competition has limits; survival now requires coordination. We advocate for 
            systems that reward collaboration over zero-sum conflict, whether in international 
            diplomacy or local cooperative economics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-primary">3. Open Technology</h2>
          <p>
            The tools that govern our lives must be transparent. We mandate open-source code 
            for all public governance infrastructure (voting, budget, administration) to ensure 
            trust is based on verification, not faith.
          </p>
        </section>
      </div>
    </PageSection>
  );
}