export interface NavItem {
  label: string;
  path: string;
}

export interface Trainer {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  image: string;
  bio: string;
  detailedBio?: string;
  specialties?: string[];
  socials?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface Program {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  targetAudience: string;
  image: string;
  features?: string[];
  benefits?: string[];
  duration?: string;
}

export interface PricingPlan {
  id: number;
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface Transformation {
  id: number;
  beforeImage: string;
  afterImage: string;
  name: string;
  result: string;
}
