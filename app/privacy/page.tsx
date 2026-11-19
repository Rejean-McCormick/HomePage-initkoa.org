import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy & site data — kOA",
  description: "Information about the site features, theme preference, external links and analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6">
      <h1>Privacy &amp; site data</h1>
      <p>This page describes features visible in the website source. It is an informational summary, not a substitute for a reviewed legal privacy notice.</p>
      <h2>Appearance preference</h2>
      <p>The Light, Dark and Neon selector stores a <code>koa-theme</code> preference in your browser&apos;s local storage. You can change it at any time in the header or clear the browser&apos;s site data.</p>
      <h2>Analytics and hosted services</h2>
      <p>The website includes Vercel Analytics. Published reading documents are served from a connected database (Supabase). These providers may process technical information in order to operate their services. Their policies and the current deployment configuration must be reviewed to establish actual data processing and retention.</p>
      <h2>External resources</h2>
      <p>Links to third-party repositories, audio/video channels and other sites are governed by those services&apos; own practices. External links are not evidence that a third-party resource is maintained or endorsed.</p>
      <h2>Contact</h2>
      <p>For questions and correction requests, use the public <Link href="/links">contact and profile links</Link>.</p>
    </main>
  );
}
