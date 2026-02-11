import { getGymData } from '@/lib/actions';
import CTAEditor from './CTAEditor';
import HeroEditor from '../hero/HeroEditor';
import PhilosophyEditor from './PhilosophyEditor';
import FacilityEditor from './FacilityEditor';
import MarqueeEditor from './MarqueeEditor';
import PromoEditor from './PromoEditor';
import TransformationEditor from './TransformationEditor';
import ReviewsEditor from './ReviewsEditor';

export default async function HomePage() {
    const data = await getGymData();

    return (
        <div className="max-w-7xl mx-auto pb-24 px-4">
            <div className="mb-12 border-l-4 border-god-accent pl-6">
                <h1 className="font-heading text-5xl font-bold text-white uppercase tracking-tighter">Home Page Management</h1>
                <p className="text-god-muted mt-2 max-w-lg">
                    Reorder and refine the core visual elements of your storefront to match the primary user journey.
                </p>
            </div>

            <div className="space-y-4">
                {/* 1. Hero */}
                <HeroEditor initialData={data.hero} />

                {/* 2. Marquee */}
                <MarqueeEditor initialData={data.marquee} />

                {/* 3. Facilities */}
                <FacilityEditor initialData={(data.homepage as any)?.facilities} />

                {/* 4. Philosophy (State of the Art) */}
                <PhilosophyEditor initialData={data.homepage?.philosophy} />

                {/* 5. Promo Section */}
                <PromoEditor initialData={(data.homepage as any)?.promo} />

                {/* 6. Transformations */}
                <TransformationEditor initialData={data.transformations} />

                {/* 7. Reviews */}
                <ReviewsEditor initialData={(data.homepage as any)?.googleReviews} />

                {/* 8. Final CTA */}
                <CTAEditor initialData={data.homepage?.cta} />
            </div>
        </div>
    );
}
