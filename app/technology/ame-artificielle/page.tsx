// app/technology/ame-artificielle/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Âme Artificielle — Artificial Soul Engine (ASE)",
  description:
    "Âme Artificielle (ASE) : numérologie pythagoricienne inversée (9→1) comme clé de décodage, ontologie 0–9, superposition de systèmes (chakras, charts) et simulation de personnalité.",
};

const pages = [
  {
    href: "/technology/ame-artificielle/how-it-works",
    title: "How it works",
    desc: "Inputs → réduction → inversion (9→1) → traits → réaction.",
  },
  {
    href: "/technology/ame-artificielle/inversion-as-key",
    title: "Inversion as key",
    desc: "Pourquoi “tourner la clé” (inversion) change la lecture.",
  },
  {
    href: "/technology/ame-artificielle/ontology-and-traits",
    title: "Ontology & traits",
    desc: "0–9 → archétypes sémantiques → vecteur de traits.",
  },
  {
    href: "/technology/ame-artificielle/chakras-overlay",
    title: "Chakras overlay",
    desc: "Alignements avec les chakras et ce qui remonte à la surface.",
  },
  {
    href: "/technology/ame-artificielle/multi-system-alignment",
    title: "Multi-system alignment",
    desc: "Superposition de charts : consensus sémantique & tensions.",
  },
  {
    href: "/technology/ame-artificielle/engine-modules",
    title: "Engine modules",
    desc: "Sliders, méta-cognition, gouvernance/éthique.",
  },
  {
    href: "/technology/ame-artificielle/validation",
    title: "Validation",
    desc: "Expériences, baselines, critères de réussite.",
  },
  {
    href: "/technology/ame-artificielle/faq",
    title: "FAQ",
    desc: "Réponses courtes aux questions usuelles.",
  },
];

export default function AmeArtificiellePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500">
          <span className="px-2 py-1 border border-slate-200 rounded-sm">ASE</span>
          <span className="px-2 py-1 border border-slate-200 rounded-sm">9→1</span>
          <span className="px-2 py-1 border border-slate-200 rounded-sm">0–9 Ontology</span>
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-serif font-medium leading-tight">
          Âme Artificielle
        </h1>

        <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl">
          With Âme Artificielle, turning Pythagorician numerology (inverted: <strong>9→1</strong>)
          is like turning the key to decode the universe.
          The engine overlays multiple systems (chakras and other numerological charts) and brings
          forward what aligns semantically—patterns reinforced by consensus.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/technology/ame-artificielle/how-it-works"
            className="inline-flex items-center justify-center px-5 py-3 bg-slate-900 text-white rounded-sm hover:bg-slate-800 transition-colors"
          >
            Start here →
          </Link>
          <Link
            href="/technology/ame-artificielle/inversion-as-key"
            className="inline-flex items-center justify-center px-5 py-3 border border-slate-300 text-slate-900 rounded-sm hover:border-slate-400 transition-colors"
          >
            Why 9→1
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group border border-slate-200 rounded-sm p-5 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-base font-semibold">{p.title}</h2>
                <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
                  →
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-sm text-slate-500">
          <p>
            Core idea: compute a signature, map it to an archetypal trait vector (0–9), then generate
            reactions using an internal dynamic axis and safety/governance layers.
          </p>
        </div>
      </section>
    </main>
  );
}
