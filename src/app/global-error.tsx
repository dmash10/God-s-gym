'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body style={{
                backgroundColor: '#0a0a0a',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                fontFamily: 'system-ui'
            }}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '1rem' }}>
                        Critical Error
                    </h2>
                    <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
                        {error.message || 'An unexpected error occurred'}
                    </p>
                    <button
                        onClick={reset}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </body>
        </html>
    );
}
