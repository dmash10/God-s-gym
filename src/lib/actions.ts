'use server';

import { createClient, supabase } from './supabase';
import { revalidatePath } from 'next/cache';
import { requireAuth } from './auth';

const SITE_SLUG = process.env.SITE_SLUG || 'gods-gym';

// Full data interface
export interface GymData {
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
    email?: string;
    socials?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
    };
    stats?: {
      reshaped?: string;
      tier?: string;
      certified?: string;
      success?: string;
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
    pillars?: Array<{ id: string; title: string; desc: string }>;
    missionHeadline?: string;
    missionDescription?: string;
    visionHeadline?: string;
    visionDescription?: string;
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
    contactEmail: string;
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
    promo?: {
      headline: string;
      subheadline: string;
      accentText: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
    googleReviews?: {
      rating: number;
      totalReviews: number;
      reviews: Array<{
        id: number;
        name: string;
        rating: number;
        timeAgo: string;
        text: string;
        initial: string;
        color: string;
      }>;
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
    image: '',
    pillars: [
      { id: '01', title: 'INTENSITY', desc: 'Every rep counts. No half measures.' },
      { id: '02', title: 'DISCIPLINE', desc: 'The foundation of true greatness.' },
      { id: '03', title: 'EXCELLENCE', desc: 'Winning is a habit, not an act.' },
      { id: '04', title: 'COMMUNITY', desc: 'Stronger as one. Forged in iron.' },
    ],
    missionHeadline: 'BUILDING LEGENDS',
    missionDescription: 'Our mission is to provide the ultimate environment for physical and mental transformation. We don\'t just build muscles; we build character, discipline, and legends.',
    visionHeadline: 'THE PEAK OF PERFORMANCE',
    visionDescription: 'To be the world\'s standard for performance training, where science meets grit, and where every member reaches their absolute genetic potential.'
  },
  siteSettings: {
    contactPhone: '+91 98765 43210',
    address: 'Near SBI Bank, Kargi Chowk, Dehradun',
    instagramUrl: 'https://www.instagram.com/godsgym_/',
    facebookUrl: '',
    twitterUrl: '',
    whatsappNumber: '919897638649',
    hoursWeekday: '5:00 AM - 10:00 PM',
    hoursSunday: '4:00 PM - 8:00 PM',
    mapUrl: '',
    announcement: '',
    contactEmail: 'info@godsgym.com'
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
    },
    promo: {
      headline: "Book your Intro",
      subheadline: "and redefine your limitless potential.",
      accentText: "Session",
      description: "PROMOTION",
      buttonText: "Start Your Journey",
      buttonLink: "/contact"
    }
  },
  marquee: ["NO EXCUSES", "TRAIN HARD", "STAY CONSISTENT", "GOD'S GYM"]
};

// Site ID cache
let cachedSiteId: string | null = null;

async function getSiteId(): Promise<string> {
  if (cachedSiteId) return cachedSiteId;

  const { data, error } = await supabase
    .from('sites')
    .select('id')
    .eq('slug', SITE_SLUG)
    .single() as { data: { id: string } | null; error: any };

  if (error || !data) {
    throw new Error(`Site with slug "${SITE_SLUG}" not found`);
  }

  cachedSiteId = data.id;
  return data.id;
}

// Helper to read data from Supabase
export async function getGymData(): Promise<GymData> {
  try {
    const siteId = await getSiteId();

    const [contentRes, trainersRes, programsRes, plansRes, galleryRes] = await Promise.all([
      (supabase.from('site_content').select('*').eq('site_id', siteId).single() as unknown) as Promise<{ data: any; error: any }>,
      (supabase.from('trainers').select('*').eq('site_id', siteId).order('id') as unknown) as Promise<{ data: any; error: any }>,
      (supabase.from('programs').select('*').eq('site_id', siteId).order('id') as unknown) as Promise<{ data: any; error: any }>,
      (supabase.from('membership_plans').select('*').eq('site_id', siteId).order('id') as unknown) as Promise<{ data: any; error: any }>,
      (supabase.from('gallery_images').select('url').eq('site_id', siteId).order('id') as unknown) as Promise<{ data: any; error: any }>
    ]);

    const content = contentRes.data || {};

    return {
      hero: content.hero || DEFAULT_DATA.hero,
      about: content.about || DEFAULT_DATA.about,
      siteSettings: content.site_settings || DEFAULT_DATA.siteSettings,
      homepage: content.homepage || DEFAULT_DATA.homepage,
      marquee: content.marquee || DEFAULT_DATA.marquee || DEFAULT_DATA.marquee,
      gallery: galleryRes.data?.map((img: { url: string }) => img.url) || [],
      trainers: trainersRes.data || [],
      programs: (programsRes.data || []).map((p: any) => ({
        ...p,
        longDescription: p.long_description,
        targetAudience: p.target_audience
      })),
      plans: (plansRes.data || []).map((p: any) => ({
        ...p,
        title: p.name,
        isPopular: p.is_popular
      })),
      transformations: Array.isArray(content.transformations)
        ? content.transformations
        : (content.transformations && typeof content.transformations === 'object')
          ? Object.values(content.transformations)
          : []
    };
  } catch (error) {
    console.error("Error reading gym data from Supabase:", error);
    return DEFAULT_DATA;
  }
}

// Helper to save site-wide content to Supabase
// Fetches existing content first to properly merge nested JSONB fields
async function saveSiteContent(updates: Partial<any>) {
  try {
    const siteId = await getSiteId();
    const supabaseClient = await createClient();

    // Fetch existing content to merge properly
    const { data: existing } = await supabaseClient
      .from('site_content')
      .select('*')
      .eq('site_id', siteId)
      .single();

    // Deep merge updates with existing content
    const merged: any = { site_id: siteId };
    const fields = ['hero', 'about', 'site_settings', 'homepage', 'stats', 'marquee', 'transformations'];

    for (const field of fields) {
      if (updates[field] !== undefined) {
        if (existing?.[field] && typeof existing[field] === 'object' && typeof updates[field] === 'object' && !Array.isArray(updates[field])) {
          merged[field] = { ...existing[field], ...updates[field] };
        } else {
          merged[field] = updates[field];
        }
      } else if (existing?.[field] !== undefined) {
        merged[field] = existing[field];
      }
    }

    merged.updated_at = new Date().toISOString();

    const { error } = await supabaseClient
      .from('site_content')
      .upsert(merged);

    if (error) throw error;
  } catch (error: any) {
    throw new Error("Failed to save data: " + error.message);
  }
}

// ============ HERO ACTIONS ============
export async function updateHero(title: string, backgroundImage: string) {
  await requireAuth();
  await saveSiteContent({ hero: { title, backgroundImage } });
  revalidatePath('/');
  return { success: true };
}

// ============ HOMEPAGE ACTIONS ============
export async function updateHomepageCTA(cta: GymData['homepage']['cta']) {
  await requireAuth();
  await saveSiteContent({ homepage: { cta } });
  revalidatePath('/');
  return { success: true };
}

export async function updateHomepagePhilosophy(philosophy: GymData['homepage']['philosophy']) {
  await requireAuth();
  await saveSiteContent({ homepage: { philosophy } });
  revalidatePath('/');
  return { success: true };
}

export async function updateHomepagePromo(promo: GymData['homepage']['promo']) {
  await requireAuth();
  await saveSiteContent({ homepage: { promo } });
  revalidatePath('/');
  return { success: true };
}

export async function updateHomepageFacilities(facilities: any[]) {
  await requireAuth();
  await saveSiteContent({ homepage: { facilities } });
  revalidatePath('/');
  return { success: true };
}

export async function updateHomepageQuote(quoteData: { quote: string; author: string; backgroundImage?: string }) {
  await requireAuth();
  await saveSiteContent({ homepage: { quoteSection: quoteData } });
  revalidatePath('/');
  return { success: true };
}

// ============ TRAINER ACTIONS ============
export async function addTrainer(trainer: Omit<GymData['trainers'][0], 'id'>) {
  await requireAuth();
  const siteId = await getSiteId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('trainers')
    .insert([{ ...trainer, site_id: siteId }])
    .select()
    .single();

  if (error) throw error;

  revalidatePath('/trainers');
  revalidatePath('/');
  return { success: true, id: data.id };
}

export async function updateTrainer(id: number, updatedTrainer: Partial<GymData['trainers'][0]>) {
  await requireAuth();
  const siteId = await getSiteId();
  const supabase = await createClient();

  const { error } = await supabase
    .from('trainers')
    .update(updatedTrainer)
    .eq('id', id)
    .eq('site_id', siteId);

  if (error) throw error;

  revalidatePath('/trainers');
  revalidatePath('/');
  return { success: true };
}

export async function deleteTrainer(id: number) {
  await requireAuth();
  const siteId = await getSiteId();
  const supabase = await createClient();

  const { error } = await supabase
    .from('trainers')
    .delete()
    .eq('id', id)
    .eq('site_id', siteId);

  if (error) throw error;

  revalidatePath('/trainers');
  revalidatePath('/');
  return { success: true };
}

// ============ PROGRAM ACTIONS ============
export async function addProgram(program: Omit<GymData['programs'][0], 'id'>) {
  await requireAuth();
  const siteId = await getSiteId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('programs')
    .insert([{
      ...program,
      site_id: siteId,
      long_description: program.longDescription,
      target_audience: program.targetAudience
    }])
    .select()
    .single();

  if (error) throw error;

  revalidatePath('/programs');
  revalidatePath('/');
  return { success: true, id: data.id };
}

export async function updateProgram(id: number, updatedProgram: Partial<GymData['programs'][0]>) {
  await requireAuth();
  const siteId = await getSiteId();
  const supabase = await createClient();

  const dbUpdates: any = { ...updatedProgram };
  if (updatedProgram.longDescription) dbUpdates.long_description = updatedProgram.longDescription;
  if (updatedProgram.targetAudience) dbUpdates.target_audience = updatedProgram.targetAudience;

  const { error } = await supabase
    .from('programs')
    .update(dbUpdates)
    .eq('id', id)
    .eq('site_id', siteId);

  if (error) throw error;

  revalidatePath('/programs');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProgram(id: number) {
  await requireAuth();
  const siteId = await getSiteId();
  const supabase = await createClient();

  const { error } = await supabase
    .from('programs')
    .delete()
    .eq('id', id)
    .eq('site_id', siteId);

  if (error) throw error;

  revalidatePath('/programs');
  revalidatePath('/');
  return { success: true };
}

// ============ PLANS ACTIONS ============
export async function updatePlans(newPlans: GymData['plans']) {
  await requireAuth();
  const siteId = await getSiteId();
  const supabase = await createClient();

  // Delete existing and re-insert for simplicity in this case
  await supabase.from('membership_plans').delete().eq('site_id', siteId);

  const { error } = await supabase.from('membership_plans').insert(
    newPlans.map(p => ({
      site_id: siteId,
      name: p.title,
      price: p.price,
      features: p.features,
      is_popular: p.isPopular
    }))
  );

  if (error) throw error;

  revalidatePath('/membership');
  return { success: true };
}

// ============ TRANSFORMATION ACTIONS ============
export async function addTransformation(transformation: Omit<GymData['transformations'][0], 'id'>) {
  await requireAuth();
  const data = await getGymData();

  const newId = data.transformations.length > 0 ? Math.max(...data.transformations.map((t: any) => t.id)) + 1 : 1;
  const newTransformations = [...data.transformations, { ...transformation, id: newId }];
  await saveSiteContent({ transformations: newTransformations });
  revalidatePath('/');
  return { success: true, id: newId };
}

export async function updateTransformation(id: number, updated: Partial<GymData['transformations'][0]>) {
  await requireAuth();
  const data = await getGymData();

  const newTransformations = data.transformations.map((t: any) => (t.id === id ? { ...t, ...updated } : t));
  await saveSiteContent({ transformations: newTransformations });
  revalidatePath('/');
  return { success: true };
}

export async function deleteTransformation(id: number) {
  await requireAuth();
  const data = await getGymData();

  const newTransformations = data.transformations.filter((t: any) => t.id !== id);
  await saveSiteContent({ transformations: newTransformations });
  revalidatePath('/');
  return { success: true };
}

// ============ GALLERY ACTIONS ============
export async function updateGallery(images: string[]) {
  await requireAuth();
  const siteId = await getSiteId();
  const supabase = await createClient();

  await supabase.from('gallery_images').delete().eq('site_id', siteId);
  const { error } = await supabase.from('gallery_images').insert(
    images.map(url => ({ site_id: siteId, url }))
  );

  if (error) throw error;

  revalidatePath('/gallery');
  return { success: true };
}

export async function addGalleryImage(imagePath: string) {
  await requireAuth();
  const siteId = await getSiteId();
  const supabase = await createClient();

  const { error } = await supabase
    .from('gallery_images')
    .insert([{ site_id: siteId, url: imagePath }]);

  if (error) throw error;

  revalidatePath('/gallery');
  return { success: true };
}

export async function removeGalleryImage(imagePath: string) {
  await requireAuth();
  const siteId = await getSiteId();
  const supabase = await createClient();

  const { error } = await supabase
    .from('gallery_images')
    .delete()
    .eq('url', imagePath)
    .eq('site_id', siteId);

  if (error) throw error;

  revalidatePath('/gallery');
  return { success: true };
}

// ============ ABOUT PAGE ACTIONS ============
export async function updateAbout(about: GymData['about']) {
  await requireAuth();
  await saveSiteContent({ about });
  revalidatePath('/about');
  return { success: true };
}

// ============ MARQUEE ACTIONS ============
export async function updateMarqueeItems(marquee: string[]) {
  await requireAuth();
  await saveSiteContent({ marquee });
  revalidatePath('/');
  return { success: true };
}

// ============ SITE SETTINGS ACTIONS ============
export async function updateSiteSettings(siteSettings: GymData['siteSettings']) {
  await requireAuth();
  await saveSiteContent({ site_settings: siteSettings });
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
