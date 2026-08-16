import { useRef, useState } from 'react';
import { processProfilePicture } from '../utils/imageProcessing';
// import Spinner from './Spinner';

interface ProfilePictureUploaderProps {
    onUploaded: (base64: string) => void;
    currentPictureUrl?: string;
}

export default function ProfilePictureUploader({
    onUploaded,
    currentPictureUrl,
}: ProfilePictureUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | undefined>(currentPictureUrl);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);
        setIsProcessing(true);

        try {
            const { base64 } = await processProfilePicture(file);
            setPreview(base64);
            onUploaded(base64);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to process image');
        } finally {
            setIsProcessing(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-300 bg-gray-100">
                {preview ? (
                    <img src={preview} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        No image
                    </div>
                )}
                {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        {/* <Spinner size="sm" /> */}
                        Loading...
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={isProcessing}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
                {isProcessing ? 'Processing...' : 'Change picture'}
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}