// app/initiatives/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Nos initiatives – KOA',
};

export default function Initiatives() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-10">Nos Initiatives Stratégiques</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <Link
          href="/initiatives/koa-political-movement"
          className="block h-full p-6 border border-gray-300 rounded-lg hover:shadow-xl transition"
        >
          <h2 className="text-xl font-extrabold mb-3">
            Mouvement Politique KOA →
          </h2>
          <p>
            Transformation systémique fondée sur l’intelligence collective,
            le vote méritocratique et la transparence intégrale pour moderniser
            gouvernance, éducation, justice, santé et économie coopérative.
          </p>
        </Link>

        <Link
          href="/initiatives/desjardins-cooperative-transformation"
          className="block h-full p-6 border border-gray-300 rounded-lg hover:shadow-xl transition"
        >
          <h2 className="text-xl font-extrabold mb-3">
            Transformation Coopérative Desjardins →
          </h2>
          <p>
            Projet pilote : présidence bénévole, plafonnement des salaires,
            votes numériques, budgets participatifs locaux et canal philanthropique
            transparent pour redonner le plein pouvoir aux membres.
          </p>
        </Link>

        <Link
          href="/initiatives/ukraine-peace-and-reconstruction-plan"
          className="block h-full p-6 border border-gray-300 rounded-lg hover:shadow-xl transition"
        >
          <h2 className="text-xl font-extrabold mb-3">
            Paix &amp; Reconstruction Ukraine →
          </h2>
          <p>
            Cessez‑le‑feu supervisé, neutralité constitutionnelle, force neutre
            de maintien de la paix, référendums encadrés et fonds mondial pour
            rebâtir infrastructures, économie et cohésion sociale.
          </p>
        </Link>
      </div>
    </main>
  );
}
