"use client";

// app/play/page.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  PlayCircle,
  Globe,
  Languages,
  Youtube,
  Music2,
  Link as LinkIcon,
  Github,
  Book,
  FileText,
} from "lucide-react";

type TopicLabel = { en?: string; fr?: string };
type TypeLabel = { en?: string; fr?: string };
type AlbumLabel = { en?: string; fr?: string };

type RootTaxonomies = {
  topics?: string[];
  topic_labels?: Record<string, TopicLabel>;

  // types can be string[] or object[]; we normalize to string[] + type_labels
  types?: Array<
    | string
    | {
        key?: string;
        en?: string;
        fr?: string;
        label?: { en?: string; fr?: string };
      }
  >;
  type_labels?: Record<string, TypeLabel>;

  languages?: Array<"en" | "fr">;

  // NEW (optional): albums ordering + labels (nice display)
  albums?: string[];
  album_labels?: Record<string, AlbumLabel>;

  // allow other centralized taxonomies (levels, platforms, albums, etc.)
  [k: string]: unknown;
};

type RootInventory = {
  schemaVersion?: string;
  generatedAt?: string;
  taxonomies?: RootTaxonomies;
  [k: string]: unknown;
};

type Item = {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  type: string;
  language: "en" | "fr" | null;
  topics: string[];

  // playlist/album grouping (YouTube)
  albums: string[]; // can be []
  albumTrack?: number | null; // optional, not used for alpha sort
};

type CatalogPart = {
  schemaVersion?: string;
  generatedAt?: string;
  taxonomyRef?: string;
  items: Array<Record<string, unknown>>;
  [k: string]: unknown;
};

type Catalog = {
  schemaVersion?: string;
  generatedAt: string;
  taxonomies?: RootTaxonomies;
  items: Item[];
};

type LangFilter = "all" | "en" | "fr";
type UiLang = "en" | "fr";
type KingKlownMode = "all" | "only" | "exclude";
type TopicMatchMode = "or" | "and";
type TypeFilter = "all" | string;

type Option<T extends string> = {
  key: T;
  label: string;
  icon?: React.ReactNode;
};

// Keep King Klown handled by its dedicated filter (hide from topic pills if present)
const TOPICS_HIDDEN_FROM_UI = new Set(["king_klown"]);

// Desired fixed album order (fallback if inventory.root.json doesn’t define taxonomies.albums yet)
const DEFAULT_ALBUM_ORDER = [
  "barok",
  "knowledge_pact",
  "pi_etherisme_cosmique",
  "raoul_et_colin",
  "le_rire_cosmique",
  "pohenecoco_crepuscule_des_masques",
  "rap_konscient",
];

const LANG_OPTIONS: Option<LangFilter>[] = [
  {
    key: "all",
    label: "All",
    icon: <Globe className="w-4 h-4 text-slate-500" />,
  },
  { key: "en", label: "English only" },
  { key: "fr", label: "Français seulement" },
];

const UI_LANG_OPTIONS: Option<UiLang>[] = [
  {
    key: "en",
    label: "Labels EN",
    icon: <Languages className="w-4 h-4 text-slate-500" />,
  },
  {
    key: "fr",
    label: "Étiquettes FR",
    icon: <Languages className="w-4 h-4 text-slate-500" />,
  },
];

const KINGKLOWN_OPTIONS: Option<KingKlownMode>[] = [
  { key: "all", label: "All" },
  { key: "only", label: "Only" },
  { key: "exclude", label: "Exclude" },
];

const TOPIC_MATCH_OPTIONS: Option<TopicMatchMode>[] = [
  { key: "or", label: "Any selected topic" },
  { key: "and", label: "All selected topics" },
];

const TYPE_FILTER_ORDER = [
  "medium_article",
  "philpaper_article",
  "amazon_book",
  "github_wiki",
  "youtube_video",
  "spotify_podcast",
];

// Inventory files (in /public)
const INVENTORY_ROOT_PATH = "/inventory.root.json";
const INVENTORY_CATALOG_PATHS = [
  "/inventory.articles.catalog.json",
  "/inventory.audio.catalog.json",
  "/inventory.code-tech.catalog.json",
  "/inventory.youtube.catalog.json",
];

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

function normalizeForSearch(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchJson(path: string, signal: AbortSignal) {
  const r = await fetch(path, { signal, cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${path}`);
  return r.json();
}

function pickLatestGeneratedAt(values: Array<unknown>) {
  let bestIso = "";
  let bestTime = -1;

  for (const v of values) {
    if (typeof v !== "string" || !v) continue;
    const t = new Date(v).getTime();
    if (!Number.isFinite(t)) continue;
    if (t > bestTime) {
      bestTime = t;
      bestIso = v;
    }
  }
  return bestIso;
}

function normalizeRootTaxonomies(raw: unknown): RootTaxonomies {
  const taxIn =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : undefined;

  const taxonomies: RootTaxonomies = taxIn
    ? ({ ...(taxIn as any) } as RootTaxonomies)
    : {};

  // Normalize types + type_labels (support types as objects)
  const collectedTypes: string[] = [];
  const collectedLabels: Record<string, TypeLabel> = {};

  const typesRaw = (taxonomies as any).types;
  if (Array.isArray(typesRaw)) {
    for (const entry of typesRaw) {
      if (typeof entry === "string") {
        if (entry) collectedTypes.push(entry);
        continue;
      }
      if (entry && typeof entry === "object") {
        const o = entry as Record<string, unknown>;
        const key =
          (typeof o.key === "string" && o.key) ||
          (typeof (o as any).id === "string" && (o as any).id) ||
          (typeof (o as any).type === "string" && (o as any).type) ||
          "";
        if (!key) continue;

        collectedTypes.push(key);

        const labelSrc =
          o.label && typeof o.label === "object" && !Array.isArray(o.label)
            ? (o.label as Record<string, unknown>)
            : o;

        const en =
          typeof (labelSrc as any).en === "string"
            ? (labelSrc as any).en
            : undefined;
        const fr =
          typeof (labelSrc as any).fr === "string"
            ? (labelSrc as any).fr
            : undefined;

        if (en || fr) {
          collectedLabels[key] = {
            ...(collectedLabels[key] ?? {}),
            ...(en ? { en } : {}),
            ...(fr ? { fr } : {}),
          };
        }
      }
    }
  }

  const mapRaw = (taxonomies as any).type_labels;
  if (mapRaw && typeof mapRaw === "object" && !Array.isArray(mapRaw)) {
    for (const [k, v] of Object.entries(mapRaw as Record<string, unknown>)) {
      if (!v || typeof v !== "object" || Array.isArray(v)) continue;
      const vo = v as Record<string, unknown>;
      const en = typeof vo.en === "string" ? vo.en : undefined;
      const fr = typeof vo.fr === "string" ? vo.fr : undefined;
      if (en || fr) {
        collectedLabels[k] = {
          ...(collectedLabels[k] ?? {}),
          ...(en ? { en } : {}),
          ...(fr ? { fr } : {}),
        };
      }
    }
  }

  if (collectedTypes.length) taxonomies.types = uniqKeepOrder(collectedTypes);
  if (Object.keys(collectedLabels).length) {
    const existing =
      taxonomies.type_labels && typeof taxonomies.type_labels === "object"
        ? taxonomies.type_labels
        : {};
    taxonomies.type_labels = {
      ...collectedLabels,
      ...(existing as Record<string, TypeLabel>),
    };
  }

  // Ensure topics is a clean string[]
  if (Array.isArray(taxonomies.topics)) {
    taxonomies.topics = (taxonomies.topics as unknown[]).filter(
      (t): t is string => typeof t === "string" && !!t,
    );
  }

  // Ensure albums is a clean string[] (optional)
  if (Array.isArray((taxonomies as any).albums)) {
    taxonomies.albums = ((taxonomies as any).albums as unknown[]).filter(
      (a): a is string => typeof a === "string" && !!a,
    );
  }

  // Ensure labels maps default
  if (!taxonomies.topic_labels || typeof taxonomies.topic_labels !== "object")
    taxonomies.topic_labels = {};
  if (!taxonomies.type_labels || typeof taxonomies.type_labels !== "object")
    taxonomies.type_labels = {};
  if (!taxonomies.album_labels || typeof taxonomies.album_labels !== "object")
    taxonomies.album_labels = {};

  // Ensure languages default
  if (!Array.isArray(taxonomies.languages)) taxonomies.languages = ["en", "fr"];

  return taxonomies;
}

function normalizePart(raw: unknown): CatalogPart {
  const r = (raw ?? {}) as Record<string, unknown>;
  const itemsRaw = Array.isArray(r.items) ? (r.items as unknown[]) : [];
  const items = itemsRaw.map((x) => (x ?? {}) as Record<string, unknown>);
  return {
    ...(r as any),
    schemaVersion:
      typeof r.schemaVersion === "string"
        ? (r.schemaVersion as string)
        : undefined,
    generatedAt:
      typeof r.generatedAt === "string" ? (r.generatedAt as string) : undefined,
    taxonomyRef:
      typeof r.taxonomyRef === "string" ? (r.taxonomyRef as string) : undefined,
    items,
  };
}

function normalizeItem(x: unknown): Item {
  const o = (x ?? {}) as Record<string, unknown>;
  const language =
    o.language === "en" || o.language === "fr"
      ? (o.language as "en" | "fr")
      : null;

  const topics = Array.isArray(o.topics)
    ? (o.topics as unknown[]).filter(
        (t): t is string => typeof t === "string" && !!t,
      )
    : [];

  // albums: accept "albums" array OR legacy "album"/playlist strings
  const albums: string[] = [];
  const albumsRaw = (o as any).albums;
  if (Array.isArray(albumsRaw)) {
    for (const a of albumsRaw) if (typeof a === "string" && a) albums.push(a);
  } else {
    const a1 =
      (typeof (o as any).album === "string" && (o as any).album) ||
      (typeof (o as any).playlist === "string" && (o as any).playlist) ||
      (typeof (o as any).playlistTitle === "string" &&
        (o as any).playlistTitle) ||
      "";
    if (a1) albums.push(a1);
  }

  // Optional: track number inside album (not used for alpha sort)
  const albumTrackRaw =
    (o as any).albumTrack ?? (o as any).track ?? (o as any).position;
  const albumTrackNum =
    typeof albumTrackRaw === "number"
      ? albumTrackRaw
      : typeof albumTrackRaw === "string" && albumTrackRaw.trim() !== ""
        ? Number(albumTrackRaw)
        : NaN;
  const albumTrack = Number.isFinite(albumTrackNum) ? albumTrackNum : null;

  return {
    id: String(o.id ?? ""),
    title: String(o.title ?? ""),
    url: String(o.url ?? "#"),
    description:
      typeof o.description === "string" ? (o.description as string) : null,
    type: String(o.type ?? ""),
    language,
    topics,
    albums: uniqKeepOrder(albums),
    albumTrack,
  };
}

function buildCatalogFromRootAndParts(
  rootRaw: unknown,
  partRaws: unknown[],
): Catalog {
  const root = (rootRaw ?? {}) as Record<string, unknown>;
  const rootTax = normalizeRootTaxonomies(root.taxonomies);

  const parts = partRaws.map(normalizePart);

  // Items: dedupe by id (first wins)
  const itemsById = new Map<string, Item>();
  for (const p of parts) {
    const arr = Array.isArray(p.items) ? p.items : [];
    for (const it of arr) {
      const item = normalizeItem(it);
      if (!item.id) continue;
      if (!itemsById.has(item.id)) itemsById.set(item.id, item);
    }
  }

  const generatedAt = pickLatestGeneratedAt([
    typeof root.generatedAt === "string" ? root.generatedAt : "",
    ...parts.map((p) =>
      typeof p.generatedAt === "string" ? p.generatedAt : "",
    ),
  ]);

  const schemaVersion =
    (typeof root.schemaVersion === "string" && root.schemaVersion) ||
    (typeof parts[0]?.schemaVersion === "string" && parts[0].schemaVersion) ||
    undefined;

  return {
    ...(schemaVersion ? { schemaVersion } : {}),
    generatedAt,
    taxonomies: rootTax, // CENTRALIZED: only root taxonomies
    items: Array.from(itemsById.values()),
  };
}

function LangPastille({ language }: { language: Item["language"] }) {
  if (language === "en") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-600 text-white">
        EN
      </span>
    );
  }
  if (language === "fr") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-600 text-white">
        FR
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-700">
      —
    </span>
  );
}

// Optional fallback labels if JSON missing
const TYPE_LABELS_FALLBACK: Record<string, { en: string; fr: string }> = {
  amazon_book: { en: "Amazon book", fr: "Livre (Amazon)" },
  github_wiki: { en: "GitHub wiki", fr: "Wiki GitHub" },
  medium_article: { en: "Medium article", fr: "Article Medium" },
  philpaper_article: { en: "PhilPapers article", fr: "Article PhilPapers" },
  spotify_podcast: { en: "Spotify podcast", fr: "Podcast Spotify" },
  youtube_video: { en: "YouTube video", fr: "Vidéo YouTube" },
};

function humanizeKey(x: string) {
  const s = (x ?? "").trim();
  if (!s) return "";
  const titled = s
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
  return titled
    .replace(/\bGithub\b/g, "GitHub")
    .replace(/\bYoutube\b/g, "YouTube");
}

// favicon-style logo (browser tab icon)
function faviconUrl(domainOrUrl: string, size = 64) {
  const u = domainOrUrl.includes("://")
    ? domainOrUrl
    : `https://${domainOrUrl}`;
  return `https://www.google.com/s2/favicons?sz=${size}&domain_url=${encodeURIComponent(u)}`;
}

function platformMetaFromType(typeKey: string, url: string) {
  const t = (typeKey || "").toLowerCase();

  const mk = (
    key: string,
    domainOrUrl: string,
    alt: string,
    icon: React.ReactNode,
  ) => ({
    key,
    logoSrc: faviconUrl(domainOrUrl, 64),
    alt,
    icon,
  });

  if (t.includes("youtube"))
    return mk(
      "youtube",
      "youtube.com",
      "YouTube",
      <Youtube className="w-4 h-4 text-slate-500" aria-hidden />,
    );
  if (t.includes("spotify"))
    return mk(
      "spotify",
      "open.spotify.com",
      "Spotify",
      <Music2 className="w-4 h-4 text-slate-500" aria-hidden />,
    );
  if (t.includes("github"))
    return mk(
      "github",
      "github.com",
      "GitHub",
      <Github className="w-4 h-4 text-slate-500" aria-hidden />,
    );
  if (t.includes("amazon") && t.includes("book"))
    return mk(
      "amazon",
      "amazon.ca",
      "Amazon",
      <Book className="w-4 h-4 text-slate-500" aria-hidden />,
    );
  if (t.includes("medium"))
    return mk(
      "medium",
      "medium.com",
      "Medium",
      <FileText className="w-4 h-4 text-slate-500" aria-hidden />,
    );
  if (t.includes("philpaper") || t.includes("philpapers"))
    return mk(
      "philpapers",
      "philpapers.org",
      "PhilPapers",
      <FileText className="w-4 h-4 text-slate-500" aria-hidden />,
    );

  // fallback by URL host
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    if (h.includes("youtu.be") || h.includes("youtube.com"))
      return mk(
        "youtube",
        "youtube.com",
        "YouTube",
        <Youtube className="w-4 h-4 text-slate-500" aria-hidden />,
      );
    if (h.includes("spotify.com"))
      return mk(
        "spotify",
        "open.spotify.com",
        "Spotify",
        <Music2 className="w-4 h-4 text-slate-500" aria-hidden />,
      );
    if (h.includes("github.com"))
      return mk(
        "github",
        "github.com",
        "GitHub",
        <Github className="w-4 h-4 text-slate-500" aria-hidden />,
      );
    if (h)
      return mk(
        "site",
        h,
        h,
        <LinkIcon className="w-4 h-4 text-slate-500" aria-hidden />,
      );
  } catch {
    // ignore
  }

  return mk(
    "link",
    "example.com",
    "Link",
    <LinkIcon className="w-4 h-4 text-slate-500" aria-hidden />,
  );
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
        "px-3 py-1.5 rounded-full border text-sm font-medium transition inline-flex items-center gap-2",
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function TopicChip({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <span
      title={title}
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700 border border-slate-200 max-w-full break-words"
    >
      {children}
    </span>
  );
}

function isYouTubeType(typeKey: string) {
  return (typeKey || "").toLowerCase().includes("youtube");
}

function primaryAlbumKey(it: Item) {
  return (it.albums?.[0] ?? "").trim();
}

function ResultCard({
  it,
  topicLabel,
  typeLabel,
  albumLabel,
}: {
  it: Item;
  topicLabel: (t: string) => string;
  typeLabel: (t: string) => string;
  albumLabel: (a: string) => string;
}) {
  const meta = useMemo(
    () => platformMetaFromType(it.type, it.url),
    [it.type, it.url],
  );
  const [logoOk, setLogoOk] = useState(true);

  const albumKey = primaryAlbumKey(it);
  const showAlbum = isYouTubeType(it.type) && !!albumKey;

  return (
    <a
      href={it.url}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none" }}
      className={[
        "block w-full max-w-full overflow-hidden",
        "p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition",
        "!no-underline hover:!no-underline focus:!no-underline decoration-transparent",
      ].join(" ")}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            {logoOk ? (
              <img
                src={meta.logoSrc}
                alt={meta.alt}
                className="w-4 h-4 shrink-0"
                loading="lazy"
                decoding="async"
                onError={() => setLogoOk(false)}
              />
            ) : (
              meta.icon
            )}

            <div className="font-semibold text-slate-900 truncate min-w-0 flex-1">
              {it.title}
            </div>
          </div>

          {/* Album title directly under the song title (YouTube only) */}
          {showAlbum ? (
            <div className="text-xs text-slate-600 mt-1 break-words">
              <span className="text-slate-500">Album:</span>{" "}
              <span className="font-medium text-slate-800">
                {albumLabel(albumKey)}
              </span>
            </div>
          ) : null}

          {it.description ? (
            <p className="text-sm text-slate-600 mt-2 leading-relaxed break-words overflow-hidden">
              {it.description}
            </p>
          ) : null}

          {it.topics?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5 min-w-0">
              {it.topics.map((t) => {
                const lbl = topicLabel(t);
                return (
                  <TopicChip key={t} title={lbl}>
                    {lbl}
                  </TopicChip>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <LangPastille language={it.language} />
          <span className="text-[11px] text-slate-500 font-medium max-w-[180px] truncate">
            {typeLabel(it.type)}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function PlayPage() {
  // CENTRALIZED: taxonomies come from inventory.root.json only; catalog files provide items only.
  const [catalog, setCatalog] = useState<Catalog>({
    generatedAt: "",
    items: [],
  });

  // Main filters
  const [resourceSearch, setResourceSearch] = useState("");
  const [lang, setLang] = useState<LangFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [kingKlown, setKingKlown] = useState<KingKlownMode>("all");

  // UI label language toggle
  const [uiLang, setUiLang] = useState<UiLang>("en");

  // Dynamic topic filters
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topicSearch, setTopicSearch] = useState("");
  const [topicMatchMode, setTopicMatchMode] = useState<TopicMatchMode>("or");

  const toggleTopic = useCallback((topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  }, []);

  const clearTopics = useCallback(() => setSelectedTopics([]), []);

  const resetFilters = useCallback(() => {
    setResourceSearch("");
    setLang("all");
    setTypeFilter("all");
    setKingKlown("all");
    setSelectedTopics([]);
    setTopicSearch("");
    setTopicMatchMode("or");
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        const results = await Promise.allSettled([
          fetchJson(INVENTORY_ROOT_PATH, ctrl.signal),
          ...INVENTORY_CATALOG_PATHS.map((p) => fetchJson(p, ctrl.signal)),
        ]);

        const rootRaw =
          results[0].status === "fulfilled" ? results[0].value : {};
        const partRaws = results
          .slice(1)
          .filter(
            (r): r is PromiseFulfilledResult<unknown> =>
              r.status === "fulfilled",
          )
          .map((r) => r.value);

        const merged = buildCatalogFromRootAndParts(rootRaw, partRaws);
        setCatalog(merged);
      } catch (e: unknown) {
        const err = e as { name?: string };
        if (err?.name !== "AbortError")
          setCatalog({ generatedAt: "", items: [] });
      }
    })();

    return () => ctrl.abort();
  }, []);

  const taxonomies = catalog.taxonomies;
  const taxonomyTopics = taxonomies?.topics;
  const topicLabels = taxonomies?.topic_labels;
  const typeLabels = taxonomies?.type_labels;
  const albumLabels = taxonomies?.album_labels;

  // Cache topic labels for current uiLang
  const topicLabel = useMemo(() => {
    const labels = topicLabels ?? {};
    const cache = new Map<string, string>();
    return (topic: string) => {
      const hit = cache.get(topic);
      if (hit) return hit;
      const lbl = labels?.[topic]?.[uiLang] ?? topic;
      cache.set(topic, lbl);
      return lbl;
    };
  }, [topicLabels, uiLang]);

  // Cache type labels for current uiLang
  const typeLabel = useMemo(() => {
    const labels = typeLabels ?? {};
    const cache = new Map<string, string>();
    return (typeKey: string) => {
      const hit = cache.get(typeKey);
      if (hit) return hit;

      const fromJson = labels?.[typeKey]?.[uiLang];
      const fromFallback = TYPE_LABELS_FALLBACK[typeKey]?.[uiLang];
      const lbl = fromJson ?? fromFallback ?? humanizeKey(typeKey) ?? typeKey;

      cache.set(typeKey, lbl);
      return lbl;
    };
  }, [typeLabels, uiLang]);

  // Cache album labels for current uiLang (fallback to humanizeKey)
  const albumLabel = useMemo(() => {
    const labels = albumLabels ?? {};
    const cache = new Map<string, string>();
    return (albumKey: string) => {
      const k = (albumKey ?? "").trim();
      if (!k) return "";
      const hit = cache.get(k);
      if (hit) return hit;

      const fromJson = labels?.[k]?.[uiLang];
      const lbl = fromJson ?? humanizeKey(k);
      cache.set(k, lbl);
      return lbl;
    };
  }, [albumLabels, uiLang]);

  const allTypes = useMemo(() => {
    const set = new Set<string>();

    const fromTax = Array.isArray(taxonomies?.types)
      ? (taxonomies?.types as unknown[])
      : [];
    for (const t of fromTax) {
      if (typeof t === "string" && t) set.add(t);
    }

    for (const it of catalog.items) {
      if (it.type) set.add(it.type);
    }

    const rank = new Map(TYPE_FILTER_ORDER.map((key, i) => [key, i]));

    return Array.from(set).sort((a, b) => {
      const ra = rank.get(a) ?? Number.MAX_SAFE_INTEGER;
      const rb = rank.get(b) ?? Number.MAX_SAFE_INTEGER;
      if (ra !== rb) return ra - rb;
      return typeLabel(a).localeCompare(typeLabel(b), undefined, {
        sensitivity: "base",
      });
    });
  }, [catalog.items, taxonomies?.types, typeLabel]);

  // Album ordering (prefer taxonomy.albums, else fallback constant)
  const albumOrder = useMemo(() => {
    const fromTax = Array.isArray(taxonomies?.albums)
      ? (taxonomies?.albums as string[])
      : null;
    const list = fromTax && fromTax.length ? fromTax : DEFAULT_ALBUM_ORDER;
    return list.filter((x) => typeof x === "string" && !!x);
  }, [taxonomies?.albums]);

  const albumRank = useMemo(() => {
    const m = new Map<string, number>();
    for (let i = 0; i < albumOrder.length; i++) m.set(albumOrder[i], i);
    return m;
  }, [albumOrder]);

  // Topic universe: prefer root taxonomies.topics, fallback to union from items
  const allTopics = useMemo(() => {
    const fromTaxonomy = Array.isArray(taxonomyTopics) ? taxonomyTopics : null;

    const set = new Set<string>();
    if (fromTaxonomy) {
      for (const t of fromTaxonomy) {
        if (typeof t === "string" && t && !TOPICS_HIDDEN_FROM_UI.has(t))
          set.add(t);
      }
    } else {
      for (const it of catalog.items) {
        for (const t of it.topics ?? []) {
          if (t && !TOPICS_HIDDEN_FROM_UI.has(t)) set.add(t);
        }
      }
    }

    return Array.from(set).sort((a, b) =>
      topicLabel(a).localeCompare(topicLabel(b)),
    );
  }, [catalog.items, taxonomyTopics, topicLabel]);

  const visibleTopics = useMemo(() => {
    const q = topicSearch.trim().toLowerCase();
    if (!q) return allTopics;
    return allTopics.filter((t) => {
      const raw = t.toLowerCase();
      const lbl = topicLabel(t).toLowerCase();
      return raw.includes(q) || lbl.includes(q);
    });
  }, [allTopics, topicSearch, topicLabel]);

  // Build topic sets once
  const topicSetById = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const it of catalog.items) m.set(it.id, new Set(it.topics ?? []));
    return m;
  }, [catalog.items]);

  // Stable original order map (fallback tie-breaker)
  const origIndexById = useMemo(() => {
    const m = new Map<string, number>();
    for (let i = 0; i < (catalog.items ?? []).length; i++)
      m.set(catalog.items[i].id, i);
    return m;
  }, [catalog.items]);

  const filtered = useMemo(() => {
    const items = catalog.items ?? [];
    const out: Item[] = [];

    const search = normalizeForSearch(resourceSearch);
    const needSearch = search.length > 0;
    const needLang = lang !== "all";
    const needType = typeFilter !== "all";
    const needKingKlown = kingKlown !== "all";
    const needTopics = selectedTopics.length > 0;
    const requiredTopics = selectedTopics;

    for (let i = 0; i < items.length; i++) {
      const it = items[i];

      if (needLang && it.language !== lang) continue;
      if (needType && it.type !== typeFilter) continue;

      const tset = topicSetById.get(it.id) ?? new Set<string>();

      if (needKingKlown) {
        const hasKK = tset.has("king_klown");
        if (kingKlown === "only" && !hasKK) continue;
        if (kingKlown === "exclude" && hasKK) continue;
      }

      if (needTopics) {
        const matches = requiredTopics.map((topic) => tset.has(topic));
        const ok =
          topicMatchMode === "and"
            ? matches.every(Boolean)
            : matches.some(Boolean);
        if (!ok) continue;
      }

      if (needSearch) {
        const topicText = (it.topics ?? [])
          .flatMap((topic) => [topic, topicLabel(topic)])
          .join(" ");
        const albumKey = primaryAlbumKey(it);
        const searchText = normalizeForSearch(
          [
            it.title,
            it.description ?? "",
            it.url,
            it.type,
            typeLabel(it.type),
            topicText,
            albumKey,
            albumLabel(albumKey),
          ].join(" "),
        );

        if (!searchText.includes(search)) continue;
      }

      out.push(it);
    }

    // Group YouTube by album order, and alpha-sort inside each album.
    out.sort((a, b) => {
      const ia = origIndexById.get(a.id) ?? 0;
      const ib = origIndexById.get(b.id) ?? 0;

      const ya = isYouTubeType(a.type);
      const yb = isYouTubeType(b.type);

      // Keep non-YouTube stable vs others
      if (ya !== yb) return ia - ib;

      // Only YouTube<->YouTube: apply album grouping + sorting
      if (ya && yb) {
        const aa = primaryAlbumKey(a);
        const ab = primaryAlbumKey(b);

        // Put album-tagged items before untagged
        if (!!aa !== !!ab) return aa ? -1 : 1;

        // Album order (your fixed order)
        const ra = aa
          ? (albumRank.get(aa) ?? Number.MAX_SAFE_INTEGER)
          : Number.MAX_SAFE_INTEGER;
        const rb = ab
          ? (albumRank.get(ab) ?? Number.MAX_SAFE_INTEGER)
          : Number.MAX_SAFE_INTEGER;
        if (ra !== rb) return ra - rb;

        // Same album (or both unknown): alphabetical by title
        const ta = (a.title ?? "").trim();
        const tb = (b.title ?? "").trim();
        const cmpTitle = ta.localeCompare(tb, undefined, {
          sensitivity: "base",
        });
        if (cmpTitle !== 0) return cmpTitle;

        // tie-breaker: stable
        return ia - ib;
      }

      // default stable
      return ia - ib;
    });

    return out;
  }, [
    catalog.items,
    resourceSearch,
    lang,
    typeFilter,
    kingKlown,
    selectedTopics,
    topicMatchMode,
    topicSetById,
    topicLabel,
    typeLabel,
    albumLabel,
    origIndexById,
    albumRank,
  ]);

  const hasActiveFilters =
    resourceSearch.trim() !== "" ||
    lang !== "all" ||
    typeFilter !== "all" ||
    kingKlown !== "all" ||
    selectedTopics.length > 0 ||
    topicSearch.trim() !== "" ||
    topicMatchMode !== "or";

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 overflow-x-hidden">
      <div className="mb-12 border-b border-gray-200 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-2xl">
              <PlayCircle className="w-10 h-10 text-amber-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
                Play
              </h1>
              <p className="text-slate-500 mt-1">
                Filters ({filtered.length} of {catalog.items.length} resources)
              </p>
            </div>
          </div>

          {/* UI language toggle (labels) */}
          <div className="flex flex-wrap gap-2 items-center">
            {UI_LANG_OPTIONS.map((opt) => (
              <Pill
                key={opt.key}
                active={uiLang === opt.key}
                onClick={() => setUiLang(opt.key)}
              >
                {opt.icon ?? null}
                {opt.label}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-6">
        {/* Global resource search */}
        <div className="rounded-xl border border-slate-200 p-4 bg-white">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="resource-search"
                className="text-sm font-bold uppercase tracking-widest text-slate-600"
              >
                Search resources
              </label>
              <p className="mt-1 text-xs text-slate-500">
                Search by title, description, URL, type, album, or topic.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:min-w-[420px]">
              <input
                id="resource-search"
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
                placeholder={
                  uiLang === "fr"
                    ? "Chercher dans les ressources…"
                    : "Search resources…"
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
              <button
                type="button"
                onClick={resetFilters}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasActiveFilters}
              >
                {uiLang === "fr" ? "Réinitialiser" : "Reset"}
              </button>
            </div>
          </div>
        </div>

        {/* Main: content language */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-600 mr-2">
            Language
          </span>
          {LANG_OPTIONS.map((opt) => (
            <Pill
              key={opt.key}
              active={lang === opt.key}
              onClick={() => setLang(opt.key)}
            >
              {opt.icon ?? null}
              {opt.label}
            </Pill>
          ))}
        </div>

        {/* Main: resource type */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-600 mr-2">
            Type
          </span>
          <Pill
            active={typeFilter === "all"}
            onClick={() => setTypeFilter("all")}
          >
            All types
          </Pill>
          {allTypes.map((typeKey) => (
            <Pill
              key={typeKey}
              active={typeFilter === typeKey}
              onClick={() => setTypeFilter(typeKey)}
            >
              {typeLabel(typeKey)}
            </Pill>
          ))}
        </div>

        {/* Main: King Klown */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-600 mr-2">
            King Klown mythos
          </span>
          {KINGKLOWN_OPTIONS.map((opt) => (
            <Pill
              key={opt.key}
              active={kingKlown === opt.key}
              onClick={() => setKingKlown(opt.key)}
            >
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

            <div className="flex flex-wrap items-center gap-2">
              {selectedTopics.length > 1 ? (
                <div
                  className="flex flex-wrap gap-2 items-center"
                  aria-label="Topic match mode"
                >
                  {TOPIC_MATCH_OPTIONS.map((opt) => (
                    <Pill
                      key={opt.key}
                      active={topicMatchMode === opt.key}
                      onClick={() => setTopicMatchMode(opt.key)}
                    >
                      {opt.label}
                    </Pill>
                  ))}
                </div>
              ) : null}

              <input
                value={topicSearch}
                onChange={(e) => setTopicSearch(e.target.value)}
                placeholder={
                  uiLang === "fr" ? "Filtrer les topics…" : "Filter topics…"
                }
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
              <button
                type="button"
                onClick={clearTopics}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedTopics.length === 0}
              >
                {uiLang === "fr" ? "Effacer les topics" : "Clear topics"}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {visibleTopics.map((t) => (
              <Pill
                key={t}
                active={selectedTopics.includes(t)}
                onClick={() => toggleTopic(t)}
              >
                {topicLabel(t)}
              </Pill>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mt-10 grid grid-cols-1 gap-4 min-w-0">
        {filtered.length ? (
          filtered.map((it) => (
            <ResultCard
              key={it.id}
              it={it}
              topicLabel={topicLabel}
              typeLabel={typeLabel}
              albumLabel={albumLabel}
            />
          ))
        ) : (
          <div className="rounded-xl border border-slate-200 p-6 text-sm text-slate-500">
            No resources match the current filters.
          </div>
        )}
      </section>
    </main>
  );
}
