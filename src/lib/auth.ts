import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const secretKey = process.env.AUTH_SECRET || "default_secret_key_change_me_in_production";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function login(formData: FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    // Secure Admin Authentication
    // Credentials must be set in .env.local for security
    const adminEmail = process.env.ADMIN_EMAIL;
    let adminHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminHash) {
        console.error("[AUTH ERROR] Missing ADMIN_EMAIL or ADMIN_PASSWORD_HASH in .env.local");
        throw new Error("Server configuration error. Admin credentials not found.");
    }

    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    // Secure email comparison
    if (email !== adminEmail) {
        throw new Error("Invalid credentials.");
    }

    // Normalize hash (handle Windows/Next.js escaping issues or Base64 encoding)
    if (adminHash.startsWith('B64:')) {
        adminHash = Buffer.from(adminHash.replace('B64:', ''), 'base64').toString();
    } else if (adminHash.includes('$$')) {
        adminHash = adminHash.replace(/\$\$/g, '$');
    }

    // Verify password match using bcrypt
    const passwordMatch = await bcrypt.compare(password, adminHash);

    if (!passwordMatch) {
        console.log(`[AUTH] Login failed for ${email}`);
        throw new Error("Invalid credentials.");
    }

    const user = { email, name: "Admin" };

    // Create session
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const session = await encrypt({ user, expires });

    // Save session cookie
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        expires,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === "production",
        path: '/'
    });
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set("session", "", { expires: new Date(0), path: '/' });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;
    try {
        return await decrypt(session);
    } catch (error) {
        return null;
    }
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    try {
        const parsed = await decrypt(session);
        parsed.expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
        const res = NextResponse.next();
        res.cookies.set({
            name: "session",
            value: await encrypt(parsed),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: parsed.expires,
            sameSite: 'lax',
            path: '/'
        });
        return res;
    } catch (error) {
        return;
    }
}

export async function requireAuth() {
    const session = await getSession();
    if (!session) {
        throw new Error("Unauthorized: Access denied.");
    }
    return session;
}
