"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Dumbbell } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 no-transition ${scrolled ? 'bg-god-bg/90 backdrop-blur-md border-b border-white/5 py-2 sm:py-3' : 'bg-transparent py-3 sm:py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group z-50 touch-manipulation">
                        <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden border-2 border-god-accent shadow-[0_0_20px_rgba(234,179,8,0.4)] flex-shrink-0">
                            <Image
                                src="/279366374_439163201310420_5315574228252384272_n (1).jpg"
                                alt="God's Gym Logo"
                                fill
                                className="object-cover scale-110"
                                priority
                            />
                        </div>
                        <span className="font-heading font-bold text-xl sm:text-2xl tracking-tighter text-white uppercase italic">
                            God's<span className="text-god-accent">Gym</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-6 lg:space-x-8">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className={`text-sm font-bold tracking-widest hover:text-god-accent transition-all duration-300 relative group py-2 ${isActive ? 'text-god-accent' : 'text-gray-400'
                                        }`}
                                >
                                    {item.label}
                                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-god-accent origin-left transform transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden items-center gap-3 z-50">
                        <Link
                            href="/membership"
                            className="bg-god-accent text-black px-4 py-2.5 font-heading font-bold text-xs uppercase tracking-wider shadow-[0_2px_10px_rgba(234,179,8,0.4)] hover:shadow-[0_4px_15px_rgba(234,179,8,0.6)] hover:scale-105 active:scale-95 transition-all"
                        >
                            Join Now
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none p-2 -mr-2 touch-manipulation active:scale-95 transition-transform"
                            aria-label="Toggle Menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X className="h-7 w-7 sm:h-8 sm:w-8" /> : <Menu className="h-7 w-7 sm:h-8 sm:w-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 w-full h-[100dvh] bg-god-bg flex flex-col items-center justify-center gap-6 sm:gap-8 z-40"
                    >
                        {NAV_ITEMS.map((item, index) => {
                            const isActive = pathname === item.path;
                            return (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={item.path}
                                        className={`font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight touch-manipulation active:scale-95 transition-transform ${isActive ? 'text-god-accent' : 'text-white/50 hover:text-white'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
