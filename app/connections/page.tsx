import type { Metadata } from "next";
import ConnectionsExplorer from "@/components/ConnectionsExplorer";

export const metadata: Metadata = {
  title: "Ecosystem Connections — The kOA Initiative",
  description: "Explore documented applications, target functional chains, proposed navigation crosswalks and dated public audit paths without conflating plans with evidence.",
  alternates: { canonical: "/connections" },
};

export default function ConnectionsPage() {
  return (
    <main className="koa-connections-page not-prose" id="connections-top">
      <header className="koa-connections-intro">
        <p className="koa-connections-eyebrow">The kOA Initiative · kOA Graph</p>
        <h1>Ecosystem Connections</h1>
        <p>One directory to move between the initiative’s target architecture and the public audit’s dated application records. Search by system, functional chain, or journey.</p>
        <p className="koa-connections-note"><strong>How to read this directory:</strong> a navigation connection is not evidence of a running integration. Target designs, reference inventories, proposed editorial mappings, and tested observations keep their original status.</p>
      </header>
      <ConnectionsExplorer />
      <footer className="koa-connections-footer">
        <a href="/initiative">About The kOA Initiative</a>
        <a href="/ecosystem">Target architecture</a>
        <a href="/go/graph" target="_blank" rel="noopener noreferrer">kOA Graph — interactive map</a>
        <a href="/go/validations" target="_blank" rel="noopener noreferrer">Public validations</a>
        <a href="/data/koa-connections.json">Public navigation registry (JSON)</a>
      </footer>
    </main>
  );
}
