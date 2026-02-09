import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "God's Gym Dehradun",
        short_name: "God's Gym",
        description: "The ultimate destination for achieving your maximum physical potential.",
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0a',
        theme_color: '#eab308',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/279366374_439163201310420_5315574228252384272_n (1).jpg',
                sizes: '192x192',
                type: 'image/png',
            },
        ],
    };
}
