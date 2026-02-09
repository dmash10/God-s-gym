'use client';

import { useState } from 'react';
import { addProgram, updateProgram, deleteProgram } from '@/lib/actions';
import { Plus, Edit, Trash2, X, Save, Clock, AlignLeft, Type, Info, Zap, Target } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface Program {
    id: number;
    title: string;
    description: string;
    longDescription?: string;
    targetAudience: string;
    image: string;
    duration?: string;
    features?: string[];
    benefits?: string[];
}

interface ProgramsEditorProps {
    initialPrograms: Program[];
}

const PROGRAM_TITLE_OPTIONS = [
    "HYPERTROPHY",
    "STRENGTH TRAINING",
    "FAT LOSS & SHRED",
    "POWERLIFTING",
    "BODYBUILDING",
    "FUNCTIONAL FITNESS",
    "HIIT & CARDIO",
    "PERSONAL TRAINING",
    "YOGA & MOBILITY",
    "CROSSFIT",
    "CALISTHENICS"
];

const TARGET_AUDIENCE_OPTIONS = [
    "EVERYONE",
    "BEGINNERS",
    "INTERMEDIATE",
    "ADVANCED",
    "ATHLETES",
    "POWERLIFTERS",
    "SERIOUS BODYBUILDERS",
    "WEIGHT LOSS SEEKERS"
];

export default function ProgramsEditor({ initialPrograms }: ProgramsEditorProps) {
    const [programs, setPrograms] = useState<Program[]>(initialPrograms);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState<Program | null>(null);
    const [formData, setFormData] = useState({
        title: PROGRAM_TITLE_OPTIONS[0],
        description: '',
        longDescription: '',
        targetAudience: TARGET_AUDIENCE_OPTIONS[0],
        image: '',
        duration: '',
        features: [] as string[],
        benefits: [] as string[]
    });
    const [message, setMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const openAddModal = () => {
        setEditingProgram(null);
        setFormData({
            title: PROGRAM_TITLE_OPTIONS[0],
            description: '',
            longDescription: '',
            targetAudience: TARGET_AUDIENCE_OPTIONS[0],
            image: '',
            duration: '',
            features: [],
            benefits: []
        });
        setIsModalOpen(true);
    };

    const openEditModal = (program: Program) => {
        setEditingProgram(program);
        setFormData({
            title: program.title,
            description: program.description,
            longDescription: program.longDescription || '',
            targetAudience: program.targetAudience,
            image: program.image,
            duration: program.duration || '',
            features: program.features || [],
            benefits: program.benefits || []
        });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const dataToSave = {
                title: formData.title.toUpperCase(),
                description: formData.description,
                longDescription: formData.longDescription,
                targetAudience: formData.targetAudience.toUpperCase(),
                image: formData.image,
                duration: formData.duration,
                features: formData.features.map(f => f.trim()).filter(f => f !== ''),
                benefits: formData.benefits.map(b => b.trim()).filter(b => b !== '')
            };

            if (editingProgram) {
                await updateProgram(editingProgram.id, dataToSave);
                setPrograms(programs.map(p => p.id === editingProgram.id ? { ...p, ...dataToSave } : p));
                setMessage('Program updated successfully!');
            } else {
                const result = await addProgram(dataToSave);
                setPrograms([...programs, { ...dataToSave, id: result.id }]);
                setMessage('Program added successfully!');
            }
            setIsModalOpen(false);
        } catch (error) {
            setMessage('Failed to save program.');
        }
        setIsSaving(false);
    };

    // Itemized List Component
    const ItemList = ({ items, onChange, label, accentColor, placeholder, icon: Icon }: any) => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className={`block text-[10px] font-bold uppercase tracking-widest ${accentColor}`}>{label}</label>
                <button
                    onClick={() => onChange([...items, ''])}
                    className="flex items-center gap-1 text-[9px] bg-white/5 hover:bg-god-accent hover:text-black px-2 py-1 rounded transition-all font-bold uppercase border border-white/10"
                >
                    <Plus className="h-3 w-3" /> Add Item
                </button>
            </div>
            <div className="space-y-2">
                {items.map((item: string, idx: number) => (
                    <div key={idx} className="relative group/item flex items-center gap-2">
                        <div className="relative flex-1">
                            {Icon && (
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${accentColor.replace('text-', 'text-')}/40 group-focus-within/item:${accentColor} transition-colors`}>
                                    <Icon className="h-3.5 w-3.5" />
                                </div>
                            )}
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[idx] = e.target.value;
                                    onChange(newItems);
                                }}
                                placeholder={placeholder}
                                className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-god-accent transition-all italic`}
                            />
                        </div>
                        <button
                            onClick={() => onChange(items.filter((_: any, i: number) => i !== idx))}
                            className="p-2 text-white/20 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );



    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this program?')) {
            try {
                await deleteProgram(id);
                setPrograms(programs.filter(p => p.id !== id));
                setMessage('Program deleted.');
            } catch (error) {
                setMessage('Failed to delete program.');
            }
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">Programs</h1>
                    <p className="text-god-muted mt-2">Manage your training programs. Titles are forced to CAPS.</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-6 py-3 bg-god-accent text-black font-bold rounded-lg hover:bg-white transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Add Program
                </button>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('success') || message.includes('deleted') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {message}
                </div>
            )}

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {programs.map((program, idx) => (
                    <div
                        key={program.id}
                        className="bg-god-card border border-white/10 rounded-xl overflow-hidden group"
                    >
                        <div className="relative h-40">
                            <img
                                src={program.image}
                                alt={program.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-god-muted">
                                0{idx + 1}
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={() => openEditModal(program)}
                                    className="p-2 bg-god-accent rounded-lg text-black hover:bg-white transition-colors"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(program.id)}
                                    className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-heading text-lg font-bold text-white uppercase">{program.title}</h3>
                            <p className="text-god-muted text-xs mt-1 line-clamp-2">{program.description}</p>
                            <p className="text-god-accent text-[10px] mt-2 font-bold uppercase">{program.targetAudience}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-god-card border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-god-card/50 sticky top-0 z-20">
                            <h2 className="font-heading text-2xl font-bold text-white uppercase">
                                {editingProgram ? 'Edit Program' : 'Add Program'}
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
                            {/* Top Section: Basic Info & Image */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Program Category</label>
                                            <select
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent appearance-none lg:bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23EAB308%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] lg:bg-[position:right_1rem_center] lg:bg-no-repeat"
                                            >
                                                {PROGRAM_TITLE_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt} className="bg-god-card text-white">{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Target Audience</label>
                                            <select
                                                value={formData.targetAudience}
                                                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent appearance-none lg:bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23EAB308%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] lg:bg-[position:right_1rem_center] lg:bg-no-repeat"
                                            >
                                                {TARGET_AUDIENCE_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt} className="bg-god-card text-white">{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="relative group/teaser">
                                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Short Teaser (Card)</label>
                                        <div className="relative">
                                            <div className="absolute top-3 left-4 pointer-events-none text-god-accent/40 group-focus-within/teaser:text-god-accent transition-colors">
                                                <Info className="h-4 w-4" />
                                            </div>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent resize-none text-sm italic transition-all"
                                                rows={2}
                                                placeholder="Catchy tagline for the program card..."
                                            />
                                        </div>
                                    </div>

                                    <div className="relative group/dur">
                                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Duration / Commitment</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/dur:text-god-accent transition-colors">
                                                <Clock className="h-4 w-4" />
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent transition-all"
                                                placeholder="e.g. 12 WEEKS"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                        <ImageUploader
                                            currentImage={formData.image}
                                            onImageChange={(path) => setFormData({ ...formData, image: path })}
                                            category="programs"
                                            label="Program Hero Gallery"
                                            aspectRatio="16/9"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Content Section with Outline */}
                            <div className="p-8 border-2 border-god-accent/30 bg-god-accent/5 rounded-xl space-y-10 relative overflow-hidden mt-16">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-px flex-1 bg-god-accent/20"></div>
                                        <h3 className="font-heading text-xl font-black text-god-accent uppercase tracking-[0.3em] flex items-center gap-3">
                                            <Save className="h-4 w-4" /> Program Protocol
                                        </h3>
                                        <div className="h-px flex-1 bg-god-accent/20"></div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="relative group/long">
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-3">
                                                In-Depth Scientific Methodology
                                            </label>
                                            <div className="relative">
                                                <div className="absolute top-4 left-5 pointer-events-none text-god-accent/40 group-focus-within/long:text-god-accent transition-colors">
                                                    <AlignLeft className="h-5 w-5" />
                                                </div>
                                                <textarea
                                                    value={formData.longDescription}
                                                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                                                    className="w-full pl-14 pr-5 py-4 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-god-accent resize-none text-base leading-relaxed transition-all"
                                                    rows={6}
                                                    placeholder="Explain the science, methodology, and philosophy of this specific program..."
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <ItemList
                                                label="Premium Performance Features"
                                                items={formData.features}
                                                onChange={(items: string[]) => setFormData({ ...formData, features: items })}
                                                accentColor="text-god-accent"
                                                placeholder="e.g., Personalized Macros"
                                                icon={Zap}
                                            />
                                            <ItemList
                                                label="Targeted Transformation Results"
                                                items={formData.benefits}
                                                onChange={(items: string[]) => setFormData({ ...formData, benefits: items })}
                                                accentColor="text-orange-500"
                                                placeholder="e.g., +5kg Muscle Mass"
                                                icon={Target}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
