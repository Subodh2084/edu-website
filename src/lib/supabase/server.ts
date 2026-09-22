import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

/** Admin session lasts at most 1 hour and is cleared when the browser is closed. */
const SESSION_MAX_AGE = 60 * 60; // 1 hour in seconds

export async function createClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: (url, options) => fetch(url, { ...options, cache: "no-store" }),
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Strip persistent options so the cookie becomes a session cookie
            // (deleted when the browser is closed).
            // Also cap at SESSION_MAX_AGE as a hard server-side timeout.
            const { maxAge: _m, expires: _e, ...sessionOptions } = options ?? {};
            cookieStore.set(name, value, {
              ...sessionOptions,
              maxAge: SESSION_MAX_AGE,
            });
          });
        } catch {
          // Ignored when called from Server Components
        }
      },
    },
  });
}
