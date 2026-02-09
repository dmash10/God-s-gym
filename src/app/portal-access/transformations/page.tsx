import { getGymData } from '@/lib/actions';
import TransformationsEditor from './TransformationsEditor';

export default async function TransformationsPage() {
    const data = await getGymData();

    return <TransformationsEditor initialData={data.transformations} />;
}
