'use client';

import { useState } from 'react';
import { addTransformation, updateTransformation, deleteTransformation } from '@/lib/actions';
import { Save, Plus, Trash2, User, Activity, Image as ImageIcon, ExternalLink } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import Link from 'next/link';

interface Transformation {
    id: number;
    name: string;
    result: string;
    beforeImage: string;
    afterImage: string;
}

interface TransformationEditorProps {
    initialData?: Transformation[];
}

export default function TransformationEditor({ initialData = [] }: TransformationEditorProps) {
    const [transformations, setTransformations] = useState<Transformation[]>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleUpdate = async (id: number, updated: Partial<Transformation>) => {
        try {
            await updateTransformation(id, updated);
            setTransformations(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
            setMessage('Updated transformation successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Update failed.');
        }
    };

    const handleAdd = async () => {
        const newItem = {
            name: "NEW ATHLETE",
            result: "-10KG FAT / +5KG MUSCLE",
            beforeImage: "",
            afterImage: ""
        };
        try {
            const res = await addTransformation(newItem);
            if (res.success) {
                setTransformations([...transformations, { ...newItem, id: res.id as number }]);
                setExpandedId(res.id as number);
            }
        } catch (error) {
            setMessage('Failed to add.');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this result?')) return;
        try {
            await deleteTransformation(id);
            setTransformations(prev => prev.filter(t => t.id !== id));
            if (expandedId === id) setExpandedId(null);
        } catch (error) {
            setMessage('Delete failed.');
        }
    };

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-12 shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-god-accent/20 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-god-accent" />
                    </div>
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">Proven Results</h2>
                        <p className="text-god-muted text-sm mt-1">Before & After member transformations.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {message && <span className="text-green-500 text-xs font-bold uppercase tracking-widest">{message}</span>}
                    <Link
                        href="/portal-access/transformations"
                        className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white font-bold text-sm rounded hover:bg-white/5 transition-colors"
                    >
                        <ExternalLink className="h-4 w-4" /> Manage All
                    </Link>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-6 py-2 bg-god-accent text-black font-bold text-sm rounded hover:bg-white transition-colors"
                    >
                        <Plus className="h-4 w-4" /> ADD RESULT
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {transformations.map((item, idx) => (
                        <div
                            key={item.id}
                            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                            className={`group relative aspect-[4/5] bg-neutral-900 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${expandedId === item.id ? 'border-god-accent ring-2 ring-god-accent/20' : 'border-white/5 hover:border-white/20'}`}
                        >
                            <div className="absolute inset-0 flex">
                                <div className="flex-1 bg-black/40 overflow-hidden border-r border-white/5">
                                    {item.beforeImage && <img src={item.beforeImage} className="w-full h-full object-cover opacity-50" />}
                                </div>
                                <div className="flex-1 bg-black/40 overflow-hidden">
                                    {item.afterImage && <img src={item.afterImage} className="w-full h-full object-cover" />}
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-3 left-3 right-3">
                                <p className="text-god-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-1">PROVEN RESULT</p>
                                <p className="text-white font-heading text-sm font-bold truncate uppercase">{item.name}</p>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/20 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-500 hover:text-white"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Inline Detailed Editor */}
                {expandedId && transformations.find(t => t.id === expandedId) && (
                    <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                        {transformations.filter(t => t.id === expandedId).map(item => (
                            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="space-y-6">
                                    <h4 className="font-heading text-lg font-bold text-white uppercase flex items-center gap-2">
                                        <User className="h-4 w-4 text-god-accent" /> Athlete Details
                                    </h4>
                                    <div>
                                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-widest mb-2">Member Name</label>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleUpdate(item.id, { name: e.target.value.toUpperCase() })}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-widest mb-2">Transformation Result</label>
                                        <input
                                            type="text"
                                            value={item.result}
                                            onChange={(e) => handleUpdate(item.id, { result: e.target.value.toUpperCase() })}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-god-accent font-bold focus:outline-none focus:border-god-accent transition-all"
                                            placeholder="e.g. -20KG FAT LOSS"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <ImageUploader
                                        currentImage={item.beforeImage}
                                        onImageChange={(url) => handleUpdate(item.id, { beforeImage: url })}
                                        category="transformations"
                                        label="Before (Grayscale)"
                                        aspectRatio="3/4"
                                    />
                                </div>
                                <div>
                                    <ImageUploader
                                        currentImage={item.afterImage}
                                        onImageChange={(url) => handleUpdate(item.id, { afterImage: url })}
                                        category="transformations"
                                        label="After (Color)"
                                        aspectRatio="3/4"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
