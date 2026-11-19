// The catalogue is bundled in /public; render it on the server for accessible HTML and SEO.
// The client component remains responsible for interactive filters and refreshing.
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import PlayClient from "@/components/PlayClient";

export const metadata: Metadata = {
  title: "Watch & Listen — kOA",
  description: "Browse kOA videos, audio, articles and public creative resources with accessible filters.",
  alternates: { canonical: "/play" },
};

export const revalidate = 3600;

const INVENTORY_FILES = [
  "inventory.articles.catalog.json", "inventory.audio.catalog.json",
  "inventory.code-tech.catalog.json", "inventory.youtube.catalog.json",
];

function readInventory(file: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", file), "utf8"));
  } catch (error) {
    console.error(`Unable to read bundled inventory ${file}:`, error);
    return null;
  }
}

export default function PlayPage() {
  const initialRoot = readInventory("inventory.root.json") ?? {};
  const initialParts = INVENTORY_FILES.map(readInventory).filter((part) => part !== null);
  return <PlayClient initialRoot={initialRoot} initialParts={initialParts} />;
}
