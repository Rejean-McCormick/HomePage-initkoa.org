import Link from 'next/link';
import { Book, HelpCircle, Terminal, Map, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Repères — Guides & Navigation",
  description: "Glossaire, FAQ et ressources techniques pour naviguer dans l'écosystème Kréature.",
};

const GUIDES = [
  {
    title: "Glossaire",
    subtitle: "Le Vocabulaire",
    desc: "Définitions des termes clés (EkoH, Mesh, Orgo) pour parler la même langue.",
    href: "/kreature/reperes/glossaire",
    icon: <Book className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    title: "FAQ",
    subtitle: "Questions Fréquentes",
    desc: "Les réponses aux doutes les plus courants sur le fonctionnement de la tribu.",
    href: "/kreature/reperes/faq",
    icon: <HelpCircle className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  },
  {
    title: "Pont Technique",
    subtitle: "Pour les Développeurs",
    desc: "Documentation sur les modèles de données, les APIs et l'architecture logicielle.",
    href: "/kreature/reperes/pont-technique",
    icon: <Terminal className="w-6 h-6 text-slate-600" />,
    color: "bg-slate-50 border-slate-200"
  }
];

export default function ReperesHubPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className=\"p-3 bg-indigo-100 rounded-2xl\">
            <Map className="w-10 h-10 text-indigo-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Repères</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Naviguer dans un système complexe demande des cartes. Retrouvez ici les outils pour comprendre et contribuer.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {GUIDES.map((guide) => (
          <Link key={guide.title} href={guide.href} className={`group block p-6 rounded-2xl border ${guide.color} hover:shadow-md transition-all`}>
            <div className="mb-4 p-3 bg-white rounded-xl w-fit shadow-sm">{guide.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{guide.title}</h3>
            <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-700">{guide.subtitle}</div>
            <p className="text-slate-700 text-sm mb-4">{guide.desc}</p>
            <div className="flex items-center text-sm font-bold text-slate-900">
              Ouvrir le guide <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}