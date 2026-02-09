'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TextRevealSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.2"]
    });

    const quote = "STRENGTH IS NOT GIVEN. IT IS EARNED THROUGH PAIN AND PERSISTENCE.";
    const words = quote.split(" ");

    return (
        <section
            ref={containerRef}
            className="relative py-32 sm:py-48 bg-black overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-12">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = (i + 1) / words.length;
                        // Each word illuminates as its specific scroll range is hit
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const scale = useTransform(scrollYProgress, [start, end], [0.95, 1.05]);

                        return (
                            <motion.span
                                key={i}
                                style={{ opacity, scale }}
                                className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter text-white"
                            >
                                {word}
                            </motion.span>
                        );
                    })}
                </div>
            </div>

            {/* Decorative background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-god-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        </section>
    );
};

export default TextRevealSection;
