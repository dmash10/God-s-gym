'use client';

import { useState } from 'react';
import { addGalleryImage, removeGalleryImage, updateGallery } from '@/lib/actions';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface GalleryEditorProps {
    initialImages: string[];
}

export default function GalleryEditor({ initialImages }: GalleryEditorProps) {
    const [images, setImages] = useState<string[]>(initialImages);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newImage, setNewImage] = useState('');
    const [message, setMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleAddImage = async () => {
        if (!newImage) return;
        setIsSaving(true);
        try {
            await addGalleryImage(newImage);
            setImages([...images, newImage]);
            setNewImage('');
            setShowAddModal(false);
            setMessage('Image added!');
        } catch (error) {
            setMessage('Failed to add image.');
        }
        setIsSaving(false);
    };

    const handleRemoveImage = async (imagePath: string) => {
        if (confirm('Remove this image from gallery?')) {
            try {
                await removeGalleryImage(imagePath);
                setImages(images.filter(img => img !== imagePath));
                setMessage('Image removed.');
            } catch (error) {
                setMessage('Failed to remove image.');
            }
        }
    };

    const handleSaveOrder = async () => {
        setIsSaving(true);
        try {
            await updateGallery(images);
            setMessage('Gallery order saved!');
        } catch (error) {
            setMessage('Failed to save order.');
        }
        setIsSaving(false);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">Gallery</h1>
                    <p className="text-god-muted mt-2">Manage your gym's photo gallery. ({images.length} images)</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleSaveOrder}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                    >
                        <Save className="h-5 w-5" />
                        Save Order
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-god-accent text-black font-bold rounded-lg hover:bg-white transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Add Image
                    </button>
                </div>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('!') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {message}
                </div>
            )}

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, idx) => (
                    <div
                        key={idx}
                        className="relative group bg-god-card border border-white/10 rounded-lg overflow-hidden aspect-square"
                    >
                        <img
                            src={image}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={() => handleRemoveImage(image)}
                                className="p-3 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-white">
                            {idx + 1}
                        </div>
                    </div>
                ))}
            </div>

            {images.length === 0 && (
                <div className="text-center py-20 text-god-muted">
                    <p className="text-lg">No images in gallery</p>
                    <p className="text-sm mt-2">Click "Add Image" to get started</p>
                </div>
            )}

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-god-card border border-white/10 rounded-xl w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-god-card/50 sticky top-0 z-20">
                            <h2 className="font-heading text-2xl font-bold text-white uppercase">Add Image</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setShowAddModal(false); setNewImage(''); }}
                                    className="px-3 py-1.5 border border-white/20 text-white rounded text-[10px] font-bold uppercase hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddImage}
                                    disabled={!newImage || isSaving}
                                    className="px-4 py-1.5 bg-god-accent text-black rounded text-[10px] font-bold uppercase hover:bg-white transition-colors disabled:opacity-50"
                                >
                                    {isSaving ? 'Adding...' : 'Add'}
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <ImageUploader
                                currentImage={newImage}
                                onImageChange={setNewImage}
                                category="gallery"
                                label="GALLERY ASSET"
                                aspectRatio="1/1"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
