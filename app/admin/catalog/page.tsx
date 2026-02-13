'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

type UiLang = 'en' | 'fr';
type TopicLabel = { en?: string; fr?: string };

type RootTaxonomies = {
  topics?: string[];
  topic_labels?: Record<string, TopicLabel>;
  languages?: Array<'en' | 'fr'>;
  [k: string]: unknown;
};

type RootInventory = {
  schemaVersion?: string;
  generatedAt?: string;
  taxonomies?: RootTaxonomies;
  [k: string]: unknown;
};

type CatalogPart = {
  schemaVersion?: string;
  generatedAt?: string;
  taxonomyRef?: string;
  items: Array<Record<string, unknown>>;
  // keep any other top-level fields if you have them
  [k: string]: unknown;
};

type ItemView = {
  __key: string; // unique per catalog+id
  __catalogPath: string;

  // convenience fields for UI (derived from raw item)
  id: string;
  title: string;
  url: string;
  description: string | null;
  type: string;
  language: 'en' | 'fr' | null;
  topics: string[];
};

const INVENTORY_ROOT_PATH = '/inventory.root.json';
const INVENTORY_CATALOG_PATHS = [
  '/inventory.articles.catalog.json',
  '/inventory.audio.catalog.json',
  '/inventory.code-tech.catalog.json',
  '/inventory.youtube.catalog.json',
];

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function cloneDeep<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T;
}

function uniqKeepOrder(arr: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of arr) {
    if (!x) continue;
    if (seen.has(x)) continue;
    seen.add(x);
    out.push(x);
  }
  return out;
}

async function fetchJson(path: string, signal: AbortSignal) {
  const r = await fetch(path, { signal, cache: 'no-store' });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${path}`);
  return r.json();
}

function getStr(o: Record<string, unknown>, k: string, fallback = '') {
  const v = o[k];
  return typeof v === 'string' ? v : fallback;
}

function getTopicsFromItem(o: Record<string, unknown>): string[] {
  const v = o.topics;
  if (!Array.isArray(v)) return [];
  const out = v.filter((t): t is string => typeof t === 'string' && !!t.trim());
  // keep stable sort for nicer diffs
  return Array.from(new Set(out)).sort((a, b) => a.localeCompare(b));
}

function setTopicsOnItem(o: Record<string, unknown>, topics: string[]) {
  o.topics = topics;
}

function toFilenameFromPath(p: string) {
  const s = p.startsWith('/') ? p.slice(1) : p;
  return s || 'download.json';
}

function normalizePart(raw: unknown): CatalogPart {
  const r = (raw ?? {}) as Record<string, unknown>;
  const itemsRaw = Array.isArray(r.items) ? (r.items as unknown[]) : [];
  const items = itemsRaw.map((x) => ((x ?? {}) as Record<string, unknown>));

  return {
    schemaVersion: typeof r.schemaVersion === 'string' ? (r.schemaVersion as string) : undefined,
    generatedAt: typeof r.generatedAt === 'string' ? (r.generatedAt as string) : undefined,
    taxonomyRef: typeof r.taxonomyRef === 'string' ? (r.taxonomyRef as string) : undefined,
    // IMPORTANT: keep ALL top-level fields, but ensure items is normalized to objects
    ...(r as any),
    items,
  };
}

function normalizeRoot(raw: unknown): RootInventory {
  const r = (raw ?? {}) as Record<string, unknown>;
  const taxRaw = r.taxonomies;
  const taxonomies: RootTaxonomies | undefined =
    taxRaw && typeof taxRaw === 'object' && !Array.isArray(taxRaw) ? (taxRaw as RootTaxonomies) : undefined;

  return {
    schemaVersion: typeof r.schemaVersion === 'string' ? (r.schemaVersion as string) : undefined,
    generatedAt: typeof r.generatedAt === 'string' ? (r.generatedAt as string) : undefined,
    ...(r as any),
    taxonomies: taxonomies ?? {},
  };
}

function buildItemView(item: Record<string, unknown>, catalogPath: string): ItemView {
  const id = getStr(item, 'id', '');
  const key = `${catalogPath}::${id || getStr(item, 'url', '') || Math.random().toString(36).slice(2)}`;

  const lang = item.language === 'en' || item.language === 'fr' ? (item.language as 'en' | 'fr') : null;

  return {
    __key: key,
    __catalogPath: catalogPath,
    id: id || key,
    title: getStr(item, 'title', ''),
    url: getStr(item, 'url', ''),
    description: typeof item.description === 'string' ? (item.description as string) : null,
    type: getStr(item, 'type', ''),
    language: lang,
    topics: getTopicsFromItem(item),
  };
}

export default function CatalogEditorPage() {
  const [uiLang, setUiLang] = useState<UiLang>('en');

  // Root (authoritative taxonomies)
  const [rootOriginal, setRootOriginal] = useState<RootInventory | null>(null);
  const [rootDraft, setRootDraft] = useState<RootInventory | null>(null);

  // Per-catalog (authoritative items storage)
  const [partsOriginal, setPartsOriginal] = useState<Record<string, CatalogPart> | null>(null);
  const [partsDraft, setPartsDraft] = useState<Record<string, CatalogPart> | null>(null);

  // UI
  const [q, setQ] = useState('');
  const [topicQ, setTopicQ] = useState('');

  const [newTopicKey, setNewTopicKey] = useState('');
  const [newTopicEn, setNewTopicEn] = useState('');
  const [newTopicFr, setNewTopicFr] = useState('');

  useEffect(() => {
    const ctrl = new AbortController();
    let alive = true;

    (async () => {
      try {
        const results = await Promise.allSettled([
          fetchJson(INVENTORY_ROOT_PATH, ctrl.signal),
          ...INVENTORY_CATALOG_PATHS.map((p) => fetchJson(p, ctrl.signal)),
        ]);

        const rootRaw = results[0].status === 'fulfilled' ? results[0].value : null;
        const root = normalizeRoot(rootRaw);

        const parts: Record<string, CatalogPart> = {};
        for (let i = 0; i < INVENTORY_CATALOG_PATHS.length; i++) {
          const path = INVENTORY_CATALOG_PATHS[i];
          const r = results[i + 1];
          if (r.status === 'fulfilled') parts[path] = normalizePart(r.value);
          else parts[path] = normalizePart({ schemaVersion: root.schemaVersion, generatedAt: root.generatedAt, items: [] });
        }

        if (!alive) return;

        setRootOriginal(cloneDeep(root));
        setRootDraft(root);

        setPartsOriginal(cloneDeep(parts));
        setPartsDraft(parts);
      } catch (err: unknown) {
        const e = err as { name?: string };
        if (!alive || e?.name === 'AbortError') return;

        const emptyRoot: RootInventory = { generatedAt: '', taxonomies: { topics: [], topic_labels: {}, languages: ['en', 'fr'] } };
        const emptyParts: Record<string, CatalogPart> = Object.fromEntries(
          INVENTORY_CATALOG_PATHS.map((p) => [p, { generatedAt: '', items: [] }]),
        );

        setRootOriginal(cloneDeep(emptyRoot));
        setRootDraft(emptyRoot);

        setPartsOriginal(cloneDeep(emptyParts));
        setPartsDraft(emptyParts);
      }
    })();

    return () => {
      alive = false;
      ctrl.abort();
    };
  }, []);

  const tax = rootDraft?.taxonomies ?? {};
  const topicLabels = (tax.topic_labels ?? {}) as Record<string, TopicLabel>;
  const topicLabel = useCallback((topic: string) => topicLabels?.[topic]?.[uiLang] ?? topic, [topicLabels, uiLang]);

  // Flatten items for UI, but edits must go back to the right catalog file.
  const allItems: ItemView[] = useMemo(() => {
    const parts = partsDraft ?? {};
    const out: ItemView[] = [];
    for (const [path, part] of Object.entries(parts)) {
      const items = Array.isArray(part.items) ? part.items : [];
      for (const it of items) out.push(buildItemView(it, path));
    }
    return out;
  }, [partsDraft]);

  // Root topics (centralised). If missing, compute fallback from items.
  const allTopics = useMemo(() => {
    const topicsFromRoot = Array.isArray(tax.topics) ? (tax.topics as string[]).filter(Boolean) : [];
    const fallback = (() => {
      const set = new Set<string>();
      for (const it of allItems) for (const t of it.topics) set.add(t);
      return Array.from(set).sort((a, b) => a.localeCompare(b));
    })();

    const topics = topicsFromRoot.length ? topicsFromRoot : fallback;
    return [...topics].filter(Boolean).sort((a, b) => topicLabel(a).localeCompare(topicLabel(b)));
  }, [tax.topics, allItems, topicLabel]);

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
    if (!s) return allItems;

    return allItems.filter((it) => {
      const hay = `${it.title} ${it.url} ${(it.topics ?? []).join(' ')}`.toLowerCase();
      return hay.includes(s);
    });
  }, [allItems, q]);

  // Quick lookup: __key -> (catalogPath, indexInCatalogItems)
  const itemIndex = useMemo(() => {
    const idx = new Map<string, { catalogPath: string; i: number }>();
    const parts = partsDraft ?? {};
    for (const [path, part] of Object.entries(parts)) {
      const items = Array.isArray(part.items) ? part.items : [];
      for (let i = 0; i < items.length; i++) {
        const it = items[i] ?? {};
        const obj = it as Record<string, unknown>;
        const id = getStr(obj, 'id', '');
        const key = `${path}::${id || getStr(obj, 'url', '') || ''}`;
        if (key && !idx.has(key)) idx.set(key, { catalogPath: path, i });
      }
    }
    return idx;
  }, [partsDraft]);

  function setTopic(itemKey: string, topic: string, checked: boolean) {
    setPartsDraft((prev) => {
      if (!prev) return prev;
      const ref = itemIndex.get(itemKey);
      if (!ref) return prev;

      const next = cloneDeep(prev);
      const part = next[ref.catalogPath];
      if (!part || !Array.isArray(part.items) || !part.items[ref.i]) return prev;

      const item = part.items[ref.i] as Record<string, unknown>;
      const topics = new Set(getTopicsFromItem(item));

      if (checked) topics.add(topic);
      else topics.delete(topic);

      setTopicsOnItem(item, Array.from(topics).sort((a, b) => a.localeCompare(b)));
      return next;
    });
  }

  function addTopicToTaxonomy() {
    const key = newTopicKey.trim();
    if (!key) return;

    setRootDraft((prev) => {
      if (!prev) return prev;
      const next = cloneDeep(prev);

      const t = (next.taxonomies ?? {}) as RootTaxonomies;
      const topics = Array.isArray(t.topics) ? [...(t.topics as string[])] : [];
      if (!topics.includes(key)) topics.push(key);

      const labels: Record<string, TopicLabel> =
        t.topic_labels && typeof t.topic_labels === 'object' ? { ...(t.topic_labels as Record<string, TopicLabel>) } : {};

      const existing = labels[key] ?? {};
      labels[key] = {
        ...existing,
        ...(newTopicEn.trim() ? { en: newTopicEn.trim() } : {}),
        ...(newTopicFr.trim() ? { fr: newTopicFr.trim() } : {}),
      };

      next.taxonomies = {
        ...t,
        topics: topics.sort((a, b) => a.localeCompare(b)),
        topic_labels: labels,
        languages: Array.isArray(t.languages) ? t.languages : ['en', 'fr'],
      };

      return next;
    });

    setNewTopicKey('');
    setNewTopicEn('');
    setNewTopicFr('');
  }

  const canExport = !!rootDraft && !!partsDraft;

  function resetAll() {
    if (rootOriginal) setRootDraft(cloneDeep(rootOriginal));
    if (partsOriginal) setPartsDraft(cloneDeep(partsOriginal));
  }

  function exportAllFiles() {
    if (!rootDraft || !partsDraft) return;

    const now = new Date().toISOString();

    // Export root (centralised taxonomies)
    const rootOut = cloneDeep(rootDraft);
    rootOut.generatedAt = now;
    downloadJson(toFilenameFromPath(INVENTORY_ROOT_PATH), rootOut);

    // Export each catalog (items only; we keep whatever other top-level fields you already have,
    // but we DO NOT try to inject/merge taxonomies here.)
    for (const [path, part] of Object.entries(partsDraft)) {
      const out = cloneDeep(part);

      // Strip any accidental internal fields (we didn't add any to raw items, but safe anyway)
      out.items = (out.items ?? []).map((it) => {
        const obj = { ...(it ?? {}) } as Record<string, unknown>;
        delete (obj as any).__key;
        delete (obj as any).__catalogPath;
        return obj;
      });

      out.generatedAt = now;
      downloadJson(toFilenameFromPath(path), out);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 not-prose overflow-x-hidden">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Catalog Editor</h1>
          <p className="text-slate-500 mt-2">
            Edits topics per item. Taxonomy comes from <code>inventory.root.json</code>. Exports updated root + catalog files.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-2">
            <button
              className={`px-3 py-2 rounded-lg border ${
                uiLang === 'en' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 hover:bg-slate-50'
              }`}
              type="button"
              onClick={() => setUiLang('en')}
            >
              Labels EN
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${
                uiLang === 'fr' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 hover:bg-slate-50'
              }`}
              type="button"
              onClick={() => setUiLang('fr')}
            >
              Étiquettes FR
            </button>
          </div>

          <button
            className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"
            type="button"
            onClick={resetAll}
            disabled={!rootOriginal || !partsOriginal}
          >
            Reset
          </button>

          <button
            className="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
            type="button"
            onClick={exportAllFiles}
            disabled={!canExport}
            title="Downloads inventory.root.json and each inventory.*.catalog.json"
          >
            Download files
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[minmax(260px,35%)_minmax(0,65%)] gap-6 min-w-0">
        {/* LEFT */}
        <aside className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-slate-900">Topics (root)</h2>
            <span className="text-xs text-slate-500">{allTopics.length}</span>
          </div>

          <input
            value={topicQ}
            onChange={(e) => setTopicQ(e.target.value)}
            placeholder={uiLang === 'fr' ? 'Filtrer…' : 'Filter…'}
            className="mt-3 w-full px-3 py-2 rounded-lg border border-slate-200"
          />

          {/* Add topic */}
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
              Add topic to root taxonomy
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

        {/* RIGHT */}
        <section className="rounded-xl border border-slate-200 p-4 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 min-w-0">
            <h2 className="font-semibold text-slate-900">Items</h2>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title / url / topics…"
              className="w-full md:w-[360px] px-3 py-2 rounded-lg border border-slate-200"
            />
          </div>

          <div className="mt-4 space-y-4 min-w-0">
            {filteredItems.map((it) => {
              return (
                <div key={it.__key} className="rounded-xl border border-slate-200 p-4 min-w-0">
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 break-words">{it.title}</div>

                    <a
                      className="mt-1 block text-sm text-slate-600 underline truncate"
                      href={it.url}
                      target="_blank"
                      rel="noreferrer"
                      title={it.url}
                    >
                      {it.url}
                    </a>

                    <div className="text-xs text-slate-500 mt-1">
                      {it.language ? it.language.toUpperCase() : '—'} · {it.type}
                    </div>

                    <div className="text-xs text-slate-400 mt-1">
                      Catalog file: <code>{toFilenameFromPath(it.__catalogPath)}</code>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 min-w-0">
                    {visibleTopics.map((topicKey) => {
                      const checked = it.topics.includes(topicKey);
                      return (
                        <label key={topicKey} className="flex items-center gap-2 text-sm text-slate-700 min-w-0">
                          <input
                            className="shrink-0"
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setTopic(it.__key, topicKey, e.target.checked)}
                          />
                          <span className="min-w-0 flex-1 truncate">{topicLabel(topicKey)}</span>
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
