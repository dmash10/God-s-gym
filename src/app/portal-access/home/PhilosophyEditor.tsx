'use client';

import { useState } from 'react';
import { updateHomepagePhilosophy } from '@/lib/actions';
import { Save, AlertCircle, Type, Target, Crosshair, Zap } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface PhilosophyData {
    title: string;
    description: string;
    bulletPoints: string[];
    image: string;
}

interface PhilosophyEditorProps {
    initialData: PhilosophyData;
}

export default function PhilosophyEditor({ initialData }: PhilosophyEditorProps) {
    const [formData, setFormData] = useState<PhilosophyData>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    // Simplified bullet points (titles only)
    const p1 = formData.bulletPoints[0] || 'FOR THE DEDICATED';
    const p2 = formData.bulletPoints[1] || 'NOT FOR THE WEAK';
    const p3 = formData.bulletPoints[2] || 'OLD SCHOOL IRON';

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateHomepagePhilosophy({
                ...formData,
                title: formData.title.toUpperCase(),
            });
        } catch (error) {
            console.error('Failed to update philosophy:', error);
        }
        setIsSaving(false);
    };

    const updatePoint = (index: number, title: string) => {
        const newPoints = [...formData.bulletPoints];
        newPoints[index] = title.toUpperCase();
        setFormData({ ...formData, bulletPoints: newPoints });
    };

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <h2 className="font-heading text-2xl font-bold text-god-accent uppercase tracking-tight">Heritage & Philosophy</h2>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-god-accent text-black font-bold text-sm rounded hover:bg-white transition-colors disabled:opacity-50"
                >
                    <Save className="h-4 w-4" />
                    {isSaving ? 'SAVE...' : 'SAVE SECTION'}
                </button>
            </div>

            <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="relative group/title">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-3">Main Section Headline</label>
                            <div className="relative">
                                <div className="absolute top-3 left-4 pointer-events-none text-god-accent/40 group-focus-within/title:text-god-accent transition-colors">
                                    <Type className="h-6 w-6" />
                                </div>
                                <textarea
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value.toUpperCase() })}
                                    rows={3}
                                    className="w-full pl-14 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent resize-none font-heading text-3xl font-bold italic tracking-tighter transition-all"
                                    placeholder="PAIN IS WEAKNESS LEAVING THE BODY"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] pt-4 border-t border-white/10">Home Page Highlights</label>

                            <div className="space-y-4 font-heading">
                                <div className="relative group/p1">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/p1:text-god-accent transition-colors">
                                        <Crosshair className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        value={p1}
                                        onChange={(e) => updatePoint(0, e.target.value)}
                                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-god-accent uppercase italic transition-all"
                                    />
                                </div>

                                <div className="relative group/p2">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-orange-500/40 group-focus-within/p2:text-orange-500 transition-colors">
                                        <Zap className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        value={p2}
                                        onChange={(e) => updatePoint(1, e.target.value)}
                                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-orange-500 uppercase italic transition-all"
                                    />
                                </div>

                                <div className="relative group/p3">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-red-600/40 group-focus-within/p3:text-red-600 transition-colors">
                                        <Target className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        value={p3}
                                        onChange={(e) => updatePoint(2, e.target.value)}
                                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-red-600 uppercase italic transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <ImageUploader
                            currentImage={formData.image}
                            onImageChange={(path) => setFormData({ ...formData, image: path })}
                            category="about"
                            label="Background Visual"
                            aspectRatio="4/3"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
