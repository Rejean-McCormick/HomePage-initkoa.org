"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import registry from "@/lib/koa-connections-public.json";

type Kind = "all" | "journeys" | "applications" | "architecture" | "evidence";
type RecordItem = {
  id: string;
  kind: Exclude<Kind, "all">;
  title: string;
  description: string;
  status: string;
  href: string;
  external?: boolean;
  tags: string;
  secondary?: { title: string; href: string; external?: boolean }[];
};

const aliasByDestination = new Map(registry.aliases.map(a => [a.target, a.path]));
const aliasFor = (url: string | null | undefined) => url ? (aliasByDestination.get(url) ?? url) : "/connections";

const records: RecordItem[] = [
  ...registry.paths.map(path => ({
    id: path.id, kind: "journeys" as const, title: path.title_en, description: path.summary_en,
    status: "Documented audit path · architectural reading, not an operational claim",
    href: aliasFor(path.audit_url), external: true,
    tags: `${path.id} ${path.spine_repositories.join(" ")}`,
    secondary: registry.crosswalks.filter(x => x.to === path.id).map(x => {
      const chain = registry.chains.find(c => c.id === x.from);
      return { title: chain?.id.replace("chain:", "") || x.from, href: chain?.href || "/ecosystem/functional-chains", external: false };
    }),
  })),
  ...registry.repositories.map(repo => ({
    id: repo.id, kind: "applications" as const, title: repo.name, description: repo.target_role || "Referenced in the target ecosystem inventory.",
    status: repo.in_audit_reference_inventory ? "Audit reference inventory" : "Target design only · not admitted to the audit reference inventory",
    href: repo.audit_app_url ? aliasFor(repo.audit_app_url) : "/ecosystem",
    external: Boolean(repo.audit_app_url),
    tags: `${repo.repository} ${repo.target_family} ${repo.audit_slug || ""}`,
  })),
  ...registry.chains.map(chain => ({
    id: chain.id, kind: "architecture" as const, title: `${chain.id.replace("chain:", "")} — ${chain.title_en}`,
    description: chain.outcome, status: "Target design · not deployment evidence",
    href: chain.href, tags: `${chain.id} ${chain.status_raw}`,
    secondary: registry.crosswalks.filter(x => x.from === chain.id).map(x => {
      const path = registry.paths.find(p => p.id === x.to);
      return { title: `Proposed path: ${path?.title_en || x.to}`, href: path ? aliasFor(path.audit_url) : "/go/graph", external: true };
    }),
  })),
  {
    id: "public-validation", kind: "evidence", title: "Public validation and evidence records",
    description: "Review what was observed, dated, and scoped in the audit. Tests and design proposals are not interchangeable.",
    status: "Evidence is qualified only in its original audit scope", href: "/go/validations", external: true,
    tags: "tests proof verification observations evidence",
  },
];

const tabs: { key: Kind; label: string }[] = [
  { key: "all", label: "All" }, { key: "journeys", label: "Journeys" },
  { key: "applications", label: "Applications" }, { key: "architecture", label: "Functional chains" },
  { key: "evidence", label: "Evidence" },
];

export default function ConnectionsExplorer() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<Kind>("all");
  const [visibleCount, setVisibleCount] = useState(18);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || params.get("repo") || "");
    setVisibleCount(18);
    const initialKind = params.get("type");
    if (tabs.some(tab => tab.key === initialKind)) setKind(initialKind as Kind);
  }, []);
  const normalizedQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const filtered = useMemo(() => records.filter(record =>
    (kind === "all" || record.kind === kind) &&
    (!normalizedQuery || `${record.title} ${record.description} ${record.status} ${record.tags}`.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedQuery))
  ), [kind, normalizedQuery]);
  const visibleRecords = filtered.slice(0, visibleCount);
  return (
    <section className="koa-directory" aria-label="Connections directory">
      <div className="koa-directory-search">
        <label htmlFor="koa-connection-query"><Search size={17} aria-hidden="true" /> Search the connections</label>
        <input id="koa-connection-query" type="search" placeholder="Try Orgo, FC-07, Kristal, provenance…" value={query} onChange={e => { setQuery(e.target.value); setVisibleCount(18); }} />
      </div>
      <div className="koa-directory-tabs" role="group" aria-label="Connection category">
        {tabs.map(tab => <button key={tab.key} type="button" aria-pressed={kind === tab.key} onClick={() => { setKind(tab.key); setVisibleCount(18); }}>{tab.label}</button>)}
      </div>
      <p className="koa-directory-count" aria-live="polite">{filtered.length} connections · {registry.repositories.length} systems in the target design · {registry.repositories.filter(r => r.in_audit_reference_inventory).length} in the audit reference inventory</p>
      <p className="koa-directory-count" aria-live="polite">Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} matching connections</p>
      <div className="koa-directory-grid" id="koa-connection-results">
        {visibleRecords.map(record => <article className="koa-directory-card" key={record.id}>
          <p className="koa-directory-type">{record.kind === "architecture" ? "Functional chain" : record.kind === "applications" ? "Application" : record.kind === "journeys" ? "Journey" : "Evidence"}</p>
          <h2>{record.title}</h2>
          <p>{record.description}</p>
          <p className="koa-directory-status">{record.status}</p>
          <a className="koa-directory-link" href={record.href} target={record.external ? "_blank" : undefined} rel={record.external ? "noopener noreferrer" : undefined}>Open {record.kind === "architecture" ? "chain" : record.kind === "applications" && !record.external ? "architecture" : "record"} <ArrowUpRight size={16} aria-hidden="true" /></a>
          {record.secondary && record.secondary.length > 0 && <div className="koa-directory-related"><strong>Proposed navigation crosswalks:</strong>{record.secondary.map((item, index) => <a key={`${item.href}-${index}`} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>{item.title}</a>)}</div>}
        </article>)}
        {filtered.length === 0 && <p className="koa-directory-empty">No matching connections. Try a shorter system or chain name.</p>}
      </div>
      {visibleCount < filtered.length ? (
        <div className="my-6 text-center">
          <button type="button" aria-controls="koa-connection-results" onClick={() => setVisibleCount(c => c + 18)} className="rounded-lg border px-5 py-3 font-semibold hover:underline">
            Show more connections ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      ) : null}
      <p className="koa-connections-note">Source: the two supplied local snapshots. Editorial chain-to-journey mappings are proposals requiring review; links are navigational, not verification or certification.</p>
    </section>
  );
}
