import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://godsgym.com';

    // Static routes
    const routes = [
        '',
        '/about',
        '/programs',
        '/trainers',
        '/gallery',
        '/membership',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    try {
        // Dynamic routes from data
        const dataPath = path.join(process.cwd(), 'src/data/gym-data.json');
        const file = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(file);

        const programRoutes = data.programs.map((p: any) => ({
            url: `${baseUrl}/programs/${p.id}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        const trainerRoutes = data.trainers.map((t: any) => ({
            url: `${baseUrl}/trainers/${t.id}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        return [...routes, ...programRoutes, ...trainerRoutes];
    } catch (e) {
        console.error('Error generating sitemap dynamic routes', e);
        return routes;
    }
}
