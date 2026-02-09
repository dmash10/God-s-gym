import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "God's Gym | Build Godlike Strength",
  description: "The ultimate destination for achieving your maximum physical potential. Join God's Gym Dehradun today.",
  keywords: ["gym", "fitness", "bodybuilding", "strength training", "Dehradun gym", "God's Gym"],
  openGraph: {
    title: "God's Gym | Build Godlike Strength",
    description: "The ultimate destination for achieving your maximum physical potential.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${oswald.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-white bg-god-bg selection:bg-god-accent selection:text-black min-h-screen flex flex-col">
        <div className="bg-noise" />
        {children}
      </body>
    </html>
  );
}

