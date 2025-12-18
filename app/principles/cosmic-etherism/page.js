// app\principles\cosmic-etherism\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Cosmic Etherism (Optional) – Pi, Symbolism, and Fiction',
  description:
    'A personal philosophical lens (Cosmic Etherism + Pi symbolism). Explicitly optional and separated from civic + AI initiatives.',
};

export default function CosmicEtherismPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Cosmic Etherism</h1>

      <div className="mb-10 p-5 rounded-lg border border-amber-300 bg-amber-50">
        <h2 className="text-xl font-bold mb-2">Non-negotiable separation</h2>
        <p className="text-gray-800">
          Believing and/or understanding my perspective on <strong>Pi symbolism</strong> and{' '}
          <strong>Cosmic Etherism</strong> is <strong>100% optional</strong> and{' '}
          <strong>fully separated</strong> from every other initiative (including civic principles
          and AI-alignment).
        </p>
        <p className="text-gray-800 mt-3">
          The <strong>only</strong> exception is <strong>Artificial Soul</strong> and its use as a{' '}
          <strong>fiction framework</strong> for staging <strong>King Klown</strong> in my books.
        </p>
        <p className="text-gray-700 mt-3">
          Practically: you can support, use, contribute to, or critique any other part of the
          ecosystem without adopting, endorsing, or even reading this section.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <a
          href="/principles/cosmic-etherism/principles"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
        >
          <h2 className="text-lg font-bold mb-2">Principles</h2>
          <p className="text-gray-700">
            The founding principles of Cosmic Etherism (optional worldview guidance).
          </p>
        </a>

        <a
          href="/principles/cosmic-etherism/methods"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
        >
          <h2 className="text-lg font-bold mb-2">Methods</h2>
          <p className="text-gray-700">
            How this worldview is explored: inquiry, experience, interpretation, and revision.
          </p>
        </a>

        <a
          href="/principles/cosmic-etherism/practices"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
        >
          <h2 className="text-lg font-bold mb-2">Practices</h2>
          <p className="text-gray-700">
            Optional practices: reflection, compassion, harmony-building, and creative symbolism.
          </p>
        </a>

        <a
          href="/principles/cosmic-etherism/faq"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
        >
          <h2 className="text-lg font-bold mb-2">FAQ</h2>
          <p className="text-gray-700">
            Scope boundaries, common questions, and what this is (and is not).
          </p>
        </a>
      </div>

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-primary">Pi as a symbolic anchor (optional)</h2>
        <p className="text-gray-700">
          In this worldview, <strong>π (Pi)</strong> is treated as a symbol of invariant structure:
          a constant relationship that appears wherever circles appear. The point is symbolic—an
          intuitive bridge between mathematical order and a sense of coherence in the cosmos.
        </p>
        <a className="underline" href="/principles/cosmic-etherism/symbols/pi">
          Open Pi symbolism
        </a>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">
          The only integration point: Artificial Soul + King Klown (fiction)
        </h2>
        <p className="text-gray-700">
          Cosmic Etherism and Pi symbolism connect to the broader universe only through{' '}
          <strong>Artificial Soul</strong> as a narrative device and philosophical backdrop for{' '}
          <strong>fiction</strong>—specifically the staging and mythos of <strong>King Klown</strong>
          .
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
            These links are provided for readers who want the narrative context. They do not
            establish obligations for any other initiative.
          </p>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="/principles"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Principles
        </a>
        <a
          href="/principles/map"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Map
        </a>
      </div>
    </PageSection>
  );
}
