import { createClient } from "./supabase";

export async function login(formData: FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        throw new Error(error.message);
    }
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
}

export async function getSession() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return { user };
}

export async function requireAuth() {
    const session = await getSession();
    if (!session) {
        throw new Error("Unauthorized");
    }
    return session;
}
