import { getGymData } from '@/lib/actions';
import AboutEditor from './AboutEditor';
import PhilosophyEditor from '../home/PhilosophyEditor';

export default async function AdminAboutPage() {
    const data = await getGymData();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">About Page Management</h1>
                    <p className="text-god-muted mt-2">Update your mission, vision, story, and state-of-the-art facilities.</p>
                </div>
            </div>

            <AboutEditor initialData={data.about} />

            <div className="pt-8 border-t border-white/10">
                <PhilosophyEditor initialData={data.homepage.philosophy} />
            </div>
        </div>
    );
}
