import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

// 1. Specify protected and public routes
const protectedRoutes = ["/portal-access", "/portal-access/hero", "/portal-access/about", "/portal-access/programs", "/portal-access/trainers", "/portal-access/gallery", "/portal-access/transformations", "/portal-access/membership", "/portal-access/settings"];
const publicRoutes = ["/portal-access/login"];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => path === route || path.startsWith(`${route}/`));
    const isPublicRoute = publicRoutes.includes(path);

    // 3. Decrypt the session from the cookie
    const cookie = req.cookies.get("session")?.value;
    let session = null;

    if (cookie) {
        try {
            session = await decrypt(cookie);
        } catch (e) {
            // Invalid session
        }
    }

    // 4. Redirect to Homepage if the user is not authenticated and trying to access a protected route
    // This helps hide the existence of the admin portal
    if (isProtectedRoute && !session && path !== "/portal-access/login") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    // 5. Redirect to /portal-access if the user is authenticated and trying to access a public route
    if (isPublicRoute && session && !path.startsWith("/portal-access/login")) {
        return NextResponse.redirect(new URL("/portal-access", req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
