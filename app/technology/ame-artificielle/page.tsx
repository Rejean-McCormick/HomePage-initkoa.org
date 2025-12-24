// app\technology\ame-artificielle\page.tsx
// app/principles/ai-alignment/page.tsx
import Link from 'next/link';
import { Card } from '@/components/Card';

export const metadata = {
  title: "Âme Artificielle (Ame-Artificielle)",
  description: "Spécifications fonctionnelles pour le Moteur EL, la méta-cognition et la gouvernance éthique.",
};

export default function AiAlignmentHub() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl font-serif font-medium mb-6 text-slate-900">
          Âme Artificielle
        </h1>
        <h2 className="text-xl text-primary font-mono uppercase tracking-widest mb-8">
          Âme Artificielle & Méta-Cognition
        </h2>
        
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
          <p>
            Le Moteur EL est une architecture d'IA conçue autour d'une pensée anthropocentrique. Il va au-delà des simples modèles de langage en intégrant des structures de contrôle méta-cognitives, une gestion éthique stricte et une modélisation psychique.
          </p>
          <p>
            Ce hub documente les spécifications fonctionnelles, les modules de contrôle et les systèmes de gouvernance éthique qui définissent l'« Âme Artificielle ».
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* CORE SPECS */}
        <section>
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-sm">
            <h2 className="text-2xl font-serif font-medium mb-4 text-slate-900">Spécifications Fondamentales</h2>
            <p className="text-slate-600 mb-6">
              La philosophie fondatrice : KingClown (Centricité Humaine) et le Système Clown (Résolution de Conflits).
            </p>
            <Link 
              href="/technology/ame-artificielle/specifications-fonctionnelles" 
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-medium rounded-sm hover:bg-primary transition-colors"
            >
              Lire les Spécifications Fonctionnelles →
            </Link>
          </div>
        </section>

        {/* MODULES GRID */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Modules Fonctionnels</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Module 1 */}
            <Card 
              title="1. Contrôle & Personnalisation" 
              href="/technology/ame-artificielle/controle-et-personnalisation"
            >
              <p className="mb-2"><strong>Gérer la &quot;Texture&quot; de l'Âme.</strong></p>
              <p>Contrôle granulaire des sorties : curseurs de politesse, d'humour, d'objectivité et commutateurs de temps/perspective.</p>
            </Card>

            {/* Module 2 */}
            <Card 
              title="2. Méta-Cognition" 
              href="/technology/ame-artificielle/meta-cognition-et-resolution"
            >
              <p className="mb-2"><strong>Le cerveau qui pense avant de parler.</strong></p>
              <p>Boucles d'auto-questionnement, création automatique de plans, comblement des lacunes et résolution structurée de problèmes.</p>
            </Card>

            {/* Module 3 */}
            <Card 
              title="3. Création de Chemins" 
              href="/technology/ame-artificielle/creation-de-chemins"
            >
              <p className="mb-2"><strong>Visualiser les liens logiques et narratifs.</strong></p>
              <p>Un moteur de graphes pour relier des concepts disparates autour d'une &quot;colonne vertébrale&quot; logique (Étapes Clés & nœuds).</p>
            </Card>

            {/* Module 4 */}
            <Card 
              title="4. Éthique & Gouvernance" 
              href="/technology/ame-artificielle/ethique-et-gouvernance"
            >
              <p className="mb-2"><strong>La conscience morale.</strong></p>
              <p>Prise de décision éthique, systèmes de notation bienveillants (Top 50%) et médiation des conflits via les entités Clown.</p>
            </Card>

          </div>
        </section>

        {/* NAVIGATION FOOTER */}
        <section className="border-t border-gray-100 pt-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Systèmes Connexes</h3>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/technology/swarmcraft" className="text-primary hover:underline">
              SwarmCraft (Moteur Narratif)
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/technology/sentient" className="text-primary hover:underline">
              SenTient (Traitement des Entrées)
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}