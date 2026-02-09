import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import sharp from 'sharp';
import { put, del } from '@vercel/blob';

// Valid categories for organizing uploads
const VALID_CATEGORIES = ['hero', 'trainers', 'programs', 'gallery', 'about', 'transformations', 'misc'];

export async function POST(request: NextRequest) {
    try {
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

        // Validate category
        if (!VALID_CATEGORIES.includes(category)) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' }, { status: 400 });
        }

        // Create unique filename - always use .webp extension
        const timestamp = Date.now();
        const cleanCategory = category.replace(/[^a-z0-9]/gi, '');
        const filename = `${cleanCategory}-${timestamp}.webp`;

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const inputBuffer = Buffer.from(bytes);

        // Convert to WebP using sharp (quality 80 for good balance of size/quality)
        const webpBuffer = await sharp(inputBuffer)
            .webp({ quality: 80 })
            .toBuffer();

        // Upload to Vercel Blob
        const blob = await put(`uploads/${cleanCategory}/${filename}`, webpBuffer, {
            access: 'public',
            contentType: 'image/webp',
        });

        // Delete old image if provided and it's a Vercel Blob URL
        if (oldImagePath && oldImagePath.includes('vercel-storage.com')) {
            try {
                await del(oldImagePath);
            } catch (err) {
                console.warn('Could not delete old image:', err);
            }
        }

        // Return the Vercel Blob URL
        return NextResponse.json({
            success: true,
            path: blob.url,
            filename
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

// DELETE handler to remove images
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

        // Only delete Vercel Blob URLs
        if (imagePath.includes('vercel-storage.com')) {
            await del(imagePath);
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Cannot delete non-blob images' }, { status: 400 });
        }
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
