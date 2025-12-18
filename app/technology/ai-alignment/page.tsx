import Link from 'next/link';
import { Card } from '@/components/Card';

export const metadata = {
  title: "Ame-Artificielle (AI Alignment)",
  description: "Functional specifications for the EL Engine, meta-cognition, and ethical governance.",
};

export default function AiAlignmentHub() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl font-serif font-medium mb-6 text-slate-900">
          Ame-Artificielle
        </h1>
        <h2 className="text-xl text-primary font-mono uppercase tracking-widest mb-8">
          AI Alignment & Meta-Cognition
        </h2>
        
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
          <p>
            **The EL Engine** is an AI architecture designed around anthropocentric thinking. It goes beyond simple language models by integrating meta-cognitive control structures, strict ethical management, and psychic modeling.
          </p>
          <p>
            This hub documents the functional specifications, control modules, and ethical governance systems that define the &quot;Artificial Soul.&quot;
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* CORE SPECS */}
        <section>
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-sm">
            <h2 className="text-2xl font-serif font-medium mb-4 text-slate-900">Core Specifications</h2>
            <p className="text-slate-600 mb-6">
              The foundational philosophy: KingClown (Human Centricity) and the Clown System (Conflict Resolution).
            </p>
            <Link 
              href="/technology/ai-alignment/Specifications-Fonctionnelles" 
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-medium rounded-sm hover:bg-primary transition-colors"
            >
              Read Functional Specs →
            </Link>
          </div>
        </section>

        {/* MODULES GRID */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Functional Modules</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Module 1 */}
            <Card 
              title="1. Control & Personalization" 
              href="/technology/ai-alignment/Controle-Et-Personnalisation"
            >
              <p className="mb-2"><strong>Gérer la &quot;Texture&quot; de l&apos;Âme.</strong></p>
              <p>Granular control over output: Politeness, Humor, Objectivity sliders, and Tense/Perspective switches.</p>
            </Card>

            {/* Module 2 */}
            <Card 
              title="2. Meta-Cognition" 
              href="/technology/ai-alignment/Meta-Cognition-Et-Resolution"
            >
              <p className="mb-2"><strong>The brain that thinks before speaking.</strong></p>
              <p>Self-questioning loops, automatic outlining, gap filling, and structured problem solving.</p>
            </Card>

            {/* Module 3 */}
            <Card 
              title="3. Path Creation" 
              href="/technology/ai-alignment/Creation-De-Chemins"
            >
              <p className="mb-2"><strong>Visualizing logical and narrative links.</strong></p>
              <p>A graph engine for linking disparate concepts around a logical &quot;backbone&quot; (Main Steps & nodes).</p>
            </Card>

            {/* Module 4 */}
            <Card 
              title="4. Ethics & Governance" 
              href="/technology/ai-alignment/Ethique-Et-Gouvernance"
            >
              <p className="mb-2"><strong>The moral conscience.</strong></p>
              <p>Ethical decision making, benevolent rating systems (Top 50%), and conflict mediation via Clown entities.</p>
            </Card>

          </div>
        </section>

        {/* NAVIGATION FOOTER */}
        <section className="border-t border-gray-100 pt-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Related Systems</h3>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/technology/swarmcraft" className="text-primary hover:underline">
              SwarmCraft (Narrative Engine)
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/technology/sentient" className="text-primary hover:underline">
              SenTient (Input Processing)
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}