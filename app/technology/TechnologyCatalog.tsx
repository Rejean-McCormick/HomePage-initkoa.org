"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Github, Search, X } from 'lucide-react';
import {
  TECHNOLOGY_CATALOG,
  TECHNOLOGY_CATEGORIES,
  type TechnologyCategory,
  type TechnologyEntry,
} from '@/lib/technology-catalog';

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en-CA');

function EntryCard({ entry }: { entry: TechnologyEntry }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-teal-400 hover:shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
          {entry.kind}
        </span>
        {entry.internal ? <span className="text-[11px] font-medium text-teal-700">kOA page</span> : null}
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-slate-900">{entry.name}</h3>
      <p className="mt-2 text-xs font-medium text-slate-600">Catalogued · deployment status not verified here</p>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{entry.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-100 pt-4 text-sm font-semibold">
        {entry.internal ? (
          <Link href={entry.internal} className="inline-flex items-center gap-1 text-teal-800 hover:underline">
            Explore <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        ) : null}
        {entry.repository ? (
          <a href={entry.repository} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 hover:underline">
            <Github aria-hidden="true" className="h-4 w-4" /> Repository <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="sr-only">{entry.name} repository, opens in a new tab</span>
          </a>
        ) : null}
        {!entry.internal && !entry.repository ? (
          <span className="inline-flex items-center gap-1 text-slate-500"><BookOpen aria-hidden="true" className="h-4 w-4" /> Documentation</span>
        ) : null}
      </div>
    </article>
  );
}

export default function TechnologyCatalog() {
  const [category, setCategory] = useState<TechnologyCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const visible = useMemo(() => {
    const query = normalize(search.trim());
    return TECHNOLOGY_CATALOG.filter((entry) =>
      (category === 'all' || entry.category === category) &&
      (!query || normalize(`${entry.name} ${entry.description} ${entry.kind}`).includes(query))
    );
  }, [category, search]);

  return (
    <section id="catalogue" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10" aria-labelledby="catalogue-title">
      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">Technology catalog</span>
        <h2 id="catalogue-title" className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Explore projects
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Browse applications, systems and tools documented in the project repositories.
          Each entry describes a documented role, not a deployment certification. Check its source,
          dated engineering evidence and release history to determine implementation maturity.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <label htmlFor="technology-search" className="mb-2 block text-sm font-semibold text-slate-800">
          Search by name or function
        </label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
          <input
            id="technology-search"
            type="search"
            autoComplete="off"
            placeholder="Try Kristal, learning, identity or publishing"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${category === 'all' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-500'}`}>
            All ({TECHNOLOGY_CATALOG.length})
          </button>
          {TECHNOLOGY_CATEGORIES.map((item) => (
            <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${category === item.id ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-500'}`}>
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="mb-5 flex min-h-8 flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <p><strong className="text-slate-900">{visible.length}</strong> {visible.length === 1 ? 'project' : 'projects'} found</p>
        {(search || category !== 'all') ? (
          <button type="button" onClick={() => { setSearch(''); setCategory('all'); }} className="inline-flex items-center gap-1 font-semibold text-teal-800 hover:underline">
            <X aria-hidden="true" className="h-4 w-4" /> Clear filters
          </button>
        ) : null}
      </div>

      {visible.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((entry) => <EntryCard key={entry.name} entry={entry} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="font-semibold text-slate-800">No projects match this search.</p>
          <p className="mt-2 text-sm text-slate-500">Try another search or clear the filters.</p>
        </div>
      )}
    </section>
  );
}
