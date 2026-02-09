import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Gallery | God's Gym Arena",
    description: "Step inside the arena. A visual journey through our state-of-the-art facility and the culture of strength.",
    keywords: ["gym gallery", "fitness facility", "Dehradun gym", "training arena"]
};

async function getData() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'gym-data.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
}

export default async function Gallery() {
    const data = await getData();
    const images: string[] = data.gallery || [];

    return (
        <div className="pt-24 sm:pt-32 min-h-screen bg-god-bg text-white no-transition">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
                <div className="mb-12 sm:mb-16 md:mb-20 text-center md:text-left">
                    <Reveal>
                        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-3 sm:mb-4">
                            The <span className="text-god-accent text-glow">Arena</span>
                        </h1>
                        <p className="text-god-muted text-lg sm:text-xl max-w-2xl mx-auto md:mx-0">
                            Where strength meets iron. A glimpse into our facility.
                        </p>
                    </Reveal>
                </div>

                {images.length > 0 ? (
                    <StaggerContainer className="columns-2 md:columns-2 lg:columns-3 gap-4 space-y-4">
                        {images.map((img, i) => (
                            <StaggerItem key={i} className="break-inside-avoid">
                                <div className="group relative overflow-hidden glass-card hover:border-god-accent/30 transition-all duration-500 aspect-auto">
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            src={img}
                                            alt={`Gallery ${i + 1}`}
                                            width={600}
                                            height={800}
                                            className="w-full h-auto lg:grayscale contrast-125 lg:group-hover:grayscale-0 lg:group-hover:scale-110 transition-all duration-700 relative z-10"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-god-accent/10 opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none z-20"></div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                ) : (
                    <div className="text-center py-16 sm:py-20 text-god-muted">
                        <p className="text-lg sm:text-xl">Gallery images coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
}
