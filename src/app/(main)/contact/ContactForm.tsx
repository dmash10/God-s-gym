'use client';

import { Send } from 'lucide-react';

export default function ContactForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent! Our team will contact you soon.");
    };

    return (
        <div className="bg-god-card p-8 md:p-12 border border-white/5 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-god-accent"></div>
            <h2 className="font-heading text-4xl font-bold uppercase mb-8 italic">Send A Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-god-muted">Full Name</label>
                        <input type="text" required className="w-full bg-black border border-white/10 px-4 py-3 focus:border-god-accent focus:outline-none transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-god-muted">Phone Number</label>
                        <input type="tel" required className="w-full bg-black border border-white/10 px-4 py-3 focus:border-god-accent focus:outline-none transition-colors" placeholder="+91 XXXX XXXX" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-god-muted">Subject</label>
                    <select className="w-full bg-black border border-white/10 px-4 py-3 focus:border-god-accent focus:outline-none transition-colors uppercase text-sm font-bold">
                        <option>General Inquiry</option>
                        <option>Membership Plans</option>
                        <option>Personal Training</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-god-muted">Message</label>
                    <textarea required rows={4} className="w-full bg-black border border-white/10 px-4 py-3 focus:border-god-accent focus:outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-god-accent text-black font-heading font-bold text-xl uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 group">
                    Submit <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </form>
        </div>
    );
}
