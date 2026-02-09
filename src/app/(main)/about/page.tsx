import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us | The God's Gym Culture",
    description: "Strength meets iron. Learn about our philosophy, our mission, and the legacy of performance training in Dehradun.",
    keywords: ["about gym", "gym mission", "fitness philosophy", "Dehradun strength history"]
};

async function getData() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'gym-data.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
}

export default async function About() {
    const data = await getData();
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:items-center">
                    <div className="space-y-6 sm:space-y-8">
                        <Reveal>
                            <h2 className="font-heading text-2xl sm:text-3xl text-god-accent uppercase tracking-wide leading-tight">
                                {about.subheadline}
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="space-y-4 sm:space-y-6 text-lg sm:text-xl text-gray-300 leading-relaxed font-light max-w-2xl">
                                {paragraphs.map((p: string, i: number) => {
                                    // Handle bold text in the middle of a paragraph if present
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

                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12 pt-6 sm:pt-8">
                            {about.bulletPoints.map((point: string, i: number) => {
                                const [title, desc] = point.split('|');
                                const borderColor = i === 0 ? 'border-god-accent' : 'border-red-600';
                                return (
                                    <StaggerItem key={i} className={`border-l-4 ${borderColor} pl-4 sm:pl-6`}>
                                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 uppercase italic">{title}</h3>
                                        <p className="text-god-muted text-sm sm:text-base leading-snug">{desc}</p>
                                    </StaggerItem>
                                );
                            })}
                        </StaggerContainer>
                    </div>

                    <div className="relative order-first lg:order-last h-full flex items-center justify-center py-4 lg:py-8">
                        <Reveal width="100%" delay={0.4} className="w-full">
                            <div className="relative z-10 w-full aspect-square sm:aspect-video lg:aspect-[4/5] xl:aspect-square border border-white/10 bg-god-card p-1.5 sm:p-2 group overflow-hidden shadow-2xl">
                                <Image
                                    src={about.image}
                                    fill
                                    className="object-cover filter lg:grayscale contrast-125 lg:group-hover:grayscale-0 transition-all duration-700 scale-105 lg:group-hover:scale-100"
                                    alt="Gym Culture"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
