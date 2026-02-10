// app/technology/ame-artificielle/page.tsx
import Link from 'next/link';
import { Card } from '@/components/Card';

export const metadata = {
  title: "Âme artificielle — alignement, méta-cognition, gouvernance",
  description:
    "Vue d’ensemble d’une approche d’IA orientée vers l’humain : contrôle, auto-vérification et garde-fous. Les détails techniques sont accessibles via les spécifications.",
};

export default function AmeArtificielleHub() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl font-serif font-medium mb-6 text-slate-900">
          Âme artificielle
        </h1>
        <h2 className="text-xl text-primary font-mono uppercase tracking-widest mb-8">
          Alignement & méta-cognition
        </h2>

        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
          <p>
            L’« Âme artificielle » décrit une façon de construire des systèmes d’IA
            qui restent <strong>sous contrôle</strong> : ils peuvent s’auto-vérifier,
            signaler leurs incertitudes, et respecter des garde-fous explicites.
          </p>
          <p>
            Cette page est un <strong>hub de lecture</strong> : elle présente les modules
            et l’intention générale. Pour l’implémentation et les définitions détaillées,
            consultez les spécifications.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* CORE SPECS */}
        <section>
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-sm">
            <h2 className="text-2xl font-serif font-medium mb-4 text-slate-900">
              Spécifications (référence technique)
            </h2>
            <p className="text-slate-600 mb-6">
              La base conceptuelle, les limites, et les mécanismes de résolution de conflits.
              À lire si vous voulez comprendre le “comment”, pas seulement le “pourquoi”.
            </p>
            <Link
              href="/technology/ame-artificielle/specifications-fonctionnelles"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-medium rounded-sm hover:bg-primary transition-colors"
            >
              Lire les spécifications →
            </Link>
          </div>
        </section>

        {/* MODULES GRID */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">
            Modules
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card
              title="1. Contrôle & personnalisation"
              href="/technology/ame-artificielle/controle-et-personnalisation"
            >
              <p className="mb-2">
                <strong>Rendre le comportement gouvernable.</strong>
              </p>
              <p>
                Réglages d’usage (ton, niveau de détail, style) et contraintes explicites
                pour éviter les dérives et clarifier les intentions.
              </p>
            </Card>

            <Card
              title="2. Méta-cognition"
              href="/technology/ame-artificielle/meta-cognition-et-resolution"
            >
              <p className="mb-2">
                <strong>Vérifier avant d’affirmer.</strong>
              </p>
              <p>
                Auto-questionnement, plans de réponse, détection de contradictions,
                et mécanismes de prudence quand l’information est insuffisante.
              </p>
            </Card>

            <Card
              title="3. Création de chemins"
              href="/technology/ame-artificielle/creation-de-chemins"
            >
              <p className="mb-2">
                <strong>Relier les idées de façon traçable.</strong>
              </p>
              <p>
                Structuration des liens entre concepts pour mieux expliquer, retrouver,
                et naviguer des raisonnements (sans “boîte noire” narrative).
              </p>
            </Card>

            <Card
              title="4. Éthique & gouvernance"
              href="/technology/ame-artificielle/ethique-et-gouvernance"
            >
              <p className="mb-2">
                <strong>Garde-fous, arbitrage, responsabilité.</strong>
              </p>
              <p>
                Règles de sûreté, filtres de risque, médiation des conflits et
                séparation claire entre ce qui est permis, déconseillé, ou interdit.
              </p>
            </Card>
          </div>
        </section>

        {/* NAVIGATION FOOTER */}
        <section className="border-t border-gray-100 pt-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
            Systèmes connexes
          </h3>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/technology/swarmcraft" className="text-primary hover:underline">
              SwarmCraft
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/technology/sentient" className="text-primary hover:underline">
              SenTient
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
