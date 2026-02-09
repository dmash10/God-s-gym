"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dumbbell, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                router.push('/portal-access');
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-god-bg flex items-center justify-center p-4">
            {/* Background - Simple dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black z-0"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo Area */}
                <div className="text-center mb-8">
                    <div className="inline-flex h-16 w-16 rounded-full bg-god-accent items-center justify-center mb-4 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                        <Dumbbell className="h-10 w-10 text-black" />
                    </div>
                    <h1 className="font-heading text-3xl font-bold text-white uppercase tracking-tight">God's Gym</h1>
                    <p className="text-god-muted uppercase tracking-widest text-xs mt-1">Admin Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-god-card border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-6">Sign In</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-god-muted uppercase tracking-wider mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-god-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-god-accent transition-colors"
                                placeholder="name@example.com"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-god-muted uppercase tracking-wider mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-god-bg border border-white/10 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-god-accent transition-colors"
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-god-accent hover:bg-god-accent/90 text-black font-bold py-3.5 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "Access Dashboard"
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-god-muted text-xs">
                        &copy; {new Date().getFullYear()} God's Gym Dehradun. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
