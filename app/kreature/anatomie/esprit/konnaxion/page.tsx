// app/kreature/anatomie/esprit/konnaxion/page.tsx
import Link from 'next/link';
import { 
  BrainCircuit, 
  Scale, 
  BookOpen, 
  Gavel, 
  Users, 
  ArrowRight,
  Activity,
  Network,
  Palette,
  HardHat
} from 'lucide-react';

export const metadata = {
  title: "Konnaxion — Le Parlement Intérieur",
  description: "La psyché de Kréature. 5 organes pour Apprendre, Débattre, Juger, Agir et Relier.",
};

const CHAMBERS = [
  {
    title: "1. KonnectED (La Mémoire)",
    subtitle: "L'Hippocampe Social",
    desc: "Là où l'on apprend. Cartographier le savoir (Knowledge) et valider la compétence (CertifiKation).",
    href: "/kreature/anatomie/esprit/konnaxion/konnected",
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    title: "2. Ethikos (Le Doute)",
    subtitle: "L'Espace du Tiraillement",
    desc: "Là où l'on hésite. Transformer le conflit en débats structurés (Korum) et consultations publiques.",
    href: "/kreature/anatomie/esprit/konnaxion/ethikos",
    icon: <Scale className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  },
  {
    title: "3. Kollective (Le Verdict)",
    subtitle: "Conscience & Jugement",
    desc: "Là où l'on tranche. EkoH pèse la réputation et Smart Vote décide via consensus pondéré.",
    href: "/kreature/anatomie/esprit/konnaxion/kollective",
    icon: <Gavel className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "4. KeenKonnect (L'Action)",
    subtitle: "Les Mains & L'Outil",
    desc: "Là où l'on bâtit. Gestion de projets (Konstruct) et partage de ressources (Stockage).",
    href: "/kreature/anatomie/esprit/konnaxion/keen-konnect",
    icon: <HardHat className="w-6 h-6 text-teal-600" />,
    color: "bg-teal-50 border-teal-200"
  },
  {
    title: "5. Kreative (La Culture)",
    subtitle: "Le Cœur & Le Lien",
    desc: "Là où l'on se lie. Gestion des relations humaines (Kontact) et préservation du sens (Konservation).",
    href: "/kreature/anatomie/esprit/konnaxion/kreative",
    icon: <Palette className="w-6 h-6 text-pink-600" />,
    color: "bg-pink-50 border-pink-200"
  }
];

const PSYCHE_FUNCTIONS = [
  { label: "Apprendre / Stocker", mapTo: "KonnectED" },
  { label: "Douter / Débattre", mapTo: "Ethikos" },
  { label: "Juger / Trancher", mapTo: "Kollective" },
  { label: "Exécuter / Bâtir", mapTo: "KeenKonnect" },
  { label: "Relier / Aimer", mapTo: "Kreative" }
];

export default function KonnaxionHubPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-purple-100 rounded-2xl">
            <BrainCircuit className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Konnaxion
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Si Orgo est le corps, Konnaxion est la <strong>psyché</strong>. 
          C’est l’endroit où Kréature ne réagit pas seulement par réflexe. Elle hésite, elle apprend, elle pèse le pour et le contre, elle agit et elle se souvient.
        </p>

        <div className="mt-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
          <strong className="block text-purple-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La perception sans parlement devient panique. L’action sans mémoire devient répétition. Konnaxion est l'endroit où Kréature devient responsable."
          </p>
        </div>
      </div>

      {/* THE 5 CHAMBERS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Network className="w-6 h-6 text-indigo-600" />
          Les 5 Chambres de l'Esprit
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {CHAMBERS.map((chamber, index) => (
            <Link 
              key={chamber.title}
              href={chamber.href}
              // The last item spans 2 cols if needed, or keeps grid. 
              // Here we let it flow naturally, but you could add `md:col-span-2` to the last item index if you want a centered bottom block.
              className={`group block p-8 rounded-2xl border ${chamber.color} hover:shadow-md transition-all duration-300 ${index === 4 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {chamber.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:underline decoration-2 underline-offset-4">
                {chamber.title}
              </h3>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-700">
                {chamber.subtitle}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {chamber.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* HUMAN MAPPING */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Le Parallèle Humain</h2>
        </div>
        <p className="mb-8 leading-relaxed">
          Konnaxion n'est pas une "app de plus". C'est une cartographie précise des fonctions cognitives nobles de l'humain, externalisées en code.
        </p>
        
        <div className="space-y-4">
          {PSYCHE_FUNCTIONS.map((func, i) => (
            <div key={i} className="flex items-center justify-between border-b border-slate-700/50 pb-2 last:border-0">
              <span className="text-slate-400 font-medium">{func.label}</span>
              <span className="text-white font-bold tracking-wide">→ {func.mapTo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à l'Anatomie
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion/konnected" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2 transition-colors">
          Entrer dans KonnectED (Apprendre) →
        </Link>
      </div>

    </main>
  );
}