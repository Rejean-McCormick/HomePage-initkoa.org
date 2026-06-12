import { config as loadDotEnv } from "dotenv";
import path from "node:path";
import dns from "node:dns/promises";
import { createClient } from "@supabase/supabase-js";

loadDotEnv({ path: path.join(process.cwd(), ".env.local"), override: false, quiet: true });
loadDotEnv({ path: path.join(process.cwd(), ".env"), override: false, quiet: true });

const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "",
  READING_AI_INDEX_PATH: process.env.READING_AI_INDEX_PATH || "public/reading/ai-index.json",
};

function printPresence(name, value) {
  if (!value) {
    console.log(`${name}: missing`);
    return;
  }

  if (name.includes("KEY")) {
    console.log(`${name}: present length=${value.length}`);
    return;
  }

  console.log(`${name}: present value=${value}`);
}

console.log("\n--- Env presence ---");
for (const [name, value] of Object.entries(env)) {
  printPresence(name, value);
}

if (!env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error("\nFAIL: Missing NEXT_PUBLIC_SUPABASE_URL");
  process.exit(1);
}

if (!env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("\nFAIL: Missing SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

let parsedUrl;

try {
  parsedUrl = new URL(env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("\n--- URL validation ---");
  console.log(`protocol=${parsedUrl.protocol}`);
  console.log(`host=${parsedUrl.host}`);
  console.log(`origin=${parsedUrl.origin}`);

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    console.error("FAIL: Supabase URL protocol must be http or https.");
    process.exit(1);
  }
} catch (error) {
  console.error("FAIL: Invalid NEXT_PUBLIC_SUPABASE_URL");
  console.error(error);
  process.exit(1);
}

console.log("\n--- DNS lookup ---");
try {
  const addresses = await dns.lookup(parsedUrl.hostname, { all: true });
  console.log(addresses);
} catch (error) {
  console.error("DNS lookup failed.");
  console.error(error);
}

console.log("\n--- Raw fetch test: /rest/v1/ ---");
try {
  const response = await fetch(`${parsedUrl.origin}/rest/v1/`, {
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Accept: "application/json",
    },
  });

  console.log(`HTTP ${response.status} ${response.statusText}`);
  console.log((await response.text()).slice(0, 1200));
} catch (error) {
  console.error("Raw fetch failed.");
  console.error("name:", error?.name);
  console.error("message:", error?.message);
  console.error("cause:", error?.cause);
}

console.log("\n--- Raw fetch test: documents published limit 1 ---");
try {
  const endpoint =
    `${parsedUrl.origin}/rest/v1/documents` +
    `?select=id,slug,status` +
    `&status=eq.published` +
    `&limit=1`;

  const response = await fetch(endpoint, {
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Accept: "application/json",
    },
  });

  console.log(`HTTP ${response.status} ${response.statusText}`);
  console.log((await response.text()).slice(0, 1200));
} catch (error) {
  console.error("Documents fetch failed.");
  console.error("name:", error?.name);
  console.error("message:", error?.message);
  console.error("cause:", error?.cause);
}

console.log("\n--- Supabase client test: documents ---");
try {
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  const { data, error } = await supabase
    .from("documents")
    .select("id,slug,status")
    .eq("status", "published")
    .limit(1);

  if (error) {
    console.error("Supabase client returned error:");
    console.error(error);
    process.exit(1);
  }

  console.log("Supabase client OK.");
  console.log(data);
} catch (error) {
  console.error("Supabase client threw:");
  console.error("name:", error?.name);
  console.error("message:", error?.message);
  console.error("cause:", error?.cause);
  process.exit(1);
}
