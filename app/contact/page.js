import Link from 'next/link';

export const metadata = {
  title: "About the Architect & Inventory",
  description: "Socio-technical architecture and digital inventory of Réjean McCormick."
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      
      {/* HEADER SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl md:text-6xl font-serif font-medium mb-4 text-slate-900">
          Réjean McCormick
        </h1>
        <h3 className="text-xl text-primary font-mono uppercase tracking-widest mb-8">
          Socio-technical Architect
        </h3>
        
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p className="text-2xl font-light text-slate-800 mb-6">
            I design and ship civic utilities: shared infrastructure that helps people learn, coordinate, and govern together.
          </p>
          <p>
            My work bridges rigid technical systems with fluid narrative layers. I build engines that deconstruct linear human language into structured, universal concepts—enabling organizations to be faster, smarter, and independent.
          </p>
          <p className="font-medium text-sm">
            <strong>Academic Profile: </strong> 
            <a href="https://philpeople.org/profiles/rejean-mccormick" target="_blank" className="text-primary hover:underline underline-offset-4">
              PhilPeople/Rejean-McCormick
            </a>
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-20">
        
        {/* STRATEGY */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-6 text-slate-900">The Strategy: Connection vs. Independence</h2>
          <p className="text-slate-600 mb-6">
            My architecture is built on a deliberate balance between two opposing needs:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-6">
            <li><strong>Global Connection (Konnaxion):</strong> A public ecosystem to connect everyone and share knowledge openly.</li>
            <li><strong>Hermetic Independence (Orgo):</strong> A private, closed-network nervous system for organizations that need absolute data sovereignty.</li>
          </ul>
          <p className="text-slate-600 italic border-l-2 border-primary pl-4">
            To achieve this without relying on external "Big Tech" APIs or constant internet access, I had to build my own engines.
          </p>
        </section>

        {/* ENGINES */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">The Engines (Core Logic)</h2>
          <div className="grid gap-8">
            
            {/* SenTient */}
            <div className="bg-slate-50 p-6 rounded-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-1">SenTient: The Deconstructor</h3>
              <div className="text-xs font-mono text-slate-500 mb-4 uppercase tracking-wider">Active Development (Open Source) | NLP Engine</div>
              <p className="text-slate-600 mb-4">
                To make Orgo and Konnaxion truly independent, I needed a "language deconstructor" that could operate offline, without relying on external LLMs.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 mb-4">
                <li><strong>The Build:</strong> Merged features of OpenTapioca, Falcon, and OpenRefine.</li>
                <li><strong>The Function:</strong> Deconstructs linear sentences into structured Wikidata items to remove ambiguity.</li>
                <li><strong>The Goal:</strong> Enable language-independent data flow within private bubbles or public networks.</li>
              </ul>
              <Link href="/technology/sentient" className="text-primary text-sm font-medium hover:underline underline-offset-4">
                Access SenTient Technical Wiki →
              </Link>
            </div>

            {/* Abstract Wiki Architect */}
            <div className="bg-slate-50 p-6 rounded-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Abstract Wiki Architect</h3>
              <div className="text-xs font-mono text-slate-500 mb-4 uppercase tracking-wider">Active Development (Open Source) | NLG Middleware</div>
              <p className="text-slate-600 mb-4">
                To make Konnaxion available to all, I needed a way to generate multilingual articles from abstract data.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 mb-4">
                <li><strong>Role:</strong> Structural design and relationship mapping for the wiki ecosystem.</li>
                <li>
                  <a href="https://meta.wikimedia.org/w/index.php?title=Abstract_Wikipedia/Tools/abstract-wiki-architect" target="_blank" className="hover:text-primary underline decoration-slate-300 underline-offset-2">
                    Wikimedia Tool Page
                  </a>
                </li>
              </ul>
              <Link href="/technology/abstract-wiki" className="text-primary text-sm font-medium hover:underline underline-offset-4">
                Access Architect Technical Wiki →
              </Link>
            </div>
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">The Ecosystem: KOA</h2>
          <p className="text-slate-600 mb-6">KOA is the public-good ecosystem built on top of these engines.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Konnaxion */}
            <div>
              <h3 className="text-lg font-bold text-slate-900">1. Konnaxion (The Open Web)</h3>
              <div className="text-xs font-mono text-slate-500 mb-3">Multi-Tenant Web Platform</div>
              <p className="text-sm text-slate-600 mb-3">
                Mission: Connect everyone. Stitches together existing OER catalogs and civic tools rather than rebuilding them.
              </p>
              <ul className="text-sm text-slate-500 mb-4 space-y-1">
                 <li><a href="https://konnaxion.com" target="_blank" className="hover:text-primary">Official Site (konnaxion.com)</a></li>
                 <li><a href="https://kingklown.wiki/" target="_blank" className="hover:text-primary">Presentation (kingklown.wiki)</a></li>
              </ul>
              <Link href="/platforms/konnaxion" className="text-primary text-sm font-medium hover:underline underline-offset-4">
                Technical Wiki →
              </Link>
            </div>

            {/* Orgo */}
            <div>
              <h3 className="text-lg font-bold text-slate-900">2. Orgo (The Hermetic Bubble)</h3>
              <div className="text-xs font-mono text-slate-500 mb-3">Private Enterprise SaaS / ERP</div>
              <p className="text-sm text-slate-600 mb-3">
                Mission: Organize and Go. A nervous system for organizations that ensures Privacy, Resilience, and Security (via SenTient).
              </p>
              <ul className="text-sm text-slate-500 mb-4 space-y-1">
                 <li><a href="https://administrative-efficienc-0u6vhrh.gamma.site/" target="_blank" className="hover:text-primary">Presentation of Orgo</a></li>
              </ul>
              <Link href="/platforms/orgo" className="text-primary text-sm font-medium hover:underline underline-offset-4">
                Technical Wiki →
              </Link>
            </div>
          </div>
        </section>

        {/* COMMERCIAL & RESEARCH */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-6 text-slate-900">Commercial & Research Modules</h2>
          <div className="space-y-6">
            
            <div className="border-l-4 border-slate-200 pl-4">
              <h3 className="font-bold text-slate-900">Ariane (Commercial)</h3>
              <p className="text-sm text-slate-600">Semantic Middleware / Knowledge Graph Infrastructure. The "Thread" and navigation system.</p>
              <Link href="/technology/ariane" className="text-xs font-mono text-primary hover:text-slate-800">VIEW SPECS</Link>
            </div>

            <div className="border-l-4 border-slate-200 pl-4">
              <h3 className="font-bold text-slate-900">SwarmCraft (Research)</h3>
              <p className="text-sm text-slate-600">Deterministic Workflow Engine. Managing swarm intelligence and prompt pipelines.</p>
              <Link href="/technology/swarmcraft" className="text-xs font-mono text-primary hover:text-slate-800">VIEW SPECS</Link>
            </div>

            <div className="border-l-4 border-slate-200 pl-4">
              <h3 className="font-bold text-slate-900">Ame-Artificielle (Research)</h3>
              <p className="text-sm text-slate-600">AI Alignment & Meta-Cognition Framework. Ethics and functional specs for synthetic souls.</p>
              <Link href="/technology/ai-alignment" className="text-xs font-mono text-primary hover:text-slate-800">VIEW SPECS</Link>
            </div>

          </div>
        </section>

        {/* NARRATIVE & INVENTORY */}
        <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-gray-100">
          
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-400 mb-6">The Narrative Layer</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-medium text-slate-900">Books</h4>
                <p className="text-sm text-slate-600">The Book of kOA, Konvergence: Échoïsme, King Klown Kronicles, Empowering AI for Programmers.</p>
              </div>
              <div>
                <h4 className="font-serif font-medium text-slate-900">Audio & Stage</h4>
                <p className="text-sm text-slate-600">Podcast "Mythos King Klown", 100+ AI Songs, "Le Ninja Arc-en-ciel" (Stage Show).</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-400 mb-6">Full Digital Inventory</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><strong className="text-slate-900">Roadmap:</strong> <a href="https://kingklown.xyz/koa" target="_blank" className="hover:text-primary">kingklown.xyz/koa</a></li>
              <li><strong className="text-slate-900">General:</strong> <a href="https://kingklown.com" target="_blank" className="hover:text-primary">kingklown.com</a></li>
              <li><strong className="text-slate-900">Movement:</strong> <a href="https://kingklown.ca" target="_blank" className="hover:text-primary">kingklown.ca</a></li>
              <li><strong className="text-slate-900">Knowledge:</strong> <a href="https://kingklown.wiki" target="_blank" className="hover:text-primary">kingklown.wiki</a></li>
              <li><strong className="text-slate-900">Docs:</strong> <a href="https://okido.wiki" target="_blank" className="hover:text-primary">okido.wiki</a></li>
              <li><strong className="text-slate-900">Store:</strong> <a href="https://kingklown.store" target="_blank" className="hover:text-primary">kingklown.store</a></li>
              <li><strong className="text-slate-900">Contact:</strong> k@kingklown.com</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-100 flex gap-4 text-xs font-mono text-slate-400">
              <a href="https://x.com/KingKlownXYZ" target="_blank" className="hover:text-primary">X (Twitter)</a>
              <a href="https://github.com/Rejean-McCormick" target="_blank" className="hover:text-primary">GitHub</a>
              <a href="https://youtube.com/@KingKlownXYZ" target="_blank" className="hover:text-primary">YouTube</a>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}