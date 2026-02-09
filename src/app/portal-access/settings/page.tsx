import { getGymData } from '@/lib/actions';
import SettingsEditor from './SettingsEditor';

export default async function SettingsPage() {
    const data = await getGymData();

    return <SettingsEditor initialData={data.siteSettings} />;
}
