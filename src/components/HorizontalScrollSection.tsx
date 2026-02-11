'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Default facilities - will be replaced with data from DB
const defaultFacilities = [
    {
        id: 1,
        title: "The Iron Room",
        description: "Built for true powerlifting. Premium Hammer Strength equipment.",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Conditioning Zone",
        description: "High-intensity cardio and functional training area.",
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Personal Suites",
        description: "Private training rooms for focused 1-on-1 sessions.",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Recovery Lab",
        description: "Rest, recover, and rebuild with premium amenities.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    }
];

interface FacilityItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface HorizontalScrollSectionProps {
    facilities?: FacilityItem[];
}

const HorizontalScrollSectionClient = ({ facilities = defaultFacilities }: HorizontalScrollSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Mobile: 4 cards at 92vw + 4vw gaps = ~384vw total -> shift needed ~ -284vw
    // Desktop: 4 cards at 40vw + 2vw gaps = ~166vw total -> shift needed ~ -75vw
    const scrollRange = isMobile ? "-284vw" : "-75vw";
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", scrollRange]);

    return (
        <section ref={containerRef} className="relative h-[250vh] bg-god-bg">
            {/* Sticky container */}
            <div className="sticky top-0 h-screen flex flex-col justify-start overflow-hidden">

                {/* Section Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-16 sm:pt-24 pb-8">
                    <span className="text-god-accent text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-3 block">
                        Our Facility
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter leading-none">
                            Facility <span className="text-god-accent">Excellence</span>
                        </h2>
                        <p className="text-god-muted text-base sm:text-lg max-w-md md:text-right">
                            Every corner designed for peak performance.
                        </p>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="flex-1 flex items-center overflow-hidden">
                    <motion.div
                        style={{ x }}
                        className="flex gap-[4vw] sm:gap-[2vw] pl-[4vw]"
                    >
                        {facilities.map((facility) => (
                            <div
                                key={facility.id}
                                className="group relative h-[50vh] sm:h-[60vh] w-[92vw] sm:w-[55vw] md:w-[45vw] lg:w-[40vw] flex-shrink-0 overflow-hidden bg-god-card border border-white/5 hover:border-god-accent/30 transition-colors duration-500"
                            >
                                {/* Image */}
                                {facility.image ? (
                                    <img
                                        src={facility.image}
                                        alt={facility.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover filter grayscale-0 sm:grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-god-card flex items-center justify-center text-white/10 text-sm">No Image</div>
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                    {/* Number Tag */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-god-accent/10 border border-god-accent/30 text-god-accent font-heading font-bold text-sm sm:text-base">
                                            0{facility.id}
                                        </span>
                                        <div className="h-px flex-1 bg-gradient-to-r from-god-accent/50 to-transparent"></div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase italic tracking-tighter mb-3 group-hover:text-god-accent transition-colors duration-300">
                                        {facility.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-god-muted text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
                                        {facility.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HorizontalScrollSectionClient;
