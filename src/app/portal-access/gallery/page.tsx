import { getGymData } from '@/lib/actions';
import GalleryEditor from './GalleryEditor';

export default async function GalleryPage() {
    const data = await getGymData();

    return <GalleryEditor initialImages={data.gallery} />;
}
