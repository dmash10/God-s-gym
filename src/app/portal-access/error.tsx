'use client';

import { useEffect } from 'react';

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Portal Access Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-god-bg flex items-center justify-center p-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-lg text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong!</h2>
                <p className="text-gray-400 mb-6">
                    {error.message || 'An unexpected error occurred.'}
                </p>
                {error.digest && (
                    <p className="text-xs text-gray-500 mb-4">Error ID: {error.digest}</p>
                )}
                <button
                    onClick={reset}
                    className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
