import Link from 'next/link';

export const metadata = {
  title: "Carte Anatomique",
  description: "Vue d'ensemble des organes."
};

export default function CartePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Carte Anatomique</h1>
      
      <h2>Zone 1: Interface (Le Masque)</h2>
      <ul>
        <li><Link href="/platforms/kreature/anatomie/sens/ariane">Ariane</Link></li>
        <li><Link href="/platforms/kreature/anatomie/sens/sentient">SenTient</Link></li>
      </ul>

      <h2>Zone 2: Cognition (Le Cerveau)</h2>
      <ul>
        <li><Link href="/platforms/kreature/anatomie/esprit/konnaxion">Konnaxion</Link></li>
        <li><Link href="/platforms/kreature/anatomie/memoire/swarmcraft">SwarmCraft</Link></li>
      </ul>

      <h2>Zone 3: Infrastructure (Le Squelette)</h2>
      <ul>
        <li><Link href="/platforms/kreature/anatomie/corps/orgo">Orgo</Link></li>
        <li><Link href="/platforms/kreature/anatomie/voix/architect">Architect</Link></li>
      </ul>

      <p><Link href="/platforms/kreature/initiation">Retour à l'Initiation</Link></p>
    </main>
  );
}
