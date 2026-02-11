import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createBrowserClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Plain client for public data reads (no auth needed)
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

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
