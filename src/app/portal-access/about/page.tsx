import { getGymData } from '@/lib/actions';
import AboutEditor from './AboutEditor';

export default async function AboutPage() {
    const data = await getGymData();

    return <AboutEditor initialData={data.about} />;
}
