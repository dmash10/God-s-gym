'use client';

import { useState } from 'react';
import { Save, Star, MessageSquare, Trash2, Plus, User, Type } from 'lucide-react';

interface Review {
    id: number;
    name: string;
    rating: number;
    timeAgo: string;
    text: string;
    initial: string;
    color: string;
}

interface ReviewsData {
    rating: number;
    totalReviews: number;
    reviews: Review[];
}

interface ReviewsEditorProps {
    initialData?: ReviewsData;
}

const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#EC4899', '#8B5CF6'];

export default function ReviewsEditor({ initialData }: ReviewsEditorProps) {
    const [data, setData] = useState<ReviewsData>(initialData || {
        rating: 4.9,
        totalReviews: 120,
        reviews: []
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleSave = async () => {
        setIsSaving(true);
        // await updateHomepageReviews(data); 
        setMessage('Reviews updated (simulated)');
        setIsSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    const addReview = () => {
        const newId = Math.max(0, ...data.reviews.map(r => r.id)) + 1;
        const newReview: Review = {
            id: newId,
            name: "NEW REVIEWER",
            rating: 5,
            timeAgo: "Just now",
            text: "Amazing experience at God's Gym.",
            initial: "N",
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
        setData({ ...data, reviews: [newReview, ...data.reviews] });
        setExpandedId(newId);
    };

    const deleteReview = (id: number) => {
        setData({ ...data, reviews: data.reviews.filter(r => r.id !== id) });
        if (expandedId === id) setExpandedId(null);
    };

    const updateReview = (id: number, updates: Partial<Review>) => {
        setData({
            ...data,
            reviews: data.reviews.map(r => r.id === id ? { ...r, ...updates } : r)
        });
    };

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-12 shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-god-accent/20 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-god-accent" />
                    </div>
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">Member Feedback</h2>
                        <p className="text-god-muted text-sm mt-1">Google reviews and verified member testimonials.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {message && <span className="text-green-500 text-xs font-bold uppercase tracking-widest">{message}</span>}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-god-accent text-black font-bold text-sm rounded hover:bg-white transition-colors"
                    >
                        <Save className="h-4 w-4" /> SAVE ALL
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-white/5">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-widest mb-3">Overall Google Rating</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                step="0.1"
                                value={data.rating}
                                onChange={(e) => setData({ ...data, rating: parseFloat(e.target.value) })}
                                className="w-24 px-4 py-2 bg-black border border-white/10 rounded-lg text-white font-bold text-xl focus:border-god-accent outline-none"
                            />
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-5 w-5 text-yellow-500 fill-current" />)}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-widest mb-3">Total Review Count</label>
                        <input
                            type="number"
                            value={data.totalReviews}
                            onChange={(e) => setData({ ...data, totalReviews: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white font-bold text-xl focus:border-god-accent outline-none"
                        />
                    </div>
                </div>

                {/* Review List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm">Individual Reviews</h3>
                        <button onClick={addReview} className="flex items-center gap-1 text-god-accent font-bold text-xs hover:text-white transition-colors">
                            <Plus className="h-4 w-4" /> ADD REVIEW
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.reviews.map(review => (
                            <div
                                key={review.id}
                                onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                                className={`p-4 bg-white/5 border rounded-xl cursor-pointer hover:border-white/20 transition-all ${expandedId === review.id ? 'border-god-accent' : 'border-white/10'}`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: review.color }}>
                                        {review.initial}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-bold text-sm truncate">{review.name}</p>
                                        <p className="text-god-muted text-[10px] uppercase font-medium">{review.timeAgo}</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteReview(review.id); }}
                                        className="text-white/20 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                                <p className="text-white/50 text-xs line-clamp-2 italic">"{review.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expanded Form */}
                {expandedId && data.reviews.find(r => r.id === expandedId) && (
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                        {data.reviews.filter(r => r.id === expandedId).map(review => (
                            <div key={review.id} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-widest mb-1">Name</label>
                                            <input
                                                type="text"
                                                value={review.name}
                                                onChange={(e) => updateReview(review.id, { name: e.target.value, initial: e.target.value[0] })}
                                                className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white font-bold focus:border-god-accent outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-widest mb-1">Time Ago</label>
                                            <input
                                                type="text"
                                                value={review.timeAgo}
                                                onChange={(e) => updateReview(review.id, { timeAgo: e.target.value })}
                                                className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white font-medium focus:border-god-accent outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-widest mb-1">Review Content</label>
                                        <textarea
                                            value={review.text}
                                            onChange={(e) => updateReview(review.id, { text: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white/80 focus:border-god-accent outline-none text-sm resize-none"
                                        />
                                    </div>
                                </div>
                                <div className="bg-black/20 rounded-xl p-4 flex flex-col justify-center items-center gap-4">
                                    <h4 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">Avatar Preview</h4>
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-2xl" style={{ backgroundColor: review.color }}>
                                        {review.initial}
                                    </div>
                                    <div className="flex gap-2">
                                        {COLORS.map(c => (
                                            <button
                                                key={c}
                                                onClick={() => updateReview(review.id, { color: c })}
                                                className={`w-6 h-6 rounded-full border-2 transition-all ${review.color === c ? 'border-white scale-110 shadow-lg' : 'border-transparent'}`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
