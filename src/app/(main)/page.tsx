import Link from 'next/link';
import Image from 'next/image';
import { Reveal, StaggerContainer } from '@/components/Reveal';
import { ProgramCard } from '@/components/ProgramCard';
import { TrainerCard } from '@/components/TrainerCard';
import Marquee from '@/components/Marquee';
import GoogleReviewStripe from '@/components/GoogleReviewStripe';
import { ArrowRight, ArrowUpRight, Dumbbell, UserCheck, Coffee, Car } from 'lucide-react';
import PromoSection from '@/components/PromoSection';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import { StateOfTheArtFitness } from '@/components/StateOfTheArtFitness';
import { getGymData } from '@/lib/actions';
import { getWhatsAppUrl } from '@/lib/utils';

export default async function Home() {
  const data = await getGymData();
  const { hero, programs, trainers, transformations, about, siteSettings, homepage } = data;
  const cta = homepage?.cta || {
    title: "STOP WAITING",
    subtitle: "START DOMINATING",
    buttonText: "Join the Elite",
    buttonLink: "/membership"
  };
  const philosophy = homepage?.philosophy || {
    title: "PAIN IS WEAKNESS LEAVING THE BODY",
    description: "At God's Gym, we don't believe in shortcuts...",
    bulletPoints: [],
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop"
  };

  // Helper to split hero title safely
  const heroWords = hero.title.split(' ');
  const word1 = heroWords[0] || 'BUILD';
  const word2 = heroWords[1] || 'GODLIKE';
  const word3 = heroWords[2] || 'STRENGTH';

  return (
    <div className="flex flex-col min-h-screen no-transition">

      {/* Announcement Banner */}
      {siteSettings?.announcement && (
        <div className="bg-god-accent text-black py-2 px-4 text-center font-bold text-xs sm:text-sm uppercase tracking-wider">
          {siteSettings.announcement}
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-god-bg/80 via-god-bg/30 to-god-bg z-10 pointer-events-none"></div>

        {/* Background Image - Next.js optimized */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src={hero.backgroundImage}
            alt="Gym Atmosphere"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover object-[70%_center] lg:object-center"
          />
        </div>

        <div className="relative z-20 px-6 sm:px-8 w-full max-w-7xl mx-auto flex flex-col justify-center items-center lg:items-start pt-24 sm:pt-28 pb-12">
          {/* Title Group - Centered on mobile, left-aligned with border on desktop */}
          <div className="lg:border-l-4 border-god-accent lg:pl-8 text-center lg:text-left">
            {/* BUILD GODLIKE - Same line */}
            <Reveal className="h-auto">
              <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-none pb-1">
                <span className="text-white">{word1} </span>
                <span className="text-god-accent">{word2}</span>
              </h1>
            </Reveal>
            {/* STRENGTH - Below */}
            <Reveal delay={0.15} className="h-auto">
              <h1 className="font-heading text-6xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter uppercase leading-none pb-2">
                {word3}
              </h1>
            </Reveal>
          </div>

          {/* Info + CTA - Text left, button right */}
          <div className="mt-10 md:mt-12 lg:mt-14 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 w-full lg:pl-8">
            <Reveal delay={0.4} className="text-center lg:text-left">
              <p className="text-god-muted text-sm sm:text-base lg:text-lg max-w-md font-light leading-relaxed">
                <span className="hidden sm:inline">Dehradun's premier facility for serious strength training. </span>
                Forging godlike physiques through iron, sweat, and science.
              </p>
            </Reveal>

            <Reveal delay={0.6} className="w-full sm:w-auto flex justify-center lg:justify-end">
              <Link
                href="/membership"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-god-accent text-black font-heading font-bold text-xs sm:text-sm tracking-wider uppercase overflow-hidden active:scale-[0.98] transition-all duration-300 shadow-[0_4px_12px_rgba(234,179,8,0.3)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.5)]"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 flex items-center gap-1.5">
                  View Plans <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee />

      {/* --- PROGRAMS (GRID SYSTEM) --- */}
      <section className="py-16 bg-god-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-god-accent text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Our Expertise</span>
                <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4">
                  Training <span className="text-god-accent">Programs</span>
                </h2>
                <p className="text-god-muted text-base sm:text-lg max-w-xl">
                  Forging strength through specialized training protocols. Choose your path to dominance.
                </p>
              </div>
              <Link href="/programs" className="group flex items-center gap-3 text-white font-bold tracking-widest uppercase text-sm">
                View All Programs
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-god-accent group-hover:text-god-accent transition-all duration-300">
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {programs.map((program: any, idx: number) => (
              <Link key={program.id} href={`/programs/${program.id}`}>
                <ProgramCard program={program} index={idx} />
              </Link>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Training Team Section */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-god-accent text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Expert Coaching</span>
                <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4">
                  The <span className="text-god-accent">Elite</span> Team
                </h2>
                <p className="text-god-muted text-base sm:text-lg max-w-xl">
                  Learn from the best. Our trainers are certified experts dedicated to pushing you beyond your perceived limits.
                </p>
              </div>
              <Link href="/trainers" className="group flex items-center gap-3 text-white font-bold tracking-widest uppercase text-sm">
                View All Mentors
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-god-accent group-hover:text-god-accent transition-all duration-300">
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 lg:gap-10">
            {trainers.map((trainer: any, idx: number) => (
              <Link key={trainer.id} href={`/trainers/${trainer.id}`}>
                <TrainerCard trainer={trainer} index={idx} />
              </Link>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* NEW: Horizontal Scroll Section (Facilities) */}
      <HorizontalScrollSection facilities={(homepage as any)?.facilities} />

      {/* --- PHILOSOPHY / ABOUT PREVIEW --- */}
      {homepage?.philosophy && <StateOfTheArtFitness data={homepage.philosophy} />}

      {/* --- TRANSFORMATIONS (PROVEN RESULTS) --- */}
      {
        transformations && transformations.length > 0 && (
          <section className="py-16 sm:py-20 md:py-24 bg-god-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
                <div>
                  <span className="text-god-accent font-bold tracking-widest text-xs sm:text-sm uppercase mb-2 block">Member Transformations</span>
                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tighter">
                    Proven <span className="text-god-red">Results</span>
                  </h2>
                </div>
                <Link href="/transformations" className="flex items-center gap-2 text-white hover:text-god-accent transition-colors font-medium text-sm sm:text-base">
                  View All Results <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {transformations.slice(0, 4).map((item: any, idx: number) => (
                  <Reveal key={item.id} delay={0.15 * idx} width="100%">
                    <div className="group relative bg-god-card/40 backdrop-blur-sm border border-white/5 hover:border-god-accent/30 transition-all duration-500 p-4 sm:p-5">
                      <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6 h-48 sm:h-64 md:h-80">
                        <div className="flex-1 relative overflow-hidden border border-white/5">
                          <img
                            src={item.beforeImage}
                            alt="Before"
                            loading="lazy"
                            className="w-full h-full object-cover lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700"
                          />
                          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/80 backdrop-blur-md border border-white/10 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold text-white uppercase tracking-tighter">BEFORE</div>
                        </div>
                        <div className="flex-1 relative overflow-hidden border border-white/5">
                          <img
                            src={item.afterImage}
                            alt="After"
                            loading="lazy"
                            className="w-full h-full object-cover lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700"
                          />
                          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-god-accent/90 backdrop-blur-sm px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold text-black uppercase tracking-tighter">AFTER</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-end border-t border-white/10 pt-4">
                        <div>
                          <h4 className="font-heading text-xl sm:text-2xl text-white uppercase tracking-wider">{item.name}</h4>
                        </div>
                        <p className="text-god-accent font-heading text-xl sm:text-2xl font-bold uppercase">{item.result}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )
      }

      {/* --- PARALLAX PROMO SECTION --- */}
      <PromoSection data={homepage?.promo} />

      {/* --- GOOGLE REVIEWS STRIPE --- */}
      {(homepage as any)?.googleReviews && <GoogleReviewStripe data={(homepage as any).googleReviews} />}


      {/* --- BIG CTA --- */}
      <section className="py-20 sm:py-36 relative overflow-hidden">
        {/* Background Image - Grayscale */}
        <div className="absolute inset-0">
          <Image
            src={cta.backgroundImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"}
            alt="Gym Atmosphere"
            fill
            quality={60}
            sizes="100vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-10 text-white">
              {cta.title} <span className="text-god-accent">{cta.subtitle}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href={getWhatsAppUrl(siteSettings?.whatsappNumber || '919876543210', `Hi, I'm ready to ${cta.buttonText.toLowerCase()}!`)}
              target="_blank"
              className="inline-flex items-center justify-center gap-3 bg-god-accent text-black px-10 py-4 font-heading font-bold text-base sm:text-lg uppercase tracking-widest hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_8px_30px_rgba(234,179,8,0.4)]"
            >
              {cta.buttonText} <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
