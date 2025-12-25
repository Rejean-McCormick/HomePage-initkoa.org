// app\kreature\anatomie\esprit\konnaxion\konnected\knowledge\page.tsx
// app/kreature/anatomie/esprit/konnaxion/konnected/knowledge/page.tsx
import Link from 'next/link';
import { 
  Library, 
  Search, 
  Sparkles, 
  PenTool, 
  MessageSquare, 
  Database,
  ArrowRight,
  WifiOff
} from 'lucide-react';

export const metadata = {
  title: "Knowledge — La Bibliothèque Vivante",
  description: "L'Hippocampe Social. Cataloguer, chercher, co-créer et relier le savoir en un mesh.",
};

const FUNCTIONS = [
  {
    title: "1. Bibliothèque Collaborative",
    role: "Mémoire Déclarative",
    desc: "Classer le chaos. Articles, vidéos, leçons, quiz, datasets. Tout est typé et indexé.",
    icon: <Library className="w-5 h-5 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    title: "2. Recommandations (IA)",
    role: "Intuition Guidée",
    desc: "Ce qui vient à toi. 'Voici ce qui te nourrit ensuite'. Basé sur l'expertise et le profil.",
    icon: <Sparkles className="w-5 h-5 text-amber-500" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "3. Co-Création",
    role: "Apprentissage par l'Action",
    desc: "L'atelier. On apprend en fabriquant. Contributions versionnées et itératives.",
    icon: <PenTool className="w-5 h-5 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  },
  {
    title: "4. Forums Thématiques",
    role: "Cognition Sociale",
    desc: "Penser avec les autres. Le savoir devient social, donc réel. Discuter autour de la ressource.",
    icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  },
  {
    title: "5. Distribution Hors-Ligne",
    role: "Mémoire Portable",
    desc: "Survivre sans réseau. Packaging hebdomadaire pour les environnements déconnectés.",
    icon: <WifiOff className="w-5 h-5 text-slate-500" />,
    color: "bg-slate-50 border-slate-200"
  }
];

const DATA_BONES = [
  "KnowledgeResource (Le Livre)",
  "LearningProgress (La Trace)",
  "CoCreationProject (L'Atelier)",
  "ForumTopic (La Conversation)",
  "KnowledgeRecommendation (L'Intuition)"
];

export default function KnowledgePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-2xl">
            <Library className="w-10 h-10 text-blue-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Knowledge
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Il existe un savoir qui dort dans des pages, et un savoir qui <strong>circule</strong>. 
          Knowledge est cette circulation. C'est l'hippocampe social de Kréature.
        </p>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <strong className="block text-blue-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Le chaos devient connaissance quand il accepte d’être indexé. La connaissance devient sagesse quand elle revient au bon moment."
          </p>
        </div>
      </div>

      {/* CORE FUNCTIONS GRID */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Search className="w-6 h-6 text-indigo-600" />
          Les 5 Facultés de la Mémoire
        </h2>
        <div className="grid gap-6">
          {FUNCTIONS.map((func) => (
            <div key={func.title} className={`flex gap-6 p-6 rounded-xl border ${func.color} transition-all hover:shadow-sm`}>
              <div className="flex-shrink-0 mt-1 p-2 bg-white rounded-lg shadow-sm h-fit">
                {func.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{func.title}</h3>
                <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 block text-slate-700">
                  Parallèle Humain : {func.role}
                </span>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {func.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE "BONES" (DATA MODELS) */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">L'Ossature (Modèles de Données)</h2>
        </div>
        <p className="mb-6 leading-relaxed text-sm">
          Pour rester fidèle à la réalité technique, voici les tables concrètes qui soutiennent cet organe. Sans ces os, la mémoire n'a pas de forme.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm font-mono">
          {DATA_BONES.map((bone, i) => (
            <li key={i} className="flex items-center gap-2 text-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              {bone}
            </li>
          ))}
        </ul>
      </section>

      {/* WHY IT MATTERS */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Pourquoi cet organe est vital ?</h2>
        <p className="text-slate-600 mb-4">
          Parce que sans Knowledge :
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-6">
          <li>L'esprit débat sur du vide (Ethikos).</li>
          <li>La conscience pèse des intuitions sans matière (EkoH).</li>
          <li>Le jugement tranche sans apprendre (Smart Vote).</li>
        </ul>
        <p className="font-medium text-slate-800">
          Knowledge est la "terre" du parlement intérieur.
        </p>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion/konnected" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à KonnectED
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion/konnected/certifikation" className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-2 transition-colors">
          Valider la Compétence (CertifiKation) →
        </Link>
      </div>

    </main>
  );
}