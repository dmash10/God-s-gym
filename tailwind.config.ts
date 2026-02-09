import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                god: {
                    bg: '#09090b',      // Deepest black/zinc
                    card: '#18181b',    // Zinc-900
                    accent: '#EAB308',  // Yellow-500 (Golden)
                    red: '#DC2626',     // Red-600
                    text: '#FAFAFA',    // Off-white
                    muted: '#A1A1AA',   // Zinc-400
                }
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                heading: ["var(--font-oswald)", "sans-serif"],
            },
            animation: {
                'marquee': 'marquee 30s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            backgroundImage: {
                'noise': "url('https://grainy-gradients.vercel.app/noise.svg')",
            }
        },
    },
    plugins: [],
};
export default config;
