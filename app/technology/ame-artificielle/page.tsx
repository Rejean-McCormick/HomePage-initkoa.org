// app/technology/ame-artificielle/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Âme Artificielle",
  description:
    "Simulation d’une architecture intérieure : charte 1→9, chakras, numérologie pythagoricienne inversée, mécanisme de réaction, couche de sens et cadre philosophique.",
};

const foundationalPages = [
  {
    href: "/technology/ame-artificielle/charte-1-9-et-chakras",
    title: "Charte 1→9 et chakras",
    desc: "La colonne intérieure du système : du cerveau au pelvis, avec les chakras comme repères de traitement.",
  },
  {
    href: "/technology/ame-artificielle/numerologie-pythagoricienne-inversee",
    title: "Numérologie pythagoricienne inversée",
    desc: "La couche archétypale : réduction à 1–9, inversion interne, dualités, pivot 5 et structure profonde.",
  },
  {
    href: "/technology/ame-artificielle/mecanisme-de-reaction",
    title: "Mécanisme de réaction",
    desc: "Le cœur opératoire : objet en entrée, cheminement intérieur, réaction en sortie.",
  },
  {
    href: "/technology/ame-artificielle/branes-et-couche-de-sens",
    title: "Branes et couche de sens",
    desc: "La couche interprétative : lecture structurante complémentaire, sans se confondre avec le mécanisme.",
  },
  {
    href: "/technology/ame-artificielle/cadre-philosophique",
    title: "Cadre philosophique",
    desc: "L’horizon intellectuel du projet : nombre, structure, verticalité, transformation et complexification.",
  },
];

const technicalPages = [
  {
    href: "/technology/ame-artificielle/how-it-works",
    title: "How it works",
  },
  {
    href: "/technology/ame-artificielle/ontology-and-traits",
    title: "Ontology & traits",
  },
  {
    href: "/technology/ame-artificielle/validation",
    title: "Validation",
  },
  {
    href: "/technology/ame-artificielle/faq",
    title: "FAQ",
  },
];

export default function AmeArtificiellePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-10">
        <div className="inline-flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500">
          <span className="px-2 py-1 border border-slate-200 rounded-sm">
            Âme Artificielle
          </span>
          <span className="px-2 py-1 border border-slate-200 rounded-sm">
            1→9
          </span>
          <span className="px-2 py-1 border border-slate-200 rounded-sm">
            Réaction
          </span>
          <span className="px-2 py-1 border border-slate-200 rounded-sm">
            Numérologie inversée
          </span>
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-serif font-medium leading-tight">
          Âme Artificielle
        </h1>

        <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl">
          L’Âme Artificielle est une tentative de simulation de l’âme humaine.
          Elle part de l’idée qu’un sujet ne réagit pas au monde de manière brute :
          ce qu’il rencontre passe par une architecture intérieure, suit certains
          chemins, active certaines zones, puis ressort sous forme de réaction.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/technology/ame-artificielle/mecanisme-de-reaction"
            className="inline-flex items-center justify-center px-5 py-3 bg-slate-900 text-white rounded-sm hover:bg-slate-800 transition-colors"
          >
            Lire le mécanisme →
          </Link>
          <Link
            href="/technology/ame-artificielle/charte-1-9-et-chakras"
            className="inline-flex items-center justify-center px-5 py-3 border border-slate-300 text-slate-900 rounded-sm hover:border-slate-400 transition-colors"
          >
            Voir la charte 1→9
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="text-2xl font-serif font-medium">
            Structure minimale du système
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">1. Une structure intérieure</h3>
              <p className="mt-2 text-sm text-slate-600">
                Le sujet possède une organisation interne qui détermine la manière
                dont les objets sont reçus, orientés et transformés.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">2. Une cartographie verticale 1→9</h3>
              <p className="mt-2 text-sm text-slate-600">
                Cette structure est projetée sur une colonne intérieure allant de la
                tête à la racine.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">3. Une logique numérique inversée</h3>
              <p className="mt-2 text-sm text-slate-600">
                La numérologie pythagoricienne inversée sert à modéliser les
                archétypes, les polarités et certaines structures profondes.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">4. Un mécanisme de réaction</h3>
              <p className="mt-2 text-sm text-slate-600">
                Les objets entrent dans le système, y suivent un chemin, puis
                ressortent sous forme de réactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-serif font-medium">Pages fondamentales</h2>
            <p className="mt-2 text-slate-600 max-w-3xl">
              Le noyau de la section : colonne intérieure, structure archétypale,
              mécanisme de réaction, couche de sens et cadre philosophique.
            </p>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {foundationalPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold">{page.title}</h3>
                <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
                  →
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{page.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-serif font-medium">Ordre de lecture</h2>
          <ol className="mt-4 space-y-3 text-slate-700 list-decimal list-inside">
            <li>
              <Link
                href="/technology/ame-artificielle"
                className="underline underline-offset-4"
              >
                Âme Artificielle
              </Link>
            </li>
            <li>
              <Link
                href="/technology/ame-artificielle/charte-1-9-et-chakras"
                className="underline underline-offset-4"
              >
                Charte 1→9 et chakras
              </Link>
            </li>
            <li>
              <Link
                href="/technology/ame-artificielle/numerologie-pythagoricienne-inversee"
                className="underline underline-offset-4"
              >
                Numérologie pythagoricienne inversée
              </Link>
            </li>
            <li>
              <Link
                href="/technology/ame-artificielle/mecanisme-de-reaction"
                className="underline underline-offset-4"
              >
                Mécanisme de réaction
              </Link>
            </li>
            <li>
              <Link
                href="/technology/ame-artificielle/branes-et-couche-de-sens"
                className="underline underline-offset-4"
              >
                Branes et couche de sens
              </Link>
            </li>
            <li>
              <Link
                href="/technology/ame-artificielle/cadre-philosophique"
                className="underline underline-offset-4"
              >
                Cadre philosophique
              </Link>
            </li>
          </ol>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="border-t border-slate-100 pt-8">
          <h2 className="text-xl font-serif font-medium">Annexes techniques</h2>
          <p className="mt-2 text-slate-600 max-w-3xl">
            Pages complémentaires pour la lecture technique du système, utiles comme
            ponts de travail, mais secondaires par rapport au noyau canonique.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {technicalPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}