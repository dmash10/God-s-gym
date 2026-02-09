'use client';

import { useState } from 'react';
import { updateHomepageCTA } from '@/lib/actions';
import { Save, ExternalLink, Edit, Type } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface CTAEditorProps {
    initialData: {
        title: string;
        subtitle: string;
        buttonText: string;
        buttonLink: string;
        backgroundImage: string;
    };
}

export default function CTAEditor({ initialData }: CTAEditorProps) {
    const [cta, setCta] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updateHomepageCTA(cta);
            setMessage('CTA updated successfully!');
        } catch (error) {
            setMessage('Failed to update CTA.');
        }
        setIsSaving(false);
    };

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-12">
            {/* Section Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">3. Homepage CTA</h2>
                    <p className="text-god-muted text-sm mt-1">Large footer-level call to action.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-god-accent text-black font-bold text-sm rounded hover:bg-white transition-colors disabled:opacity-50"
                >
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save CTA'}
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
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative group/title">
                                <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">
                                    Main Headline (White)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/title:text-god-accent transition-colors">
                                        <Type className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={cta.title}
                                        onChange={(e) => setCta({ ...cta, title: e.target.value.toUpperCase() })}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-god-accent transition-all"
                                        placeholder="e.g., STOP WAITING"
                                    />
                                </div>
                            </div>
                            <div className="relative group/sub">
                                <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">
                                    Accented Text (Yellow)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/sub:text-god-accent transition-colors">
                                        <Type className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={cta.subtitle}
                                        onChange={(e) => setCta({ ...cta, subtitle: e.target.value.toUpperCase() })}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-god-accent transition-all"
                                        placeholder="e.g., START DOMINATING"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative group/label">
                                <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">
                                    Button Label
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/label:text-god-accent transition-colors">
                                        <Edit className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={cta.buttonText}
                                        onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent transition-all"
                                        placeholder="Join the Elite"
                                    />
                                </div>
                            </div>
                            <div className="relative group/link">
                                <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">
                                    Button Link
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/link:text-god-accent transition-colors">
                                        <ExternalLink className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={cta.buttonLink}
                                        onChange={(e) => setCta({ ...cta, buttonLink: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent transition-all"
                                        placeholder="/membership"
                                    />
                                </div>
                            </div>
                        </div>

                        <ImageUploader
                            currentImage={cta.backgroundImage}
                            onImageChange={(url) => setCta({ ...cta, backgroundImage: url })}
                            category="cta"
                            label="Background Image (Grayscale)"
                            aspectRatio="16/9"
                        />
                    </div>

                    {/* Preview */}
                    <div className="bg-god-card border border-white/10 rounded-xl p-6 flex flex-col">
                        <h3 className="font-heading text-xl font-bold text-white mb-6 uppercase">Live Preview</h3>

                        <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                                src={cta.backgroundImage || 'https://via.placeholder.com/800x450?text=BG+Image'}
                                alt="CTA Background"
                                className="absolute inset-0 w-full h-full object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-black/70"></div>

                            <div className="relative z-10 text-center px-4">
                                <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-none mb-4 text-white">
                                    {cta.title} <span className="text-god-accent">{cta.subtitle}</span>
                                </h2>
                                <div className="inline-flex items-center gap-2 bg-god-accent text-black px-5 py-2 font-heading font-bold text-xs uppercase tracking-widest">
                                    {cta.buttonText}
                                </div>
                            </div>
                        </div>

                        <p className="text-god-muted text-xs mt-4 flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" /> Note: Actual section uses full grayscale filter on the image.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
