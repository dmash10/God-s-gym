'use client';

import React from 'react';
import { Reveal } from './Reveal';
import { ArrowRight, Dumbbell, UserCheck, Coffee, Car } from 'lucide-react';
import Link from 'next/link';

interface FeatureItem {
    title: string;
    description: string;
}

interface StateOfTheArtFitnessProps {
    data: {
        title: string;
        description?: string;
        image: string;
        features?: FeatureItem[];
    };
    showCTA?: boolean;
}

const defaultFeatures: FeatureItem[] = [
    { title: "Premium Gear", description: "Hammer Strength & Life Fitness." },
    { title: "Expert Staff", description: "Certified trainers dedicated to you." },
    { title: "Fuel Bar", description: "Espresso & Recovery Shakes." },
    { title: "Private Parking", description: "Secure spots for members." },
];

const featureIcons = [Dumbbell, UserCheck, Coffee, Car];

export const StateOfTheArtFitness: React.FC<StateOfTheArtFitnessProps> = ({ data, showCTA = true }) => {
    const { title, description, image, features = defaultFeatures } = data;

    // Split title to highlight last word
    const titleWords = title.split(' ');
    const lastWord = titleWords.pop();
    const restOfTitle = titleWords.join(' ');

    return (
        <section className="py-16 sm:py-28 md:py-36 bg-god-card relative overflow-hidden">
            {/* Background Decorative Text */}
            <div className="absolute -top-10 -right-20 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none uppercase italic tracking-tighter leading-none">
                {lastWord}
            </div>

            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-god-accent to-transparent opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 items-center relative z-10">
                {/* Image with accent border frame */}
                <Reveal>
                    <div className="relative group">
                        {/* Top-left accent corner */}
                        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 sm:w-24 h-full border-l-2 border-t-2 border-god-accent z-20 transition-all duration-500 group-hover:scale-105 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
                        {/* Bottom-right subtle corner */}
                        <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 sm:w-24 h-full border-r-2 border-b-2 border-god-accent/20 z-0 transition-all duration-500 group-hover:scale-105 group-hover:translate-x-1 group-hover:translate-y-1"></div>

                        <div className="relative z-10 overflow-hidden">
                            <img
                                src={image || "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop"}
                                alt={title}
                                loading="lazy"
                                className="w-full aspect-[3/2] object-cover filter grayscale-0 sm:grayscale contrast-[1.1] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            />
                        </div>
                    </div>
                </Reveal>

                {/* Content Side */}
                <div className="flex flex-col justify-center">
                    <Reveal>
                        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] uppercase italic tracking-tighter mb-6">
                            {restOfTitle} <span className="text-god-accent">{lastWord}</span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <p className="text-god-muted text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
                            {description}
                        </p>
                    </Reveal>

                    {/* Feature Grid - 2x2 */}
                    <Reveal delay={0.2}>
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
                            {features.slice(0, 4).map((feature, index) => {
                                const Icon = featureIcons[index] || Dumbbell;
                                return (
                                    <div key={index} className="flex items-start gap-3 group">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-god-accent/10 border border-god-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-god-accent/20 transition-colors">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-god-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-wide">{feature.title}</h4>
                                            <p className="text-god-muted text-xs sm:text-sm leading-snug">{feature.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>

                    {/* CTA Button */}
                    {showCTA && (
                        <Reveal delay={0.3}>
                            <Link
                                href="/about"
                                className="group inline-flex items-center gap-3 bg-god-accent hover:bg-white text-black px-8 py-3 font-heading font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.3)] w-fit"
                            >
                                Learn More
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    );
};
