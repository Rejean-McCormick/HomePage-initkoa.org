import Link from 'next/link';
import { finalArchitecture } from '@/lib/final-system';

export const metadata = {
  title: '24 functional chains — kOA target system',
  description: 'The target functional capabilities of the federated kOA ecosystem, explicitly distinguished from implemented or deployed behavior.',
};

export default function FunctionalChainsIndex() {
  return (
    <main lang="en" className="not-prose max-w-4xl mx-auto py-10">
      <Link href="/ecosystem" className="text-sm text-[#1e6864] hover:underline">← Final-system overview</Link>
      <h1 className="mt-5 text-4xl font-semibold">Functional chains</h1>
      <p className="mt-4 text-slate-700 leading-7">Each chain describes an independent capability, its owner and its intended result. The chains compose only through explicitly adopted and tested contracts.</p>
      <p className="mt-3 text-sm text-slate-600"><strong>Design specification:</strong> none of these catalogue entries is a claim that the full chain is deployed.</p>
      <ol className="mt-8 grid gap-4">
        {finalArchitecture.chains.map((chain) => (
          <li key={chain.id} className="rounded-lg border border-slate-200 p-5 hover:border-[#1e6864]">
            <Link href={`/ecosystem/functional-chains/${chain.id}`} className="block text-[#1e6864] hover:underline font-semibold text-lg">
              <span className="mr-3 font-mono text-sm">{chain.id}</span>{chain.title}
            </Link>
            <p className="text-sm text-slate-700 mt-2">{chain.outcome}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
