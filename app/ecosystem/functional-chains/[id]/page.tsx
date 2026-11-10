import Link from 'next/link';
import { notFound } from 'next/navigation';
import { finalArchitecture, getFunctionalChain } from '@/lib/final-system';

export function generateStaticParams() {
  return finalArchitecture.chains.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const chain = getFunctionalChain(params.id);
  return { title: chain ? `${chain.id}: ${chain.title} — kOA` : 'Functional chain not found — kOA' };
}

export default function ChainDetail({ params }: { params: { id: string } }) {
  const chain = getFunctionalChain(params.id);
  if (!chain) notFound();
  const sourcePath = chain.source_path.replace(/^docs\/target\//, "final-system/").replace(/\.md$/, "/");
  const documentationUrl = `https://docs.initkoa.org/${sourcePath}`;
  return (
    <main lang="en" className="not-prose max-w-4xl mx-auto py-10">
      <Link href="/ecosystem/functional-chains" className="text-sm text-[#1e6864] hover:underline">← All functional chains</Link>
      <p className="mt-8 font-mono text-sm text-[#1e6864]">{chain.id} · Target design</p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-900">{chain.title}</h1>
      <section className="mt-8 rounded-xl bg-slate-50 border border-slate-200 p-6">
        <h2 className="text-lg font-semibold">Intended outcome</h2>
        <p className="mt-2 text-slate-700 leading-7">{chain.outcome}</p>
        <h2 className="text-lg font-semibold mt-6">Responsible products and owners</h2>
        <p className="mt-2 text-slate-700 leading-7">{chain.owners}</p>
      </section>
      <p className="mt-7 text-sm leading-7 text-slate-600">
        This is a public summary of the final target architecture, not an operational status report. Implementation, contract acceptance and deployment need independent owner evidence.
      </p>
      <p className="mt-4 text-sm">
        <a className="text-[#1e6864] hover:underline" href={documentationUrl}>Read the detailed source-attributed specification in the documentation portal</a>.
      </p>
    </main>
  );
}
