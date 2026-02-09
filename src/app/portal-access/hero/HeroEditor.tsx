'use client';

import { useState } from 'react';
import { updateHero } from '@/lib/actions';
import { Save, Type } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface HeroEditorProps {
    initialData: {
        title: string;
        backgroundImage: string;
    };
}

export default function HeroEditor({ initialData }: HeroEditorProps) {
    const [title, setTitle] = useState(initialData.title);
    const [backgroundImage, setBackgroundImage] = useState(initialData.backgroundImage);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updateHero(title, backgroundImage);
            setMessage('Hero updated successfully!');
        } catch (error) {
            setMessage('Failed to update hero.');
        }
        setIsSaving(false);
    };

    // Split title into words for preview
    const words = title.split(' ');

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-12">
            {/* Section Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">1. Hero Section</h2>
                    <p className="text-god-muted text-sm mt-1">Main headline and background image.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-god-accent text-black font-bold text-sm rounded hover:bg-white transition-colors disabled:opacity-50"
                >
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Hero'}
                </button>
            </div>

            <div className="p-6">
                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <div className="bg-god-card border border-white/10 rounded-xl p-6 space-y-6">
                        <div className="relative group/headline">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">
                                Headline Text
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/headline:text-god-accent transition-colors">
                                    <Type className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value.toUpperCase())}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-god-accent transition-all"
                                    placeholder="e.g., BUILD GODLIKE STRENGTH"
                                />
                            </div>
                            <p className="text-god-muted text-[10px] mt-2 italic">
                                Tip: Use 3 words for best visual effect (e.g., "BUILD GODLIKE STRENGTH")
                            </p>
                        </div>

                        <ImageUploader
                            currentImage={backgroundImage}
                            onImageChange={setBackgroundImage}
                            category="hero"
                            label="Background Image"
                            aspectRatio="16/9"
                        />
                    </div>

                    {/* Preview */}
                    <div className="bg-god-card border border-white/10 rounded-xl p-6">
                        <h3 className="font-heading text-xl font-bold text-white mb-4 uppercase">Live Preview</h3>
                        <div className="relative h-80 rounded-lg overflow-hidden">
                            <img
                                src={backgroundImage || ''}
                                alt="Hero Preview"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 flex items-center p-8">
                                <div className="border-l-4 border-god-accent pl-4">
                                    {words.map((word, i) => (
                                        <p
                                            key={i}
                                            className={`font-heading text-2xl md:text-3xl font-bold uppercase leading-tight ${i === 0 ? 'text-white' : i === 1 ? 'text-god-accent' : 'text-white/30'
                                                }`}
                                        >
                                            {word}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
