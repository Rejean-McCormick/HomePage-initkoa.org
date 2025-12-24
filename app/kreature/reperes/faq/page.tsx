// app\kreature\reperes\faq\page.tsx
// app/kreature/reperes/faq/page.tsx
import Link from 'next/link';
import { 
  HelpCircle, 
  Cpu, 
  BookOpen, 
  Ghost, 
  Briefcase, 
  ArrowRight,
  Code
} from 'lucide-react';

export const metadata = {
  title: "FAQ — Questions Fréquentes",
  description: "Réponses aux questions sur la nature de Kréature. Est-ce une IA ? Un logiciel ? Pourquoi parler d'organes ?",
};

const FAQS = [
  {
    question: "C'est quoi, au juste ?",
    answer: "Kréature est un Système d'Exploitation pour Communautés (Community OS). Techniquement, c'est une plateforme qui combine gestion de projet, prise de décision démocratique et apprentissage. Ce n'est pas une IA, mais elle utilise des IA comme organes.",
    icon: <Cpu className="w-6 h-6 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    question: "Pourquoi ce vocabulaire bizarre ?",
    answer: "Parce que les mots 'Admin' ou 'Ticket' sont morts. En utilisant des métaphores biologiques (Orgo, Konnaxion), on change la façon de penser. On ne gère pas une base de données, on prend soin d'un organisme.",
    icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  },
  {
    question: "Est-ce une secte ?",
    answer: "Non. C'est une mythologie de design. King Klown est un persona narratif pour incarner la philosophie. Le code est auditable, la méthode est transparente. Il n'y a pas de dogme, juste une architecture.",
    icon: <Ghost className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  },
  {
    question: "Puis-je l'utiliser au travail ?",
    answer: "Oui, pour toute organisation qui veut sortir du chaos (Collectifs, PME, Asso). Mais attention : Kréature impose une culture de transparence et de responsabilité. Ce n'est pas juste un outil, c'est une méthode.",
    icon: <Briefcase className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    question: "Où est le code ?",
    answer: "La couche 'Tech' se trouve sous la couche 'Mythos'. Kréature est construite sur des stacks modernes (Next.js, Django, Python). Vous pouvez être un anatomiste et ignorer la poésie si vous préférez.",
    icon: <Code className="w-6 h-6 text-slate-600" />,
    color: "bg-slate-50 border-slate-200"
  }
];

export default function FAQPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-2xl">
            <HelpCircle className="w-10 h-10 text-slate-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            FAQ
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Kréature est un objet étrange. C'est normal d'être confus au début. 
          Voici les réponses aux questions que l'on n'ose pas toujours poser.
        </p>

        <div className="mt-8 bg-slate-50 border-l-4 border-slate-500 p-6 rounded-r-lg">
          <strong className="block text-slate-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La confusion est le début de l'attention. Si tout était clair immédiatement, vous n'auriez rien appris de nouveau."
          </p>
        </div>
      </div>

      {/* FAQ GRID */}
      <section className="mb-20 grid gap-6">
        {FAQS.map((item, index) => (
          <div key={index} className={`p-6 rounded-xl border ${item.color} flex gap-6 items-start transition-all hover:shadow-sm`}>
            <div className="flex-shrink-0 mt-1 p-2 bg-white rounded-lg shadow-sm">
              {item.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.question}</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/parcours" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour au Parcours
        </Link>
        <Link href="/kreature/anatomie" className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2 transition-colors">
          Explorer l'Anatomie →
        </Link>
      </div>

    </main>
  );
}