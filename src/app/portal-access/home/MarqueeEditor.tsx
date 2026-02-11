'use client';

import { useState } from 'react';
import { updateMarqueeItems } from '@/lib/actions';
import { Save, Plus, Trash2, Type, Layout } from 'lucide-react';

interface MarqueeEditorProps {
    initialData?: string[];
}

export default function MarqueeEditor({ initialData = [] }: MarqueeEditorProps) {
    const [items, setItems] = useState<string[]>(
        initialData.length > 0 ? initialData : ["NO EXCUSES", "TRAIN HARD", "STAY CONSISTENT", "GOD'S GYM"]
    );
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updateMarqueeItems(items);
            setMessage('Marquee updated successfully!');
        } catch (error) {
            setMessage('Failed to update marquee.');
        }
        setIsSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    const updateItem = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value.toUpperCase();
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, "NEW PHRASE"]);
    };

    const removeItem = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-12 shadow-2xl">
            {/* Section Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-god-accent/20 flex items-center justify-center">
                        <Type className="h-5 w-5 text-god-accent" />
                    </div>
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">Marquee Strip</h2>
                        <p className="text-god-muted text-sm mt-1">Scrolling text items below the hero section.</p>
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
                    {/* Items List */}
                    <div className="bg-god-card border border-white/10 rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em]">
                                Scrolling Phrases
                            </label>
                            <button
                                onClick={addItem}
                                className="flex items-center gap-1 text-[10px] font-bold text-white/50 hover:text-god-accent transition-colors"
                            >
                                <Plus className="h-3 w-3" /> ADD ITEM
                            </button>
                        </div>

                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <div key={index} className="flex gap-2 group">
                                    <div className="relative flex-1">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within:text-god-accent transition-colors">
                                            <Type className="h-4 w-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => updateItem(index, e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-heading font-bold focus:outline-none focus:border-god-accent transition-all hover:border-white/20"
                                            placeholder="PHRASE"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeItem(index)}
                                        className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview View */}
                    <div className="bg-god-card border border-white/10 rounded-xl p-6 flex flex-col">
                        <div className="flex items-center gap-2 mb-6">
                            <Layout className="h-4 w-4 text-god-accent" />
                            <h3 className="font-heading text-lg font-bold text-white uppercase">Live Preview</h3>
                        </div>

                        <div className="relative w-full py-8 bg-black overflow-hidden flex items-center border border-white/5 -skew-y-1">
                            <div className="flex whitespace-nowrap animate-marquee">
                                {[...Array(2)].map((_, groupIdx) => (
                                    <div key={groupIdx} className="flex items-center">
                                        {items.map((item, i) => (
                                            <div key={i} className="flex items-center">
                                                <span className={`mx-4 font-heading text-xl font-black tracking-tighter uppercase italic ${i % 3 === 0 ? 'text-white' : i % 3 === 1 ? 'text-transparent stroke-text' : 'text-god-accent'}`}>
                                                    {item}
                                                </span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-god-red"></div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-god-muted text-[11px] mt-6 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-god-accent"></span>
                            Visual preview may appear slightly different from actual site animation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
