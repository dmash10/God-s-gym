import React from 'react';
import { getGymData } from '@/lib/actions';

const Marquee = async () => {
    const data = await getGymData();
    const items = data.marquee || ["NO EXCUSES", "TRAIN HARD", "STAY CONSISTENT", "GOD'S GYM"];

    return (
        <div className="relative w-full overflow-hidden bg-black py-4 sm:py-6 border-y border-white/5 no-transition -skew-y-1">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-god-red/5 via-god-accent/5 to-god-red/5 animate-pulse"></div>

            <div className="flex animate-marquee whitespace-nowrap relative z-10 w-fit">
                {/* We render the set twice to create the infinite loop effect */}
                {[...Array(2)].map((_, groupIdx) => (
                    <div key={groupIdx} className="flex items-center" aria-hidden={groupIdx > 0}>
                        {items.map((item, i) => (
                            <React.Fragment key={i}>
                                <span className={`mx-6 sm:mx-10 font-heading text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase italic transition-all duration-300 ${i % 3 === 0 ? 'text-white' :
                                    i % 3 === 1 ? 'text-transparent stroke-text' :
                                        'text-god-accent'
                                    } hover:scale-110 hover:text-white cursor-default`}>
                                    {item}
                                </span>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-god-red shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>

            {/* Scanline Effect overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20" style={{ backgroundSize: '100% 2px, 3px 100%' }}></div>
        </div>
    );
};

export default Marquee;
