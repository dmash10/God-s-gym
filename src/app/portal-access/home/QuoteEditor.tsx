'use client';

import { useState } from 'react';
import { updateHomepageQuote } from '@/lib/actions';
import { Save, Quote, User } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface QuoteData {
    quote: string;
    author: string;
    backgroundImage?: string;
}

interface QuoteEditorProps {
    initialData?: QuoteData;
}

const defaultData: QuoteData = {
    quote: "STRENGTH IS NOT GIVEN. IT IS EARNED THROUGH PAIN AND PERSISTENCE.",
    author: "GOD'S GYM",
    backgroundImage: ""
};

export default function QuoteEditor({ initialData }: QuoteEditorProps) {
    const [formData, setFormData] = useState<QuoteData>(initialData || defaultData);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updateHomepageQuote(formData);
            setMessage('Saved!');
        } catch (error) {
            setMessage('Failed to save');
        }
        setIsSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-8 shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-god-accent/20 flex items-center justify-center">
                        <Quote className="h-5 w-5 text-god-accent" />
                    </div>
                    <div>
                        <h2 className="font-heading text-lg font-bold text-white uppercase tracking-tight">Motivational Quote</h2>
                        <p className="text-god-muted text-xs">Parallax quote section with text reveal</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {message && <span className="text-green-500 text-xs">{message}</span>}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-god-accent text-black font-bold text-xs rounded hover:bg-white transition-colors disabled:opacity-50"
                    >
                        <Save className="h-3 w-3" />
                        {isSaving ? 'SAVING...' : 'SAVE'}
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Quote Text */}
                    <div className="lg:col-span-2 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Quote Text</label>
                            <textarea
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value.toUpperCase() })}
                                rows={3}
                                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white font-heading font-bold text-lg uppercase italic focus:outline-none focus:border-god-accent resize-none"
                                placeholder="STRENGTH IS NOT GIVEN..."
                            />
                            <p className="text-god-muted text-[10px] mt-1">Words animate in sequentially as user scrolls</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Author / Attribution</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value.toUpperCase() })}
                                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white font-bold uppercase tracking-wider focus:outline-none focus:border-god-accent"
                                    placeholder="GOD'S GYM"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Background Image */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <ImageUploader
                            currentImage={formData.backgroundImage || ''}
                            onImageChange={(path) => setFormData({ ...formData, backgroundImage: path })}
                            category="hero"
                            label="Background (Optional)"
                            aspectRatio="16/9"
                        />
                        <p className="text-god-muted text-[10px] mt-2 text-center">Appears with parallax effect behind quote</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
