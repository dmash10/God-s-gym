import { Reveal } from '@/components/Reveal';
import { Phone, MapPin, MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';
import { getGymData } from '@/lib/actions';

export default async function Contact() {
    const data = await getGymData();
    const settings = data.siteSettings || {
        contactPhone: '+91 98765 43210',
        address: 'Near SBI Bank, Kargi Chowk, Dehradun',
        whatsappNumber: '919897638649',
        mapUrl: ''
    };

    return (
        <div className="pt-24 sm:pt-32 min-h-screen bg-god-bg text-white no-transition">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
                <div className="mb-12 sm:mb-16 md:mb-20 text-center md:text-left">
                    <Reveal>
                        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-3 sm:mb-4">
                            Get In <span className="text-god-accent">Touch</span>
                        </h1>
                        <p className="text-god-muted text-lg sm:text-xl max-w-2xl mx-auto md:mx-0">
                            Ready to begin your transformation? The first step starts here.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16">
                    {/* Contact Info */}
                    <div>
                        <Reveal>
                            <div className="space-y-8 sm:space-y-10 md:space-y-12">
                                <a href={`tel:${settings.contactPhone.replace(/\s/g, '')}`} className="flex gap-4 sm:gap-6 group touch-manipulation">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-god-card border border-white/5 flex items-center justify-center group-hover:bg-god-accent group-hover:text-black transition-all duration-300 flex-shrink-0 rounded-lg">
                                        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase mb-1 sm:mb-2 italic">Call Us</h3>
                                        <p className="text-god-muted text-base sm:text-lg">{settings.contactPhone}</p>
                                    </div>
                                </a>

                                <div className="flex gap-4 sm:gap-6 group">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-god-card border border-white/5 flex items-center justify-center group-hover:bg-god-accent group-hover:text-black transition-all duration-300 flex-shrink-0 rounded-lg">
                                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase mb-1 sm:mb-2 italic">Location</h3>
                                        <p className="text-god-muted text-base sm:text-lg max-w-sm">{settings.address}</p>
                                    </div>
                                </div>

                                <a
                                    href={`https://wa.me/${settings.whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-4 sm:gap-6 group touch-manipulation"
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-god-card border border-white/5 flex items-center justify-center group-hover:bg-god-accent group-hover:text-black transition-all duration-300 flex-shrink-0 rounded-lg">
                                        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase mb-1 sm:mb-2 italic">WhatsApp</h3>
                                        <span className="text-god-accent text-base sm:text-lg hover:text-white transition-colors">
                                            Chat with us now
                                        </span>
                                    </div>
                                </a>
                            </div>

                            {settings.mapUrl && (
                                <div className="mt-10 sm:mt-12 md:mt-16 h-60 sm:h-72 md:h-80 w-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 rounded-lg overflow-hidden">
                                    <iframe
                                        src={settings.mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        title="Gym Location"
                                    />
                                </div>
                            )}
                        </Reveal>
                    </div>

                    {/* Contact Form */}
                    <Reveal delay={0.2}>
                        <ContactForm />
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
