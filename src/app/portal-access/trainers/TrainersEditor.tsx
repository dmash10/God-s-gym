'use client';

import { useState } from 'react';
import { addTrainer, updateTrainer, deleteTrainer } from '@/lib/actions';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface Trainer {
    id: number;
    name: string;
    specialization: string;
    experience: string;
    bio: string;
    detailedBio?: string;
    image: string;
    specialties?: string[];
    socials?: {
        instagram?: string;
        twitter?: string;
        facebook?: string;
    };
    stats?: {
        reshaped?: string;
        tier?: string;
        certified?: string;
        success?: string;
    };
}

interface TrainersEditorProps {
    initialTrainers: Trainer[];
}

const SPECIALIZATION_OPTIONS = [
    "Head Coach",
    "Bodybuilding Specialist",
    "Strength & Conditioning",
    "Fat Loss & Functional",
    "Powerlifting Coach",
    "Yoga & Mobility",
    "Sports Nutritionist",
    "MMA & Boxing",
    "CrossFit Trainer"
];

// Brand Icon Components
const InstagramIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

export default function TrainersEditor({ initialTrainers }: TrainersEditorProps) {
    // ... existing useState ...
    const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        specialization: SPECIALIZATION_OPTIONS[0],
        experience: '',
        bio: '',
        detailedBio: '',
        specialties: [] as string[],
        image: '',
        instagram: '',
        twitter: '',
        facebook: '',
        statsReshaped: '500+',
        statsTier: 'ELITE',
        statsCertified: 'PRO',
        statsSuccess: '98%'
    });
    const [message, setMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const openAddModal = () => {
        setEditingTrainer(null);
        setFormData({
            name: '',
            specialization: SPECIALIZATION_OPTIONS[0],
            experience: '',
            bio: '',
            detailedBio: '',
            specialties: [],
            image: '',
            instagram: '',
            twitter: '',
            facebook: '',
            statsReshaped: '500+',
            statsTier: 'ELITE',
            statsCertified: 'PRO',
            statsSuccess: '98%'
        });
        setIsModalOpen(true);
    };

    const openEditModal = (trainer: Trainer) => {
        setEditingTrainer(trainer);
        setFormData({
            name: trainer.name,
            specialization: trainer.specialization,
            experience: trainer.experience,
            bio: trainer.bio || '',
            detailedBio: trainer.detailedBio || '',
            specialties: trainer.specialties || [],
            image: trainer.image,
            instagram: trainer.socials?.instagram || '',
            twitter: trainer.socials?.twitter || '',
            facebook: trainer.socials?.facebook || '',
            statsReshaped: trainer.stats?.reshaped || '500+',
            statsTier: trainer.stats?.tier || 'ELITE',
            statsCertified: trainer.stats?.certified || 'PRO',
            statsSuccess: trainer.stats?.success || '98%'
        });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const dataToSave = {
                name: formData.name.toUpperCase(),
                specialization: formData.specialization.toUpperCase(),
                experience: formData.experience,
                bio: formData.bio,
                detailedBio: formData.detailedBio,
                specialties: formData.specialties.map(s => s.trim()).filter(s => s !== ''),
                image: formData.image,
                socials: {
                    instagram: formData.instagram,
                    twitter: formData.twitter,
                    facebook: formData.facebook
                },
                stats: {
                    reshaped: formData.statsReshaped,
                    tier: formData.statsTier,
                    certified: formData.statsCertified,
                    success: formData.statsSuccess
                }
            };

            if (editingTrainer) {
                await updateTrainer(editingTrainer.id, dataToSave);
                setTrainers(trainers.map(t => t.id === editingTrainer.id ? { ...t, ...dataToSave } : t));
                setMessage('Trainer updated successfully!');
            } else {
                const result = await addTrainer(dataToSave);
                setTrainers([...trainers, { ...dataToSave, id: result.id }]);
                setMessage('Trainer added successfully!');
            }
            setIsModalOpen(false);
        } catch (error) {
            setMessage('Failed to save trainer.');
        }
        setIsSaving(false);
    };

    // Itemized List Component
    const ItemList = ({ items, onChange, label, accentColor, placeholder }: any) => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] ${accentColor}`}>{label}</label>
                <button
                    onClick={() => onChange([...items, ''])}
                    className="flex items-center gap-1 text-[9px] bg-white/5 hover:bg-god-accent hover:text-black px-2 py-1 rounded transition-all font-bold uppercase"
                >
                    <Plus className="h-3 w-3" /> Add Item
                </button>
            </div>
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-2 group">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                                const newItems = [...items];
                                newItems[idx] = e.target.value;
                                onChange(newItems);
                            }}
                            placeholder={placeholder}
                            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-god-accent transition-colors italic"
                        />
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
        if (confirm('Are you sure you want to delete this trainer?')) {
            try {
                await deleteTrainer(id);
                setTrainers(trainers.filter(t => t.id !== id));
                setMessage('Trainer deleted.');
            } catch (error) {
                setMessage('Failed to delete trainer.');
            }
        }
    };

    return (
        <div>
            {/* ... header ... */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">Trainers</h1>
                    <p className="text-god-muted mt-2">Manage your gym's training staff. Names are forced to CAPS.</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-6 py-3 bg-god-accent text-black font-bold rounded-lg hover:bg-white transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Add Trainer
                </button>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('success') || message.includes('deleted') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {message}
                </div>
            )}

            {/* Trainers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trainers.map((trainer, idx) => (
                    <div
                        key={trainer.id}
                        className="bg-god-card border border-white/10 rounded-xl overflow-hidden group"
                    >
                        <div className="relative h-48">
                            <img
                                src={trainer.image || 'https://via.placeholder.com/400x500?text=NO+IMAGE'}
                                alt={trainer.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-god-muted">
                                0{idx + 1}
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={() => openEditModal(trainer)}
                                    className="p-2 bg-god-accent rounded-lg text-black hover:bg-white transition-colors"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(trainer.id)}
                                    className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-heading text-lg font-bold text-white uppercase">{trainer.name}</h3>
                            <p className="text-god-accent text-[10px] mt-1 font-bold uppercase tracking-wider">{trainer.specialization}</p>
                            <p className="text-god-muted text-xs mt-2 italic line-clamp-2">{trainer.bio}</p>
                            <p className="text-white/40 text-[9px] mt-3 uppercase tracking-widest">{trainer.experience}</p>
                        </div>
                    </div>
                ))}
            </div>

            {trainers.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-2xl">
                    <p className="text-god-muted italic">No trainers found. Add the elite force above.</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-god-card border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-god-card/50 sticky top-0 z-20">
                            <h2 className="font-heading text-2xl font-bold text-white uppercase">
                                {editingTrainer ? 'Edit Trainer' : 'Add Trainer'}
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
                            {/* Top Section: Basic Info, Photo & Socials */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Trainer Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent"
                                                placeholder="e.g., VIKRAM SINGH"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Specialization</label>
                                            <select
                                                value={formData.specialization}
                                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent appearance-none lg:bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23EAB308%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] lg:bg-[position:right_1rem_center] lg:bg-no-repeat"
                                            >
                                                {SPECIALIZATION_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt} className="bg-god-card text-white">{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Professional Experience</label>
                                        <input
                                            type="text"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-god-accent"
                                            placeholder="e.g., 8 Years Experience"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Short Teaser (Card)</label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent resize-none text-sm italic"
                                            placeholder="A punchy one-liner for the trainer card..."
                                            rows={2}
                                        />
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-4">Digital Ecosystem (Socials)</label>
                                        <div className="space-y-3">
                                            <div className="relative group/insta transition-all">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E1306C]/50 group-focus-within/insta:text-[#E1306C] transition-colors">
                                                    <InstagramIcon />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.instagram}
                                                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#E1306C] transition-all"
                                                    placeholder="Instagram handle or URL"
                                                />
                                            </div>
                                            <div className="relative group/twit transition-all">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within/twit:text-white transition-colors">
                                                    <TwitterIcon />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.twitter}
                                                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white transition-all"
                                                    placeholder="X/Twitter handle or URL"
                                                />
                                            </div>
                                            <div className="relative group/face transition-all">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1877F2]/50 group-focus-within/face:text-[#1877F2] transition-colors">
                                                    <FacebookIcon />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.facebook}
                                                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#1877F2] transition-all"
                                                    placeholder="Facebook profile URL"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col">
                                        <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-4 text-center">Identity Visualization</label>
                                        <div className="flex-1 flex items-center justify-center">
                                            <div className="w-full max-w-[200px]">
                                                <ImageUploader
                                                    currentImage={formData.image}
                                                    onImageChange={(path) => setFormData({ ...formData, image: path })}
                                                    category="trainers"
                                                    label=""
                                                    aspectRatio="3/4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Content Section with Outline */}
                            <div className="p-8 border-2 border-god-accent/30 bg-god-accent/5 rounded-xl space-y-10 relative overflow-hidden mt-16">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-px flex-1 bg-god-accent/20"></div>
                                        <h3 className="font-heading text-xl font-black text-god-accent uppercase tracking-[0.3em] flex items-center gap-3">
                                            <Edit className="h-5 w-5" /> Trainer Profile Deep-Dive
                                        </h3>
                                        <div className="h-px flex-1 bg-god-accent/20"></div>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-3">
                                                Professional Coaching Philosophy
                                            </label>
                                            <textarea
                                                value={formData.detailedBio}
                                                onChange={(e) => setFormData({ ...formData, detailedBio: e.target.value })}
                                                className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-god-accent resize-none text-base leading-relaxed"
                                                placeholder="Write about the trainer's journey, certifications, and specific coaching style..."
                                                rows={6}
                                            />
                                        </div>

                                        <ItemList
                                            label="Core Professional Specialties"
                                            items={formData.specialties}
                                            onChange={(items: string[]) => setFormData({ ...formData, specialties: items })}
                                            accentColor="text-god-accent"
                                            placeholder="e.g., Strength & Conditioning"
                                        />

                                        {/* Stats Section */}
                                        <div className="pt-6 border-t border-god-accent/20">
                                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-4">
                                                Profile Statistics
                                            </label>
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div>
                                                    <label className="block text-[9px] text-white/50 uppercase tracking-wider mb-1">Clients Reshaped</label>
                                                    <input
                                                        type="text"
                                                        value={formData.statsReshaped}
                                                        onChange={(e) => setFormData({ ...formData, statsReshaped: e.target.value })}
                                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-bold text-center text-lg focus:outline-none focus:border-god-accent"
                                                        placeholder="500+"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[9px] text-white/50 uppercase tracking-wider mb-1">Tier Level</label>
                                                    <input
                                                        type="text"
                                                        value={formData.statsTier}
                                                        onChange={(e) => setFormData({ ...formData, statsTier: e.target.value })}
                                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-bold text-center text-lg focus:outline-none focus:border-god-accent"
                                                        placeholder="ELITE"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[9px] text-white/50 uppercase tracking-wider mb-1">Certification</label>
                                                    <input
                                                        type="text"
                                                        value={formData.statsCertified}
                                                        onChange={(e) => setFormData({ ...formData, statsCertified: e.target.value })}
                                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-bold text-center text-lg focus:outline-none focus:border-god-accent"
                                                        placeholder="PRO"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[9px] text-white/50 uppercase tracking-wider mb-1">Success Rate</label>
                                                    <input
                                                        type="text"
                                                        value={formData.statsSuccess}
                                                        onChange={(e) => setFormData({ ...formData, statsSuccess: e.target.value })}
                                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-bold text-center text-lg focus:outline-none focus:border-god-accent"
                                                        placeholder="98%"
                                                    />
                                                </div>
                                            </div>
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
