import { Reveal, StaggerContainer } from '@/components/Reveal';
import Link from 'next/link';
import { Metadata } from 'next';
import { getGymData } from '@/lib/actions';
import { getWhatsAppUrl } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: "Proven Results | God's Gym Arena",
    description: "Real transformations. Real people. See the before & after results of our members who trained at God's Gym, Dehradun.",
    keywords: ["gym transformations", "before after", "fitness results", "Dehradun gym", "body transformation"]
};

export default async function TransformationsPage() {
    const data = await getGymData();
    const transformations = data.transformations || [];

    return (
        <div className="pt-24 sm:pt-32 min-h-screen bg-god-bg text-white no-transition">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">

                {/* Page Header */}
                <div className="mb-12 sm:mb-16 md:mb-20 text-center md:text-left">
                    <Reveal>
                        <span className="text-god-accent font-bold tracking-[0.3em] text-xs sm:text-sm uppercase mb-3 block">Member Transformations</span>
                        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-3 sm:mb-4">
                            Proven <span className="text-god-red text-glow">Results</span>
                        </h1>
                        <p className="text-god-muted text-lg sm:text-xl max-w-2xl mx-auto md:mx-0">
                            Real transformations from real members. No shortcuts. Just iron, sweat, and relentless dedication.
                        </p>
                    </Reveal>
                </div>

                {/* Transformations Grid */}
                {transformations.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {transformations.map((item: any, idx: number) => (
                            <Reveal key={item.id} delay={0.1 * idx} width="100%">
                                <div className="group relative bg-god-card/40 backdrop-blur-sm border border-white/5 hover:border-god-accent/30 transition-all duration-500 p-4 sm:p-5">
                                    <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6 h-56 sm:h-72 md:h-96">
                                        {/* Before Image */}
                                        <div className="flex-1 relative overflow-hidden border border-white/5">
                                            {item.beforeImage ? (
                                                <img
                                                    src={item.beforeImage}
                                                    alt={`${item.name} - Before`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 text-sm">No Image</div>
                                            )}
                                            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/80 backdrop-blur-md border border-white/10 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold text-white uppercase tracking-tighter">BEFORE</div>
                                        </div>
                                        {/* After Image */}
                                        <div className="flex-1 relative overflow-hidden border border-white/5">
                                            {item.afterImage ? (
                                                <img
                                                    src={item.afterImage}
                                                    alt={`${item.name} - After`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 text-sm">No Image</div>
                                            )}
                                            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-god-accent/90 backdrop-blur-sm px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold text-black uppercase tracking-tighter">AFTER</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                        <div>
                                            <h3 className="font-heading text-xl sm:text-2xl text-white uppercase tracking-wider">{item.name}</h3>
                                        </div>
                                        <p className="text-god-accent font-heading text-xl sm:text-2xl font-bold uppercase">{item.result}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </StaggerContainer>
                ) : (
                    <div className="text-center py-16 sm:py-20 text-god-muted">
                        <p className="text-lg sm:text-xl">Transformation stories coming soon</p>
                        <p className="text-sm mt-2 text-white/30">Our members are currently forging their results.</p>
                    </div>
                )}

                {/* Bottom CTA */}
                {transformations.length > 0 && (
                    <Reveal>
                        <div className="mt-16 sm:mt-20 text-center">
                            <p className="text-god-muted text-lg mb-6">Ready to write your own transformation story?</p>
                            <Link
                                href={getWhatsAppUrl(data.siteSettings?.whatsappNumber || '919897638649', "Hi, I saw your transformation results and I'm interested in starting my own training journey!")}
                                target="_blank"
                                className="inline-flex items-center justify-center gap-3 bg-god-accent text-black px-8 py-3.5 font-heading font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_6px_20px_rgba(234,179,8,0.3)]"
                            >
                                Start Your Journey <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </Reveal>
                )}
            </div>
        </div>
    );
}
