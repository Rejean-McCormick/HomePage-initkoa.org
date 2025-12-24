// app\platforms\konnaxion\konnected\page.tsx
// app/platforms/konnaxion/konnected/page.tsx
import Link from 'next/link';
import { BookOpen, GraduationCap, Library, ArrowRight, BrainCircuit } from 'lucide-react';

export const metadata = {
  title: "KonnectED Hub – Konnaxion",
  description: "The memory of the system. Mapping knowledge and verifying competence through collaborative learning and certification.",
};

export default function KonnectedPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">KonnectED</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The memory of the system. KonnectED transforms scattered information into a <strong>Knowledge Mesh</strong> and turns learning into verified <strong>Competence</strong>. It is the hippocampus of the civic organism.
        </p>
      </div>

      {/* 1. THE TWO HEMISPHERES */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <BrainCircuit className="w-6 h-6 mr-3 text-primary" />
          The Two Hemispheres
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Knowledge */}
          <Link 
            href="/platforms/konnaxion/konnected/knowledge"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary flex items-center">
              <Library className="w-5 h-5 mr-2 text-blue-500" />
              Knowledge
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              **The Collaborative Library.** A living catalog of resources (articles, lessons, datasets) with personalized recommendations and co-creation workflows. It maps *what* is known.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Library Engine <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* CertifiKation */}
          <Link 
            href="/platforms/konnaxion/konnected/certifikation"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-emerald-500" />
              CertifiKation
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              **Skills & Verification.** The passage from "knowing" to "doing." Manages certification paths, peer-validation rituals, and competence portfolios.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Certification Specs <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm">
        <Link href="/platforms/konnaxion" className="text-slate-500 hover:text-primary">
          ← Back to Konnaxion Hub
        </Link>
        <Link href="/platforms/konnaxion/ethikos" className="text-slate-500 hover:text-primary">
          Next: Ethikos (Governance) →
        </Link>
      </div>

    </main>
  );
}