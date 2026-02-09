'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const items = [
    {
        id: 1,
        title: "The Iron Room",
        subtitle: "Built for true powerlifting.",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Conditioning Zone",
        subtitle: "Shred and sweat.",
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Personal Suites",
        subtitle: "Tailored Focus.",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Recovery Lab",
        subtitle: "Earn your downtime.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    }
];

const HorizontalScrollSection = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef
    });

    // Maps the vertical scroll to a horizontal translateX
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-god-bg">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="absolute top-20 left-10 z-20">
                    <h2 className="font-heading text-5xl md:text-8xl font-black uppercase italic italic text-white/10 select-none">
                        FACILITY <br />
                        <span className="text-god-accent">EXCELLENCE</span>
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-8 px-10">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group relative h-[450px] w-[350px] md:h-[600px] md:w-[600px] flex-shrink-0 overflow-hidden border border-white/10 bg-god-card"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <span className="text-god-accent font-bold tracking-[0.3em] text-xs uppercase mb-2 block">
                                    0{item.id}
                                </span>
                                <h3 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase italic mb-2 tracking-tighter">
                                    {item.title}
                                </h3>
                                <p className="text-god-muted text-sm md:text-lg font-light leading-relaxed">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HorizontalScrollSection;
