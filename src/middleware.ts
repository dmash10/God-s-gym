import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

const protectedRoutes = ["/portal-access"];
const publicRoutes = ["/portal-access/login"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Skip middleware for non-portal routes
    if (!path.startsWith('/portal-access')) {
        return NextResponse.next();
    }

    const isProtectedRoute = protectedRoutes.some(route => path === route || path.startsWith(`${route}/`));
    const isPublicRoute = publicRoutes.includes(path);

    let response = NextResponse.next({
        request: { headers: req.headers },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return req.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    req.cookies.set({ name, value, ...options });
                    response = NextResponse.next({ request: { headers: req.headers } });
                    response.cookies.set({ name, value, ...options });
                },
                remove(name: string, options: CookieOptions) {
                    req.cookies.set({ name, value: "", ...options });
                    response = NextResponse.next({ request: { headers: req.headers } });
                    response.cookies.set({ name, value: "", ...options });
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // Redirect unauthenticated users from protected routes to login
    if (isProtectedRoute && !user && !isPublicRoute) {
        return NextResponse.redirect(new URL("/portal-access/login", req.nextUrl));
    }

    // Redirect authenticated users from login page to dashboard
    if (isPublicRoute && user) {
        return NextResponse.redirect(new URL("/portal-access", req.nextUrl));
    }

    return response;
}

export const config = {
    matcher: ["/portal-access/:path*"],
};
