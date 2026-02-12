'use client';

// app/play/page.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PlayCircle, Globe, Languages } from 'lucide-react';

type TopicLabel = { en?: string; fr?: string };

type Taxonomies = {
  topics?: string[];
  topic_labels?: Record<string, TopicLabel>;
  languages?: Array<'en' | 'fr'>;
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

type LangFilter = 'all' | 'en' | 'fr';
type UiLang = 'en' | 'fr';
type KingKlownMode = 'all' | 'only' | 'exclude';

type Option<T extends string> = { key: T; label: string; icon?: React.ReactNode };

// Keep King Klown handled by its dedicated filter (hide from topic pills if present)
const TOPICS_HIDDEN_FROM_UI = new Set(['king_klown']);

const LANG_OPTIONS: Option<LangFilter>[] = [
  { key: 'all', label: 'All', icon: <Globe className="w-4 h-4 text-slate-500" /> },
  { key: 'en', label: 'English only' },
  { key: 'fr', label: 'Français seulement' },
];

const UI_LANG_OPTIONS: Option<UiLang>[] = [
  { key: 'en', label: 'Labels EN', icon: <Languages className="w-4 h-4 text-slate-500" /> },
  { key: 'fr', label: 'Étiquettes FR', icon: <Languages className="w-4 h-4 text-slate-500" /> },
];

const KINGKLOWN_OPTIONS: Option<KingKlownMode>[] = [
  { key: 'all', label: 'All' },
  { key: 'only', label: 'Only' },
  { key: 'exclude', label: 'Exclude' },
];

function normalizeCatalog(raw: any): Catalog {
  const taxonomies: Taxonomies | undefined =
    raw?.taxonomies && typeof raw.taxonomies === 'object' ? raw.taxonomies : undefined;

  const itemsRaw = Array.isArray(raw?.items) ? raw.items : [];
  const items: Item[] = itemsRaw.map((x: any) => ({
    id: String(x?.id ?? ''),
    title: String(x?.title ?? ''),
    url: String(x?.url ?? '#'),
    description: typeof x?.description === 'string' ? x.description : null,
    type: String(x?.type ?? ''),
    language: x?.language === 'en' || x?.language === 'fr' ? x.language : null,
    topics: Array.isArray(x?.topics) ? x.topics.filter((t: any) => typeof t === 'string') : [],
  }));

  return {
    schemaVersion: typeof raw?.schemaVersion === 'string' ? raw.schemaVersion : undefined,
    generatedAt: typeof raw?.generatedAt === 'string' ? raw.generatedAt : '',
    taxonomies,
    items,
  };
}

function langBadge(language: Item['language']) {
  if (language === 'en') return 'EN';
  if (language === 'fr') return 'FR';
  return '—';
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={[
        'px-3 py-1.5 rounded-full border text-sm font-medium transition inline-flex items-center gap-2',
        active
          ? 'bg-slate-900 text-white border-slate-900'
          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default function PlayPage() {
  const [catalog, setCatalog] = useState<Catalog>({ generatedAt: '', items: [] });

  // Main filters
  const [lang, setLang] = useState<LangFilter>('all');
  const [kingKlown, setKingKlown] = useState<KingKlownMode>('all');

  // UI label language toggle
  const [uiLang, setUiLang] = useState<UiLang>('en');

  // Dynamic topic filters
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topicSearch, setTopicSearch] = useState('');

  const toggleTopic = useCallback((topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));
  }, []);

  const clearTopics = useCallback(() => setSelectedTopics([]), []);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const r = await fetch('/inventory.catalog.json', { signal: ctrl.signal });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const raw = await r.json();
        setCatalog(normalizeCatalog(raw));
      } catch (e: any) {
        if (e?.name !== 'AbortError') setCatalog({ generatedAt: '', items: [] });
      }
    })();
    return () => ctrl.abort();
  }, []);

  const updatedAtLabel = useMemo(() => {
    if (!catalog.generatedAt) return '';
    const d = new Date(catalog.generatedAt);
    return Number.isNaN(d.getTime()) ? '' : ` · updated ${d.toLocaleString()}`;
  }, [catalog.generatedAt]);

  // Cache topic labels for current uiLang
  const topicLabel = useMemo(() => {
    const labels = catalog.taxonomies?.topic_labels ?? {};
    const cache = new Map<string, string>();
    return (topic: string) => {
      const hit = cache.get(topic);
      if (hit) return hit;
      const lbl = labels?.[topic]?.[uiLang] ?? topic;
      cache.set(topic, lbl);
      return lbl;
    };
  }, [catalog.taxonomies?.topic_labels, uiLang]);

  // Topic universe: prefer taxonomies.topics, fallback to union from items
  const allTopics = useMemo(() => {
    const fromTaxonomy = Array.isArray(catalog.taxonomies?.topics) ? catalog.taxonomies!.topics! : null;

    const set = new Set<string>();
    if (fromTaxonomy) {
      for (const t of fromTaxonomy) {
        if (typeof t === 'string' && t && !TOPICS_HIDDEN_FROM_UI.has(t)) set.add(t);
      }
    } else {
      for (const it of catalog.items) {
        for (const t of it.topics ?? []) {
          if (t && !TOPICS_HIDDEN_FROM_UI.has(t)) set.add(t);
        }
      }
    }

    // Sort by label in current uiLang
    return Array.from(set).sort((a, b) => topicLabel(a).localeCompare(topicLabel(b)));
  }, [catalog.items, catalog.taxonomies?.topics, topicLabel]);

  const visibleTopics = useMemo(() => {
    const q = topicSearch.trim().toLowerCase();
    if (!q) return allTopics;
    return allTopics.filter((t) => {
      const raw = t.toLowerCase();
      const lbl = topicLabel(t).toLowerCase();
      return raw.includes(q) || lbl.includes(q);
    });
  }, [allTopics, topicSearch, topicLabel]);

  // Build topic sets once (faster than repeated array.includes for large catalogs)
  const topicSetById = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const it of catalog.items) m.set(it.id, new Set(it.topics ?? []));
    return m;
  }, [catalog.items]);

  const filtered = useMemo(() => {
    const items = catalog.items ?? [];
    const out: Item[] = [];

    const needLang = lang !== 'all';
    const needKingKlown = kingKlown !== 'all';
    const needTopics = selectedTopics.length > 0;
    const requiredTopics = selectedTopics; // AND semantics

    for (let i = 0; i < items.length; i++) {
      const it = items[i];

      if (needLang && it.language !== lang) continue;

      const tset = topicSetById.get(it.id) ?? new Set<string>();

      if (needKingKlown) {
        const hasKK = tset.has('king_klown');
        if (kingKlown === 'only' && !hasKK) continue;
        if (kingKlown === 'exclude' && hasKK) continue;
      }

      if (needTopics) {
        let ok = true;
        for (let j = 0; j < requiredTopics.length; j++) {
          if (!tset.has(requiredTopics[j])) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;
      }

      out.push(it);
    }

    return out;
  }, [catalog.items, lang, kingKlown, selectedTopics, topicSetById]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12 border-b border-gray-200 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-2xl">
              <PlayCircle className="w-10 h-10 text-amber-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Play</h1>
              <p className="text-slate-500 mt-1">
                Filters ({filtered.length} results){updatedAtLabel}
              </p>
            </div>
          </div>

          {/* UI language toggle (labels) */}
          <div className="flex flex-wrap gap-2 items-center">
            {UI_LANG_OPTIONS.map((opt) => (
              <Pill key={opt.key} active={uiLang === opt.key} onClick={() => setUiLang(opt.key)}>
                {opt.icon ?? null}
                {opt.label}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-6">
        {/* Main: content language */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-600 mr-2">
            Language
          </span>
          {LANG_OPTIONS.map((opt) => (
            <Pill key={opt.key} active={lang === opt.key} onClick={() => setLang(opt.key)}>
              {opt.icon ?? null}
              {opt.label}
            </Pill>
          ))}
        </div>

        {/* Main: King Klown */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-600 mr-2">
            King Klown mythos
          </span>
          {KINGKLOWN_OPTIONS.map((opt) => (
            <Pill key={opt.key} active={kingKlown === opt.key} onClick={() => setKingKlown(opt.key)}>
              {opt.label}
            </Pill>
          ))}
        </div>

        {/* Dynamic topics */}
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-bold uppercase tracking-widest text-slate-600">
              Topics
              <span className="ml-2 text-xs font-normal text-slate-400">
                ({selectedTopics.length} selected / {allTopics.length} total)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                value={topicSearch}
                onChange={(e) => setTopicSearch(e.target.value)}
                placeholder={uiLang === 'fr' ? 'Rechercher…' : 'Search…'}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
              <button
                type="button"
                onClick={clearTopics}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50"
                disabled={selectedTopics.length === 0}
              >
                {uiLang === 'fr' ? 'Effacer' : 'Clear'}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {visibleTopics.map((t) => (
              <Pill key={t} active={selectedTopics.includes(t)} onClick={() => toggleTopic(t)}>
                {topicLabel(t)}
              </Pill>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mt-10 grid gap-4">
        {filtered.map((it) => (
          <a
            key={it.id}
            href={it.url}
            target="_blank"
            rel="noreferrer"
            className="block p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="font-semibold text-slate-900">{it.title}</div>
              <div className="text-xs text-slate-500 shrink-0">
                {langBadge(it.language)} · {it.type}
              </div>
            </div>

            {it.description ? (
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{it.description}</p>
            ) : null}

            {it.topics?.length ? (
              <div className="mt-3 text-xs text-slate-500">
                Topics: {it.topics.join(', ')}
              </div>
            ) : null}
          </a>
        ))}
      </section>
    </main>
  );
}
