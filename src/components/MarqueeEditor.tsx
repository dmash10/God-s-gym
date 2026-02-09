'use client';

import React, { useState } from 'react';
import { updateMarqueeItems } from '@/lib/actions';
import { Save, Plus, Trash2, GripVertical, AlertTriangle } from 'lucide-react';

interface MarqueeEditorProps {
    initialItems: string[];
}

export const MarqueeEditor: React.FC<MarqueeEditorProps> = ({ initialItems }) => {
    const [items, setItems] = useState<string[]>(initialItems);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleAddItem = () => {
        setItems([...items, "NEW SLOGAN"]);
    };

    const handleRemoveItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleUpdateItem = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const result = await updateMarqueeItems(items);
            if (result.success) {
                setMessage({ type: 'success', text: 'Marquee updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update marquee.' });
            }
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-white uppercase italic tracking-tighter">Marquee Banner</h2>
                    <p className="text-white/50 text-sm">Manage the scrolling text items on your homepage.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-god-accent hover:bg-god-accent/80 text-black px-6 py-2 font-bold uppercase text-sm transition-colors disabled:opacity-50"
                >
                    <Save size={18} />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {message && (
                <div className={`p-4 ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'} border rounded flex items-center gap-3`}>
                    {message.type === 'error' && <AlertTriangle size={18} />}
                    <span className="text-sm font-medium">{message.text}</span>
                </div>
            )}

            <div className="bg-god-card border border-white/5 p-6 space-y-4">
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 group">
                            <div className="cursor-grab text-white/20 group-hover:text-white/40">
                                <GripVertical size={20} />
                            </div>
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleUpdateItem(index, e.target.value)}
                                className="flex-1 bg-black/40 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-god-accent/50 transition-colors uppercase font-heading tracking-wider"
                                placeholder="Enter slogan..."
                            />
                            <button
                                onClick={() => handleRemoveItem(index)}
                                className="p-2 text-white/40 hover:text-god-red transition-colors"
                                title="Remove item"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleAddItem}
                    className="w-full py-4 border-2 border-dashed border-white/5 hover:border-god-accent/20 text-white/30 hover:text-god-accent transition-all flex items-center justify-center gap-2 uppercase font-bold text-sm"
                >
                    <Plus size={20} />
                    Add Slogan
                </button>
            </div>

            {/* Preview Section */}
            <div className="pt-8">
                <h3 className="text-sm font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Live Preview</h3>
                <div className="relative w-full overflow-hidden bg-black py-4 border-y border-white/5 no-transition">
                    <div className="flex whitespace-nowrap overflow-hidden">
                        <div className="flex items-center gap-10 px-10">
                            {items.map((item, i) => (
                                <React.Fragment key={i}>
                                    <span className={`font-heading text-xl font-black tracking-tighter uppercase italic ${i % 3 === 0 ? 'text-white' :
                                        i % 3 === 1 ? 'text-transparent stroke-text' :
                                            'text-god-accent'
                                        }`}>
                                        {item}
                                    </span>
                                    <div className="w-2 h-2 rounded-full bg-god-red"></div>
                                </React.Fragment>
                            ))}
                            {/* Duplicate for basic visual representation */}
                            {items.map((item, i) => (
                                <React.Fragment key={`copy-${i}`}>
                                    <span className={`font-heading text-xl font-black tracking-tighter uppercase italic ${i % 3 === 0 ? 'text-white' :
                                        i % 3 === 1 ? 'text-transparent stroke-text' :
                                            'text-god-accent'
                                        }`}>
                                        {item}
                                    </span>
                                    <div className="w-2 h-2 rounded-full bg-god-red"></div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
