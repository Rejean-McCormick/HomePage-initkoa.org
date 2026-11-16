"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import SiteLink from "@/components/SiteLink";
import { capabilities, navigation } from "@/lib/site-navigation";

const searchEntries = [
  ...navigation.flatMap((group) => [...group.links]),
  ...capabilities.map(({ title, href, description }) => ({ label: title, href, keywords: description })),
];

function normalized(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const modal = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const mobile = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setActive(null);
    modal.current?.close();
  }, [pathname]);

  const terms = normalized(query).trim().split(/\s+/).filter(Boolean);
  const results = terms.length ? searchEntries.filter((item) =>
    terms.every((term) => normalized(item.label + " " + item.keywords).includes(term))
  ) : [];

  function toggleSearch() {
    setQuery("");
    setActive(null);
    modal.current?.showModal();
    searchInput.current?.focus();
  }

  return (
    <>
      <a className="site-skip" href="#site-content">Skip to content</a>
      <header className="koa-header" onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (active) {
          triggers.current[active]?.focus();
          setActive(null);
        } else if (mobileOpen) {
          setMobileOpen(false);
          mobile.current?.focus();
        }
      }}>
        <div className="koa-header-inner">
          <SiteLink href="/" className="koa-brand" aria-label="kOA home">
            <span className="koa-wordmark">kOA</span><span>The kOA Initiative</span>
          </SiteLink>
          <div className="koa-header-tools">
            <button type="button" className="koa-icon" onClick={toggleSearch} aria-label="Search">
              <Search size={20} aria-hidden="true" />
            </button>
            <button ref={mobile} type="button" className="koa-icon koa-mobile-toggle"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-controls="site-navigation" aria-expanded={mobileOpen}
              onClick={() => { setMobileOpen(!mobileOpen); setActive(null); }}>
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
          <nav id="site-navigation" aria-label="Main" className="koa-nav" data-open={mobileOpen}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
            }}>
            {navigation.map((group, index) => (
              <div className="koa-nav-group" key={group.label}>
                <SiteLink href={group.href} onClick={() => { setActive(null); setMobileOpen(false); }}
                  aria-current={pathname === group.href ? "page" : undefined}>{group.label}</SiteLink>
                <button ref={(button) => { triggers.current[group.label] = button; }}
                  type="button" className="koa-nav-trigger" aria-label={group.label + " links"}
                  aria-controls={"site-links-" + index} aria-expanded={active === group.label}
                  onClick={() => setActive(active === group.label ? null : group.label)}>
                  <ChevronDown size={15} aria-hidden="true" />
                </button>
                <ul id={"site-links-" + index} className="koa-subnav" hidden={active !== group.label}>
                  {group.links.map((item) => (
                    <li key={item.href}><SiteLink href={item.href} onClick={() => {
                      setActive(null);
                      setMobileOpen(false);
                    }}>{item.label}</SiteLink></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </header>
      <dialog ref={modal} className="koa-search" aria-labelledby="site-search-title">
        <div className="koa-search-heading">
          <h2 id="site-search-title">Search kOA</h2>
          <form method="dialog"><button className="koa-icon" aria-label="Close search"><X size={20} aria-hidden="true" /></button></form>
        </div>
        <label htmlFor="site-search">Search capabilities, systems and documentation</label>
        <input ref={searchInput} id="site-search" type="search" placeholder="Try learning, offline or UCKK"
          value={query} onChange={(event) => setQuery(event.target.value)} />
        <p aria-live="polite" className="koa-result-count">{terms.length ? results.length + " results" : " "}</p>
        <ul>
          {results.map((result) => (
            <li key={result.href + result.label}>
              <SiteLink href={result.href} onClick={() => modal.current?.close()}>{result.label}</SiteLink>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
