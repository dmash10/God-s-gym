'use client';

import { useState } from 'react';
import { updateHomepagePromo } from '@/lib/actions';
import { Save, Ticket, Type, Image as ImageIcon } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface PromoData {
    headline: string;
    subheadline: string;
    accentText: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image?: string;
}

interface PromoEditorProps {
    initialData?: PromoData;
}

const defaultData: PromoData = {
    headline: "Book your Intro",
    subheadline: "and redefine your limitless potential.",
    accentText: "Session",
    description: "PROMOTION",
    buttonText: "Start Your Journey",
    buttonLink: "/contact",
    image: ''
};

export default function PromoEditor({ initialData }: PromoEditorProps) {
    const [promo, setPromo] = useState<PromoData>(initialData || defaultData);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updateHomepagePromo(promo);
            setMessage('Promo updated successfully!');
        } catch (error) {
            console.error(error);
            setMessage('Failed to update promo.');
        }
        setIsSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-12 shadow-2xl">
            {/* Section Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-god-accent/20 flex items-center justify-center">
                        <Ticket className="h-5 w-5 text-god-accent" />
                    </div>
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">Promo Section</h2>
                        <p className="text-god-muted text-sm mt-1">Manage the high-impact red promotional banner.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {message && <span className="text-green-500 text-xs font-bold uppercase tracking-wider animate-pulse">{message}</span>}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-god-accent text-black font-bold text-sm rounded hover:bg-white transition-colors disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Side */}
                    <div className="bg-god-card border border-white/10 rounded-xl p-6 space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">
                                Section Tag
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within:text-god-accent transition-colors">
                                    <Type className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    value={promo.description}
                                    onChange={(e) => setPromo({ ...promo, description: e.target.value.toUpperCase() })}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent transition-all"
                                    placeholder="PROMOTION"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em]">
                                Main Headline
                            </label>
                            <input
                                type="text"
                                value={promo.headline}
                                onChange={(e) => setPromo({ ...promo, headline: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-heading font-medium focus:outline-none focus:border-god-accent transition-all"
                                placeholder="Book your Intro"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">Accent Word</label>
                                    <input
                                        type="text"
                                        value={promo.accentText}
                                        onChange={(e) => setPromo({ ...promo, accentText: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-god-accent font-heading font-bold focus:outline-none focus:border-god-accent transition-all"
                                        placeholder="Session"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">Button Text</label>
                                    <input
                                        type="text"
                                        value={promo.buttonText}
                                        onChange={(e) => setPromo({ ...promo, buttonText: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent transition-all"
                                        placeholder="Start Your Journey"
                                    />
                                </div>
                            </div>
                            <textarea
                                value={promo.subheadline}
                                onChange={(e) => setPromo({ ...promo, subheadline: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/70 focus:outline-none focus:border-god-accent transition-all resize-none"
                                placeholder="and redefine your limitless potential."
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">
                                Hero Image
                            </label>
                            <ImageUploader
                                currentImage={promo.image || ''}
                                onImageChange={(url) => setPromo({ ...promo, image: url })}
                                category="misc"
                            />
                        </div>
                    </div>

                    {/* Preview Side */}
                    <div className="bg-god-card border border-white/10 rounded-xl p-6">
                        <h3 className="font-heading text-lg font-bold text-white mb-6 uppercase">Live Preview</h3>
                        <div className="relative aspect-[16/7] bg-god-red rounded-lg overflow-hidden flex items-center p-8">
                            <div className="max-w-[70%] relative z-10">
                                <span className="text-white/80 font-black tracking-[0.3em] text-[8px] uppercase mb-2 block">{promo.description}</span>
                                <h2 className="font-heading text-xl sm:text-2xl font-black text-white uppercase italic leading-none mb-4">
                                    {promo.headline} <br />
                                    <span className="text-black">{promo.accentText}</span> <br />
                                    {promo.subheadline.split(' ').slice(0, 3).join(' ')}...
                                </h2>
                                <div className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase">
                                    {promo.buttonText}
                                </div>
                            </div>
                            {/* Decorative Text */}
                            <div className="absolute inset-0 flex flex-col justify-center opacity-10 pointer-events-none select-none italic font-black text-4xl">
                                <div className="whitespace-nowrap -ml-4">FITNESS CARDIO SPORTS</div>
                                <div className="whitespace-nowrap ml-4 text-white">STRENGTH POWER UNITY</div>
                            </div>
                            {/* Image Preview */}
                            {promo.image && (
                                <div className="absolute bottom-0 right-0 w-1/3 h-5/6">
                                    <img
                                        src={promo.image}
                                        alt="Promo Preview"
                                        className="w-full h-full object-contain object-bottom drop-shadow-xl"
                                    />
                                </div>
                            )}
                        </div>
                        <p className="text-god-muted text-[11px] mt-4 italic text-center">
                            Note: Actual section features parallax effects not visible in preview.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
