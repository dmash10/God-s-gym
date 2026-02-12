"use client";

import React, { useState } from 'react';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';
import Link from 'next/link';
import { Check, ArrowRight, Dumbbell, Crown, Zap } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface Plan {
    id: number;
    title: string;
    price: string;
    features: string[];
}

interface MembershipClientProps {
    plans: Plan[];
    whatsappNumber?: string;
}

export default function MembershipClient({ plans, whatsappNumber }: MembershipClientProps) {
    const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

    const getIcon = (title: string) => {
        switch (title.toUpperCase()) {
            case 'BEGINNER': return <Dumbbell className="h-5 w-5 sm:h-6 sm:w-6" />;
            case 'STANDARD': return <Zap className="h-5 w-5 sm:h-6 sm:w-6" />;
            case 'ELITE PT': return <Crown className="h-5 w-5 sm:h-6 sm:w-6" />;
            default: return <Dumbbell className="h-5 w-5 sm:h-6 sm:w-6" />;
        }
    };

    return (
        <div className="pt-20 sm:pt-24 min-h-screen bg-god-bg text-white overflow-x-hidden relative">
            {/* Background Texture & Gradient - simplified for mobile performance */}
            <div className="hidden sm:block fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full sm:w-[800px] h-[300px] sm:h-[500px] bg-god-accent/5 sm:bg-god-accent/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 relative z-10">

                {/* Header */}
                <div className="mb-10 sm:mb-16 md:mb-24 text-center mt-6 sm:mt-10">
                    <Reveal width="100%">
                        <div className="inline-block px-3 sm:px-4 py-1 mb-3 sm:mb-4 border border-god-accent/30 rounded-full bg-god-accent/5 backdrop-blur-sm">
                            <span className="text-god-accent text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase">
                                Invest In Yourself
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tighter mb-4 sm:mb-6 leading-none">
                            Join The <span className="text-god-accent">Pantheon</span>
                        </h1>
                        <p className="text-god-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2">
                            Select the tier that matches your ambition.
                            <span className="text-white font-medium"> No hidden fees. No compromises.</span>
                        </p>
                    </Reveal>
                </div>

                {/* Pricing Cards */}
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-8 items-start">
                    {plans.map((plan) => {
                        const isHovered = hoveredPlan === plan.id;
                        const isStandard = plan.title.toUpperCase() === 'STANDARD';

                        return (
                            <StaggerItem key={plan.id} className="h-full">
                                <div
                                    className={`relative flex flex-col h-full bg-god-card/40 backdrop-blur-md border transition-all duration-500 overflow-hidden group
                    ${isStandard ? 'border-god-accent/40 shadow-lg shadow-god-accent/10 sm:shadow-[0_0_40px_rgba(234,179,8,0.15)] md:-mt-4 md:mb-4' : 'border-white/5 hover:border-god-accent/30'}
                  `}
                                    onMouseEnter={() => setHoveredPlan(plan.id)}
                                    onMouseLeave={() => setHoveredPlan(null)}
                                >
                                    {/* Top Liquid Glow Bar (Unified Branding) */}
                                    <div
                                        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px] z-20"
                                        style={{ background: 'linear-gradient(90deg, transparent, #DC2626, #F97316, #EAB308, transparent)' }}
                                    />

                                    {/* Popular Glow Indicator */}
                                    {isStandard && (
                                        <div className="absolute top-0 inset-x-0 h-[1px] bg-god-accent opacity-50 shadow-[0_0_15px_#EAB308]"></div>
                                    )}

                                    <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col h-full relative z-10">
                                        {/* Plan Header */}
                                        <div className="mb-5 sm:mb-6 md:mb-8">
                                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                                <div className={`p-2.5 sm:p-3 rounded-lg ${isStandard ? 'bg-god-accent text-black' : 'bg-white/5 text-white'}`}>
                                                    {getIcon(plan.title)}
                                                </div>
                                                {isStandard && (
                                                    <span className="bg-god-accent text-black text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-full uppercase tracking-widest font-heading">
                                                        Most Popular
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase italic tracking-wide mb-2">
                                                {plan.title}
                                            </h3>

                                            <div className="flex items-baseline gap-1">
                                                <span className={`text-3xl sm:text-4xl md:text-5xl font-heading font-black ${isStandard ? 'text-god-accent' : 'text-white'}`}>
                                                    {plan.price.split(' ')[0]}
                                                </span>
                                                <span className="text-god-muted font-heading uppercase tracking-widest text-xs sm:text-sm">
                                                    {plan.price.split(' ').slice(1).join(' ')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5 sm:mb-6 md:mb-8"></div>

                                        {/* Features */}
                                        <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-5 mb-6 sm:mb-8 md:mb-10">
                                            {plan.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                                                    <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${isStandard ? 'bg-god-accent text-black' : 'bg-white/10 text-god-accent'}`}>
                                                        <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                                    </div>
                                                    <span className="leading-snug">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            href={getWhatsAppUrl(whatsappNumber || '919897638649', `Hi, I'm interested in the ${plan.title} membership plan!`)}
                                            target="_blank"
                                            className={`
                        relative w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-heading font-bold uppercase tracking-widest text-xs sm:text-sm
                        transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 touch-manipulation active:scale-95
                        ${isStandard
                                                    ? 'bg-god-accent text-black hover:bg-white hover:scale-[1.02] shadow-lg shadow-god-accent/20'
                                                    : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black hover:border-white'
                                                }
                      `}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                Select Plan <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                            </span>
                                        </Link>
                                    </div>

                                    {/* Hover Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : ''}`}></div>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>

                {/* FAQ / Trust Section */}
                <div className="mt-12 sm:mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-god-card/30 border border-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-god-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10">
                        <h4 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase mb-3 sm:mb-4">Enterprise & Groups</h4>
                        <p className="text-god-muted text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                            Looking for corporate wellness packages or group discounts? We offer tailored solutions for teams committed to excellence.
                        </p>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {['Corporate Wellness', 'Sports Teams', 'Family Plans'].map(tag => (
                                <span key={tag} className="px-2.5 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-god-muted">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col justify-center items-start md:items-end mt-4 md:mt-0">
                        <Link
                            href={getWhatsAppUrl(whatsappNumber || '919897638649', "Hi, I'd like to enquire about corporate/group membership packages.")}
                            target="_blank"
                            className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-black rounded-lg sm:rounded-xl font-heading font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-god-accent transition-colors duration-300 touch-manipulation active:scale-95"
                        >
                            Book Consultation
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

