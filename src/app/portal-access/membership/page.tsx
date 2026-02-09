import { getGymData } from '@/lib/actions';
import MembershipEditor from './MembershipEditor';

export default async function MembershipPage() {
    const data = await getGymData();

    return <MembershipEditor initialPlans={data.plans} />;
}
