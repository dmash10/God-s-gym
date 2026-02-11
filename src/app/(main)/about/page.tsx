import Image from 'next/image';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';
import { Target, Compass } from 'lucide-react';
import { StateOfTheArtFitness } from '@/components/StateOfTheArtFitness';
import { Metadata } from 'next';
import { getGymData } from '@/lib/actions';

export const metadata: Metadata = {
    title: "About Us | The God's Gym Culture",
    description: "Strength meets iron. Learn about our philosophy, our mission, and the legacy of performance training in Dehradun.",
    keywords: ["about gym", "gym mission", "fitness philosophy", "Dehradun strength history"]
};

export default async function About() {
    const data = await getGymData();
    const about = data.about;

    // Split description by newlines for paragraphs
    const paragraphs = about.description.split('\n\n');

    return (
        <div className="pt-20 sm:pt-24 min-h-screen bg-god-bg text-white no-transition">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
                <Reveal>
                    <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter">
                        {about.headline.split(' ').map((word: string, i: number, arr: string[]) => (
                            <span key={i} className={i >= arr.length - 1 ? 'text-god-accent' : 'text-white'}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                </Reveal>
                <div className="h-0.5 w-full bg-white/10 mt-6 sm:mt-8"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 sm:pb-32">
                {/* Main Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:items-center mb-24 sm:mb-32">
                    <div className="space-y-6 sm:space-y-10">
                        <Reveal>
                            <div className="inline-block px-3 py-1 bg-god-accent/10 border border-god-accent/20 rounded-full mb-4">
                                <span className="text-[10px] font-bold text-god-accent uppercase tracking-[0.3em]">Our Story</span>
                            </div>
                            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[0.9] italic">
                                {about.subheadline}
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="space-y-6 text-lg sm:text-xl text-god-muted leading-relaxed font-light max-w-2xl">
                                {paragraphs.map((p: string, i: number) => {
                                    const parts = p.split(/(\*\*.*?\*\*)/g);
                                    return (
                                        <p key={i}>
                                            {parts.map((part, j) =>
                                                part.startsWith('**') && part.endsWith('**')
                                                    ? <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>
                                                    : part
                                            )}
                                        </p>
                                    );
                                })}
                            </div>
                        </Reveal>

                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 pt-6 sm:pt-8">
                            {about.bulletPoints.map((point: string, i: number) => {
                                const [title, desc] = point.split('|');
                                const borderColor = i === 0 ? 'border-god-accent' : 'border-red-600';
                                return (
                                    <StaggerItem key={i} className={`border-l-4 ${borderColor} pl-6 group hover:bg-white/5 p-4 transition-colors rounded-r-xl`}>
                                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 uppercase italic group-hover:text-god-accent transition-colors">{title}</h3>
                                        <p className="text-god-muted text-sm sm:text-base leading-snug">{desc}</p>
                                    </StaggerItem>
                                );
                            })}
                        </StaggerContainer>
                    </div>

                    <div className="relative order-first lg:order-last">
                        <Reveal width="100%" delay={0.4} className="w-full">
                            <div className="relative z-10 w-full aspect-[3/2] p-2 bg-god-card border border-white/10 group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-god-accent/40 z-20 group-hover:scale-110 transition-transform"></div>
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-god-accent/40 z-20 group-hover:scale-110 transition-transform"></div>

                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={about.image}
                                        fill
                                        className="object-cover filter grayscale-0 sm:grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                        alt="Gym Culture"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Core Pillars / Values Section - Technical Elite Look */}
                <div className="mt-20 sm:mt-32">
                    <Reveal>
                        <div className="text-center mb-16 sm:mb-24">
                            <h2 className="font-heading text-4xl sm:text-6xl font-black text-white uppercase italic tracking-tighter">
                                THE <span className="text-god-accent">PILLARS</span>
                            </h2>
                            <div className="w-24 h-1 bg-god-accent mx-auto mt-4"></div>
                        </div>
                    </Reveal>

                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        {(about.pillars || [
                            { id: '01', title: 'INTENSITY', desc: 'Every rep counts. No half measures.' },
                            { id: '02', title: 'DISCIPLINE', desc: 'The foundation of true greatness.' },
                            { id: '03', title: 'EXCELLENCE', desc: 'Winning is a habit, not an act.' },
                            { id: '04', title: 'COMMUNITY', desc: 'Stronger as one. Forged in iron.' },
                        ]).map((pillar, i) => (
                            <StaggerItem key={i} className="bg-god-card/30 border border-white/5 p-6 sm:p-8 rounded-2xl hover:border-god-accent/30 hover:bg-god-card/50 transition-all duration-500 group relative overflow-hidden">
                                <div className="text-god-accent/20 font-heading text-4xl sm:text-5xl font-black absolute top-4 right-6 group-hover:text-god-accent/40 transition-colors">
                                    {pillar.id}
                                </div>
                                <h4 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3 uppercase italic relative z-10">{pillar.title}</h4>
                                <p className="text-god-muted text-xs sm:text-sm leading-snug relative z-10">{pillar.desc}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </div>

            {/* State of the Art Fitness Section */}
            {data.homepage?.philosophy && (
                <div className="border-t border-white/5">
                    <StateOfTheArtFitness
                        data={data.homepage.philosophy as any}
                        showCTA={false}
                    />
                </div>
            )}
        </div>
    );
}
