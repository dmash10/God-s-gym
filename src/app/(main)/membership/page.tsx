import fs from 'fs/promises';
import path from 'path';
import MembershipClient from './MembershipClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Memberships | Join God's Gym",
    description: "Choose your path to greatness. Explore our membership tiers, from standard access to elite personal training packages.",
    keywords: ["gym membership", "fitness plans", "personal training cost", "Dehradun gym fees"]
};

async function getData() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'gym-data.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
}

export default async function Membership() {
    const data = await getData();
    return <MembershipClient plans={data.plans} />;
}
