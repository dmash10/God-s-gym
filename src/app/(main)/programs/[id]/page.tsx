import Link from 'next/link';
import Image from 'next/image';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';
import { ArrowLeft, CheckCircle2, Trophy, Target, Clock, Users, ArrowRight, Shield, Zap } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getGymData } from '@/lib/actions';
import { getWhatsAppUrl } from '@/lib/utils';

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getGymData();

    const program = data.programs.find((p: any) => p.id === parseInt(id));

    if (!program) {
        notFound();
    }

    const longDescription = program.longDescription;
    const features = program.features || [];
    const benefits = program.benefits || [];

    return (
        <main className="min-h-screen bg-god-bg pt-20">
            {/* Industrial Hero Section */}
            <section className="relative min-h-[50vh] py-16 sm:py-20 flex items-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0">
                    <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover grayscale opacity-40 contrast-125"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-god-bg via-god-bg/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                    <Reveal>
                        <Link href="/programs" className="inline-flex items-center gap-2 text-god-accent font-bold uppercase tracking-[0.3em] text-xs mb-10 hover:text-white transition-colors group">
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Programs
                        </Link>
                    </Reveal>

                    <div className="max-w-4xl">
                        <Reveal delay={0.1}>
                            <span className="text-god-accent font-bold uppercase tracking-[0.5em] text-sm mb-4 block">LEVEL: {program.targetAudience}</span>
                            <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                                {program.title}
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="flex flex-wrap gap-6 sm:gap-12">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-god-accent/10 border border-god-accent/20">
                                        <Clock className="h-5 w-5 text-god-accent" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-god-muted uppercase tracking-widest leading-none mb-1">Duration</span>
                                        <span className="text-white font-bold uppercase tracking-wider">{program.duration || "12 WEEKS"}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-god-accent/10 border border-god-accent/20">
                                        <Target className="h-5 w-5 text-god-accent" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-god-muted uppercase tracking-widest leading-none mb-1">Focus</span>
                                        <span className="text-white font-bold uppercase tracking-wider">{program.title}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-god-accent/10 border border-god-accent/20">
                                        <Users className="h-5 w-5 text-god-accent" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-god-muted uppercase tracking-widest leading-none mb-1">Access</span>
                                        <span className="text-white font-bold uppercase tracking-wider">UNLIMITED</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Deep Content Section */}
            <section className="py-24 sm:py-32 relative">
                {/* Background Text Overlay */}
                <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden opacity-[0.02]">
                    <span className="font-heading text-[25vw] font-black uppercase text-white leading-none tracking-tighter inline-block translate-x-1/4 -translate-y-1/4 italic">
                        {program.title}
                    </span>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
                    <div className="lg:col-span-8">
                        <Reveal>
                            <div className="mb-16">
                                <h2 className="font-heading text-3xl sm:text-4xl text-white uppercase font-black mb-8 flex items-center gap-4">
                                    <span className="w-12 h-1 bg-god-accent"></span> Program Protocol
                                </h2>
                                <p className="text-god-muted text-xl sm:text-2xl leading-relaxed font-light whitespace-pre-line border-l-4 border-god-accent pl-8 italic mb-12">
                                    {longDescription}
                                </p>
                            </div>
                        </Reveal>

                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
                            <StaggerItem>
                                <h3 className="font-heading text-2xl text-white uppercase font-bold mb-8 flex items-center gap-3">
                                    <CheckCircle2 className="text-god-accent h-6 w-6" /> Core Features
                                </h3>
                                <div className="space-y-4">
                                    {features.map((feature: string, i: number) => (
                                        <div key={i} className="flex items-center gap-4 bg-god-card/50 border border-white/5 p-5 hover:border-god-accent/30 transition-all group">
                                            <span className="font-heading text-xl text-god-accent font-black opacity-40 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                                            <span className="text-god-muted uppercase tracking-widest text-sm font-bold">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </StaggerItem>

                            <StaggerItem>
                                <h3 className="font-heading text-2xl text-white uppercase font-bold mb-8 flex items-center gap-3">
                                    <Trophy className="text-god-accent h-6 w-6" /> Execution Outcomes
                                </h3>
                                <div className="space-y-6">
                                    {benefits.map((benefit: string, i: number) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-1 h-8 bg-god-accent/40 mt-1 flex-shrink-0"></div>
                                            <div>
                                                <p className="text-white uppercase tracking-widest text-xs font-black mb-1">PHASE 0{i + 1}</p>
                                                <p className="text-god-muted text-lg font-light leading-snug">{benefit}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </StaggerItem>
                        </StaggerContainer>
                    </div>

                    {/* Sidebar Call to Action */}
                    <div className="lg:col-span-4 lg:pl-10">
                        <Reveal delay={0.4}>
                            <div className="bg-god-card border-2 border-god-accent/20 p-10 sticky top-32">
                                <h3 className="font-heading text-3xl text-white uppercase font-black mb-6 leading-tight">Begin Your <br /> Transformation</h3>
                                <p className="text-god-muted mb-10 text-sm leading-relaxed uppercase tracking-wider font-bold">
                                    Direct access to specialized training systems. No slots guaranteed. Professional assessment required.
                                </p>

                                <div className="space-y-4">
                                    <Link
                                        href={getWhatsAppUrl(data.siteSettings?.whatsappNumber || '919897638649', `Hi, I'm interested in the ${program.title} program and I'm ready to begin my transformation!`)}
                                        target="_blank"
                                        className="w-full relative overflow-hidden group flex justify-center items-center h-14 bg-god-accent text-black text-sm transition-all"
                                    >
                                        <span className="relative z-10 font-heading font-bold uppercase tracking-widest">Book Session</span>
                                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    </Link>
                                    <Link href="/membership" className="w-full flex justify-center items-center h-14 border border-white/20 text-white text-sm hover:bg-white hover:text-black transition-all">
                                        <span className="font-heading font-bold uppercase tracking-widest">View Memberships</span>
                                    </Link>
                                </div>

                                <div className="mt-12 pt-10 border-t border-white/5 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-4 w-4 text-god-accent" />
                                        <span className="text-[10px] text-god-muted uppercase tracking-[0.2em]">Safety Protocol Verified</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-god-muted">
                                        <Zap className="h-4 w-4 text-god-accent" />
                                        <span className="text-[10px] uppercase tracking-[0.2em]">High Intensity Warning</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>
    );
}
