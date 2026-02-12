'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

type UiLang = 'en' | 'fr';

type TopicLabel = { en?: string; fr?: string };

type Taxonomies = {
  topics?: string[];
  topic_labels?: Record<string, TopicLabel>;
  languages?: Array<'en' | 'fr'>;
  // keep other taxonomy keys if present (types/levels/sections/platforms etc.)
  [k: string]: unknown;
};

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
  schemaVersion?: string;
  generatedAt: string;
  taxonomies?: Taxonomies;
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

function deepClone<T>(x: T): T {
  // structuredClone is supported in modern browsers; fallback keeps it robust
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sc = (globalThis as any).structuredClone as undefined | ((v: any) => any);
  if (typeof sc === 'function') return sc(x);
  return JSON.parse(JSON.stringify(x)) as T;
}

function normalizeCatalog(raw: any): Catalog {
  const taxonomies: Taxonomies | undefined =
    raw?.taxonomies && typeof raw.taxonomies === 'object' ? raw.taxonomies : undefined;

  const itemsRaw = Array.isArray(raw?.items) ? raw.items : [];
  const items: Item[] = itemsRaw.map((x: any) => ({
    id: String(x?.id ?? ''),
    title: String(x?.title ?? ''),
    url: String(x?.url ?? ''),
    description: typeof x?.description === 'string' ? x.description : null,
    type: String(x?.type ?? ''),
    language: x?.language === 'en' || x?.language === 'fr' ? x.language : null,
    topics: Array.isArray(x?.topics) ? x.topics.filter((t: any) => typeof t === 'string') : [],
  }));

  // If taxonomies.topics missing, we can derive a fallback so editor still works
  let topicsFallback: string[] | undefined;
  if (!Array.isArray(taxonomies?.topics)) {
    const set = new Set<string>();
    for (const it of items) for (const t of it.topics ?? []) if (t) set.add(t);
    topicsFallback = Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  const safeTaxonomies: Taxonomies | undefined = taxonomies
    ? {
        ...taxonomies,
        topics: Array.isArray(taxonomies.topics) ? taxonomies.topics : topicsFallback,
        topic_labels:
          taxonomies.topic_labels && typeof taxonomies.topic_labels === 'object'
            ? (taxonomies.topic_labels as Record<string, TopicLabel>)
            : {},
      }
    : topicsFallback
      ? { topics: topicsFallback, topic_labels: {}, languages: ['en', 'fr'] }
      : { topic_labels: {}, languages: ['en', 'fr'] };

  return {
    schemaVersion: typeof raw?.schemaVersion === 'string' ? raw.schemaVersion : undefined,
    generatedAt: typeof raw?.generatedAt === 'string' ? raw.generatedAt : '',
    taxonomies: safeTaxonomies,
    items,
  };
}

export default function CatalogEditorPage() {
  const [original, setOriginal] = useState<Catalog | null>(null);
  const [draft, setDraft] = useState<Catalog | null>(null);

  const [uiLang, setUiLang] = useState<UiLang>('en');

  const [q, setQ] = useState('');
  const [topicQ, setTopicQ] = useState('');

  const [newTopicKey, setNewTopicKey] = useState('');
  const [newTopicEn, setNewTopicEn] = useState('');
  const [newTopicFr, setNewTopicFr] = useState('');

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      const r = await fetch('/inventory.catalog.json', { signal: ctrl.signal });
      const raw = await r.json();
      const normalized = normalizeCatalog(raw);
      setOriginal(deepClone(normalized));
      setDraft(normalized);
    })().catch(() => {
      const empty: Catalog = { generatedAt: '', items: [], taxonomies: { topics: [], topic_labels: {}, languages: ['en', 'fr'] } };
      setOriginal(deepClone(empty));
      setDraft(empty);
    });

    return () => ctrl.abort();
  }, []);

  const topicLabel = useCallback(
    (topic: string) => {
      const labels = draft?.taxonomies?.topic_labels ?? {};
      return labels?.[topic]?.[uiLang] ?? topic;
    },
    [draft?.taxonomies?.topic_labels, uiLang]
  );

  // Topics MUST come from taxonomies.topics (dynamic from catalog); fallback is handled in normalize
  const allTopics = useMemo(() => {
    const topics = draft?.taxonomies?.topics ?? [];
    // sort by label in current UI language
    return [...topics].filter(Boolean).sort((a, b) => topicLabel(a).localeCompare(topicLabel(b)));
  }, [draft?.taxonomies?.topics, topicLabel]);

  const visibleTopics = useMemo(() => {
    const s = topicQ.trim().toLowerCase();
    if (!s) return allTopics;
    return allTopics.filter((t) => {
      const raw = t.toLowerCase();
      const lbl = topicLabel(t).toLowerCase();
      return raw.includes(s) || lbl.includes(s);
    });
  }, [allTopics, topicQ, topicLabel]);

  const filteredItems = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return draft?.items ?? [];
    return (draft?.items ?? []).filter((it) => {
      const hay = `${it.title} ${it.url} ${(it.topics ?? []).join(' ')}`.toLowerCase();
      return hay.includes(s);
    });
  }, [draft?.items, q]);

  // Speed up checkbox "checked" lookup
  const topicSetById = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const it of draft?.items ?? []) m.set(it.id, new Set(it.topics ?? []));
    return m;
  }, [draft?.items]);

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

  function addTopicToTaxonomy() {
    const key = newTopicKey.trim();
    if (!key) return;

    setDraft((prev) => {
      if (!prev) return prev;

      const tax = prev.taxonomies ?? {};
      const topics = Array.isArray(tax.topics) ? [...tax.topics] : [];

      if (!topics.includes(key)) topics.push(key);

      const topic_labels: Record<string, TopicLabel> =
        tax.topic_labels && typeof tax.topic_labels === 'object'
          ? { ...(tax.topic_labels as Record<string, TopicLabel>) }
          : {};

      const existing = topic_labels[key] ?? {};
      topic_labels[key] = {
        ...existing,
        ...(newTopicEn.trim() ? { en: newTopicEn.trim() } : {}),
        ...(newTopicFr.trim() ? { fr: newTopicFr.trim() } : {}),
      };

      const updatedTax: Taxonomies = {
        ...tax,
        topics: topics.sort((a, b) => a.localeCompare(b)),
        topic_labels,
        languages: Array.isArray(tax.languages) ? tax.languages : ['en', 'fr'],
      };

      return { ...prev, taxonomies: updatedTax };
    });

    setNewTopicKey('');
    setNewTopicEn('');
    setNewTopicFr('');
  }

  const canExport = !!draft;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 not-prose">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Catalog Editor</h1>
          <p className="text-slate-500 mt-2">
            Edit topics per link. Export JSON and replace <code>public/inventory.catalog.json</code>.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-2">
            <button
              className={`px-3 py-2 rounded-lg border ${uiLang === 'en' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 hover:bg-slate-50'}`}
              type="button"
              onClick={() => setUiLang('en')}
            >
              Labels EN
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${uiLang === 'fr' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 hover:bg-slate-50'}`}
              type="button"
              onClick={() => setUiLang('fr')}
            >
              Étiquettes FR
            </button>
          </div>

          <button
            className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"
            type="button"
            onClick={() => original && setDraft(deepClone(original))}
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[360px_1fr] gap-6">
        {/* LEFT: topic palette driven by taxonomies.topics */}
        <aside className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-slate-900">Topics</h2>
            <span className="text-xs text-slate-500">{allTopics.length}</span>
          </div>

          <input
            value={topicQ}
            onChange={(e) => setTopicQ(e.target.value)}
            placeholder={uiLang === 'fr' ? 'Filtrer…' : 'Filter…'}
            className="mt-3 w-full px-3 py-2 rounded-lg border border-slate-200"
          />

          {/* Add topic to taxonomies */}
          <div className="mt-4 space-y-2">
            <input
              value={newTopicKey}
              onChange={(e) => setNewTopicKey(e.target.value)}
              placeholder="topic_key (e.g. social_cohesion)"
              className="w-full px-3 py-2 rounded-lg border border-slate-200"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={newTopicEn}
                onChange={(e) => setNewTopicEn(e.target.value)}
                placeholder="Label EN"
                className="px-3 py-2 rounded-lg border border-slate-200"
              />
              <input
                value={newTopicFr}
                onChange={(e) => setNewTopicFr(e.target.value)}
                placeholder="Label FR"
                className="px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
            <button
              type="button"
              onClick={addTopicToTaxonomy}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              disabled={!newTopicKey.trim()}
            >
              Add topic to taxonomy
            </button>
          </div>

          <div className="mt-4 max-h-[55vh] overflow-auto space-y-1">
            {visibleTopics.map((t) => (
              <div key={t} className="text-sm text-slate-700 px-2 py-1 rounded hover:bg-slate-50">
                <div className="font-medium">{topicLabel(t)}</div>
                <div className="text-xs text-slate-400">{t}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT: items list with checkboxes (topics from taxonomy) */}
        <section className="rounded-xl border border-slate-200 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold text-slate-900">Links</h2>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title / url / topics…"
              className="w-full md:w-[360px] px-3 py-2 rounded-lg border border-slate-200"
            />
          </div>

          <div className="mt-4 space-y-4">
            {filteredItems.map((it) => {
              const tset = topicSetById.get(it.id) ?? new Set<string>();

              return (
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
                    {visibleTopics.map((topicKey) => {
                      const checked = tset.has(topicKey);
                      return (
                        <label key={topicKey} className="flex items-center gap-2 text-sm text-slate-700">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setTopic(it.id, topicKey, e.target.checked)}
                          />
                          <span className="truncate">{topicLabel(topicKey)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {!filteredItems.length ? <div className="text-sm text-slate-500">No results.</div> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
