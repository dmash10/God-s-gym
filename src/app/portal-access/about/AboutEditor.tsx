'use client';

import { useState } from 'react';
import { updateAbout } from '@/lib/actions';
import { Save, AlertCircle, Type, AlignLeft, Edit3 } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface AboutData {
    headline: string;
    subheadline: string;
    description: string;
    bulletPoints: string[];
    image: string;
}

interface AboutEditorProps {
    initialData: AboutData;
}

export default function AboutEditor({ initialData }: AboutEditorProps) {
    const [formData, setFormData] = useState<AboutData>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    // Split bullet points into parts
    const [point1Title, point1Desc] = (formData.bulletPoints[0] || 'FOR THE DEDICATED|').split('|');
    const [point2Title, point2Desc] = (formData.bulletPoints[1] || 'NOT FOR THE WEAK|').split('|');

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updateAbout({
                ...formData,
                headline: formData.headline.toUpperCase(),
                subheadline: formData.subheadline.toUpperCase(),
            });
            setMessage('About page updated successfully!');
        } catch (error) {
            setMessage('Failed to update about page.');
        }
        setIsSaving(false);
    };

    const updatePoint = (index: number, title: string, desc: string) => {
        const newPoints = [...formData.bulletPoints];
        newPoints[index] = `${title.toUpperCase()}|${desc}`;
        setFormData({ ...formData, bulletPoints: newPoints });
    };

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-12">
            {/* Section Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">About Us Page</h2>
                    <p className="text-god-muted text-sm mt-1">Manage the full story and principles on the dedicated About page.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-god-accent text-black font-bold text-sm rounded hover:bg-white transition-colors disabled:opacity-50"
                >
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
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
                    <div className="space-y-6">
                        <div className="bg-god-card border border-white/10 rounded-xl p-6 space-y-4">
                            <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3">
                                Core Content
                            </h3>

                            <div className="space-y-4">
                                <div className="relative group/head">
                                    <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Headline</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/head:text-god-accent transition-colors">
                                            <Type className="h-4 w-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.headline}
                                            onChange={(e) => setFormData({ ...formData, headline: e.target.value.toUpperCase() })}
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent transition-all font-bold"
                                            placeholder="WHO WE ARE"
                                        />
                                    </div>
                                </div>

                                <div className="relative group/sub">
                                    <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Subheadline</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/sub:text-god-accent transition-colors">
                                            <Type className="h-4 w-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.subheadline}
                                            onChange={(e) => setFormData({ ...formData, subheadline: e.target.value.toUpperCase() })}
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent transition-all font-bold"
                                            placeholder="THE SANCTUARY OF IRON"
                                        />
                                    </div>
                                </div>

                                <div className="relative group/desc">
                                    <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Description</label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-4 pointer-events-none text-god-accent/40 group-focus-within/desc:text-god-accent transition-colors">
                                            <AlignLeft className="h-4 w-4" />
                                        </div>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={8}
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent resize-none transition-all leading-relaxed"
                                            placeholder="Write your story here..."
                                        />
                                    </div>
                                    <p className="text-god-muted text-[10px] mt-1 italic">Use **text** for bolding.</p>
                                </div>
                            </div>
                        </div>

                        {/* Highlight Points */}
                        <div className="bg-god-card border border-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                                <h3 className="font-heading text-lg font-bold text-white uppercase">
                                    Fixed Highlight Points
                                </h3>
                                <div className="group relative">
                                    <AlertCircle className="h-4 w-4 text-god-muted cursor-help" />
                                    <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-black border border-white/10 rounded text-xs text-god-muted opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        The design is fixed to 2 points: First is Yellow, Second is Red.
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Point 1 (Yellow) */}
                                <div className="p-4 bg-white/5 rounded-lg border-l-4 border-god-accent">
                                    <p className="text-[10px] font-bold text-god-accent uppercase mb-2">First Point (Yellow Border)</p>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={point1Title}
                                            onChange={(e) => updatePoint(0, e.target.value, point1Desc)}
                                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-god-accent"
                                            placeholder="Title (e.g., FOR THE DEDICATED)"
                                        />
                                        <textarea
                                            value={point1Desc}
                                            onChange={(e) => updatePoint(0, point1Title, e.target.value)}
                                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-god-accent resize-none"
                                            placeholder="Brief description..."
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                {/* Point 2 (Red) */}
                                <div className="p-4 bg-white/5 rounded-lg border-l-4 border-red-600">
                                    <p className="text-[10px] font-bold text-red-500 uppercase mb-2">Second Point (Red Border)</p>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={point2Title}
                                            onChange={(e) => updatePoint(1, e.target.value, point2Desc)}
                                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-red-600"
                                            placeholder="Title (e.g., NOT FOR THE WEAK)"
                                        />
                                        <textarea
                                            value={point2Desc}
                                            onChange={(e) => updatePoint(1, point2Title, e.target.value)}
                                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-red-600 resize-none"
                                            placeholder="Brief description..."
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="bg-god-card border border-white/10 rounded-xl p-6">
                        <ImageUploader
                            currentImage={formData.image}
                            onImageChange={(path) => setFormData({ ...formData, image: path })}
                            category="about"
                            label="About Section Image"
                            aspectRatio="4/3"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
