// lib/supabase/server.ts

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            /**
             * Server Components cannot always set cookies.
             *
             * This is safe when the client is only being used for public reads,
             * such as reading published documents for /reading pages.
             *
             * Route Handlers and Server Actions can set cookies normally.
             */
          }
        },
      },
    },
  );
}

export type SupabaseServerClient = Awaited<
  ReturnType<typeof createSupabaseServerClient>
>;