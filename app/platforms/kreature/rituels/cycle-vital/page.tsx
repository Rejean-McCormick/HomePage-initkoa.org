import Link from 'next/link';

export const metadata = {
  title: "Le Cycle Vital",
  description: "La boucle de rétroaction entre l'individu et le collectif."
};

export default function CycleVitalPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Le Cycle Vital</h1>
      <p>Kréature n'est pas statique. Elle vit par le mouvement de l'information.</p>
      <ol>
        <li><strong>Input (Sens)</strong> : <Link href="/platforms/kreature/anatomie/sens/sentient">SenTient</Link> capte le signal.</li>
        <li><strong>Traitement (Esprit)</strong> : <Link href="/platforms/kreature/anatomie/esprit/konnaxion">Konnaxion</Link> analyse et vote.</li>
        <li><strong>Décision (Âme)</strong> : <Link href="/platforms/kreature/anatomie/ame/ame-artificielle">Âme Artificielle</Link> valide l'éthique.</li>
        <li><strong>Action (Corps)</strong> : <Link href="/platforms/kreature/anatomie/corps/orgo">Orgo</Link> exécute la tâche.</li>
        <li><strong>Mémoire (Narratif)</strong> : <Link href="/platforms/kreature/anatomie/memoire/swarmcraft">SwarmCraft</Link> écrit l'histoire.</li>
      </ol>
      <p><Link href="/platforms/kreature/rituels/une-journee">Retour aux Rituels</Link></p>
    </main>
  );
}
