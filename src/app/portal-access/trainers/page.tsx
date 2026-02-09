import { getGymData } from '@/lib/actions';
import TrainersEditor from './TrainersEditor';

export default async function TrainersPage() {
    const data = await getGymData();

    return <TrainersEditor initialTrainers={data.trainers} />;
}
