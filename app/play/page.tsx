'use client';

// app/play/page.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PlayCircle, Globe, Drama, Network, Leaf, Cpu, Scale } from 'lucide-react';

type Item = {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  type: string;
  language: 'en' | 'fr' | null; // ✅ matches your catalog reality
  topics: string[];
  level?: string;
  sections?: string[];
  primarySection?: string;
};

type Catalog = {
  generatedAt: string;
  items: Item[];
};

type LangFilter = 'all' | 'en' | 'fr';
type KingKlownMode = 'all' | 'only' | 'exclude';

type Toggles = {
  kristalFarms: boolean;
  konnaxion: boolean;
  orgo: boolean;
  sociotechnicalOS: boolean;
  civicEquity: boolean;
};

type Option<T extends string> = {
  key: T;
  label: string;
  icon?: React.ReactNode;
};

type ToggleDef<K extends keyof Toggles = keyof Toggles> = {
  key: K;
  label: string;
  icon: React.ReactNode;
  color: string;
  match: (it: Item) => boolean;
};

/* =========================
   FILTER DEFINITIONS (TOP)
   ========================= */

const LANG_OPTIONS: Option<LangFilter>[] = [
  { key: 'all', label: 'All', icon: <Globe className="w-4 h-4 text-slate-500" /> },
  { key: 'en', label: 'English only' },
  { key: 'fr', label: 'Français seulement' },
];

const KINGKLOWN_OPTIONS: Option<KingKlownMode>[] = [
  { key: 'all', label: 'All' },
  { key: 'only', label: 'Only' },
  { key: 'exclude', label: 'Exclude' },
];

const TOPIC_GROUPS = {
  sociotechnicalOS: new Set(['koa', 'governance', 'smartvote']),
  civicEquity: new Set(['ethics', 'philanthropy', 'peace']),
} as const;

const TOGGLE_FILTERS: ToggleDef[] = [
  {
    key: 'kristalFarms',
    label: 'Kristal Farms',
    icon: <Leaf className="w-4 h-4 text-emerald-600" />,
    color: 'bg-emerald-50 border-emerald-200',
    match: (it) => (it.title ?? '').toLowerCase().includes('kristal farms'),
  },
  {
    key: 'konnaxion',
    label: 'Konnaxion',
    icon: <Network className="w-4 h-4 text-indigo-600" />,
    color: 'bg-indigo-50 border-indigo-200',
    match: (it) => (it.topics ?? []).includes('konnaxion'),
  },
  {
    key: 'orgo',
    label: 'Orgo',
    icon: <Cpu className="w-4 h-4 text-slate-700" />,
    color: 'bg-slate-50 border-slate-200',
    match: (it) => (it.topics ?? []).includes('orgo'),
  },
  {
    key: 'sociotechnicalOS',
    label: 'Sociotechnical OS',
    icon: <Scale className="w-4 h-4 text-amber-600" />,
    color: 'bg-amber-50 border-amber-200',
    match: (it) => {
      const topics = it.topics ?? [];
      for (let i = 0; i < topics.length; i++) {
        if (TOPIC_GROUPS.sociotechnicalOS.has(topics[i])) return true;
      }
      return false;
    },
  },
  {
    key: 'civicEquity',
    label: 'Civic equity',
    icon: <Drama className="w-4 h-4 text-rose-600" />,
    color: 'bg-rose-50 border-rose-200',
    match: (it) => {
      const topics = it.topics ?? [];
      for (let i = 0; i < topics.length; i++) {
        if (TOPIC_GROUPS.civicEquity.has(topics[i])) return true;
      }
      return false;
    },
  },
];

/* =========================
   HELPERS (TOP)
   ========================= */

function langBadge(language: Item['language']) {
  if (language === 'en') return 'EN';
  if (language === 'fr') return 'FR';
  return '—'; // ✅ avoids crash for null
}

function normalizeCatalog(raw: any): Catalog {
  const itemsRaw = Array.isArray(raw?.items) ? raw.items : [];
  const items: Item[] = itemsRaw.map((x: any) => ({
    id: String(x?.id ?? ''),
    title: String(x?.title ?? ''),
    url: String(x?.url ?? '#'),
    description: typeof x?.description === 'string' ? x.description : null,
    type: String(x?.type ?? ''),
    language: x?.language === 'en' || x?.language === 'fr' ? x.language : null,
    topics: Array.isArray(x?.topics) ? x.topics.filter((t: any) => typeof t === 'string') : [],
    level: typeof x?.level === 'string' ? x.level : undefined,
    sections: Array.isArray(x?.sections) ? x.sections.filter((s: any) => typeof s === 'string') : undefined,
    primarySection: typeof x?.primarySection === 'string' ? x.primarySection : undefined,
  }));

  return {
    generatedAt: typeof raw?.generatedAt === 'string' ? raw.generatedAt : '',
    items,
  };
}

/* =========================
   UI
   ========================= */

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

/* =========================
   PAGE
   ========================= */

export default function PlayPage() {
  const [catalog, setCatalog] = useState<Catalog>({ generatedAt: '', items: [] });

  const [lang, setLang] = useState<LangFilter>('all');
  const [kingKlown, setKingKlown] = useState<KingKlownMode>('all');

  const [toggles, setToggles] = useState<Toggles>({
    kristalFarms: false,
    konnaxion: false,
    orgo: false,
    sociotechnicalOS: false,
    civicEquity: false,
  });

  const toggle = useCallback((key: keyof Toggles) => {
    setToggles((t) => ({ ...t, [key]: !t[key] }));
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        const r = await fetch('/inventory.catalog.json', { signal: ctrl.signal });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const raw = await r.json();
        setCatalog(normalizeCatalog(raw));
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          setCatalog({ generatedAt: '', items: [] });
        }
      }
    })();

    return () => ctrl.abort();
  }, []);

  const updatedAtLabel = useMemo(() => {
    if (!catalog.generatedAt) return '';
    const d = new Date(catalog.generatedAt);
    return Number.isNaN(d.getTime()) ? '' : ` · updated ${d.toLocaleString()}`;
  }, [catalog.generatedAt]);

  const activeMatchers = useMemo(() => {
    const list: Array<(it: Item) => boolean> = [];
    for (let i = 0; i < TOGGLE_FILTERS.length; i++) {
      const def = TOGGLE_FILTERS[i];
      if (toggles[def.key]) list.push(def.match);
    }
    return list;
  }, [toggles]);

  const filtered = useMemo(() => {
    const items = catalog.items ?? [];
    const out: Item[] = [];

    const needLang = lang !== 'all';
    const needKingKlown = kingKlown !== 'all';

    for (let i = 0; i < items.length; i++) {
      const it = items[i];

      // language
      if (needLang) {
        if (it.language !== lang) continue; // null safely excluded when en/fr selected
      }

      // king_klown tri-state
      if (needKingKlown) {
        const topics = it.topics ?? [];
        const hasKK = topics.includes('king_klown');
        if (kingKlown === 'only' && !hasKK) continue;
        if (kingKlown === 'exclude' && hasKK) continue;
      }

      // compiled toggle matchers
      let ok = true;
      for (let j = 0; j < activeMatchers.length; j++) {
        if (!activeMatchers[j](it)) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;

      out.push(it);
    }

    return out;
  }, [catalog.items, lang, kingKlown, activeMatchers]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* HEADER (matching your site pattern) */}
      <div className="mb-12 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-amber-100 rounded-2xl">
            <PlayCircle className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Play
          </h1>
        </div>

        <p className="text-slate-500">
          Filters ({filtered.length} results){updatedAtLabel}
        </p>
      </div>

      {/* FILTERS */}
      <section className="space-y-6">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-600 mr-2">
            Language
          </span>
          {LANG_OPTIONS.map((opt) => (
            <Pill key={opt.key} active={lang === opt.key} onClick={() => setLang(opt.key)}>
              {opt.icon ? opt.icon : null}
              {opt.label}
            </Pill>
          ))}
        </div>

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

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-600 mr-2">
            Filters
          </span>
          {TOGGLE_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => toggle(f.key)}
              type="button"
              className={[
                'px-3 py-1.5 rounded-full border text-sm font-medium transition inline-flex items-center gap-2',
                toggles[f.key]
                  ? `text-slate-900 ${f.color}`
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50',
              ].join(' ')}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* RESULTS */}
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
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {it.description}
              </p>
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
