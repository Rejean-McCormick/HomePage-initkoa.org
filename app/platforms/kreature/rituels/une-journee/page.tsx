import Link from 'next/link';

export const metadata = {
  title: "Une Journée dans Kréature",
  description: "Scénario d'utilisation quotidienne de l'écosystème KOA."
};

export default function UneJourneePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl font-serif font-medium mb-6 text-slate-900">Une Journée Type</h1>
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p>Comment habiter Kréature au quotidien ? Voici le cycle de respiration d'un utilisateur actif.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Le Réveil (Orgo)</h2>
          <p>Tout commence par le corps. Vérifier l'état du système.</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong><Link href="/platforms/kreature/anatomie/corps/orgo" className="text-primary hover:underline">Orgo (Le Corps)</Link></strong> : Check des notifications, santé du système, tâches urgentes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. La Perception (SenTient & Ariane)</h2>
          <p>Ensuite, on ouvre les sens vers l'extérieur.</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong><Link href="/platforms/kreature/anatomie/sens/sentient" className="text-primary hover:underline">SenTient (L'Ouïe)</Link></strong> : Digérer les flux d'informations, filtrer le bruit.</li>
            <li><strong><Link href="/platforms/kreature/anatomie/sens/ariane" className="text-primary hover:underline">Ariane (La Vue)</Link></strong> : Naviguer dans les interfaces et les graphes de données.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. La Délibération (Konnaxion)</h2>
          <p>L'information doit être traitée par l'esprit collectif.</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong><Link href="/platforms/kreature/anatomie/esprit/konnaxion" className="text-primary hover:underline">Konnaxion (L'Esprit)</Link></strong> : Apprendre, débattre dans le Korum, voter.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. L'Expression (Architect)</h2>
          <p>Une fois la décision prise, il faut formuler une réponse claire.</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong><Link href="/platforms/kreature/anatomie/voix/architect" className="text-primary hover:underline">Architect (La Voix)</Link></strong> : Générer du texte structuré, publier du contenu.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. L'Intégration (SwarmCraft & Âme)</h2>
          <p>Enfin, on inscrit l'expérience dans la mémoire et le sens.</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong><Link href="/platforms/kreature/anatomie/memoire/swarmcraft" className="text-primary hover:underline">SwarmCraft (La Mémoire)</Link></strong> : Mettre à jour la Story Bible.</li>
            <li><strong><Link href="/platforms/kreature/anatomie/ame/ame-artificielle" className="text-primary hover:underline">Âme Artificielle (La Conscience)</Link></strong> : Vérifier l'alignement éthique.</li>
          </ul>
        </section>

        <section className="border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Rituels Connexes</h2>
          <ul className="space-y-2">
            <li><Link href="/platforms/kreature/rituels/cycle-vital" className="text-primary hover:underline">Cycle Vital</Link></li>
            <li><Link href="/platforms/kreature/rituels/respiration-du-sens" className="text-primary hover:underline">Respiration du Sens</Link></li>
            <li><Link href="/platforms/kreature/rituels/parlement-interieur" className="text-primary hover:underline">Parlement Intérieur</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
