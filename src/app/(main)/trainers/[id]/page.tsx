import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import {
    ArrowLeft,
    Mail,
    Target,
    Zap,
    Dumbbell,
    ArrowRight,
    Instagram,
    Twitter,
    Facebook,
    Globe
} from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function TrainerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const dataPath = path.join(process.cwd(), 'src/data/gym-data.json');
    const file = await fs.readFile(dataPath, 'utf8');
    const data = JSON.parse(file);

    const trainer = data.trainers.find((t: any) => t.id === parseInt(id));

    if (!trainer) {
        notFound();
    }

    const detailedBio = trainer.detailedBio || trainer.bio;
    const specialties = trainer.specialties || ['Strength Training', 'Conditioning', 'Nutrition'];
    const socials = trainer.socials || {};
    const stats = trainer.stats || {
        reshaped: '500+',
        tier: 'ELITE',
        certified: 'PRO',
        success: '98%'
    };

    // ORIGINAL Desktop Social Links Design
    const DesktopSocialLinks = ({ className = "" }: { className?: string }) => {
        const hasSocials = socials.instagram || socials.twitter || socials.facebook || trainer.email;
        if (!hasSocials) return null;

        return (
            <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ${className}`}>
                {socials.instagram && (
                    <a href={socials.instagram.startsWith('http') ? socials.instagram : `https://instagram.com/${socials.instagram}`}
                        target="_blank" rel="noopener noreferrer"
                        className="group flex items-center gap-2 transition-all duration-300 hover:text-god-accent text-white/40">
                        <Instagram className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">Instagram</span>
                    </a>
                )}
                {socials.twitter && (
                    <a href={socials.twitter.startsWith('http') ? socials.twitter : `https://twitter.com/${socials.twitter}`}
                        target="_blank" rel="noopener noreferrer"
                        className="group flex items-center gap-2 transition-all duration-300 hover:text-god-accent text-white/40">
                        <Twitter className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">Twitter</span>
                    </a>
                )}
                {socials.facebook && (
                    <a href={socials.facebook.startsWith('http') ? socials.facebook : `https://facebook.com/${socials.facebook}`}
                        target="_blank" rel="noopener noreferrer"
                        className="group flex items-center gap-2 transition-all duration-300 hover:text-god-accent text-white/40">
                        <Facebook className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">Facebook</span>
                    </a>
                )}
                {(trainer.email || data.gymEmail) && (
                    <a href={`mailto:${trainer.email || 'info@godsgym.com'}`}
                        className="group flex items-center gap-2 transition-all duration-300 hover:text-god-accent text-white/40">
                        <Mail className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">Contact</span>
                    </a>
                )}
            </div>
        );
    };

    // NEW Optimized Mobile Social Links
    const MobileSocialLinks = ({ className = "" }: { className?: string }) => {
        const hasSocials = socials.instagram || socials.twitter || socials.facebook || trainer.email;
        if (!hasSocials) return null;

        return (
            <div className={`flex flex-col gap-4 ${className}`}>
                {socials.instagram && (
                    <a href={socials.instagram.startsWith('http') ? socials.instagram : `https://instagram.com/${socials.instagram}`}
                        target="_blank" rel="noopener noreferrer"
                        className="group flex items-center justify-between p-4 bg-gradient-to-r from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#fcb045]/10 border border-white/10 rounded-xl transition-all duration-300 hover:border-god-accent/40">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center shadow-lg">
                                <Instagram className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-none mb-1">Follow On</p>
                                <p className="text-sm font-heading font-black text-white uppercase italic">Instagram</p>
                            </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-god-accent transition-colors" />
                    </a>
                )}
                <div className="flex flex-wrap items-center gap-4">
                    {socials.twitter && (
                        <a href={socials.twitter.startsWith('http') ? socials.twitter : `https://twitter.com/${socials.twitter}`}
                            target="_blank" rel="noopener noreferrer"
                            className="group flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10">
                            <Twitter className="h-3.5 w-3.5 text-white/60" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Twitter</span>
                        </a>
                    )}
                    {socials.facebook && (
                        <a href={socials.facebook.startsWith('http') ? socials.facebook : `https://facebook.com/${socials.facebook}`}
                            target="_blank" rel="noopener noreferrer"
                            className="group flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10">
                            <Facebook className="h-3.5 w-3.5 text-white/60" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Facebook</span>
                        </a>
                    )}
                </div>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-god-bg flex flex-col pt-0 lg:pt-20">
            {/* ------------------------------------------- */}
            {/* MOBILE ONLY UI (Immersive Layout)           */}
            {/* ------------------------------------------- */}
            <div className="lg:hidden">
                <div className="relative h-[70vh] sm:h-[60vh] w-full overflow-hidden">
                    <Image
                        src={trainer.image}
                        alt={trainer.name}
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-god-bg"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-god-bg via-transparent to-transparent opacity-80"></div>

                    <div className="absolute top-10 left-4 z-30">
                        <Link href="/trainers" className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white font-bold uppercase tracking-widest text-[10px]">
                            <ArrowLeft className="h-3 w-3" /> Team
                        </Link>
                    </div>

                    <div className="absolute bottom-10 left-6 z-20">
                        <Reveal>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-god-accent text-black text-[9px] font-black uppercase px-2 py-0.5 tracking-tighter skew-x-[-12deg]">
                                    {trainer.experience} XP
                                </span>
                            </div>
                            <h1 className="font-heading text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-1">
                                {trainer.name}
                            </h1>
                            <p className="text-god-accent font-black uppercase tracking-[0.2em] text-[10px]">
                                {trainer.specialization}
                            </p>
                        </Reveal>
                    </div>
                </div>

                <div className="bg-god-card border-y border-white/5 relative z-20 shadow-2xl">
                    <div className="grid grid-cols-4 divide-x divide-white/5">
                        <div className="py-5 text-center px-1">
                            <p className="text-xl font-heading font-black text-god-accent leading-none">{stats.reshaped}</p>
                            <p className="text-[7px] text-god-muted uppercase tracking-widest mt-1.5">Reshaped</p>
                        </div>
                        <div className="py-5 text-center px-1">
                            <p className="text-xl font-heading font-black text-white leading-none">{stats.tier}</p>
                            <p className="text-[7px] text-god-muted uppercase tracking-widest mt-1.5">Tier</p>
                        </div>
                        <div className="py-5 text-center px-1">
                            <p className="text-xl font-heading font-black text-white leading-none">{stats.certified}</p>
                            <p className="text-[7px] text-god-muted uppercase tracking-widest mt-1.5">Certified</p>
                        </div>
                        <div className="py-5 text-center px-1">
                            <p className="text-xl font-heading font-black text-god-accent leading-none">{stats.success}</p>
                            <p className="text-[7px] text-god-muted uppercase tracking-widest mt-1.5">Success</p>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-10 space-y-12">
                    <Reveal delay={0.4}>
                        <div className="space-y-6">
                            <div className="relative">
                                <span className="absolute -top-6 -left-4 text-8xl font-serif text-white/5 italic">"</span>
                                <p className="text-xl text-white/90 font-light italic leading-relaxed pl-4 border-l-2 border-god-accent/30 relative z-10">
                                    {trainer.bio}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <MobileSocialLinks />
                            </div>
                        </div>
                    </Reveal>

                    <div className="space-y-8">
                        <Reveal delay={0.5} width="100%">
                            <div className="space-y-4">
                                <h3 className="font-heading text-2xl text-white uppercase font-black flex items-center gap-3">
                                    <Zap className="h-5 w-5 text-god-accent" /> Training Ethos
                                </h3>
                                <p className="text-god-muted leading-relaxed text-base">
                                    {detailedBio}
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.6} width="100%">
                            <div className="space-y-4">
                                <h3 className="font-heading text-2xl text-white uppercase font-black flex items-center gap-3">
                                    <Dumbbell className="h-5 w-5 text-god-accent" /> Specializations
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {specialties.map((s: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/[0.03] px-4 py-3 border border-white/5 rounded-sm">
                                            <Target className="h-4 w-4 text-god-accent" />
                                            <span className="text-white/80 uppercase tracking-widest text-xs font-bold">{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="mt-10">
                        <Reveal delay={0.8} width="100%">
                            <Link href="/programs" className="w-full flex justify-center items-center h-16 bg-god-accent text-black font-heading font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-[0.98] transition-all rounded-sm shadow-xl">
                                Book Session <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* ------------------------------------------- */}
            {/* DESKTOP ONLY UI (Restore Original Layout)    */}
            {/* ------------------------------------------- */}
            <div className="hidden lg:block relative py-24 overflow-hidden">
                {/* Background Name Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
                    <span className="font-heading text-[20vw] font-black uppercase text-white leading-none tracking-tighter select-none whitespace-nowrap">
                        {trainer.name}
                    </span>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back Button */}
                    <Reveal>
                        <Link href="/trainers" className="inline-flex items-center gap-2 text-god-accent font-bold uppercase tracking-[0.2em] text-xs mb-8 hover:text-white transition-colors group">
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Team
                        </Link>
                    </Reveal>

                    <div className="grid grid-cols-12 gap-12">
                        {/* Left Column - Original Image Card */}
                        <div className="col-span-4">
                            <Reveal delay={0.2} width="100%">
                                <div className="w-full space-y-4">
                                    <div className="border-2 border-white/10 bg-god-card overflow-hidden relative">
                                        <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-2 border-l-2 border-god-accent z-20"></div>
                                        <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-2 border-r-2 border-god-accent z-20"></div>

                                        <div className="aspect-[4/5] overflow-hidden relative">
                                            <Image
                                                src={trainer.image}
                                                alt={trainer.name}
                                                fill
                                                className="object-cover filter contrast-110 grayscale hover:grayscale-0 transition-all duration-700"
                                                priority
                                            />
                                        </div>

                                        <div className="h-1 bg-god-accent"></div>

                                        <div className="grid grid-cols-4 border-b border-white/5">
                                            <div className="text-center py-4 border-r border-white/5">
                                                <p className="text-lg font-heading font-black text-god-accent leading-none">{stats.reshaped}</p>
                                                <p className="text-[7px] text-god-muted uppercase tracking-wider mt-1">Reshaped</p>
                                            </div>
                                            <div className="text-center py-4 border-r border-white/5">
                                                <p className="text-lg font-heading font-black text-white leading-none">{stats.tier}</p>
                                                <p className="text-[7px] text-god-muted uppercase tracking-wider mt-1">Tier</p>
                                            </div>
                                            <div className="text-center py-4 border-r border-white/5">
                                                <p className="text-lg font-heading font-black text-white leading-none">{stats.certified}</p>
                                                <p className="text-[7px] text-god-muted uppercase tracking-wider mt-1">Certified</p>
                                            </div>
                                            <div className="text-center py-4">
                                                <p className="text-lg font-heading font-black text-god-accent leading-none">{stats.success}</p>
                                                <p className="text-[7px] text-god-muted uppercase tracking-wider mt-1">Success</p>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <Link href="/programs" className="flex justify-center items-center h-11 bg-god-accent text-black font-heading font-bold uppercase tracking-wider text-xs hover:brightness-110 transition-all">
                                                Book Session <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* Right Column - Original Info */}
                        <div className="col-span-8">
                            <Reveal delay={0.3}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-px w-12 bg-god-accent"></div>
                                    <span className="text-god-accent font-black uppercase tracking-[0.3em] text-xs">{trainer.experience}</span>
                                </div>

                                <h1 className="font-heading text-6xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6 italic">
                                    {trainer.name}
                                </h1>

                                <p className="text-white/80 text-lg font-light italic leading-relaxed mb-4 pl-4 border-l-2 border-god-accent/50">
                                    {trainer.bio}
                                </p>
                            </Reveal>

                            <Reveal delay={0.4} width="100%" className="mb-6">
                                <div className="w-full bg-white/[0.01] border border-white/5 py-2 px-5 rounded-sm flex items-center justify-start gap-12">
                                    <h3 className="font-heading text-[10px] text-white/50 uppercase font-black tracking-[0.2em] flex items-center gap-2 shrink-0">
                                        <Globe className="h-3.5 w-3.5 text-god-accent/50" /> Socials
                                    </h3>
                                    <DesktopSocialLinks className="!justify-start gap-x-8" />
                                </div>
                            </Reveal>

                            <div className="grid grid-cols-2 gap-4">
                                <Reveal delay={0.6} width="100%">
                                    <div className="w-full bg-white/[0.02] border border-white/5 p-8 h-full flex flex-col">
                                        <h3 className="font-heading text-xl text-white uppercase font-black mb-4 flex items-center gap-3">
                                            <Zap className="h-5 w-5 text-god-accent" /> Training Ethos
                                        </h3>
                                        <p className="text-god-muted leading-relaxed text-sm flex-1">
                                            {detailedBio}
                                        </p>
                                    </div>
                                </Reveal>

                                <Reveal delay={0.7} width="100%">
                                    <div className="w-full bg-white/[0.02] border border-white/5 p-8 h-full flex flex-col">
                                        <h3 className="font-heading text-xl text-white uppercase font-black mb-4 flex items-center gap-3">
                                            <Dumbbell className="h-5 w-5 text-god-accent" /> Specializations
                                        </h3>
                                        <div className="space-y-2 flex-1">
                                            {specialties.map((s: string, i: number) => (
                                                <div key={i} className="w-full flex items-center gap-2 bg-white/5 px-3 py-2 border-l-2 border-god-accent/50">
                                                    <Target className="h-3 w-3 text-god-accent flex-shrink-0" />
                                                    <span className="text-god-muted uppercase tracking-wider text-xs font-bold">{s}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
