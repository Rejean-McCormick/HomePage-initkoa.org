// app/platforms/konnaxion/kreative/page.tsx
import Link from 'next/link';
// We alias 'Image' to 'ImageIcon' to stop the linter from thinking it needs an alt tag
import { Palette, Image as ImageIcon, Users, ArrowRight, Layers } from 'lucide-react';

export const metadata = {
  title: "Kreative Hub – Konnaxion",
  description: "The soul of the system. Preserving culture (Konservation) and connecting creators (Kontact).",
};

export default function KreativePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Palette className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Kreative</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The soul of the system. Kreative is where the organism becomes civilization. It preserves culture as symbolic memory and weaves the social fabric that connects creators.
        </p>
      </div>

      {/* 1. THE TWO ATELIERS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Layers className="w-6 h-6 mr-3 text-primary" />
          The Two Ateliers
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Konservation */}
          <Link 
            href="/platforms/konnaxion/kreative/konservation"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary flex items-center">
              {/* Updated to use the aliased name */}
              <ImageIcon className="w-5 h-5 mr-2 text-rose-500" />
              Konservation
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              **Cultural Preservation.** Digital archives, virtual exhibitions, and heritage documentation. It transforms ephemeral creation into durable memory.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Archive Specs <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Kontact */}
          <Link 
            href="/platforms/konnaxion/kreative/kontact"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-500" />
              Kontact
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              **The Living Network.** Professional profiles, intelligent matching, and collaboration workspaces. It turns isolated talent into a collective force.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Network Engine <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm">
        <Link href="/platforms/konnaxion" className="text-slate-500 hover:text-primary">
          ← Back to Konnaxion Hub
        </Link>
        <Link href="/platforms/konnaxion/konnected" className="text-slate-500 hover:text-primary">
          Next: KonnectED (Learning) →
        </Link>
      </div>

    </main>
  );
}