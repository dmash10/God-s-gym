'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [visibleCount, setVisibleCount] = useState(3);

    // Responsive visible count
    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) {
                setVisibleCount(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCount(2);
            } else {
                setVisibleCount(3);
            }
        };
        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    const totalPages = Math.ceil(data.reviews.length / visibleCount);
    const visibleReviews = data.reviews.slice(currentPage * visibleCount, (currentPage + 1) * visibleCount);

    const goNext = useCallback(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    }, [totalPages]);

    const goPrev = useCallback(() => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }, [totalPages]);

    // Auto-rotate
    useEffect(() => {
        const interval = setInterval(goNext, 5000);
        return () => clearInterval(interval);
    }, [goNext]);

    const truncateText = (text: string, maxLength: number = 120) => {
        if (text.length <= maxLength) return { text, isTruncated: false };
        return { text: text.substring(0, maxLength).trim() + '...', isTruncated: true };
    };

    return (
        <>
            <section className="py-16 sm:py-20 bg-god-card border-y border-white/5 relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-god-accent/30 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    {/* Section Header */}
                    <div className="mb-12 text-center">
                        <span className="text-god-accent font-black tracking-[0.4em] text-[10px] sm:text-xs uppercase mb-3 block leading-none">
                            TESTIMONIALS
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase italic tracking-tighter">
                            What our <span className="text-god-accent">members</span> say
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">

                        {/* Left Side - Rating Info */}
                        <div className="flex flex-col items-center lg:items-start flex-shrink-0 text-center lg:text-left">
                            <span className="text-god-accent font-bold text-lg tracking-wider mb-2">EXCELLENT</span>

                            {/* Stars - Gold color with half-star support */}
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => {
                                    const fillPercentage = Math.min(1, Math.max(0, data.rating - (star - 1)));
                                    const isPartial = fillPercentage > 0 && fillPercentage < 1;

                                    return (
                                        <div key={star} className="relative h-6 w-6">
                                            {/* Background (empty) star */}
                                            <svg className="h-6 w-6 text-yellow-400/30 absolute" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {/* Filled star (clipped for partial) */}
                                            <div
                                                className="absolute inset-0 overflow-hidden"
                                                style={{ width: `${fillPercentage * 100}%` }}
                                            >
                                                <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <p className="text-white/70 text-sm mb-3">
                                Rating <span className="text-white font-semibold">{data.rating}</span> from <span className="text-white font-semibold">{data.totalReviews}</span> reviews
                            </p>

                            {/* Google Logo */}
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

                        {/* Right Side - Review Cards Carousel */}
                        <div className="flex-1 flex items-center gap-3 w-full min-w-0">
                            {/* Prev Button */}
                            <button
                                onClick={goPrev}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors flex-shrink-0"
                                aria-label="Previous reviews"
                            >
                                <ChevronLeft className="h-5 w-5 text-white/70" />
                            </button>

                            {/* Review Cards - Fixed Height Container */}
                            <div className="flex-1 h-[200px]">
                                <div className="grid gap-4 h-full" style={{ gridTemplateColumns: `repeat(${visibleCount}, 1fr)` }}>
                                    {visibleReviews.map((review) => {
                                        const { text: truncatedText, isTruncated } = truncateText(review.text, visibleCount === 1 ? 150 : 100);

                                        return (
                                            <div
                                                key={review.id}
                                                className="bg-god-bg/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 transition-all hover:border-white/20 h-[200px] flex flex-col"
                                            >
                                                {/* Header */}
                                                <div className="flex items-start gap-3 mb-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                                        style={{ backgroundColor: review.color }}
                                                    >
                                                        {review.initial}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-white font-medium text-sm truncate">{review.name}</h4>
                                                        <span className="text-white/40 text-xs">{review.timeAgo}</span>
                                                    </div>
                                                    <svg className="h-4 w-4 text-god-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>

                                                {/* Stars */}
                                                <div className="flex gap-0.5 mb-3">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <svg
                                                            key={star}
                                                            className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400' : 'text-white/20'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>

                                                {/* Review Text with inline Read more */}
                                                <p className="text-white/70 text-sm leading-relaxed flex-1">
                                                    {review.text.length > 100 ? (
                                                        <>
                                                            {review.text.substring(0, 100).trim()}...{' '}
                                                            <button
                                                                onClick={() => setSelectedReview(review)}
                                                                className="text-god-accent font-medium hover:underline inline"
                                                            >
                                                                Read more
                                                            </button>
                                                        </>
                                                    ) : (
                                                        review.text
                                                    )}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={goNext}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors flex-shrink-0"
                                aria-label="Next reviews"
                            >
                                <ChevronRight className="h-5 w-5 text-white/70" />
                            </button>
                        </div>
                    </div>

                    {/* Verified Badge */}
                    <div className="flex justify-end mt-4">
                        <div className="inline-flex items-center gap-2 bg-god-accent/20 text-god-accent px-4 py-2 rounded-full text-sm font-medium">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified Reviews
                        </div>
                    </div>
                </div>
            </section>

            {/* Full Review Modal */}
            {selectedReview && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedReview(null)}
                >
                    <div
                        className="bg-god-card border border-white/10 rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedReview(null)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4 text-white" />
                        </button>

                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                                style={{ backgroundColor: selectedReview.color }}
                            >
                                {selectedReview.initial}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-lg">{selectedReview.name}</h4>
                                <span className="text-white/50 text-sm">{selectedReview.timeAgo}</span>
                            </div>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`h-5 w-5 ${star <= selectedReview.rating ? 'text-yellow-400' : 'text-white/20'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        {/* Full Review Text */}
                        <p className="text-white/80 text-base leading-relaxed">{selectedReview.text}</p>

                        {/* Google Attribution */}
                        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="text-white/50 text-sm">Posted on Google</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
