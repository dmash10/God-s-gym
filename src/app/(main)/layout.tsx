import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGymData } from "@/lib/actions";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = await getGymData();
    const settings = data.siteSettings;

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
