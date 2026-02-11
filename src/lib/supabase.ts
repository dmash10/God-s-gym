import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createBrowserClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Plain client for public data reads (no auth needed)
// Lazy initialization to avoid build-time crash when env vars aren't set
let _supabase: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
    if (!_supabase) {
        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Supabase URL and Anon Key must be set in environment variables');
        }
        _supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
    }
    return _supabase;
}

// Keep backward-compatible export as a getter with full typing
const supabaseInstance = {} as ReturnType<typeof createBrowserClient>;
export const supabase = new Proxy(supabaseInstance, {
    get(_target, prop) {
        const client = getSupabaseClient();
        return (client as any)[prop];
    },
});

// Server client with cookie-based auth for protected operations
export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        // Ignore - called from Server Component
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: '', ...options });
                    } catch (error) {
                        // Ignore - called from Server Component
                    }
                },
            },
        }
    );
}
