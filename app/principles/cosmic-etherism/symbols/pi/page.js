// app\principles\cosmic-etherism\symbols\pi\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Pi (π) – Symbol (Optional)',
  description: 'Pi as a symbolic anchor within Cosmic Etherism. Explicitly optional and non-scientific in scope.',
};

export default function PiSymbolPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Pi (π) as Symbol</h1>

      <div className="mb-10 p-5 rounded-lg border border-amber-300 bg-amber-50">
        <h2 className="text-xl font-bold mb-2">Non-negotiable separation</h2>
        <p className="text-gray-800">
          This page is part of <strong>Cosmic Etherism</strong>, which is{' '}
          <strong>100% optional</strong> and <strong>fully separated</strong> from every other
          initiative (including civic principles and AI-alignment).
        </p>
        <p className="text-gray-800 mt-3">
          The <strong>only</strong> exception is <strong>Artificial Soul</strong> and its use as a{' '}
          <strong>fiction framework</strong> for staging <strong>King Klown</strong>.
        </p>
      </div>

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-primary">What this page is</h2>
        <p className="text-gray-700">
          This is a symbolic interpretation of <strong>π (Pi)</strong> within an optional worldview.
          Pi is a mathematical constant. Here, it is also treated as an emblem of invariant
          structure—an intuitive pointer toward coherence.
        </p>
      </section>

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-primary">What this page is NOT</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Not a scientific proof of metaphysical claims.</li>
          <li>Not a required belief, initiation, or ideology test.</li>
          <li>Not a policy platform for civic or AI initiatives.</li>
        </ul>
      </section>

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-primary">Symbolic reading</h2>
        <div className="space-y-4">
          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">1) Invariance</h3>
            <p className="text-gray-700">
              Pi expresses a stable relationship: circle circumference relative to diameter. As
              symbol, it points to the idea that some relationships remain stable across contexts.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">2) Recurrence</h3>
            <p className="text-gray-700">
              Circles recur in nature, design, and motion. As symbol, Pi points to recurring
              patterns—things we keep encountering at different scales.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">3) Mystery without mystification</h3>
            <p className="text-gray-700">
              Pi is computable, usable, and still infinite in digits. As symbol, it holds “mystery”
              as something we can approach with curiosity rather than superstition.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">4) Coherence</h3>
            <p className="text-gray-700">
              As symbol, Pi can serve as a personal anchor: return to coherence, return to harmony,
              return to clarity—especially when the world feels fragmented.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">
          Fiction integration: Artificial Soul + King Klown
        </h2>
        <p className="text-gray-700">
          This symbolic layer may be used as part of the <strong>Artificial Soul</strong> motif in
          the <strong>King Klown</strong> fiction universe. Outside fiction, it remains optional and
          non-binding.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="/principles/cosmic-etherism"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Cosmic Etherism
        </a>
        <a
          href="/principles/cosmic-etherism/principles"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Principles
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
