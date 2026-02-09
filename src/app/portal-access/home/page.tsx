import { getGymData } from '@/lib/actions';
import CTAEditor from './CTAEditor';
import HeroEditor from '../hero/HeroEditor';
import PhilosophyEditor from './PhilosophyEditor';

export default async function HomePage() {
    const data = await getGymData();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="font-heading text-5xl font-bold text-white uppercase tracking-tighter">Home Page Management</h1>
                <p className="text-god-muted mt-2">Control the core visual experience of your storefront.</p>
            </div>

            <HeroEditor initialData={data.hero} />
            <PhilosophyEditor initialData={data.homepage.philosophy} />
            <CTAEditor initialData={data.homepage.cta} />
        </div>
    );
}
