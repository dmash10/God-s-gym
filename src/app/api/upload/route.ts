import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import sharp from 'sharp';

const VALID_CATEGORIES = ['hero', 'trainers', 'programs', 'gallery', 'about', 'transformations', 'cta', 'misc'];

export async function POST(request: NextRequest) {
    try {
        // Check auth
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const category = formData.get('category') as string || 'misc';
        const oldImagePath = formData.get('oldImagePath') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        if (!VALID_CATEGORIES.includes(category)) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        // Create unique filename
        const timestamp = Date.now();
        const cleanCategory = category.replace(/[^a-z0-9]/gi, '');
        const siteSlug = process.env.SITE_SLUG || 'default';
        const filename = `${cleanCategory}-${timestamp}.webp`;
        const filePath = `${siteSlug}/${cleanCategory}/${filename}`;

        // Smart max dimensions per category
        const maxWidths: Record<string, number> = {
            hero: 2560,
            cta: 2560,
            about: 1920,
            gallery: 1600,
            trainers: 1200,
            programs: 1200,
            transformations: 1200,
            misc: 1200,
        };
        const maxWidth = maxWidths[category] || 1200;

        // Resize + convert to WebP
        const bytes = await file.arrayBuffer();
        const inputBuffer = Buffer.from(bytes);
        const metadata = await sharp(inputBuffer).metadata();
        const originalWidth = metadata.width || 0;
        const originalHeight = metadata.height || 0;

        let pipeline = sharp(inputBuffer);

        // Only resize if image exceeds max width
        if (originalWidth > maxWidth) {
            pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
        }

        const webpBuffer = await pipeline
            .webp({ quality: 85 })
            .toBuffer();

        const savedKB = Math.round((inputBuffer.length - webpBuffer.length) / 1024);

        const supabase = await createClient();

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('uploads')
            .upload(filePath, webpBuffer, {
                contentType: 'image/webp',
                cacheControl: '31536000',
                upsert: false
            });

        if (uploadError) {
            console.error('Supabase upload error:', uploadError);
            return NextResponse.json({ error: 'Upload failed', details: uploadError.message }, { status: 500 });
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('uploads')
            .getPublicUrl(filePath);

        // Auto-delete old image if provided (except for gallery)
        if (oldImagePath && category !== 'gallery') {
            try {
                // Extract the path after 'uploads/' regardless of whether it's a full URL or relative path
                const pathIdentifier = '/uploads/';
                const alternateIdentifier = 'uploads/';

                let oldPath = '';
                if (oldImagePath.includes(pathIdentifier)) {
                    oldPath = oldImagePath.split(pathIdentifier)[1];
                } else if (oldImagePath.includes(alternateIdentifier)) {
                    oldPath = oldImagePath.split(alternateIdentifier)[1];
                }

                if (oldPath && !oldPath.startsWith('http')) {
                    await supabase.storage.from('uploads').remove([oldPath]);
                }
            } catch (err) {
                console.warn('Could not delete old image:', err);
            }
        }

        return NextResponse.json({
            success: true,
            path: publicUrl,
            filename,
            savedKB
        });

    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { imagePath } = await request.json();

        if (!imagePath) {
            return NextResponse.json({ error: 'No image path provided' }, { status: 400 });
        }

        const supabase = await createClient();

        let pathToDelete = '';
        if (imagePath.includes('/uploads/')) {
            pathToDelete = imagePath.split('/uploads/')[1];
        } else if (imagePath.includes('uploads/')) {
            pathToDelete = imagePath.split('uploads/')[1];
        }

        if (pathToDelete && !pathToDelete.startsWith('http')) {
            const { error } = await supabase.storage.from('uploads').remove([pathToDelete]);
            if (error) {
                return NextResponse.json({ error: 'Delete failed', details: error.message }, { status: 500 });
            }
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Delete failed', details: error.message }, { status: 500 });
    }
}
