import { getGymData } from '@/lib/actions';
import ProgramsEditor from './ProgramsEditor';

export default async function ProgramsPage() {
    const data = await getGymData();

    return <ProgramsEditor initialPrograms={data.programs} />;
}
