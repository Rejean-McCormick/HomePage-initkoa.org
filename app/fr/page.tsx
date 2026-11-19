import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Découvrir kOA en français",
  description: "Introduction francophone au projet kOA et orientation vers ses ressources publiques.",
  alternates: { canonical: "/fr" },
};

export default function FrenchOverview() {
  return (
    <main lang="fr" className="mx-auto max-w-3xl space-y-7">
      <h1>Découvrir kOA en français</h1>
      <p>kOA explore une infrastructure de connaissances partagées pour relier les sources, la délibération, les décisions et l'action collective, avec des règles vérifiables.</p>
      <p><strong>Note linguistique :</strong> cette page est une introduction en français. La documentation complète n'est pas encore traduite et la plupart des pages liées sont en anglais.</p>
      <section>
        <h2>Par où commencer ?</h2>
        <ul>
          <li><Link href="/">Accueil et exemple concret</Link> : un jardin de quartier et les observations à confronter.</li>
          <li><Link href="/technology/kristal">Kristal</Link> : la provenance et l'évolution des connaissances.</li>
          <li><Link href="/ecosystem">Écosystème</Link> : rôles, frontières et responsabilités des composants.</li>
          <li><Link href="/evidence">Preuves et limites</Link> : distinguer conception, vérifications et déploiement.</li>
          <li><Link href="/reading">Lectures</Link> : les documents publiés, avec la langue de chaque document.</li>
          <li><Link href="/links">Contact et canaux</Link>.</li>
        </ul>
      </section>
      <p><Link href="/">Retour à la version principale (anglais)</Link></p>
    </main>
  );
}
