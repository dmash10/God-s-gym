import Link from 'next/link';
import { getGymData } from '@/lib/actions';
import {
    Image as ImageIcon,
    Users,
    Dumbbell,
    CreditCard,
    ArrowRight,
    Trophy,
    Images,
    Info
} from 'lucide-react';

export default async function AdminDashboard() {
    const data = await getGymData();

    const stats = [
        { label: 'Programs', value: data.programs.length, icon: Dumbbell, href: '/portal-access/programs', color: 'text-blue-400' },
        { label: 'Trainers', value: data.trainers.length, icon: Users, href: '/portal-access/trainers', color: 'text-green-400' },
        { label: 'Gallery Images', value: data.gallery.length, icon: Images, href: '/portal-access/gallery', color: 'text-purple-400' },
        { label: 'Membership Plans', value: data.plans.length, icon: CreditCard, href: '/portal-access/membership', color: 'text-yellow-400' },
        { label: 'Transformations', value: data.transformations.length, icon: Trophy, href: '/portal-access/transformations', color: 'text-red-400' },
    ];

    const quickActions = [
        { label: 'Edit Hero Section', href: '/portal-access/hero', icon: ImageIcon },
        { label: 'Manage About Page', href: '/portal-access/about', icon: Info },
        { label: 'Add New Trainer', href: '/portal-access/trainers', icon: Users },
        { label: 'Add Program', href: '/portal-access/programs', icon: Dumbbell },
        { label: 'Upload Gallery Image', href: '/portal-access/gallery', icon: Images },
        { label: 'Add Transformation', href: '/portal-access/transformations', icon: Trophy },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">Dashboard</h1>
                <p className="text-god-muted mt-2">Welcome back! Here's an overview of your website content.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="bg-god-card border border-white/10 rounded-xl p-6 hover:border-god-accent/50 transition-colors group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <stat.icon className={`h-8 w-8 ${stat.color}`} />
                            <span className="text-3xl font-bold text-white">{stat.value}</span>
                        </div>
                        <p className="text-god-muted text-sm font-medium">{stat.label}</p>
                    </Link>
                ))}
            </div>

            {/* Current Content Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Hero Preview */}
                <div className="bg-god-card border border-white/10 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <h3 className="font-heading text-lg font-bold text-white uppercase">Hero Section</h3>
                        <Link href="/portal-access/hero" className="text-god-accent text-sm hover:text-white flex items-center gap-1">
                            Edit <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="relative h-48">
                        <img
                            src={data.hero.backgroundImage || 'https://via.placeholder.com/800x400?text=No+Image'}
                            alt="Hero"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <p className="font-heading text-2xl font-bold text-white uppercase">{data.hero.title}</p>
                        </div>
                    </div>
                </div>

                {/* Recent Trainers */}
                <div className="bg-god-card border border-white/10 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <h3 className="font-heading text-lg font-bold text-white uppercase">Trainers</h3>
                        <Link href="/portal-access/trainers" className="text-god-accent text-sm hover:text-white flex items-center gap-1">
                            Manage <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-4">
                        {data.trainers.slice(0, 3).map((trainer: any) => (
                            <div key={trainer.id} className="text-center">
                                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border border-white/10">
                                    <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-white text-xs font-bold truncate">{trainer.name}</p>
                            </div>
                        ))}
                        {data.trainers.length === 0 && (
                            <p className="col-span-3 text-god-muted text-sm text-center py-4">No trainers added yet</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-god-card border border-white/10 rounded-xl p-6">
                <h3 className="font-heading text-lg font-bold text-white uppercase mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {quickActions.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg hover:bg-god-accent hover:text-black transition-colors text-center group"
                        >
                            <action.icon className="h-6 w-6 text-god-accent group-hover:text-black transition-colors" />
                            <span className="text-xs font-medium text-gray-300 group-hover:text-black">{action.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Announcement Status */}
            {data.siteSettings?.announcement && (
                <div className="mt-6 bg-god-accent/10 border border-god-accent/30 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-god-accent font-bold text-sm uppercase mb-1">Active Announcement</p>
                        <p className="text-white">{data.siteSettings.announcement}</p>
                    </div>
                    <Link href="/portal-access/settings" className="text-god-accent hover:text-white text-sm">
                        Edit →
                    </Link>
                </div>
            )}
        </div>
    );
}
