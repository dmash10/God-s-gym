'use client';

import { useState } from 'react';
import { updateHomepagePhilosophy } from '@/lib/actions';
import { Save, Type, Dumbbell, UserCheck, Coffee, Car, Sparkles, AlertCircle, Edit3 } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface FeatureItem {
    title: string;
    description: string;
}

interface PhilosophyData {
    title: string;
    subtitle?: string;
    description?: string;
    bulletPoints?: string[];
    image: string;
    features?: FeatureItem[];
}

interface PhilosophyEditorProps {
    initialData?: PhilosophyData;
}

const defaultFeatures: FeatureItem[] = [
    { title: "Premium Gear", description: "Hammer Strength & Life Fitness." },
    { title: "Expert Staff", description: "Certified trainers dedicated to you." },
    { title: "Fuel Bar", description: "Espresso & Recovery Shakes." },
    { title: "Private Parking", description: "Secure spots for members." },
];

const defaultData: PhilosophyData = {
    title: "STATE OF THE ART FITNESS",
    description: "We are a full functioning gym, with membership options and 1 on 1 training. We don't just sell access to equipment; we provide the atmosphere, the knowledge, and the raw intensity needed to transform.",
    image: "",
    features: defaultFeatures,
};

const featureIcons = [Dumbbell, UserCheck, Coffee, Car];

export default function PhilosophyEditor({ initialData }: PhilosophyEditorProps) {
    const [formData, setFormData] = useState<PhilosophyData>({
        ...defaultData,
        ...initialData,
        features: initialData?.features || defaultFeatures,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updateHomepagePhilosophy({
                ...formData,
                title: formData.title.toUpperCase(),
            } as any);
            setMessage('Saved!');
        } catch (error) {
            setMessage('Failed to save');
        }
        setIsSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    const updateFeature = (index: number, field: keyof FeatureItem, value: string) => {
        const newFeatures = [...(formData.features || defaultFeatures)];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setFormData({ ...formData, features: newFeatures });
    };

    return (
        <div className="bg-god-card border border-white/10 rounded-2xl overflow-hidden mb-12">
            {/* Section Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-god-card/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-god-accent/20 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-god-accent" />
                    </div>
                    <div>
                        <h2 className="font-heading text-xl font-bold text-white uppercase tracking-tight">State of the Art Fitness</h2>
                        <p className="text-god-muted text-xs">Manage the feature highlights and equipment section.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {message && <span className="text-green-500 text-xs font-bold mr-2 uppercase tracking-widest">{message}</span>}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-god-accent text-black font-bold text-sm rounded hover:bg-white transition-colors disabled:opacity-50 shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                    >
                        <Save className="h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Core Content */}
                    <div className="space-y-6">
                        <div className="bg-god-card border border-white/10 rounded-xl p-6 space-y-4">
                            <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3">
                                High Impact Content
                            </h3>

                            <div className="space-y-4">
                                <div className="relative group/head">
                                    <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Section Title</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/head:text-god-accent transition-colors">
                                            <Type className="h-4 w-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value.toUpperCase() })}
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent transition-all font-bold"
                                            placeholder="STATE OF THE ART FITNESS"
                                        />
                                    </div>
                                    <p className="text-god-muted text-[10px] mt-1 italic">The last word will be highlighted in gold.</p>
                                </div>

                                <div className="relative group/desc">
                                    <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Description</label>
                                    <textarea
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={6}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent transition-all leading-relaxed text-sm ring-1 ring-white/5 focus:ring-god-accent/20"
                                        placeholder="Write section description..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle: Features Grid */}
                    <div className="space-y-6">
                        <div className="bg-god-card border border-white/10 rounded-xl p-6 space-y-4">
                            <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3 mb-4">
                                Shared Facilities
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {(formData.features || defaultFeatures).slice(0, 4).map((feature, index) => {
                                    const Icon = featureIcons[index];
                                    return (
                                        <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 relative group/feat hover:border-god-accent/40 hover:bg-white/10 transition-all cursor-pointer ring-1 ring-white/5 focus-within:ring-god-accent/30">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-god-accent/10 rounded group-hover/feat:bg-god-accent/20 transition-colors">
                                                        <Icon className="h-4 w-4 text-god-accent" />
                                                    </div>
                                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover/feat:text-god-accent/60 transition-colors">Facility {index + 1}</p>
                                                </div>
                                                <Edit3 className="h-3 w-3 text-white/20 group-hover/feat:text-god-accent transition-colors" />
                                            </div>
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    value={feature.title}
                                                    onChange={(e) => updateFeature(index, 'title', e.target.value.toUpperCase())}
                                                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm font-bold focus:outline-none focus:border-god-accent transition-all uppercase placeholder:text-white/20"
                                                    placeholder="Feature Title"
                                                />
                                                <input
                                                    type="text"
                                                    value={feature.description}
                                                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-god-muted text-[11px] focus:outline-none focus:border-god-accent transition-all placeholder:text-white/20"
                                                    placeholder="Short summary..."
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
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
                                label="Facility Image"
                                aspectRatio="3/2"
                            />
                        </div>
                        <div className="p-5 bg-god-accent/5 border border-god-accent/20 rounded-xl flex gap-4">
                            <AlertCircle className="h-5 w-5 text-god-accent shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-god-accent uppercase tracking-wider">Editor Note</p>
                                <p className="text-[11px] text-white/50 leading-relaxed">
                                    This image appears in the world-class facility scroll section. Use a landscape high-resolution photo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
