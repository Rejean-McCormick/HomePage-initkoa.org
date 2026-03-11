// app/about/page.js
import Link from "next/link";

export const metadata = {
  title: "About — Réjean McCormick",
  description:
    "Réjean McCormick — socio-technical architect building offline-capable civic utilities, technical systems, and AI-ready context packs for learning, coordination, and governable decision-making.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://initkoa.org/about#profile",
  url: "https://initkoa.org/about",
  name: "About — Réjean McCormick",
  mainEntity: {
    "@type": "Person",
    "@id": "https://initkoa.org/about#rejean-mccormick",
    name: "Réjean McCormick",
    url: "https://initkoa.org/about",
    email: "mailto:rejean.mccormick@initkoa.org",
    jobTitle: "Socio-technical architect",
    description:
      "Socio-technical architect building civic utilities, offline-capable systems, and AI-ready context packs for learning, coordination, and governable decision-making.",
    sameAs: [
      "https://www.linkedin.com/in/r%C3%A9jean-mccormick-51403a37b/",
      "https://orcid.org/0009-0001-2086-854X",
      "https://scholar.google.com/citations?user=oVZ3n9kAAAAJ&hl=en",
      "https://mastodon.social/@Rejean_McCormick",
      "https://www.facebook.com/profile.php?id=61566663549235",
      "https://meta.wikimedia.org/wiki/User:R%C3%A9jean_McCormick",
      "https://philpeople.org/profiles/rejean-mccormick",
      "https://medium.com/@boatbuilder610",
      "https://www.amazon.ca/stores/author/B0G3B7DQWG?ingress=0&visitId=2c136ee2-ccf3-47b2-a4c9-c04125871944",
      "https://soundcloud.com/rejean-mccormick",
      "https://github.com/Rejean-McCormick/"
    ]
  }
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <h1>Réjean McCormick</h1>

      <p className="text-lg text-slate-600">
        <strong>Socio-technical architect</strong> building <strong>civic utilities</strong>: shared
        infrastructure that helps people learn, coordinate, and govern together—without depending on fragile platforms
        or opaque systems.
      </p>

      <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/why"
          className="border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors"
        >
          <strong>Start here: The Diagnosis</strong>
          <div className="text-sm text-slate-600">Why these utilities are needed.</div>
        </Link>

        <Link
          href="/platforms"
          className="border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors"
        >
          <strong>Platforms</strong>
          <div className="text-sm text-slate-600">Konnaxion, Orgo, and operational building blocks.</div>
        </Link>

        <Link
          href="/technology"
          className="border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors"
        >
          <strong>Technology</strong>
          <div className="text-sm text-slate-600">Architecture, documentation, and system design.</div>
        </Link>

        <Link
          href="/technology/context-packs"
          className="border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors"
        >
          <strong>Context Packs</strong>
          <div className="text-sm text-slate-600">
            AI-ready reference bundles for retrieval, generation, and controlled context injection.
          </div>
        </Link>

        <Link
          href="/links"
          className="border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors sm:col-span-2"
        >
          <strong>Full inventory / web presence</strong>
          <div className="text-sm text-slate-600">All hubs, books, music, socials, code.</div>
        </Link>
      </div>

      <hr className="my-8 border-slate-200" />

      <h2>What I’m building (kOA)</h2>
      <p>
        kOA is built around a closed operational loop: <strong>learn → deliberate → decide → execute → preserve</strong>.
        The goal is not “more content” or “more AI”, but <strong>legitimate decisions</strong> that can be audited,
        and <strong>reliable execution</strong> that still works under real constraints (outages, low connectivity, offline).
      </p>

      <h3>Two-layer public architecture</h3>
      <ul>
        <li>
          <strong>Operational spine</strong>: platforms, infrastructure, and governance mechanics that can be inspected,
          deployed, and used.
        </li>
        <li>
          <strong>Context layer</strong>: documentation and AI-ready context packs that make system knowledge portable,
          retrievable, and reusable across tools and environments.
        </li>
        <li>
          <strong>Cultural diffusion</strong>: narrative formats used as pedagogy and onboarding—designed to return to
          operational clarity, not replace it.
        </li>
      </ul>

        <hr className="my-8 border-slate-200" />

      <h2>Contact</h2>
      <ul>
        <li>
          <strong>Email</strong>:{" "}
          <a href="mailto:rejean.mccormick@initkoa.org">rejean.mccormick@initkoa.org</a>
        </li>
        <li>
          <strong>Code</strong>:{" "}
          <a href="https://github.com/Rejean-McCormick/" target="_blank" rel="noopener noreferrer">
            github.com/Rejean-McCormick
          </a>
        </li>
      </ul>
    </main>
  );
}