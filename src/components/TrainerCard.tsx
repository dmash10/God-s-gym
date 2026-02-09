"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { StaggerItem } from './Reveal';

interface TrainerCardProps {
    trainer: {
        id: number | string;
        name: string;
        specialization: string;
        experience: string;
        bio: string;
        image: string;
    };
    index: number;
    className?: string;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, index, className = "" }) => {
    return (
        <StaggerItem
            className={`group relative p-3 sm:p-6 bg-god-card border border-god-accent/40 lg:border-white/5 hover:border-god-accent/40 transition-all duration-500 flex flex-col justify-end overflow-hidden shadow-2xl min-h-[280px] sm:min-h-[420px] ${className}`}
        >
            {/* Background Image (Optimized with next/image) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform lg:group-hover:scale-110 transition-transform duration-1000 lg:grayscale lg:group-hover:grayscale-0 opacity-100 lg:opacity-30 lg:group-hover:opacity-50 object-top"
                    priority={index < 3}
                />
                {/* Visual Density Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-god-bg via-god-bg/70 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-transparent lg:bg-black/20 lg:group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
            </div>

            {/* Top Liquid Glow Bar (Unified Branding) */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 blur-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, #DC2626, #F97316, #EAB308, transparent)' }}
            />

            <div className="absolute top-6 right-6 z-20">
                <ArrowUpRight className="text-god-accent h-5 w-5 sm:h-6 sm:w-6 transform group-hover:rotate-45 transition-transform duration-300" />
            </div>

            {/* Exp Badge - Repositioned to Top Left */}
            <div className="absolute top-6 left-6 z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 transform lg:-translate-x-2 lg:group-hover:translate-x-0">
                <div className="bg-god-accent px-2 py-0.5 text-black text-[9px] font-black uppercase tracking-wider skew-x-[-12deg]">
                    {trainer.experience} XP
                </div>
            </div>

            <div className="relative z-10 w-full text-left transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)">
                <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-black text-god-accent/60 tracking-[0.3em] uppercase">0{index + 1}</span>
                    <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-god-accent/30 transition-colors"></div>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-god-accent lg:text-white mb-0 uppercase italic tracking-tighter lg:group-hover:text-god-accent transition-colors line-clamp-1 leading-tight">
                    {trainer.name}
                </h3>

                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-god-accent/70 lg:text-white/40 lg:group-hover:text-god-accent/70 transition-colors">
                    {trainer.specialization}
                </p>
            </div>

            {/* Corner Accent Detail */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-god-accent/5 pointer-events-none group-hover:to-god-accent/10 transition-colors duration-700"></div>
        </StaggerItem>
    );
};
