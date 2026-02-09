'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gymGirl from '../../public/images/gym-girl.png';

const PromoSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax transformations
    const girlX = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const textX1 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
    const textX2 = useTransform(scrollYProgress, [0, 1], [200, -200]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[600px] sm:h-[700px] bg-god-red overflow-hidden flex items-center"
        >
            {/* Background Decorative Text */}
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden opacity-20">
                <motion.div
                    style={{ x: textX1 }}
                    className="font-heading text-[150px] sm:text-[250px] font-black leading-none whitespace-nowrap text-white/40 italic"
                >
                    FITNESS CARDIO SPORTS
                </motion.div>
                <motion.div
                    style={{ x: textX2 }}
                    className="font-heading text-[150px] sm:text-[250px] font-black leading-none whitespace-nowrap text-white/40 italic"
                >
                    STRENGTH POWER UNITY
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                {/* Content Side */}
                <div className="max-w-xl">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-white/80 font-black tracking-[0.3em] text-xs uppercase mb-4 block"
                    >
                        PROMOTION
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase italic leading-[0.9] mb-8"
                    >
                        Book your Intro <br />
                        <span className="text-black">Session</span> and <br />
                        redefine your <br />
                        limitless potential.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/contact"
                            className="bg-white text-black px-8 py-4 rounded-full font-heading font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 w-fit group"
                        >
                            Start Your Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Parallax Image Side */}
                <div className="relative h-full block">
                    <motion.div
                        style={{ x: girlX }}
                        className="absolute bottom-[-180px] sm:bottom-[-240px] right-[-150px] sm:right-[120px] w-[320px] sm:w-[450px] h-[512px] sm:h-[720px]"
                    >
                        <Image
                            src={gymGirl}
                            alt="Fitness Expert"
                            fill
                            className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            priority
                        />
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient for smooth transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default PromoSection;
