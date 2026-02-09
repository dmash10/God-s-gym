'use client';

import { useState } from 'react';
import { updateSiteSettings, downloadBackup } from '@/lib/actions';
import { Save, Download, Phone, MapPin, Clock, Instagram, Facebook, MessageSquare, Globe, Megaphone } from 'lucide-react';

interface SiteSettings {
    contactPhone: string;
    address: string;
    instagramUrl: string;
    facebookUrl: string;
    twitterUrl: string;
    whatsappNumber: string;
    hoursWeekday: string;
    hoursSunday: string;
    mapUrl: string;
    announcement: string;
}

interface SettingsEditorProps {
    initialData: SiteSettings;
}

// Brand Icon Components
const InstagramIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function SettingsEditor({ initialData }: SettingsEditorProps) {
    const [formData, setFormData] = useState<SiteSettings>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            await updateSiteSettings(formData);
            setMessage('Settings saved successfully!');
        } catch (error) {
            setMessage('Failed to save settings.');
        }
        setIsSaving(false);
    };

    const handleDownloadBackup = async () => {
        try {
            const backup = await downloadBackup();
            const blob = new Blob([backup], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `gods-gym-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            setMessage('Backup downloaded!');
        } catch (error) {
            setMessage('Failed to download backup.');
        }
    };

    const updateField = (field: keyof SiteSettings, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">Settings</h1>
                    <p className="text-god-muted mt-2">Manage your website's global settings.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-god-accent text-black font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                >
                    <Save className="h-5 w-5" />
                    {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('!') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="bg-god-card border border-white/10 rounded-xl p-6">
                    <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                        <Phone className="h-5 w-5 text-god-accent" />
                        Contact Information
                    </h3>
                    <div className="space-y-4">
                        <div className="relative group/phone">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/phone:text-god-accent transition-colors">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.contactPhone}
                                    onChange={(e) => updateField('contactPhone', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent transition-all"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>
                        <div className="relative group/addr">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Address</label>
                            <div className="relative">
                                <div className="absolute top-3 left-4 pointer-events-none text-god-accent/40 group-focus-within/addr:text-god-accent transition-colors">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => updateField('address', e.target.value)}
                                    rows={2}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent resize-none transition-all"
                                    placeholder="Full address..."
                                />
                            </div>
                        </div>
                        <div className="relative group/wa">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">WhatsApp Number (with country code)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#25D366]/40 group-focus-within/wa:text-[#25D366] transition-colors">
                                    <WhatsAppIcon />
                                </div>
                                <input
                                    type="text"
                                    value={formData.whatsappNumber}
                                    onChange={(e) => updateField('whatsappNumber', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#25D366] transition-all"
                                    placeholder="919876543210"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-god-card border border-white/10 rounded-xl p-6">
                    <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-god-accent" />
                        Social Links
                    </h3>
                    <div className="space-y-4">
                        <div className="relative group/insta">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Instagram URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E1306C]/40 group-focus-within/insta:text-[#E1306C] transition-colors">
                                    <InstagramIcon />
                                </div>
                                <input
                                    type="text"
                                    value={formData.instagramUrl}
                                    onChange={(e) => updateField('instagramUrl', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E1306C] transition-all"
                                    placeholder="https://instagram.com/yourpage"
                                />
                            </div>
                        </div>
                        <div className="relative group/fb">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Facebook URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1877F2]/40 group-focus-within/fb:text-[#1877F2] transition-colors">
                                    <FacebookIcon />
                                </div>
                                <input
                                    type="text"
                                    value={formData.facebookUrl}
                                    onChange={(e) => updateField('facebookUrl', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#1877F2] transition-all"
                                    placeholder="https://facebook.com/yourpage"
                                />
                            </div>
                        </div>
                        <div className="relative group/tw">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Twitter/X URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within/tw:text-white transition-colors">
                                    <TwitterIcon />
                                </div>
                                <input
                                    type="text"
                                    value={formData.twitterUrl}
                                    onChange={(e) => updateField('twitterUrl', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white transition-all"
                                    placeholder="https://x.com/yourpage"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-god-card border border-white/10 rounded-xl p-6">
                    <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-god-accent" />
                        Operating Hours
                    </h3>
                    <div className="space-y-4">
                        <div className="relative group/wd">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Weekdays (Mon - Sat)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/wd:text-god-accent transition-colors">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.hoursWeekday}
                                    onChange={(e) => updateField('hoursWeekday', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent transition-all"
                                    placeholder="5:00 AM - 10:00 PM"
                                />
                            </div>
                        </div>
                        <div className="relative group/sun">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Sunday</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/sun:text-god-accent transition-colors">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.hoursSunday}
                                    onChange={(e) => updateField('hoursSunday', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent transition-all"
                                    placeholder="4:00 PM - 8:00 PM"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map & Announcement */}
                <div className="bg-god-card border border-white/10 rounded-xl p-6">
                    <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-god-accent" />
                        Map & Announcements
                    </h3>
                    <div className="space-y-4">
                        <div className="relative group/map">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Google Maps Embed URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/map:text-god-accent transition-colors">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.mapUrl}
                                    onChange={(e) => updateField('mapUrl', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-god-accent transition-all"
                                    placeholder="https://www.google.com/maps/embed?..."
                                />
                            </div>
                            <p className="text-god-muted text-[10px] mt-1 italic">Get this from Google Maps → Share → Embed a map</p>
                        </div>
                        <div className="relative group/ann">
                            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">Announcement Banner</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-god-accent/40 group-focus-within/ann:text-god-accent transition-colors">
                                    <Megaphone className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.announcement}
                                    onChange={(e) => updateField('announcement', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-god-accent transition-all"
                                    placeholder="Special offer! 20% off on annual memberships"
                                />
                            </div>
                            <p className="text-god-muted text-[10px] mt-1 italic">Leave empty to hide the announcement bar</p>
                        </div>
                    </div>
                </div>

                {/* Data Management */}
                <div className="bg-god-card border border-white/10 rounded-xl p-6 lg:col-span-2">
                    <h3 className="font-heading text-lg font-bold text-white uppercase border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                        <Download className="h-5 w-5 text-god-accent" />
                        Data Management
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={handleDownloadBackup}
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <Download className="h-5 w-5" />
                            Download Full Backup
                        </button>
                        <p className="text-god-muted text-sm flex items-center">
                            Exports all website data including settings, trainers, programs, and gallery as JSON.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
