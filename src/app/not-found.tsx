'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dumbbell, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background elements - Large Glowing Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-god-accent/10 rounded-full blur-[120px] -z-10" />

            <div className="text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1
                    }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative group">
                        <Dumbbell className="h-28 w-28 text-god-accent drop-shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-transform duration-700" />

                        {/* The "Cross" signifying Not Found */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '120%', opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 bg-red-600/60 blur-[1px] -rotate-45"
                        />
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '120%', opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 bg-red-600/60 blur-[1px] rotate-45"
                        />
                    </div>
                </motion.div>

                <div className="relative inline-block mb-2">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-heading text-[120px] md:text-[180px] font-bold text-white/5 uppercase leading-none select-none"
                    >
                        404
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="absolute inset-0 flex items-center justify-center pt-8"
                    >
                        <h2 className="font-heading text-4xl md:text-6xl font-bold text-god-accent uppercase italic tracking-tight drop-shadow-2xl">
                            GAINS NOT FOUND
                        </h2>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="max-w-lg mx-auto"
                >
                    <p className="text-god-muted font-medium text-lg md:text-xl leading-relaxed mb-10 px-4">
                        You've wandered into the <span className="text-white italic underline decoration-god-accent underline-offset-4">wrong muscle group</span>.
                        This page skipped its workout and simply doesn't exist.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <Link
                        href="/"
                        className="group relative inline-flex items-center gap-3 active:scale-95 transition-transform"
                    >
                        {/* Perspective shadow - Outside the clipping container */}
                        <div className="absolute -bottom-2 -right-2 w-full h-full bg-god-accent/20 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />

                        {/* Main Button Body with clipping */}
                        <div className="relative px-10 py-5 bg-god-accent text-black font-heading font-black uppercase italic tracking-widest overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">
                                <ArrowLeft className="h-6 w-6 stroke-[3px]" /> Back to the Temple
                            </span>

                            {/* Liquid Glow Hover Effect - Clipped by overflow-hidden */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-liquid-glow pointer-events-none" />
                        </div>
                    </Link>
                </motion.div>
            </div>

            {/* Subtle floating particles (optional styling) - Client-side only to avoid hydration mismatch */}
            {mounted && (
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-god-accent w-1 h-1 rounded-full animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.5}s`
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

