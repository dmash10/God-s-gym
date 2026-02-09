'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Dumbbell,
    CreditCard,
    ImageIcon,
    Settings,
    Trophy,
    Images,
    LogOut,
    Home,
    Info,
    Menu,
    X,
    Type,
    LayoutGrid,
    Sword
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const sidebarLinks = [
    { label: 'Dashboard', href: '/portal-access', icon: LayoutDashboard },
    { label: 'Home Page', href: '/portal-access/home', icon: Home },
    { label: 'Iron Standard', href: '/portal-access/iron-standard', icon: Sword },
    { label: 'Programs', href: '/portal-access/programs', icon: LayoutGrid },
    { label: 'Trainers', href: '/portal-access/trainers', icon: Users },
    { label: 'Transformations', href: '/portal-access/transformations', icon: Dumbbell },
    { label: 'About Us', href: '/portal-access/about', icon: Info },
    { label: 'Marquee', href: '/portal-access/marquee', icon: Type },
    { label: 'Site Settings', href: '/portal-access/settings', icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/portal-access/login');
            router.refresh();
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const isLoginPage = pathname?.endsWith('/login');

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-god-bg flex items-center justify-center">
                {children}
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-god-bg flex-col lg:flex-row overflow-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden h-16 bg-god-card border-b border-white/10 flex items-center justify-between px-4 sticky top-0 z-50">
                <Link href="/portal-access" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-god-accent flex items-center justify-center">
                        <Dumbbell className="h-5 w-5 text-black" />
                    </div>
                    <span className="font-heading font-bold text-white uppercase tracking-tight">Admin</span>
                </Link>
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-white hover:bg-white/5 rounded-lg"
                >
                    {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </header>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-64 bg-god-card border-r border-white/10 flex flex-col z-50 transition-transform duration-300 transform
                lg:translate-x-0 lg:static lg:h-screen
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo (Desktop only) */}
                <div className="p-6 border-b border-white/10 hidden lg:block">
                    <Link href="/portal-access" className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-god-accent flex items-center justify-center">
                            <Dumbbell className="h-6 w-6 text-black" />
                        </div>
                        <div>
                            <h1 className="font-heading text-xl font-bold text-white uppercase tracking-tight">Admin</h1>
                            <p className="text-xs text-god-muted">God's Gym</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/portal-access' && pathname?.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${isActive
                                    ? 'bg-god-accent/10 text-god-accent'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <link.icon className={`h-5 w-5 ${isActive ? 'text-god-accent' : 'group-hover:text-god-accent'} transition-colors`} />
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Links */}
                <div className="p-4 border-t border-white/10 space-y-1">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <Home className="h-5 w-5" />
                        <span className="font-medium">View Site</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/5 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 overflow-y-auto">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
