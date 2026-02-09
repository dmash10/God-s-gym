import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        await login(formData);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        // Industry-standard: Add delay on failure to mitigate brute force
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return NextResponse.json(
            { message: error.message || "Invalid credentials" },
            { status: 401 }
        );
    }
}
