import React from "react";
import fs from 'fs/promises';
import path from 'path';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function getSiteSettings() {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'gym-data.json');
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContents);
        return data.siteSettings;
    } catch {
        return null;
    }
}

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSiteSettings();

    return (
        <>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer settings={settings} />
        </>
    );
}
