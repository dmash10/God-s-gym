import React from 'react';
import { getGymData } from '@/lib/actions';
import { PhilosophyEditor } from '@/components/PhilosophyEditor';

export default async function IronStandardPage() {
    const data = await getGymData();

    return (
        <div className="max-w-6xl mx-auto">
            <PhilosophyEditor initialPhilosophy={data.homepage.philosophy} />
        </div>
    );
}
