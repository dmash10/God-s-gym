'use client';

import { useState, useRef } from 'react';
import { Upload, X, Link as LinkIcon, Image as ImageIcon, Check, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
    currentImage: string;
    onImageChange: (newPath: string) => void;
    category: 'hero' | 'trainers' | 'programs' | 'gallery' | 'about' | 'transformations' | 'cta' | 'misc';
    label?: string;
    aspectRatio?: string; // e.g., "16/9", "1/1", "3/4"
}

export default function ImageUploader({
    currentImage,
    onImageChange,
    category,
    label = 'Image',
    aspectRatio = '16/9'
}: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [urlValue, setUrlValue] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [localPreview, setLocalPreview] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const showFeedback = (type: 'success' | 'error', message: string) => {
        setFeedback({ type, message });
        setTimeout(() => setFeedback(null), 4000);
    };

    const handleFileSelect = async (file: File) => {
        if (!file) return;

        // Instantly show local preview
        const objectUrl = URL.createObjectURL(file);
        setLocalPreview(objectUrl);

        setIsUploading(true);
        setFeedback(null);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);
        formData.append('oldImagePath', currentImage);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                onImageChange(data.path);
                setLocalPreview(null); // Clear local preview, real URL takes over
                URL.revokeObjectURL(objectUrl);
                const sizeInfo = data.savedKB ? ` (saved ${data.savedKB}KB)` : '';
                showFeedback('success', `Uploaded successfully!${sizeInfo}`);
            } else {
                const error = await response.json();
                setLocalPreview(null);
                URL.revokeObjectURL(objectUrl);
                showFeedback('error', error.error || 'Upload failed');
            }
        } catch (error) {
            setLocalPreview(null);
            URL.revokeObjectURL(objectUrl);
            showFeedback('error', 'Upload failed. Please try again.');
        }
        setIsUploading(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileSelect(file);
        }
    };

    const handleUrlSubmit = () => {
        if (urlValue.trim()) {
            onImageChange(urlValue.trim());
            setShowUrlInput(false);
            setUrlValue('');
            showFeedback('success', 'Image URL updated!');
        }
    };

    // The image to display: local preview (instant) > currentImage (from server)
    const displayImage = localPreview || currentImage;

    return (
        <div className="space-y-3">
            <label className="block text-[10px] font-bold text-god-accent uppercase tracking-[0.2em] mb-2">
                {label}
            </label>

            {/* Preview */}
            <div
                className={`relative overflow-hidden rounded-lg border-2 border-dashed transition-colors ${dragOver ? 'border-god-accent bg-god-accent/10' : 'border-white/20 hover:border-white/40'
                    }`}
                style={{ aspectRatio }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
            >
                {displayImage ? (
                    <img
                        key={displayImage}
                        src={displayImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.dataset.fallback) {
                                target.dataset.fallback = 'true';
                                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23222" width="400" height="300"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Not Found%3C/text%3E%3C/svg%3E';
                            }
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 gap-2 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}>
                        <ImageIcon className="h-12 w-12 text-gray-600" />
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Click or drag to upload</p>
                    </div>
                )}

                {/* Upload spinner overlay */}
                {isUploading && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
                        <div className="animate-spin h-8 w-8 border-2 border-god-accent border-t-transparent rounded-full" />
                        <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold animate-pulse">Optimizing & Uploading...</p>
                    </div>
                )}

                {/* Drag overlay */}
                {dragOver && (
                    <div className="absolute inset-0 bg-god-accent/20 flex items-center justify-center">
                        <p className="text-white font-bold">Drop to upload</p>
                    </div>
                )}
            </div>

            {/* Feedback toast */}
            {feedback && (
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-2 duration-300 ${feedback.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}>
                    {feedback.type === 'success'
                        ? <CheckCircle2 className="h-4 w-4 shrink-0" />
                        : <AlertCircle className="h-4 w-4 shrink-0" />
                    }
                    {feedback.message}
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                >
                    <Upload className="h-4 w-4" />
                    Upload
                </button>

                <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                    <LinkIcon className="h-4 w-4" />
                    URL
                </button>
            </div>

            {/* URL Input Area */}
            {showUrlInput && (
                <div className="relative group/url animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-stretch bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-god-accent transition-all">
                        <div className="flex items-center px-4 bg-white/5 border-r border-white/10">
                            <LinkIcon className="h-4 w-4 text-god-accent" />
                        </div>
                        <input
                            type="text"
                            value={urlValue}
                            onChange={(e) => setUrlValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                            placeholder="Enter image URL..."
                            className="flex-1 px-4 py-2.5 bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20"
                            autoFocus
                        />
                        <div className="flex shrink-0">
                            <button
                                type="button"
                                onClick={handleUrlSubmit}
                                className="w-12 flex items-center justify-center bg-god-accent/10 text-god-accent hover:bg-god-accent hover:text-black transition-all border-l border-white/10"
                                title="Confirm"
                            >
                                <Check className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Current path display */}
            {currentImage && (
                <p className="text-[10px] text-god-muted truncate mt-4 px-1 italic opacity-60" title={currentImage}>
                    Current: {currentImage}
                </p>
            )}
        </div>
    );
}
