'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, useAnimation, AnimatePresence, type PanInfo } from 'framer-motion';

interface Review {
    id: number;
    name: string;
    rating: number;
    timeAgo: string;
    text: string;
    initial: string;
    color: string;
}

interface GoogleReviewsData {
    rating: number;
    totalReviews: number;
    reviews: Review[];
}

export default function GoogleReviewStripe({ data }: { data: GoogleReviewsData }) {
    // Configuration
    const CARD_GAP = 16;
    const AUTO_PLAY_INTERVAL = 5000;

    // State
    const [visibleCount, setVisibleCount] = useState(3);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Refs
    const controls = useAnimation();
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Responsive visible count
    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) setVisibleCount(1);
            else if (window.innerWidth < 1024) setVisibleCount(2);
            else setVisibleCount(3);
        };
        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    // Create extended list for seamless looping (Buffer: [EndClones...Originals...StartClones])
    // We need enough clones to cover the visible area + 1 for smooth transition
    const CLONE_COUNT = 4; // Sufficient for largest visibleCount (3)
    const reviews = data.reviews;
    const totalReviews = reviews.length;

    // Safety check for empty data
    if (!reviews || reviews.length === 0) return null;

    // Construct the extended array
    // If we have fewer reviews than CLONE_COUNT, we might need to repeat the array until it's big enough
    // But for now assuming data.reviews has at least a few items. 
    // If not, we should simple partial render or repeat.
    // Let's assume standard use case > 4 reviews. If < 4, we duplicate original array first.
    let sourceReviews = [...reviews];
    while (sourceReviews.length < CLONE_COUNT * 2) {
        sourceReviews = [...sourceReviews, ...reviews];
    }

    const extendedReviews = [
        ...sourceReviews.slice(-CLONE_COUNT), // Clones from end
        ...sourceReviews,                     // Originals (potentially duplicated/extended)
        ...sourceReviews.slice(0, CLONE_COUNT) // Clones from start
    ];

    // Initial positioning: Start at the first 'real' item
    const INITIAL_INDEX = CLONE_COUNT;

    // We strictly control the x offset via animation controls
    // x = - (index * itemWidth)
    // Item width % = 100 / visibleCount
    // Gap needs to be accounted for. 
    // Best way: Container width = 100%. Item width = (100% - (visible-1)*gap) / visible.
    // Movement = 1 item width + 1 gap.
    // Movement % = 100 / visible + gap/visible? No.
    // Let's use simpler logic: 
    // TranslateX = - index * (100% / visibleCount) ??
    // If we use % width for items: width: `${100/visibleCount}%`.
    // And pad `gap` using padding-right on items instead of flex-gap?
    // No, flex gap is cleaner but harder to calc %.

    // Let's use the calc formula that avoids JS pixel measurements for responsiveness.
    // Shift% = 100% / visibleCount.
    // ShiftGap = Gap * (visibleCount + 1) / visibleCount ? 
    // Actually, shift distance is exactly `(100% + Gap) / visibleCount`.
    // Wait: (ContainerWidth + Gap) / visibleCount.

    // Let's try a pure CSS variable approach for the shift.

    useEffect(() => {
        // Reset to initial position without animation on mount/resize
        setCurrentIndex(INITIAL_INDEX);
        controls.set({ x: `calc(-${INITIAL_INDEX} * ((100% + ${CARD_GAP}px) / ${visibleCount}))` });
    }, [visibleCount, INITIAL_INDEX, controls]);

    // Animation Driver
    useEffect(() => {
        controls.start({
            x: `calc(-${currentIndex} * ((100% + ${CARD_GAP}px) / ${visibleCount}))`,
            transition: { type: "spring", stiffness: 300, damping: 30, mass: 1 }
        });
    }, [currentIndex, visibleCount, controls]);

    // Handle seamless loop reset on animation complete
    const onAnimationComplete = () => {
        // If we reached the end clones (Index >= Total + Clones)
        if (currentIndex >= sourceReviews.length + CLONE_COUNT) {
            const visualIndex = currentIndex - sourceReviews.length;
            setCurrentIndex(visualIndex);
            controls.set({ x: `calc(-${visualIndex} * ((100% + ${CARD_GAP}px) / ${visibleCount}))` });
        }
        // If we reached the start clones (Index < Clones)
        else if (currentIndex < CLONE_COUNT) {
            const visualIndex = currentIndex + sourceReviews.length;
            setCurrentIndex(visualIndex);
            controls.set({ x: `calc(-${visualIndex} * ((100% + ${CARD_GAP}px) / ${visibleCount}))` });
        }
    };

    // Interaction Handlers
    const handleInteractionStart = () => {
        setIsPaused(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleInteractionEnd = () => {
        timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 8000); // Resume logic
    };

    const goNext = useCallback(() => {
        handleInteractionStart();
        setCurrentIndex(prev => prev + 1);
        handleInteractionEnd();
    }, []);

    const goPrev = useCallback(() => {
        handleInteractionStart();
        setCurrentIndex(prev => prev - 1);
        handleInteractionEnd();
    }, []);

    // Helper for auto-play that doesn't trigger interaction state
    const autoPlayNext = useCallback(() => {
        setCurrentIndex(prev => prev + 1);
    }, []);

    useEffect(() => {
        if (isPaused || selectedReview || isDragging) return;
        intervalRef.current = setInterval(autoPlayNext, AUTO_PLAY_INTERVAL);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, selectedReview, isDragging, autoPlayNext]);


    const truncateText = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    return (
        <>
            <section className="py-16 bg-god-card border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-god-accent/30 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="mb-8 sm:mb-12 text-center">
                        <span className="text-god-accent font-black tracking-[0.4em] text-[10px] sm:text-xs uppercase mb-3 block leading-none">
                            TESTIMONIALS
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase italic tracking-tighter">
                            What our <span className="text-god-accent">members</span> say
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                        {/* Rating Summary Side */}
                        <div className="flex flex-col items-center lg:items-start flex-shrink-0 text-center lg:text-left">
                            <span className="text-god-accent font-bold text-lg tracking-wider mb-2">EXCELLENT</span>
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className="relative h-6 w-6">
                                        <svg className="h-6 w-6 text-yellow-400/30 absolute" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <div className="absolute inset-0 overflow-hidden" style={{ width: `${Math.min(1, Math.max(0, data.rating - (star - 1))) * 100}%` }}>
                                            <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/70 text-sm mb-3">
                                Rating <span className="text-white font-semibold">{data.rating}</span> from <span className="text-white font-semibold">{data.totalReviews}</span> reviews
                            </p>
                            <div className="flex items-center gap-2">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="text-white/60 text-sm font-medium">Google</span>
                            </div>
                        </div>

                        {/* Carousel Area */}
                        <div className="flex-1 w-full min-w-0 relative group"
                            onMouseEnter={handleInteractionStart}
                            onMouseLeave={handleInteractionEnd}
                        >
                            <button onClick={goPrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-god-bg/90 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95">
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            <div className="mx-12 overflow-hidden h-[220px]" ref={containerRef} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                                <motion.div
                                    className="flex gap-4 h-full"
                                    animate={controls}
                                    onAnimationComplete={onAnimationComplete}
                                    drag="x"
                                    dragConstraints={containerRef}
                                    onDragStart={() => {
                                        setIsDragging(true);
                                        handleInteractionStart();
                                    }}
                                    onDragEnd={(e, info: PanInfo) => {
                                        setIsDragging(false);
                                        const offset = info.offset.x;
                                        const velocity = info.velocity.x;
                                        if (offset < -50 || velocity < -500) goNext();
                                        else if (offset > 50 || velocity > 500) goPrev();
                                        else {
                                            controls.start({
                                                x: `calc(-${currentIndex} * ((100% + ${CARD_GAP}px) / ${visibleCount}))`,
                                                transition: { type: "spring", stiffness: 300, damping: 30 }
                                            });
                                        }
                                        handleInteractionEnd();
                                    }}
                                >
                                    {extendedReviews.map((review, i) => (
                                        <div
                                            key={`${review.id}-${i}`}
                                            className="bg-god-bg/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col h-[200px] flex-shrink-0 select-none"
                                            style={{
                                                width: `calc((100% - ${(visibleCount - 1) * CARD_GAP}px) / ${visibleCount})`
                                            }}
                                        >
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: review.color }}>
                                                    {review.initial}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-medium text-sm truncate">{review.name}</h4>
                                                    <span className="text-white/40 text-xs">{review.timeAgo}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-0.5 mb-3">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg key={star} className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-white/70 text-sm leading-relaxed flex-1 overflow-hidden pointer-events-auto">
                                                {truncateText(review.text, visibleCount === 1 ? 140 : 90)}
                                                {review.text.length > (visibleCount === 1 ? 140 : 90) && (
                                                    <button onClick={(e) => { e.stopPropagation(); setSelectedReview(review); }} className="text-god-accent ml-1 font-medium hover:underline inline-block">Read more</button>
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            <button onClick={goNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-god-bg/90 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <div className="inline-flex items-center gap-2 bg-god-accent/10 border border-god-accent/20 text-god-accent px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified Member Feedback
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedReview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4"
                        onClick={() => setSelectedReview(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-god-card border border-white/10 rounded-3xl p-6 sm:p-10 max-w-xl w-full relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedReview(null)}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                                <X className="h-5 w-5 text-white/50" />
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: selectedReview.color }}>
                                    {selectedReview.initial}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-xl">{selectedReview.name}</h4>
                                    <span className="text-white/40 text-sm">{selectedReview.timeAgo}</span>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className={`h-6 w-6 ${star <= selectedReview.rating ? 'text-yellow-400' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-white/80 text-lg leading-relaxed mb-8 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                                {selectedReview.text}
                            </p>

                            <div className="flex items-center gap-3 pt-6 border-t border-white/5 opacity-50">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="text-sm font-medium tracking-wide">Published on Google Reviews</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
