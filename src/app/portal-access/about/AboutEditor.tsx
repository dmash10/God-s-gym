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
    pillars?: Array<{ id: string; title: string; desc: string }>;
}

interface AboutEditorProps {
    initialData: AboutData;
}

const defaultPillars = [
    { id: '01', title: 'INTENSITY', desc: 'Every rep counts. No half measures.' },
    { id: '02', title: 'DISCIPLINE', desc: 'The foundation of true greatness.' },
    { id: '03', title: 'EXCELLENCE', desc: 'Winning is a habit, not an act.' },
    { id: '04', title: 'COMMUNITY', desc: 'Stronger as one. Forged in iron.' },
];

export default function AboutEditor({ initialData }: AboutEditorProps) {
    const [formData, setFormData] = useState<AboutData>({
        ...initialData,
        pillars: initialData.pillars?.length ? initialData.pillars : defaultPillars
    });
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

    const updatePillar = (index: number, field: 'title' | 'desc', value: string) => {
        const newPillars = [...(formData.pillars || [])];
        if (newPillars[index]) {
            newPillars[index] = { ...newPillars[index], [field]: value };
            setFormData({ ...formData, pillars: newPillars });
        }
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Core Content */}
                    <div className="space-y-6">
                        <div className="bg-god-card border border-white/10 rounded-xl p-6 space-y-4">
                            <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3">
                                Story Content
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
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={8}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent resize-none transition-all leading-relaxed text-sm ring-1 ring-white/5 focus:ring-god-accent/20"
                                        placeholder="Write your story here..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Highlight Points */}
                        <div className="bg-god-card border border-white/10 rounded-xl p-6">
                            <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                                <Edit3 className="h-4 w-4 text-god-accent" />
                                Highlights
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded-lg border-l-4 border-god-accent group/point hover:bg-white/10 transition-all cursor-pointer ring-1 ring-white/5 focus-within:ring-god-accent/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-[10px] font-bold text-god-accent/60 uppercase tracking-widest group-hover/point:text-god-accent transition-colors">First Point (Gold)</p>
                                        <Edit3 className="h-3 w-3 text-white/20 group-hover/point:text-god-accent transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={point1Title}
                                            onChange={(e) => updatePoint(0, e.target.value, point1Desc)}
                                            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-god-accent text-xs font-bold focus:outline-none focus:border-god-accent transition-all uppercase placeholder:text-white/20"
                                            placeholder="TITLE"
                                        />
                                        <textarea
                                            value={point1Desc}
                                            onChange={(e) => updatePoint(0, point1Title, e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-white text-[11px] focus:outline-none focus:border-god-accent transition-all resize-none leading-relaxed placeholder:text-white/20"
                                            rows={2}
                                            placeholder="Description..."
                                        />
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border-l-4 border-red-600 group/point transition-all hover:bg-white/10 cursor-pointer ring-1 ring-white/5 focus-within:ring-red-600/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-[10px] font-bold text-red-600/60 uppercase tracking-widest group-hover/point:text-red-500 transition-colors">Second Point (Red)</p>
                                        <Edit3 className="h-3 w-3 text-white/20 group-hover/point:text-red-600 transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={point2Title}
                                            onChange={(e) => updatePoint(1, e.target.value, point2Desc)}
                                            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-red-500 text-xs font-bold focus:outline-none focus:border-red-500 transition-all uppercase placeholder:text-white/20"
                                            placeholder="TITLE"
                                        />
                                        <textarea
                                            value={point2Desc}
                                            onChange={(e) => updatePoint(1, point2Title, e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-white text-[11px] focus:outline-none focus:border-red-500 transition-all resize-none leading-relaxed placeholder:text-white/20"
                                            rows={2}
                                            placeholder="Description..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle: Pillars */}
                    <div className="space-y-6">
                        <div className="bg-god-card border border-white/10 rounded-xl p-6 space-y-4">
                            <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3 mb-4">
                                Core Pillars
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {(formData.pillars || []).map((pillar, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10 relative overflow-hidden group/pill hover:border-god-accent/40 hover:bg-white/10 transition-all cursor-pointer ring-1 ring-white/5 focus-within:ring-god-accent/30">
                                        <div className="absolute top-2 right-4 text-2xl font-black text-god-accent/10 group-hover/pill:text-god-accent/20 transition-colors">{pillar.id}</div>
                                        <div className="flex items-center justify-between mb-3 relative z-10">
                                            <div className="flex items-center gap-2">
                                                <Edit3 className="h-3 w-3 text-white/20 group-hover/pill:text-god-accent transition-colors shrink-0" />
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover/pill:text-god-accent/60 transition-colors">Pillar {pillar.id}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 relative z-10 pl-5">
                                            <input
                                                type="text"
                                                value={pillar.title}
                                                onChange={(e) => updatePillar(i, 'title', e.target.value.toUpperCase())}
                                                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm font-bold focus:outline-none focus:border-god-accent transition-all uppercase placeholder:text-white/20"
                                                placeholder="PILLAR TITLE"
                                            />
                                            <input
                                                type="text"
                                                value={pillar.desc}
                                                onChange={(e) => updatePillar(i, 'desc', e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-god-muted text-[11px] focus:outline-none focus:border-god-accent transition-all placeholder:text-white/20"
                                                placeholder="Summary..."
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="space-y-6">
                        <div className="bg-god-card border border-white/10 rounded-xl p-6 shadow-xl">
                            <ImageUploader
                                currentImage={formData.image}
                                onImageChange={(path) => setFormData({ ...formData, image: path })}
                                category="about"
                                label="Story Image"
                                aspectRatio="3/2"
                            />
                        </div>
                        <div className="p-5 bg-god-accent/5 border border-god-accent/20 rounded-xl flex gap-4">
                            <AlertCircle className="h-5 w-5 text-god-accent shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-god-accent uppercase tracking-wider">Editor Note</p>
                                <p className="text-[11px] text-white/50 leading-relaxed">
                                    Story image uses a landscape 3:2 ratio. Core Pillars are limited to 4 key principles to maintain layout integrity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
