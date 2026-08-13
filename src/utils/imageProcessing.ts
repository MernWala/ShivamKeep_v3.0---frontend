export interface ProcessedImage {
    blob: Blob;
    base64: string;
    sizeBytes: number;
}

const TARGET_SIZE = 32;
const MAX_SIZE_BYTES = 2 * 1024; // 2KB

export async function processProfilePicture(file: File): Promise<ProcessedImage> {
    const image = await loadImage(file);
    const canvas = cropAndResizeToSquare(image, TARGET_SIZE);
    return compressToTarget(canvas, MAX_SIZE_BYTES);
}

function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = (err) => {
            URL.revokeObjectURL(url);
            reject(err);
        };
        img.src = url;
    });
}

// Crops from horizontal + vertical center to a square, then resizes to targetSize
function cropAndResizeToSquare(img: HTMLImageElement, targetSize: number): HTMLCanvasElement {
    const { width, height } = img;
    const side = Math.min(width, height);
    const sx = (width - side) / 2;
    const sy = (height - side) / 2;

    const canvas = document.createElement('canvas');
    canvas.width = targetSize;
    canvas.height = targetSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, sx, sy, side, side, 0, 0, targetSize, targetSize);

    return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
            type,
            quality
        );
    });
}

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Steps quality down until the image fits under maxBytes
async function compressToTarget(canvas: HTMLCanvasElement, maxBytes: number): Promise<ProcessedImage> {
    const type = 'image/jpeg';
    let quality = 0.9;
    const MIN_QUALITY = 0.1;
    const STEP = 0.1;

    let blob = await canvasToBlob(canvas, type, quality);

    while (blob.size > maxBytes && quality > MIN_QUALITY) {
        quality = Math.max(MIN_QUALITY, quality - STEP);
        blob = await canvasToBlob(canvas, type, quality);
    }

    if (blob.size > maxBytes) {
        throw new Error(
            `Couldn't compress image under ${maxBytes} bytes (smallest reached: ${blob.size} bytes). Try a simpler image.`
        );
    }

    const base64 = await blobToBase64(blob);
    return { blob, base64, sizeBytes: blob.size };
}