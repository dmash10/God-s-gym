import React from 'react';
import { getGymData } from '@/lib/actions';
import { MarqueeEditor } from '@/components/MarqueeEditor';

export default async function MarqueePage() {
    const data = await getGymData();

    return (
        <div className="max-w-4xl mx-auto">
            <MarqueeEditor initialItems={data.marquee || []} />
        </div>
    );
}
