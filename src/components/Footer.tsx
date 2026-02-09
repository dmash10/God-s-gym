'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
    settings?: {
        contactPhone: string;
        address: string;
        instagramUrl: string;
        facebookUrl: string;
        whatsappUrl?: string;
        hoursWeekday: string;
        hoursSunday: string;
    };
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
    const pathname = usePathname();

    // Hide footer on admin routes
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    // Default values if settings not provided
    const phone = settings?.contactPhone || '+91 98765 43210';
    const address = settings?.address || 'Near SBI Bank, Kargi Chowk, Dehradun';
    const instagram = settings?.instagramUrl || 'https://www.instagram.com/godsgym_/';
    const facebook = settings?.facebookUrl || '';
    const twitter = (settings as any)?.twitterUrl || '';
    const whatsapp = settings?.whatsappUrl || `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
    const hoursWeekday = settings?.hoursWeekday || '5:00 AM - 10:00 PM';
    const hoursSunday = settings?.hoursSunday || '4:00 PM - 8:00 PM';

    // Brand Icons
    const InstagramIcon = () => (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    );

    const TwitterIcon = () => (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );

    const FacebookIcon = () => (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );

    const WhatsAppIcon = () => (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.551 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );

    return (
        <footer className="bg-black py-10 sm:py-12 border-t border-white/10 no-transition">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-10 md:gap-8">

                    {/* Zone 1: Branding - Centered on mobile */}
                    <div className="text-center md:text-left space-y-4">
                        <h3 className="font-heading text-3xl sm:text-4xl md:text-3xl font-bold text-white uppercase tracking-tighter">
                            GOD'S <span className="text-god-accent">GYM</span>
                        </h3>
                        <p className="text-white/50 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
                            Dehradun's premier destination for serious strength and performance training. Iron culture since day one.
                        </p>
                    </div>

                    {/* Zone 2: Info Grid - 2 columns on mobile */}
                    <div className="grid grid-cols-2 gap-6 pt-4 md:pt-0 border-y border-white/5 md:border-none py-8 md:py-0">
                        {/* Hours Sub-column */}
                        <div className="space-y-3">
                            <h4 className="font-heading text-xs font-bold text-white/40 uppercase tracking-widest">HOURS</h4>
                            <div className="text-white/70 text-sm space-y-1.5 font-medium leading-tight">
                                <p className="flex flex-col">
                                    <span className="text-[10px] text-white/30">MON-SAT</span>
                                    {hoursWeekday}
                                </p>
                                <p className="flex flex-col">
                                    <span className="text-[10px] text-white/30">SUN</span>
                                    {hoursSunday}
                                </p>
                            </div>
                        </div>

                        {/* Contact Sub-column */}
                        <div className="space-y-3 pl-4 border-l border-white/5 md:border-none md:pl-0">
                            <h4 className="font-heading text-xs font-bold text-white/40 uppercase tracking-widest">CONNECT</h4>
                            <div className="flex flex-col space-y-1.5">
                                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-white/80 hover:text-god-accent transition-colors py-1 flex items-center gap-2 group">
                                    <Phone className="h-4 w-4 text-god-accent/50 group-hover:text-god-accent" />
                                    <span className="text-sm border-b border-transparent group-hover:border-god-accent/30">{phone}</span>
                                </a>
                                <div className="flex items-start gap-2 pt-1">
                                    <MapPin className="h-4 w-4 text-god-accent/50 mt-0.5 flex-shrink-0" />
                                    <span className="text-[11px] sm:text-xs text-white/50 leading-snug">{address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Zone 3: Social & Badge - Right-aligned on desktop, centered on mobile */}
                    <div className="flex flex-col items-center md:items-end justify-center md:justify-start gap-6">
                        <div className="flex items-center gap-5">
                            {whatsapp && (
                                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#25D366] md:text-white/40 md:hover:text-[#25D366] transition-all hover:scale-110 active:scale-95 duration-300" aria-label="WhatsApp">
                                    <WhatsAppIcon />
                                </a>
                            )}
                            {instagram && (
                                <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-[#E4405F] md:text-white/40 md:hover:text-[#E4405F] transition-all hover:scale-110 active:scale-95 duration-300" aria-label="Instagram">
                                    <InstagramIcon />
                                </a>
                            )}
                            {facebook && (
                                <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-[#1877F2] md:text-white/40 md:hover:text-[#1877F2] transition-all hover:scale-110 active:scale-95 duration-300" aria-label="Facebook">
                                    <FacebookIcon />
                                </a>
                            )}
                            {twitter && (
                                <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-white md:text-white/40 md:hover:text-white transition-all hover:scale-110 active:scale-95 duration-300" aria-label="X (Twitter)">
                                    <TwitterIcon />
                                </a>
                            )}
                        </div>

                        {/* Mini Google Badge-style tag */}
                        <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 select-none group hover:bg-white/10 transition-colors">
                            <span className="text-[10px] text-white/30 uppercase tracking-tighter">Verified by</span>
                            <span className="text-xs font-bold text-white/80">Google Business</span>
                        </div>
                    </div>

                </div>
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 text-center text-gray-600 text-[10px] sm:text-xs">
                    &copy; {new Date().getFullYear()} GOD'S GYM. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

