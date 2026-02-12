'use client';

import React, { useEffect, useMemo, useState } from 'react';

type Item = {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  type: string;
  language: 'en' | 'fr' | null;
  topics: string[];
};

type Catalog = {
  generatedAt: string;
  items: Item[];
};

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function CatalogEditorPage() {
  const [original, setOriginal] = useState<Catalog | null>(null);
  const [draft, setDraft] = useState<Catalog | null>(null);
  const [q, setQ] = useState('');
  const [topicQ, setTopicQ] = useState('');

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      const r = await fetch('/inventory.catalog.json', { signal: ctrl.signal });
      const data = (await r.json()) as Catalog;

      // minimal normalization
      const normalized: Catalog = {
        generatedAt: typeof data.generatedAt === 'string' ? data.generatedAt : '',
        items: Array.isArray(data.items)
          ? data.items.map((x: any) => ({
              id: String(x?.id ?? ''),
              title: String(x?.title ?? ''),
              url: String(x?.url ?? ''),
              description: typeof x?.description === 'string' ? x.description : null,
              type: String(x?.type ?? ''),
              language: x?.language === 'en' || x?.language === 'fr' ? x.language : null,
              topics: Array.isArray(x?.topics) ? x.topics.filter((t: any) => typeof t === 'string') : [],
            }))
          : [],
      };

      setOriginal(normalized);
      setDraft(normalized);
    })().catch(() => {
      setOriginal({ generatedAt: '', items: [] });
      setDraft({ generatedAt: '', items: [] });
    });

    return () => ctrl.abort();
  }, []);

  const allTopics = useMemo(() => {
    const set = new Set<string>();
    for (const it of draft?.items ?? []) {
      for (const t of it.topics ?? []) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [draft]);

  const visibleTopics = useMemo(() => {
    const s = topicQ.trim().toLowerCase();
    if (!s) return allTopics;
    return allTopics.filter((t) => t.toLowerCase().includes(s));
  }, [allTopics, topicQ]);

  const filteredItems = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return draft?.items ?? [];
    return (draft?.items ?? []).filter((it) => {
      const hay = `${it.title} ${it.url} ${(it.topics ?? []).join(' ')}`.toLowerCase();
      return hay.includes(s);
    });
  }, [draft, q]);

  function setTopic(itemId: string, topic: string, checked: boolean) {
    setDraft((prev) => {
      if (!prev) return prev;
      const items = prev.items.map((it) => {
        if (it.id !== itemId) return it;
        const topics = new Set(it.topics ?? []);
        if (checked) topics.add(topic);
        else topics.delete(topic);
        return { ...it, topics: Array.from(topics).sort((a, b) => a.localeCompare(b)) };
      });
      return { ...prev, items };
    });
  }

  function addTopicEverywhere(topic: string) {
    const t = topic.trim();
    if (!t) return;
    // this only adds it to the global topic list by placing it on 0 items? no.
    // better: add as “available” by applying to selected items; or keep a registry file.
    // For now, we just keep it discoverable by adding to the first item (can be removed later).
    const firstId = draft?.items?.[0]?.id;
    if (!firstId) return;
    setTopic(firstId, t, true);
  }

  const canExport = !!draft;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 not-prose">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Catalog Editor</h1>
          <p className="text-slate-500 mt-2">
            Edit topics per link. Export JSON and replace <code>public/inventory.catalog.json</code>.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"
            type="button"
            onClick={() => original && setDraft(original)}
            disabled={!original}
          >
            Reset
          </button>

          <button
            className="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
            type="button"
            onClick={() => {
              if (!draft) return;
              const out: Catalog = { ...draft, generatedAt: new Date().toISOString() };
              downloadJson('inventory.catalog.json', out);
            }}
            disabled={!canExport}
          >
            Download JSON
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
        {/* LEFT: topic palette */}
        <aside className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-slate-900">Topics</h2>
            <span className="text-xs text-slate-500">{allTopics.length}</span>
          </div>

          <input
            value={topicQ}
            onChange={(e) => setTopicQ(e.target.value)}
            placeholder="Filter topics…"
            className="mt-3 w-full px-3 py-2 rounded-lg border border-slate-200"
          />

          <div className="mt-3 flex gap-2">
            <input
              id="newTopic"
              placeholder="Add topic (string)…"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTopicEverywhere((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>

          <div className="mt-4 max-h-[60vh] overflow-auto space-y-1">
            {visibleTopics.map((t) => (
              <div key={t} className="text-sm text-slate-700 px-2 py-1 rounded hover:bg-slate-50">
                {t}
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT: items list with checkboxes */}
        <section className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-slate-900">Links</h2>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title / url / topics…"
              className="w-full md:w-[360px] px-3 py-2 rounded-lg border border-slate-200"
            />
          </div>

          <div className="mt-4 space-y-4">
            {filteredItems.map((it) => (
              <div key={it.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">{it.title}</div>
                    <a className="text-sm text-slate-600 underline" href={it.url} target="_blank" rel="noreferrer">
                      {it.url}
                    </a>
                    <div className="text-xs text-slate-500 mt-1">
                      {it.language ? it.language.toUpperCase() : '—'} · {it.type}
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {visibleTopics.map((t) => {
                    const checked = (it.topics ?? []).includes(t);
                    return (
                      <label key={t} className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => setTopic(it.id, t, e.target.checked)}
                        />
                        <span className="truncate">{t}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {!filteredItems.length ? (
              <div className="text-sm text-slate-500">No results.</div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
