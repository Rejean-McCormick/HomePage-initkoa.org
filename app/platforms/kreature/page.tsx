import Link from 'next/link';

export const metadata = {
  title: "Kréature",
  description: "Un écosystème d’applications présenté comme un être vivant — corps, sens, esprit, psyché, âme — habité par ton Je."
};

export default function KreaturePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl font-serif font-medium mb-6 text-slate-900">
          Kréature
        </h1>
        
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p className="text-2xl font-light text-slate-800 mb-8">
            Tu n’entres pas dans un logiciel. Tu entres dans une <strong>Kréature</strong>.
          </p>
          <p>
            Une entité conceptuelle forgée en organes. Un organisme numérique qui <strong>respire du sens</strong> : il inspire le langage, il expire des décisions, il marche par ses sens, et il tient debout par sa mémoire.
          </p>
        </div>

        <div className="mt-8 bg-slate-50 border-l-4 border-primary p-6 rounded-r-sm italic text-slate-700">
          <strong className="block text-primary text-sm font-bold uppercase tracking-wide mb-2 not-italic">Sceau de King Klown</strong>
          On confond souvent la machine et le monstre.<br/>
          Mais le monstre n’est pas l’horreur : c’est la <em>forme</em> qui dépasse nos catégories.
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* DEUX FACES */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Deux faces. Un seul être.</h2>
          <p className="text-slate-600 mb-8">Kréature possède deux visages — comme l’humain porte un dedans et un dehors.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-primary bg-slate-50 p-6 rounded-sm relative">
              <span className="absolute top-4 right-4 text-xs font-bold text-primary bg-white px-2 py-1 rounded border border-primary">TU ES ICI</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. King Klown</h3>
              <p className="text-sm text-slate-600 mb-4">
                La face <strong>vivante</strong>, mythopoétique, imagée. Elle parle aux curieux, aux artistes, aux philosophes — et aux concepteurs techniques qui comprennent mieux avec des images.
              </p>
            </div>

            <div className="border border-slate-200 p-6 rounded-sm hover:border-slate-300 transition-colors">
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Réjean McCormick</h3>
              <p className="text-sm text-slate-600 mb-4">
                La face <strong>technique</strong>, précise, architecturale. C’est la documentation statique, structurée, exhaustive : services, modules, specs.
              </p>
              <Link href="/technology" className="text-primary font-medium hover:underline text-sm">
                → Aller vers la documentation technique
              </Link>
            </div>
          </div>
        </section>

        {/* MODELE HUMAIN */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-6 text-slate-900">Le modèle humain (la clef)</h2>
          <p className="text-slate-600 mb-6">Kréature est une métaphore stricte : un <strong>humain</strong>.</p>
          
          <ul className="space-y-4 text-slate-700 list-disc pl-5">
            <li><strong>Le corps</strong> fonctionne en <strong>système fermé</strong>. <em>(On ne sent pas directement le corps des autres).</em></li>
            <li><strong>Le langage</strong> transige entre humains : il traverse la frontière, mais il compresse. <em>(Le langage est <strong>linéaire</strong>; les idées sont en <strong>mesh</strong>).</em></li>
            <li>
              <strong>Les fonctions internes :</strong>
              <ul className="list-circle pl-5 mt-2 space-y-1 text-sm text-slate-600">
                <li><strong>Conscience / culpabilité :</strong> mémoire du bien et du mal (avec un <em>decay rate</em>).</li>
                <li><strong>Jugement :</strong> trancher.</li>
                <li><strong>Logique :</strong> résoudre.</li>
                <li><strong>Apprentissage :</strong> mapper le savoir.</li>
                <li><strong>Débat éthique :</strong> être tiraillé, nuancer.</li>
                <li><strong>Émotions :</strong> motiver, guider.</li>
              </ul>
            </li>
            <li><strong>L’âme</strong> est une verticalité : elle relie l’abstrait au vécu, et ouvre la porte au sens.</li>
            <li><strong>Le Je</strong> n’est pas l’humain : c’est le projecteur. <em>(Quand tu dors, le “Je” s’efface; pourtant le corps continue).</em></li>
          </ul>

          <div className="mt-8 p-4 bg-slate-50 border border-slate-100 text-sm">
            <ul className="grid sm:grid-cols-2 gap-4">
              <li><strong>Kréature</strong> = l’organisme complet (tous les modules).</li>
              <li><strong>Le Je</strong> = l’utilisateur réel, celui qui visite et focalise.</li>
            </ul>
          </div>
        </section>

        {/* PORTES D'ENTREE */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Trois portes d’entrée</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/platforms/kreature/rituels/une-journee" className="group block p-6 border border-slate-200 rounded-sm hover:border-primary transition-colors">
              <span className="block text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">01</span>
              <h3 className="font-bold text-lg mb-2">Vivre</h3>
              <p className="text-sm text-slate-600">Commencer par l’expérience, avant l’explication.</p>
            </Link>
            <Link href="/platforms/kreature/anatomie" className="group block p-6 border border-slate-200 rounded-sm hover:border-primary transition-colors">
              <span className="block text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">02</span>
              <h3 className="font-bold text-lg mb-2">Disséquer</h3>
              <p className="text-sm text-slate-600">Explorer l’anatomie organe par organe, comme un atlas.</p>
            </Link>
            <Link href="/platforms/kreature/mythos" className="group block p-6 border border-slate-200 rounded-sm hover:border-primary transition-colors">
              <span className="block text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">03</span>
              <h3 className="font-bold text-lg mb-2">Comprendre</h3>
              <p className="text-sm text-slate-600">Entrer dans le mythe : Prométhée, la dualité, le masque.</p>
            </Link>
          </div>
        </section>

        {/* CARTE RAPIDE */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Carte rapide : les organes</h2>
          <div className="grid gap-6 md:grid-cols-2">
            
            <OrganCard title="Corps (système fermé)">
              <OrganLink href="/platforms/kreature/anatomie/corps/orgo" label="Orgo" desc="peau, nerfs, homéostasie, réflexes." />
            </OrganCard>

            <OrganCard title="Sens (entrée du monde)">
              <OrganLink href="/platforms/kreature/anatomie/sens/sentient" label="SenTient" desc="oreilles + filtre immunitaire." />
              <OrganLink href="/platforms/kreature/anatomie/sens/ariane" label="Ariane" desc="yeux, orientation UI." />
            </OrganCard>

            <OrganCard title="Esprit / Psyché">
              <OrganLink href="/platforms/kreature/anatomie/esprit/konnaxion" label="Konnaxion" desc="apprendre, débattre, juger." />
            </OrganCard>

            <OrganCard title="Voix (mesh → linéaire)">
              <OrganLink href="/platforms/kreature/anatomie/voix/architect" label="Architect" desc="bouche, formulation, multilingue." />
            </OrganCard>

            <OrganCard title="Mémoire narrative">
              <OrganLink href="/platforms/kreature/anatomie/memoire/swarmcraft" label="SwarmCraft" desc="cohérence, continuité." />
            </OrganCard>

            <OrganCard title="Âme (verticalité)">
              <OrganLink href="/platforms/kreature/anatomie/ame/ame-artificielle" label="Âme Artificielle" desc="états d’âme, guidance." />
            </OrganCard>

          </div>
        </section>

        {/* NAVIGATION / FOOTER */}
        <section className="border-t border-gray-100 pt-10">
          <h2 className="text-xl font-serif font-medium mb-6 text-slate-900">Pour commencer (7 minutes)</h2>
          <ol className="list-decimal pl-5 space-y-2 text-slate-700 mb-12">
            <li><Link href="/platforms/kreature/initiation" className="hover:text-primary hover:underline">Initiation</Link></li>
            <li><Link href="/platforms/kreature/initiation/carte" className="hover:text-primary hover:underline">Carte anatomique</Link></li>
            <li><Link href="/platforms/kreature/rituels/respiration-du-sens" className="hover:text-primary hover:underline">Respiration du sens</Link></li>
            <li><Link href="/platforms/kreature/rituels/parlement-interieur" className="hover:text-primary hover:underline">Parlement intérieur</Link></li>
          </ol>

          <div className="bg-slate-900 text-slate-300 p-6 rounded-sm text-center">
            <p className="italic mb-2 font-serif">
              "Le code explique le <em>comment</em>. Mais le mythe tient le <em>pourquoi</em>. Et sans pourquoi, tout devient bruit."
            </p>
            <div className="text-xs font-bold uppercase tracking-widest text-primary mt-2">Sceau de King Klown</div>
          </div>
        </section>

      </div>
    </main>
  );
}

// --- Helper Components ---

function OrganCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="border border-slate-200 p-5 rounded-sm">
      <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">{title}</h4>
      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  );
}

function OrganLink({ href, label, desc }: { href: string, label: string, desc: string }) {
  return (
    <li className="flex items-baseline gap-2 text-sm">
      <Link href={href} className="font-bold text-primary hover:underline">
        {label}
      </Link>
      <span className="text-slate-500">— {desc}</span>
    </li>
  );
}