import MembershipClient from './MembershipClient';
import { Metadata } from 'next';
import { getGymData } from '@/lib/actions';

export const metadata: Metadata = {
    title: "Memberships | Join God's Gym",
    description: "Choose your path to greatness. Explore our membership tiers, from standard access to elite personal training packages.",
    keywords: ["gym membership", "fitness plans", "personal training cost", "Dehradun gym fees"]
};

export default async function Membership() {
    const data = await getGymData();
    return <MembershipClient plans={data.plans} />;
}
