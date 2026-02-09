"use client";

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// --- Types ---
interface RevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    className?: string;
    delay?: number;
}

// --- Constants ---
const EASING = [0.25, 0.1, 0.25, 1] as const;

// --- Components ---

export const Reveal: React.FC<RevealProps> = ({ children, width = 'fit-content', className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: EASING, delay }}
                style={{ willChange: 'opacity, transform' }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const MaskText: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
    children,
    delay = 0,
    className = ""
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 0.6, ease: EASING, delay }}
                style={{ willChange: 'transform' }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const StaggerContainer: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
    children,
    className = "",
    delay = 0
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: delay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ willChange: 'contents' }}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: EASING }
        },
    };

    return (
        <motion.div
            variants={itemVariants}
            className={className}
            style={{ willChange: 'opacity, transform' }}
        >
            {children}
        </motion.div>
    );
};
