'use client';

import { useState } from 'react';
import { addTransformation, updateTransformation, deleteTransformation } from '@/lib/actions';
import { Plus, Edit, Trash2, X, Save, User, Award, ExternalLink } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import Link from 'next/link';

interface Transformation {
    id: number;
    name: string;
    result: string;
    beforeImage: string;
    afterImage: string;
}

interface TransformationsEditorProps {
    initialData: Transformation[];
}

export default function TransformationsEditor({ initialData }: TransformationsEditorProps) {
    const [transformations, setTransformations] = useState<Transformation[]>(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Transformation | null>(null);
    const [formData, setFormData] = useState({ name: '', result: '', beforeImage: '', afterImage: '' });
    const [message, setMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({ name: '', result: '', beforeImage: '', afterImage: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (item: Transformation) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            result: item.result,
            beforeImage: item.beforeImage,
            afterImage: item.afterImage,
        });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (editingItem) {
                await updateTransformation(editingItem.id, formData);
                setTransformations(transformations.map(t => t.id === editingItem.id ? { ...t, ...formData } : t));
                setMessage('Transformation updated!');
            } else {
                const result = await addTransformation(formData);
                setTransformations([...transformations, { ...formData, id: result.id }]);
                setMessage('Transformation added!');
            }
            setIsModalOpen(false);
        } catch (error) {
            setMessage('Failed to save.');
        }
        setIsSaving(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Delete this transformation?')) {
            try {
                await deleteTransformation(id);
                setTransformations(transformations.filter(t => t.id !== id));
                setMessage('Transformation deleted.');
            } catch (error) {
                setMessage('Failed to delete.');
            }
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">Transformations</h1>
                    <p className="text-god-muted mt-2">Showcase your members' success stories.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/transformations"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-colors text-sm"
                    >
                        <ExternalLink className="h-4 w-4" /> View Live Page
                    </Link>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-6 py-3 bg-god-accent text-black font-bold rounded-lg hover:bg-white transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Add Story
                    </button>
                </div>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('!') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {message}
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {transformations.map((item) => (
                    <div
                        key={item.id}
                        className="bg-god-card border border-white/10 rounded-xl p-6 group"
                    >
                        <div className="flex gap-4 mb-4 h-48">
                            <div className="flex-1 relative rounded-lg overflow-hidden">
                                <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover grayscale" />
                                <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 text-xs font-bold text-white uppercase">Before</div>
                            </div>
                            <div className="flex-1 relative rounded-lg overflow-hidden">
                                <img src={item.afterImage} alt="After" className="w-full h-full object-cover" />
                                <div className="absolute bottom-2 right-2 bg-god-accent px-2 py-1 text-xs font-bold text-black uppercase">After</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-heading text-xl font-bold text-white uppercase">{item.name}</h3>
                                <p className="text-god-accent font-bold">{item.result}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditModal(item)}
                                    className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-red-600/20 rounded-lg text-red-400 hover:bg-red-600/40 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {transformations.length === 0 && (
                <div className="text-center py-20 text-god-muted">
                    <p className="text-lg">No transformations yet</p>
                    <p className="text-sm mt-2">Add your first success story</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-god-card border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-god-card/50 sticky top-0 z-20">
                            <h2 className="font-heading text-2xl font-bold text-white uppercase">
                                {editingItem ? 'Edit Transformation' : 'Add Transformation'}
                            </h2>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors text-[10px] font-bold uppercase tracking-widest"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-6 py-2 bg-god-accent text-black rounded-lg hover:bg-white transition-colors text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-4">
                                        <div className="relative group/name">
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Member Name</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/name:text-god-accent transition-colors">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
                                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent transition-all"
                                                    placeholder="e.g., AMIT KUMAR"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative group/result">
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Transfomation Result</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/result:text-god-accent transition-colors">
                                                    <Award className="h-4 w-4" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.result}
                                                    onChange={(e) => setFormData({ ...formData, result: e.target.value.toUpperCase() })}
                                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent transition-all"
                                                    placeholder="e.g., -15KG IN 4 MONTHS"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <ImageUploader
                                        currentImage={formData.beforeImage}
                                        onImageChange={(path) => setFormData({ ...formData, beforeImage: path })}
                                        category="transformations"
                                        label="Before"
                                        aspectRatio="3/4"
                                    />
                                    <ImageUploader
                                        currentImage={formData.afterImage}
                                        onImageChange={(path) => setFormData({ ...formData, afterImage: path })}
                                        category="transformations"
                                        label="After"
                                        aspectRatio="3/4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
