import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { getSession } from '@/lib/auth';
import sharp from 'sharp';

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
        // Sanitize category to prevent any potential path issues
        const cleanCategory = category.replace(/[^a-z0-9]/gi, '');
        const filename = `${cleanCategory}-${timestamp}.webp`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', cleanCategory);
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const inputBuffer = Buffer.from(bytes);

        // Convert to WebP using sharp (quality 80 for good balance of size/quality)
        const webpBuffer = await sharp(inputBuffer)
            .webp({ quality: 80 })
            .toBuffer();

        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, webpBuffer);

        // Delete old image if provided and it's a local upload (not an external URL)
        if (oldImagePath && oldImagePath.startsWith('/uploads/')) {
            // Secure path resolution: only allow files within the uploads folder
            const safePath = oldImagePath.replace(/^\/uploads\//, '');
            // Prevent traversal by taking only the filename and category parts if applicable
            // But a more robust way is to re-construct from basename
            const oldFilename = path.basename(safePath);
            const oldCategory = safePath.split('/')[0];

            if (VALID_CATEGORIES.includes(oldCategory)) {
                const oldFullPath = path.join(process.cwd(), 'public', 'uploads', oldCategory, oldFilename);
                try {
                    if (existsSync(oldFullPath)) {
                        await unlink(oldFullPath);
                    }
                } catch (err) {
                    console.warn('Could not delete old image:', err);
                }
            }
        }

        // Return the public URL path
        const publicPath = `/uploads/${cleanCategory}/${filename}`;
        return NextResponse.json({
            success: true,
            path: publicPath,
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

        if (!imagePath || !imagePath.startsWith('/uploads/')) {
            return NextResponse.json({ error: 'Invalid image path' }, { status: 400 });
        }

        // Secure path resolution to prevent traversal
        const safePath = imagePath.replace(/^\/uploads\//, '');
        const filename = path.basename(safePath);
        const category = safePath.split('/')[0];

        if (!VALID_CATEGORIES.includes(category)) {
            return NextResponse.json({ error: 'Invalid image path category' }, { status: 400 });
        }

        const fullPath = path.join(process.cwd(), 'public', 'uploads', category, filename);

        if (existsSync(fullPath)) {
            await unlink(fullPath);
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}

