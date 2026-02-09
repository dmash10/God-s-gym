import Link from 'next/link';
import { Metadata } from 'next';
import { Reveal, StaggerContainer } from '@/components/Reveal';
import { ProgramCard } from '@/components/ProgramCard';
import { ArrowUpRight } from 'lucide-react';
import { getGymData } from '@/lib/actions';

export const metadata: Metadata = {
    title: "Training Programs | God's Gym",
    description: "Explore our specialized training protocols. From Hypertrophy to Strength & Conditioning, find the right program for your goals.",
    keywords: ["training programs", "gym protocols", "strength training", "weightlifting", "Dehradun"]
};

export default async function Programs() {
    const data = await getGymData();
    const programs = data.programs || [];

    return (
        <div className="pt-24 sm:pt-32 min-h-screen bg-god-bg text-white no-transition">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
                <div className="mb-12 sm:mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <Reveal>
                            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-4">
                                The <span className="text-god-accent text-glow">Forge</span>
                            </h1>
                            <p className="text-god-muted text-lg sm:text-xl border-l-2 border-god-accent/30 pl-6 italic">
                                Specialized training protocols designed for maximum physical transformation. Choose your path to greatness.
                            </p>
                        </Reveal>
                    </div>
                    <Reveal delay={0.2}>
                        <Link href="/membership" className="inline-flex items-center gap-2 text-god-accent font-bold uppercase tracking-widest text-xs hover:text-white transition-colors group">
                            View Memberships <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </Reveal>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {programs.map((program: any, idx: number) => (
                        <Link key={program.id} href={`/programs/${program.id}`}>
                            <ProgramCard program={program} index={idx} />
                        </Link>
                    ))}
                </StaggerContainer>
            </div>
        </div>
    );
}
