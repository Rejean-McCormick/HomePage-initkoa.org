
import Link from 'next/link';

export const metadata = {
  title: "Contact & Inventory",
  description: "Connect with the Architect."
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Contact & Inventory</h1>
      
      <p>The ecosystem is vast. Here are the primary entry points.</p>

      <h2>Digital Presence</h2>
      <ul>
        <li><strong>X (Twitter):</strong> <a href="https://x.com/KingKlownXYZ">@KingKlownXYZ</a></li>
        <li><strong>GitHub:</strong> <a href="https://github.com/Rejean-McCormick">Rejean-McCormick</a></li>
        <li><strong>Email:</strong> k@kingklown.com</li>
      </ul>

      <h2>Domains</h2>
      <ul>
        <li><strong>KingKlown.wiki:</strong> The Knowledge Base.</li>
        <li><strong>Okido.wiki:</strong> This Documentation Site.</li>
        <li><strong>KingKlown.ca:</strong> The Political Movement.</li>
      </ul>
    </main>
  );
}
