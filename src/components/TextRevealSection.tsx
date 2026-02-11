'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface TextRevealSectionProps {
    quote?: string;
    author?: string;
    backgroundImage?: string;
}

interface AnimatedWordProps {
    word: string;
    index: number;
    totalWords: number;
    scrollProgress: MotionValue<number>;
}

// Separate component for each word - this allows hooks to be called properly
const AnimatedWord = ({ word, index, totalWords, scrollProgress }: AnimatedWordProps) => {
    // Each word reveals sequentially across the scroll
    const start = index / totalWords;
    const end = (index + 1) / totalWords;

    const opacity = useTransform(scrollProgress, [start, end], [0.15, 1]);
    const y = useTransform(scrollProgress, [start, end], [30, 0]);
    const scale = useTransform(scrollProgress, [start, end], [0.9, 1]);
    const color = useTransform(
        scrollProgress,
        [start, end],
        ["rgb(80, 80, 80)", "rgb(255, 255, 255)"]
    );

    return (
        <motion.span
            style={{ opacity, y, scale, color }}
            className="font-heading text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter"
        >
            {word}
        </motion.span>
    );
};

const defaultQuote = "STRENGTH IS NOT GIVEN. IT IS EARNED THROUGH PAIN AND PERSISTENCE.";
const defaultAuthor = "GOD'S GYM";

const TextRevealSection = ({
    quote = defaultQuote,
    author = defaultAuthor,
    backgroundImage
}: TextRevealSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for background
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // Quote reveal - starts when section enters view, ends when section is past center
    const { scrollYProgress: quoteProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "center 0.4"]
    });

    const words = quote.split(" ");

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100vh] py-40 sm:py-48 md:py-56 overflow-hidden"
        >
            {/* Parallax Background */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 -inset-y-20"
            >
                {backgroundImage ? (
                    <img
                        src={backgroundImage}
                        alt=""
                        className="w-full h-full object-cover filter grayscale-0 sm:grayscale"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-god-bg via-black to-god-bg"></div>
                )}
            </motion.div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/80"></div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Corner accents */}
                <div className="absolute top-12 left-8 w-20 h-20 border-l-2 border-t-2 border-god-accent/30"></div>
                <div className="absolute bottom-12 right-8 w-20 h-20 border-r-2 border-b-2 border-god-accent/30"></div>

                {/* Glowing orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-god-accent/5 rounded-full blur-[150px]"></div>

                {/* Vertical lines */}
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-god-accent/10 to-transparent"></div>
                <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-god-accent/10 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-center min-h-[60vh]">

                {/* Quote Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-8 sm:mb-12"
                >
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 text-god-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                </motion.div>

                {/* Animated Words */}
                <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-5 gap-y-3 sm:gap-y-5 text-center">
                    {words.map((word, i) => (
                        <AnimatedWord
                            key={`${word}-${i}`}
                            word={word}
                            index={i}
                            totalWords={words.length}
                            scrollProgress={quoteProgress}
                        />
                    ))}
                </div>

                {/* Author */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-12 sm:mt-16 flex items-center gap-4"
                >
                    <div className="w-12 h-px bg-god-accent"></div>
                    <span className="text-god-accent font-bold text-sm sm:text-base tracking-[0.3em] uppercase">
                        {author}
                    </span>
                    <div className="w-12 h-px bg-god-accent"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default TextRevealSection;
