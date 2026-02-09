'use client';

import React, { useState } from 'react';
import { updateHomepagePhilosophy } from '@/lib/actions';
import { Save, Plus, Trash2, Layout, Type, Image as LucideImage, AlertTriangle } from 'lucide-react';

interface PhilosophyEditorProps {
    initialPhilosophy: {
        title: string;
        subtitle?: string;
        description?: string;
        bulletPoints: string[];
        image: string;
    };
}

export const PhilosophyEditor: React.FC<PhilosophyEditorProps> = ({ initialPhilosophy }) => {
    const [philosophy, setPhilosophy] = useState(initialPhilosophy);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSave = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const result = await updateHomepagePhilosophy(philosophy);
            if (result.success) {
                setMessage({ type: 'success', text: 'Philosophy section updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update section.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    const handleAddBullet = () => {
        if (philosophy.bulletPoints.length < 5) {
            setPhilosophy({
                ...philosophy,
                bulletPoints: [...philosophy.bulletPoints, "NEW PRINCIPLE"]
            });
        }
    };

    const handleRemoveBullet = (index: number) => {
        setPhilosophy({
            ...philosophy,
            bulletPoints: philosophy.bulletPoints.filter((_, i) => i !== index)
        });
    };

    const handleUpdateBullet = (index: number, value: string) => {
        const newBullets = [...philosophy.bulletPoints];
        newBullets[index] = value;
        setPhilosophy({ ...philosophy, bulletPoints: newBullets });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-white uppercase italic tracking-tighter">Iron Standard Section</h2>
                    <p className="text-white/50 text-sm">Manage the mission statement and core principles on your homepage.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-god-accent hover:bg-god-accent/80 text-black px-6 py-2 font-bold uppercase text-sm transition-colors disabled:opacity-50 shadow-lg shadow-god-accent/20"
                >
                    <Save size={18} />
                    {loading ? 'Saving...' : 'Save Section'}
                </button>
            </div>

            {message && (
                <div className={`p-4 ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'} border rounded flex items-center gap-3`}>
                    {message.type === 'error' && <AlertTriangle size={18} />}
                    <span className="text-sm font-medium">{message.text}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Text Content */}
                <div className="space-y-6 bg-god-card border border-white/5 p-6">
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 block">Section Subtitle</span>
                            <div className="relative">
                                <Layout className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input
                                    type="text"
                                    value={philosophy.subtitle || ""}
                                    onChange={(e) => setPhilosophy({ ...philosophy, subtitle: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 pl-10 pr-4 py-2 text-white focus:outline-none focus:border-god-accent/50 transition-colors uppercase tracking-wider text-sm font-bold"
                                    placeholder="e.g. THE IRON STANDARD"
                                />
                            </div>
                        </label>

                        <label className="block">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 block">Main Title</span>
                            <div className="relative">
                                <Type className="absolute left-3 top-3 text-white/20" size={16} />
                                <textarea
                                    value={philosophy.title}
                                    onChange={(e) => setPhilosophy({ ...philosophy, title: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 pl-10 pr-4 py-3 text-white focus:outline-none focus:border-god-accent/50 transition-colors uppercase font-heading font-black tracking-tighter text-2xl h-32 leading-tight"
                                    placeholder="Enter headline..."
                                />
                            </div>
                        </label>

                        <label className="block">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 block">Consultant Description</span>
                            <textarea
                                value={philosophy.description || ""}
                                onChange={(e) => setPhilosophy({ ...philosophy, description: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-god-accent/50 transition-colors text-sm font-light leading-relaxed h-32"
                                placeholder="Explain the soul of the gym..."
                            />
                        </label>
                    </div>
                </div>

                {/* Bullets & Image */}
                <div className="space-y-6">
                    <div className="bg-god-card border border-white/5 p-6 space-y-4">
                        <h3 className="text-xs font-black text-white/60 uppercase tracking-[0.2em] mb-4">Core Principles</h3>
                        <div className="space-y-3">
                            {philosophy.bulletPoints.map((bullet, index) => (
                                <div key={index} className="flex items-center gap-2 group">
                                    <div className={`w-1 h-10 flex-shrink-0 ${index === 0 ? 'bg-god-accent' : index === 1 ? 'bg-orange-500' : 'bg-red-600'}`}></div>
                                    <input
                                        type="text"
                                        value={bullet}
                                        onChange={(e) => handleUpdateBullet(index, e.target.value)}
                                        className="flex-1 bg-black/40 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-god-accent/50 transition-colors uppercase font-heading font-bold"
                                    />
                                    <button
                                        onClick={() => handleRemoveBullet(index)}
                                        className="p-2 text-white/40 hover:text-god-red transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}

                            {philosophy.bulletPoints.length < 5 && (
                                <button
                                    onClick={handleAddBullet}
                                    className="w-full py-3 border border-dashed border-white/10 hover:border-god-accent/30 text-white/30 hover:text-god-accent transition-all flex items-center justify-center gap-2 uppercase font-bold text-xs"
                                >
                                    <Plus size={16} />
                                    Add Principle
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="bg-god-card border border-white/5 p-6 space-y-4">
                        <label className="block">
                            <span className="text-xs font-black text-white/60 uppercase tracking-[0.2em] mb-4 block">Section Image URL</span>
                            <div className="relative">
                                <LucideImage className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input
                                    type="text"
                                    value={philosophy.image}
                                    onChange={(e) => setPhilosophy({ ...philosophy, image: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 pl-10 pr-4 py-2 text-white focus:outline-none focus:border-god-accent/50 transition-colors text-xs"
                                    placeholder="Image URL..."
                                />
                            </div>
                        </label>
                        {philosophy.image && (
                            <div className="mt-4 aspect-video border border-white/10 overflow-hidden relative group">
                                <img src={philosophy.image} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-black uppercase text-white tracking-[0.2em]">Image Preview</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
