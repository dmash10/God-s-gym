'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { requireAuth } from './auth';

const DATA_KEY = 'gym-data';

// Full data interface
interface GymData {
  hero: {
    title: string;
    backgroundImage: string;
  };
  programs: Array<{
    id: number;
    title: string;
    description: string;
    longDescription?: string;
    targetAudience: string;
    image: string;
    duration?: string;
    features?: string[];
    benefits?: string[];
  }>;
  trainers: Array<{
    id: number;
    name: string;
    specialization: string;
    experience: string;
    bio: string;
    detailedBio?: string;
    image: string;
    specialties?: string[];
    socials?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
    };
  }>;
  plans: Array<{
    id: number;
    title: string;
    price: string;
    features: string[];
    isPopular: boolean;
  }>;
  transformations: Array<{
    id: number;
    name: string;
    result: string;
    beforeImage: string;
    afterImage: string;
  }>;
  gallery: string[];
  about: {
    headline: string;
    subheadline: string;
    description: string;
    bulletPoints: string[];
    image: string;
  };
  siteSettings: {
    contactPhone: string;
    address: string;
    instagramUrl: string;
    facebookUrl: string;
    twitterUrl: string;
    whatsappNumber: string;
    hoursWeekday: string;
    hoursSunday: string;
    mapUrl: string;
    announcement: string;
  };
  homepage: {
    cta: {
      title: string;
      subtitle: string;
      buttonText: string;
      buttonLink: string;
      backgroundImage: string;
    };
    philosophy: {
      title: string;
      subtitle?: string;
      description?: string;
      bulletPoints: string[];
      image: string;
    };
  };
  marquee: string[];
}

// Default data structure
const DEFAULT_DATA: GymData = {
  hero: { title: 'BUILD GODLIKE STRENGTH', backgroundImage: '' },
  programs: [],
  trainers: [],
  plans: [],
  transformations: [],
  gallery: [],
  about: {
    headline: 'Who We Are',
    subheadline: 'The Sanctuary of Iron',
    description: 'God\'s Gym was founded on a simple, unbreakable principle: Strength is the ultimate virtue.',
    bulletPoints: ['FOR THE DEDICATED|Athletes, bodybuilders, and anyone ready to suffer for success.', 'NOT FOR THE WEAK|If you\'re looking for air conditioning and smoothies, look elsewhere.'],
    image: ''
  },
  siteSettings: {
    contactPhone: '+91 98765 43210',
    address: 'Near SBI Bank, Kargi Chowk, Dehradun',
    instagramUrl: 'https://www.instagram.com/godsgym_/',
    facebookUrl: '',
    twitterUrl: '',
    whatsappNumber: '919876543210',
    hoursWeekday: '5:00 AM - 10:00 PM',
    hoursSunday: '4:00 PM - 8:00 PM',
    mapUrl: '',
    announcement: ''
  },
  homepage: {
    cta: {
      title: 'STOP WAITING',
      subtitle: 'START DOMINATING',
      buttonText: 'Join the Elite',
      buttonLink: '/membership',
      backgroundImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop'
    },
    philosophy: {
      title: 'PAIN IS WEAKNESS LEAVING THE BODY',
      subtitle: 'The Sanctuary of Iron',
      description: 'At God\'s Gym, we don\'t believe in shortcuts. We believe in the relentless pursuit of excellence through iron and sweat.',
      bulletPoints: [],
      image: ''
    }
  },
  marquee: ["NO EXCUSES", "TRAIN HARD", "STAY CONSISTENT", "GOD'S GYM"]
};

// Helper to read data from Vercel KV
export async function getGymData(): Promise<GymData> {
  try {
    const data = await kv.get<GymData>(DATA_KEY);
    if (!data) {
      // Initialize with default data if not exists
      await kv.set(DATA_KEY, DEFAULT_DATA);
      return DEFAULT_DATA;
    }
    // Merge with defaults to ensure all fields exist
    return {
      ...DEFAULT_DATA,
      ...data,
      about: { ...DEFAULT_DATA.about, ...data.about },
      siteSettings: { ...DEFAULT_DATA.siteSettings, ...data.siteSettings },
      homepage: {
        cta: { ...DEFAULT_DATA.homepage.cta, ...data.homepage?.cta },
        philosophy: { ...DEFAULT_DATA.homepage.philosophy, ...data.homepage?.philosophy }
      }
    };
  } catch (error) {
    console.error("Error reading gym data from KV:", error);
    return DEFAULT_DATA;
  }
}

// Helper to save data to Vercel KV
async function saveGymData(data: GymData) {
  try {
    await kv.set(DATA_KEY, data);
  } catch (error) {
    console.error("Error writing gym data to KV:", error);
    throw new Error("Failed to save data");
  }
}

// ============ HERO ACTIONS ============
export async function updateHero(title: string, backgroundImage: string) {
  await requireAuth();
  const data = await getGymData();

  data.hero = { title, backgroundImage };
  await saveGymData(data);
  revalidatePath('/');
  return { success: true };
}

// ============ HOMEPAGE ACTIONS ============
export async function updateHomepageCTA(cta: GymData['homepage']['cta']) {
  await requireAuth();
  const data = await getGymData();

  data.homepage.cta = cta;
  await saveGymData(data);
  revalidatePath('/');
  return { success: true };
}

export async function updateHomepagePhilosophy(philosophy: GymData['homepage']['philosophy']) {
  await requireAuth();
  const data = await getGymData();

  data.homepage.philosophy = philosophy;
  await saveGymData(data);
  revalidatePath('/');
  return { success: true };
}

// ============ TRAINER ACTIONS ============
export async function addTrainer(trainer: Omit<GymData['trainers'][0], 'id'>) {
  await requireAuth();
  const data = await getGymData();

  const newId = data.trainers.length > 0 ? Math.max(...data.trainers.map(t => t.id)) + 1 : 1;
  data.trainers.push({ ...trainer, id: newId });
  await saveGymData(data);
  revalidatePath('/trainers');
  revalidatePath('/');
  return { success: true, id: newId };
}

export async function updateTrainer(id: number, updatedTrainer: Partial<GymData['trainers'][0]>) {
  await requireAuth();
  const data = await getGymData();

  data.trainers = data.trainers.map(t => (t.id === id ? { ...t, ...updatedTrainer } : t));
  await saveGymData(data);
  revalidatePath('/trainers');
  revalidatePath('/');
  return { success: true };
}

export async function deleteTrainer(id: number) {
  await requireAuth();
  const data = await getGymData();

  data.trainers = data.trainers.filter(t => t.id !== id);
  await saveGymData(data);
  revalidatePath('/trainers');
  revalidatePath('/');
  return { success: true };
}

// ============ PROGRAM ACTIONS ============
export async function addProgram(program: Omit<GymData['programs'][0], 'id'>) {
  await requireAuth();
  const data = await getGymData();

  const newId = data.programs.length > 0 ? Math.max(...data.programs.map(p => p.id)) + 1 : 1;
  data.programs.push({ ...program, id: newId });
  await saveGymData(data);
  revalidatePath('/programs');
  revalidatePath('/');
  return { success: true, id: newId };
}

export async function updateProgram(id: number, updatedProgram: Partial<GymData['programs'][0]>) {
  await requireAuth();
  const data = await getGymData();

  data.programs = data.programs.map(p => (p.id === id ? { ...p, ...updatedProgram } : p));
  await saveGymData(data);
  revalidatePath('/programs');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProgram(id: number) {
  await requireAuth();
  const data = await getGymData();

  data.programs = data.programs.filter(p => p.id !== id);
  await saveGymData(data);
  revalidatePath('/programs');
  revalidatePath('/');
  return { success: true };
}

// ============ PLANS ACTIONS ============
export async function updatePlans(newPlans: GymData['plans']) {
  await requireAuth();
  const data = await getGymData();

  data.plans = newPlans;
  await saveGymData(data);
  revalidatePath('/membership');
  return { success: true };
}

// ============ TRANSFORMATION ACTIONS ============
export async function addTransformation(transformation: Omit<GymData['transformations'][0], 'id'>) {
  await requireAuth();
  const data = await getGymData();

  const newId = data.transformations.length > 0 ? Math.max(...data.transformations.map(t => t.id)) + 1 : 1;
  data.transformations.push({ ...transformation, id: newId });
  await saveGymData(data);
  revalidatePath('/');
  return { success: true, id: newId };
}

export async function updateTransformation(id: number, updated: Partial<GymData['transformations'][0]>) {
  await requireAuth();
  const data = await getGymData();

  data.transformations = data.transformations.map(t => (t.id === id ? { ...t, ...updated } : t));
  await saveGymData(data);
  revalidatePath('/');
  return { success: true };
}

export async function deleteTransformation(id: number) {
  await requireAuth();
  const data = await getGymData();

  data.transformations = data.transformations.filter(t => t.id !== id);
  await saveGymData(data);
  revalidatePath('/');
  return { success: true };
}

// ============ GALLERY ACTIONS ============
export async function updateGallery(images: string[]) {
  await requireAuth();
  const data = await getGymData();

  data.gallery = images;
  await saveGymData(data);
  revalidatePath('/gallery');
  return { success: true };
}

export async function addGalleryImage(imagePath: string) {
  await requireAuth();
  const data = await getGymData();

  data.gallery.push(imagePath);
  await saveGymData(data);
  revalidatePath('/gallery');
  return { success: true };
}

export async function removeGalleryImage(imagePath: string) {
  await requireAuth();
  const data = await getGymData();

  data.gallery = data.gallery.filter(img => img !== imagePath);
  await saveGymData(data);
  revalidatePath('/gallery');
  return { success: true };
}

// ============ ABOUT PAGE ACTIONS ============
export async function updateAbout(about: GymData['about']) {
  await requireAuth();
  const data = await getGymData();

  data.about = about;
  await saveGymData(data);
  revalidatePath('/about');
  return { success: true };
}

// ============ MARQUEE ACTIONS ============
export async function updateMarqueeItems(items: string[]) {
  await requireAuth();
  const data = await getGymData();

  data.marquee = items;
  await saveGymData(data);
  revalidatePath('/');
  return { success: true };
}

// ============ SITE SETTINGS ACTIONS ============
export async function updateSiteSettings(settings: GymData['siteSettings']) {
  await requireAuth();
  const data = await getGymData();

  data.siteSettings = settings;
  await saveGymData(data);
  revalidatePath('/');
  revalidatePath('/contact');
  return { success: true };
}

// ============ BACKUP ACTIONS ============
export async function downloadBackup() {
  await requireAuth();
  const data = await getGymData();

  return JSON.stringify(data, null, 2);
}
