"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Palette, Search, X } from "lucide-react";
import SiteLink from "@/components/SiteLink";
import { homeNavigation } from "@/lib/home-navigation";
import { capabilities, navigation } from "@/lib/site-navigation";

const capabilityEntries = [
  ...capabilities.map(({ title, href, description }) => ({ label: title, href, keywords: description })),
];

function normalized(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

type KoaTheme = "light" | "dark" | "neon";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<KoaTheme>("light");
  const modal = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const mobile = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const pathname = usePathname();
  const french = pathname === "/";
  const groups = french ? homeNavigation : navigation;
  const searchEntries = [...groups.flatMap((group) => [...group.links]), ...capabilityEntries];

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-koa-theme");
    if (current === "dark" || current === "neon") setTheme(current);
  }, []);

  function selectTheme(next: KoaTheme) {
    setTheme(next);
    if (next === "light") {
      document.documentElement.removeAttribute("data-koa-theme");
    } else {
      document.documentElement.setAttribute("data-koa-theme", next);
    }
    try { localStorage.setItem("koa-theme", next); } catch { /* private browsing */ }
  }

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
      <a lang={french ? "fr" : "en"} className="site-skip" href="#site-content">{french ? "Aller au contenu" : "Skip to content"}</a>
      <header lang={french ? "fr" : "en"} className="koa-header" onKeyDown={(event) => {
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
          <SiteLink href="/" className="koa-brand" aria-label={french ? "Initiative kOA — accueil" : "The kOA Initiative — home"}>
            <span className="koa-brand-mark" aria-hidden="true">
              <img className="koa-logo koa-logo--light" src="/koa-mark.svg" alt="" width={82} height={36} />
              <img className="koa-logo koa-logo--dark" src="/koa-mark-dark.svg" alt="" width={82} height={36} />
              <img className="koa-logo koa-logo--neon" src="/koa-mark-neon.svg" alt="" width={82} height={36} />
            </span>
            <span className="koa-brand-copy">
              <strong>The kOA</strong>
              <small>INITIATIVE</small>
            </span>
          </SiteLink>
          <div className="koa-header-tools">
            <div className="koa-theme-control">
              <Palette size={16} aria-hidden="true" />
              <label htmlFor="koa-theme" className="sr-only">{french ? "Apparence" : "Appearance theme"}</label>
              <select id="koa-theme" aria-label={french ? "Apparence" : "Appearance theme"} value={theme} onChange={(event) => selectTheme(event.target.value as KoaTheme)}>
                <option value="light">{french ? "Clair" : "Light"}</option>
                <option value="dark">{french ? "Sombre" : "Dark"}</option>
                <option value="neon">{french ? "Néon" : "Neon"}</option>
              </select>
            </div>
            <button type="button" className="koa-icon" onClick={toggleSearch} aria-label={french ? "Rechercher" : "Search"}>
              <Search size={20} aria-hidden="true" />
            </button>
            <button ref={mobile} type="button" className="koa-icon koa-mobile-toggle"
              aria-label={mobileOpen ? (french ? "Fermer le menu" : "Close navigation") : (french ? "Ouvrir le menu" : "Open navigation")}
              aria-controls="site-navigation" aria-expanded={mobileOpen}
              onClick={() => { setMobileOpen(!mobileOpen); setActive(null); }}>
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
          <nav id="site-navigation" aria-label={french ? "Principale" : "Main"} className="koa-nav" data-open={mobileOpen}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
            }}>
            {groups.map((group, index) => (
              <div className="koa-nav-group" key={group.label}>
                <SiteLink href={group.href} onClick={() => { setActive(null); setMobileOpen(false); }}
                  aria-current={pathname === group.href ? "page" : undefined}>{group.label}</SiteLink>
                <button ref={(button) => { triggers.current[group.label] = button; }}
                  type="button" className="koa-nav-trigger" aria-label={french ? "Liens · " + group.label : group.label + " links"}
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
      <dialog lang={french ? "fr" : "en"} ref={modal} className="koa-search" aria-labelledby="site-search-title">
        <div className="koa-search-heading">
          <h2 id="site-search-title">{french ? "Rechercher dans kOA" : "Search kOA"}</h2>
          <form method="dialog"><button className="koa-icon" aria-label={french ? "Fermer la recherche" : "Close search"}><X size={20} aria-hidden="true" /></button></form>
        </div>
        <label htmlFor="site-search">{french ? "Rechercher un parcours, un outil ou une ressource" : "Search capabilities, systems and documentation"}</label>
        <input ref={searchInput} id="site-search" type="search" placeholder={french ? "Ex. culture, Kristal, sources" : "Try learning, offline or UCKK"}
          value={query} onChange={(event) => setQuery(event.target.value)} />
        <p aria-live="polite" className="koa-result-count">{terms.length ? results.length + (french ? " résultat(s)" : " results") : " "}</p>
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
