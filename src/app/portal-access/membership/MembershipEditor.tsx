'use client';

import { useState } from 'react';
import { updatePlans } from '@/lib/actions';
import { Save, Plus, Trash2 } from 'lucide-react';

interface Plan {
    id: number;
    title: string;
    price: string;
    features: string[];
    isPopular: boolean;
}

interface MembershipEditorProps {
    initialPlans: Plan[];
}

export default function MembershipEditor({ initialPlans }: MembershipEditorProps) {
    const [plans, setPlans] = useState<Plan[]>(initialPlans);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handlePlanChange = (id: number, field: keyof Plan, value: any) => {
        setPlans(plans.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleFeatureChange = (planId: number, featureIndex: number, value: string) => {
        setPlans(plans.map(p => {
            if (p.id === planId) {
                const newFeatures = [...p.features];
                newFeatures[featureIndex] = value;
                return { ...p, features: newFeatures };
            }
            return p;
        }));
    };

    const addFeature = (planId: number) => {
        setPlans(plans.map(p => p.id === planId ? { ...p, features: [...p.features, ''] } : p));
    };

    const removeFeature = (planId: number, featureIndex: number) => {
        setPlans(plans.map(p => {
            if (p.id === planId) {
                return { ...p, features: p.features.filter((_, i) => i !== featureIndex) };
            }
            return p;
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updatePlans(plans);
            setMessage('Membership plans updated successfully!');
        } catch (error) {
            setMessage('Failed to update plans.');
        }
        setIsSaving(false);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">Membership Plans</h1>
                    <p className="text-god-muted mt-2">Update pricing and features for each plan.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-god-accent text-black font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                >
                    <Save className="h-5 w-5" />
                    {isSaving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {message}
                </div>
            )}

            {/* Plans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`bg-god-card border rounded-xl p-6 ${plan.isPopular ? 'border-god-accent' : 'border-white/10'}`}
                    >
                        {/* Plan Title */}
                        <div className="mb-4">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Plan Name</label>
                            <input
                                type="text"
                                value={plan.title}
                                onChange={(e) => handlePlanChange(plan.id, 'title', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent"
                            />
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Price</label>
                            <input
                                type="text"
                                value={plan.price}
                                onChange={(e) => handlePlanChange(plan.id, 'price', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent"
                                placeholder="₹1,500 / mo"
                            />
                        </div>

                        {/* Popular Toggle */}
                        <div className="mb-4 flex items-center gap-3">
                            <input
                                type="checkbox"
                                id={`popular-${plan.id}`}
                                checked={plan.isPopular}
                                onChange={(e) => handlePlanChange(plan.id, 'isPopular', e.target.checked)}
                                className="h-5 w-5 accent-god-accent"
                            />
                            <label htmlFor={`popular-${plan.id}`} className="text-white font-medium">
                                Mark as Most Popular
                            </label>
                        </div>

                        {/* Features */}
                        <div>
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Features</label>
                            <div className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(plan.id, idx, e.target.value)}
                                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-god-accent"
                                        />
                                        <button
                                            onClick={() => removeFeature(plan.id, idx)}
                                            className="p-2 text-gray-400 hover:text-god-red transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addFeature(plan.id)}
                                    className="flex items-center gap-1 text-sm text-god-accent hover:text-white transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Feature
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
