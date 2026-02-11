'use client';

import { useState } from 'react';
import { updateHomepageFacilities } from '@/lib/actions';
import { Save, Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface FacilityItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface FacilityEditorProps {
    initialData?: FacilityItem[];
}

const defaultFacilities: FacilityItem[] = [
    { id: 1, title: "The Iron Room", description: "Built for true powerlifting. Premium Hammer Strength equipment.", image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800" },
    { id: 2, title: "Conditioning Zone", description: "High-intensity cardio and functional training area.", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800" },
    { id: 3, title: "Personal Suites", description: "Private training rooms for focused 1-on-1 sessions.", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800" },
    { id: 4, title: "Recovery Lab", description: "Rest, recover, and rebuild with premium amenities.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800" },
];

export default function FacilityEditor({ initialData }: FacilityEditorProps) {
    const [facilities, setFacilities] = useState<FacilityItem[]>(
        initialData && initialData.length > 0 ? initialData : defaultFacilities
    );
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updateHomepageFacilities(facilities);
            setMessage('Saved!');
        } catch (error) {
            setMessage('Failed to save');
        }
        setIsSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    const updateFacility = (id: number, field: keyof FacilityItem, value: string) => {
        setFacilities(prev => prev.map(f =>
            f.id === id ? { ...f, [field]: value } : f
        ));
    };

    const addFacility = () => {
        const newId = Math.max(...facilities.map(f => f.id), 0) + 1;
        setFacilities([...facilities, {
            id: newId,
            title: "New Area",
            description: "Description here.",
            image: ""
        }]);
        setExpandedId(newId);
    };

    const removeFacility = (id: number) => {
        if (facilities.length > 2) {
            setFacilities(prev => prev.filter(f => f.id !== id));
            if (expandedId === id) setExpandedId(null);
        }
    };

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-8 shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-god-accent/20 flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-god-accent" />
                    </div>
                    <div>
                        <h2 className="font-heading text-lg font-bold text-white uppercase tracking-tight">Facility Gallery</h2>
                        <p className="text-god-muted text-xs">Horizontal scroll showcase images</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {message && <span className="text-green-500 text-xs">{message}</span>}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-god-accent text-black font-bold text-xs rounded hover:bg-white transition-colors disabled:opacity-50"
                    >
                        <Save className="h-3 w-3" />
                        {isSaving ? 'SAVING...' : 'SAVE'}
                    </button>
                </div>
            </div>

            {/* Compact Card Grid */}
            <div className="p-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {facilities.map((facility, index) => (
                        <div
                            key={facility.id}
                            className={`relative border rounded-xl overflow-hidden cursor-pointer transition-all ${expandedId === facility.id ? 'border-god-accent ring-1 ring-god-accent' : 'border-white/10 hover:border-white/30'}`}
                            onClick={() => setExpandedId(expandedId === facility.id ? null : facility.id)}
                        >
                            {/* Thumbnail */}
                            <div className="aspect-video relative bg-black/50">
                                {facility.image ? (
                                    <img src={facility.image} alt={facility.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                        <ImageIcon className="h-8 w-8" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute top-2 left-2 w-6 h-6 bg-god-accent/80 rounded flex items-center justify-center text-black text-xs font-bold">
                                    {index + 1}
                                </div>
                                {facilities.length > 2 && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeFacility(facility.id); }}
                                        className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 rounded flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                )}
                                <div className="absolute bottom-2 left-2 right-2">
                                    <p className="text-white text-xs font-bold truncate">{facility.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add Button */}
                    {facilities.length < 6 && (
                        <button
                            onClick={addFacility}
                            className="aspect-video border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-white/30 hover:text-god-accent hover:border-god-accent/50 transition-colors"
                        >
                            <Plus className="h-6 w-6 mb-1" />
                            <span className="text-xs font-bold">ADD</span>
                        </button>
                    )}
                </div>

                {/* Expanded Editor */}
                {expandedId && (
                    <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                        {facilities.filter(f => f.id === expandedId).map(facility => (
                            <div key={facility.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={facility.title}
                                            onChange={(e) => updateFacility(facility.id, 'title', e.target.value)}
                                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-heading font-bold focus:outline-none focus:border-god-accent text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Description</label>
                                        <textarea
                                            value={facility.description}
                                            onChange={(e) => updateFacility(facility.id, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-god-accent resize-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <ImageUploader
                                        currentImage={facility.image}
                                        onImageChange={(path) => updateFacility(facility.id, 'image', path)}
                                        category="gallery"
                                        label="Image"
                                        aspectRatio="16/9"
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
