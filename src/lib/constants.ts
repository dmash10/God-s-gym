import { NavItem, Program, Trainer, PricingPlan, Transformation } from './types';

export const NAV_ITEMS: NavItem[] = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'PROGRAMS', path: '/programs' },
    { label: 'TRAINERS', path: '/trainers' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'MEMBERSHIP', path: '/membership' },
    { label: 'CONTACT', path: '/contact' },
];

export const PROGRAMS: Program[] = [
    {
        id: 1,
        title: 'HYPERTROPHY',
        description: 'Scientifically designed for maximum muscle growth.',
        targetAudience: 'Intermediate to Advanced',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&h=400&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'FAT LOSS',
        description: 'High intensity conditioning to shred fat while preserving muscle.',
        targetAudience: 'Everyone',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c64b59d3?q=80&w=600&h=400&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'STRENGTH',
        description: 'Powerlifting specific training to increase your SBD total.',
        targetAudience: 'Powerlifters',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&h=400&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'PERSONAL TRAINING',
        description: '1-on-1 coaching for tailored results and accountability.',
        targetAudience: 'Beginners & Serious Athletes',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&h=400&auto=format&fit=crop'
    }
];

export const TRAINERS: Trainer[] = [
    {
        id: 1,
        name: 'VIKRAM SINGH',
        specialization: 'Head Coach & Bodybuilding',
        experience: '12 Years Experience',
        bio: '',
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fe?q=80&w=400&h=500&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'RAHUL SHARMA',
        specialization: 'Strength & Conditioning',
        experience: '8 Years Experience',
        bio: '',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=400&h=500&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'ANJALI VERMA',
        specialization: 'Fat Loss & Functional',
        experience: '6 Years Experience',
        bio: '',
        image: 'https://images.unsplash.com/photo-1548690312-e3b507d17a12?q=80&w=400&h=500&auto=format&fit=crop'
    }
];

export const PLANS: PricingPlan[] = [
    {
        id: 1,
        title: 'BEGINNER',
        price: '₹1,500 / mo',
        features: ['General Gym Access', 'Cardio Zone', 'Locker Facility', 'General Guidance'],
        isPopular: false,
    },
    {
        id: 2,
        title: 'STANDARD',
        price: '₹3,500 / 3 mo',
        features: ['All Access', 'Diet Consultation', 'Free T-Shirt', 'Advanced Machinery Access'],
        isPopular: true,
    },
    {
        id: 3,
        title: 'ELITE PT',
        price: '₹8,000 / mo',
        features: ['1-on-1 Personal Training', 'Customized Diet Plan', 'Weekly Progress Check', '24/7 Support'],
        isPopular: false,
    }
];

export const TRANSFORMATIONS: Transformation[] = [
    {
        id: 1,
        name: 'Amit Kumar',
        result: '-15kg in 4 Months',
        beforeImage: 'https://images.unsplash.com/photo-1535743686920-55e2d4d5b3b4?q=80&w=300&h=400&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1491752358353-cb42e484b7c9?q=80&w=300&h=400&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'Sneha Rawat',
        result: '+5kg Muscle Mass',
        beforeImage: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=300&h=400&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=300&h=400&auto=format&fit=crop',
    }
];

export const WHATSAPP_NUMBER = "919876543210"; // Dummy number
export const CONTACT_PHONE = "+91 98765 43210";
export const ADDRESS = "Near SBI Bank, Kargi Chowk, Kanhaiya Vihar, Kargi, Dehradun, Uttarakhand 248121";
export const MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.345!2d78.0!3d30.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE4JzAwLjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin";
export const INSTAGRAM_URL = "https://www.instagram.com/godsgym_/";
