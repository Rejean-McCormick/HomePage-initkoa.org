import Link from 'next/link';
import { finalArchitecture } from '@/lib/final-system';

export const metadata = {
  title: 'Ecosystem — kOA',
  description: 'Explore the target functional architecture of the kOA ecosystem: 24 independently owned capabilities and their boundaries.',
};

const categories = [
  { title: 'Knowledge and sources', ids: ['FC-01', 'FC-02', 'FC-03', 'FC-04', 'FC-05', 'FC-06'] },
  { title: 'Civic, educational and institutional work', ids: ['FC-07', 'FC-08', 'FC-09', 'FC-10', 'FC-11'] },
  { title: 'Language, security and execution', ids: ['FC-12', 'FC-13', 'FC-14', 'FC-15', 'FC-16', 'FC-17'] },
  { title: 'Qualification, domains and continuity', ids: ['FC-18', 'FC-19', 'FC-20', 'FC-21', 'FC-22', 'FC-23', 'FC-24'] },
];

export default function EcosystemArchitecture() {
  return (
    <main lang="en" className="not-prose mx-auto max-w-5xl py-10">
      <p className="text-xs uppercase tracking-widest font-bold text-[#1e6864]">Ecosystem / architecture</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">How the kOA ecosystem fits together</h1>
      <p className="mt-5 text-lg leading-8 text-slate-700">
        The digital ecosystem connects knowledge, language, collaboration and operations. Learning environments, creative work and infrastructure give these capabilities places to be used and passed on.
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#1e6864]">
        <li><Link href="/platforms">Platforms</Link></li>
        <li><Link href="/learning-and-culture">Learning &amp; Culture</Link></li>
        <li><Link href="/infrastructures">Infrastructures</Link></li>
        <li><Link href="/evidence">Evidence &amp; Documentation</Link></li>
      </ul>
      <p className="mt-4 text-sm border-l-4 border-[#1e6864] pl-4 text-slate-600">
        <strong>Target design, not deployment evidence.</strong> The catalogue below describes the intended system as of {finalArchitecture.as_of}.
        A documented contract, build or code snapshot does not establish a qualified integration or public release.
      </p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Target architecture coverage">
        {[
          { label: 'Functional chains', value: finalArchitecture.scope.chain_count },
          { label: 'Registered repositories', value: finalArchitecture.scope.repository_count },
          { label: 'Proposed owner boundaries', value: finalArchitecture.scope.boundary_count },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <dt className="text-sm text-slate-600">{item.label}</dt>
            <dd className="mt-2 text-3xl font-semibold tabular-nums text-[#1e6864]">{item.value}</dd>
          </div>
        ))}
      </dl>
      <section className="mt-12" aria-labelledby="functional-groups">
        <div className="flex flex-wrap justify-between items-baseline gap-4">
          <h2 id="functional-groups" className="text-2xl font-semibold">Functional capabilities</h2>
          <Link className="text-[#1e6864] underline underline-offset-4" href="/ecosystem/functional-chains">Browse all 24 chains</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 mt-6">
          {categories.map((group) => (
            <div key={group.title} className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-3">{group.title}</h3>
              <ul className="space-y-2 text-sm">
                {group.ids.map((id) => {
                  const chain = finalArchitecture.chains.find((item) => item.id === id);
                  return chain ? <li key={id}><Link className="hover:underline text-[#1e6864]" href={`/ecosystem/functional-chains/${id}`}><span className="font-mono mr-2">{id}</span>{chain.title}</Link></li> : null;
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-12 border-t border-slate-200 pt-8" aria-labelledby="separate-authorities">
        <h2 id="separate-authorities" className="text-2xl font-semibold">Boundaries that matter</h2>
        <p className="mt-4 leading-7 text-slate-700">Skope/EncyK collects research; Médiathèque preserves sources; Framework and the Authoring Kit control semantic identity and local builds. Konnaxion owns civic decisions, while Orgo owns real Cases and Tasks. An educational preview cannot create work or write to Moodle without separate authority.</p>
        <p className="mt-4 leading-7 text-slate-700">Koali Spaces is an optional presentation layer. Content qualification, publication consent and host activation are separate lifecycle decisions.</p>
        <p className="mt-5 text-sm text-slate-600">
          The detailed normative owner specifications belong to their repositories. See the{' '}
          <a className="text-[#1e6864] underline underline-offset-4" href="https://github.com/Rejean-McCormick/kOA-Digital-Ecosystem">C0 source repository</a>
          {' '}and the <a className="text-[#1e6864] underline underline-offset-4" href="https://docs.initkoa.org/">documentation portal</a> for source-attributed context.
        </p>
      </section>
    </main>
  );
}
