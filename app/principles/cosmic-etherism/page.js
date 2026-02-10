// app/principles/cosmic-etherism/page.js
import Link from 'next/link';
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Cosmic Etherism (Optional) – Pi, Symbolism, and Fiction',
  description:
    'A personal philosophical lens (Cosmic Etherism + Pi symbolism). Explicitly optional and kept separate from civic + AI initiatives.',
};

export default function CosmicEtherismPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Cosmic Etherism</h1>

      {/* Separation / Scope */}
      <div className="mb-10 p-5 rounded-lg border border-amber-300 bg-amber-50">
        <h2 className="text-xl font-bold mb-2">Scope boundary (non-negotiable)</h2>

        <p className="text-gray-800">
          This section is <strong>fully optional</strong>. You can use, support, critique, or
          contribute to any civic or technical part of the ecosystem without adopting, endorsing, or
          even reading this worldview.
        </p>

        <p className="text-gray-800 mt-3">
          It is intentionally <strong>kept separate</strong> from civic principles and AI alignment
          work.
        </p>

        <p className="text-gray-700 mt-3">
          The only connection is narrative: <strong>Âme artificielle</strong> can be used as a{' '}
          <strong>fiction framework</strong> for staging and mythos in my books.
        </p>
      </div>

      {/* Navigation cards */}
      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <Link
          href="/principles/cosmic-etherism/principles"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
        >
          <h2 className="text-lg font-bold mb-2">Principles</h2>
          <p className="text-gray-700">
            The basic claims and orientation of Cosmic Etherism (optional worldview guidance).
          </p>
        </Link>

        <Link
          href="/principles/cosmic-etherism/methods"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
        >
          <h2 className="text-lg font-bold mb-2">Methods</h2>
          <p className="text-gray-700">
            How it’s explored: inquiry, experience, interpretation, and revision over time.
          </p>
        </Link>

        <Link
          href="/principles/cosmic-etherism/practices"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
        >
          <h2 className="text-lg font-bold mb-2">Practices</h2>
          <p className="text-gray-700">
            Optional practices: reflection, compassion, harmony-building, and creative symbolism.
          </p>
        </Link>

        <Link
          href="/principles/cosmic-etherism/faq"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
        >
          <h2 className="text-lg font-bold mb-2">FAQ</h2>
          <p className="text-gray-700">What this is (and is not), plus common questions.</p>
        </Link>
      </div>

      {/* Pi symbolism */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-primary">Pi as a symbolic anchor (optional)</h2>

        <p className="text-gray-700">
          In this worldview, <strong>π (Pi)</strong> is treated as a symbol of invariant structure:
          a constant relationship that appears wherever circles appear. The purpose here is
          interpretive—using a stable mathematical relationship as a metaphor for coherence.
        </p>

        <Link className="underline" href="/principles/cosmic-etherism/symbols/pi">
          Open Pi symbolism
        </Link>
      </section>

      {/* Only integration point */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">
          The only integration point: Âme artificielle + King Klown (fiction)
        </h2>

        <p className="text-gray-700">
          Cosmic Etherism and Pi symbolism connect to the broader universe only through{' '}
          <strong>Âme artificielle</strong> as a narrative device and philosophical backdrop for{' '}
          <strong>fiction</strong>—specifically the staging and mythos of <strong>King Klown</strong>.
        </p>

        <div className="mt-4 p-5 rounded-lg border border-gray-200 bg-white">
          <h3 className="text-lg font-bold mb-3">Related fiction</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a
                className="underline"
                href="https://www.amazon.ca/Konvergence-%C3%89cho%C3%AFsme-R%C3%A9jean-McCormick-ebook/dp/B0F1CBRP1L?ref_=ast_author_dp_rw&th=1&psc=1&dib_tag=AUTHOR"
                target="_blank"
                rel="noopener noreferrer"
              >
                Konvergence – Échoïsme
              </a>
            </li>
            <li>
              <a
                className="underline"
                href="https://www.amazon.ca/King-Klown-Kronicles-hidden-Manifesto-ebook/dp/B0DZ76L1N3?ref_=ast_author_dp_rw&th=1&psc=1&dib_tag=AUTHOR"
                target="_blank"
                rel="noopener noreferrer"
              >
                King Klown Kronicles – The hidden Manifesto
              </a>
            </li>
          </ul>

          <p className="text-gray-600 mt-3">
            These links are provided for readers who want narrative context. They do not establish
            obligations for any other initiative.
          </p>
        </div>
      </section>

      {/* Footer nav */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/principles"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Principles
        </Link>
        <Link
          href="/principles/map"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Map
        </Link>
      </div>
    </PageSection>
  );
}
