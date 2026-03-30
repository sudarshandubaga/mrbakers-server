export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous"); // avoid cross-origin issues
        image.src = url;
    });

export function getRadianAngle(degreeValue: number): number {
    return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(
    width: number,
    height: number,
    rotation: number
): { width: number; height: number } {
    const rotRad = getRadianAngle(rotation);
    return {
        width:
            Math.abs(Math.cos(rotRad) * width) +
            Math.abs(Math.sin(rotRad) * height),
        height:
            Math.abs(Math.sin(rotRad) * width) +
            Math.abs(Math.cos(rotRad) * height),
    };
}

interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Size {
    width: number;
    height: number;
}

interface Flip {
    horizontal: boolean;
    vertical: boolean;
}

/**
 * Crop an image based on pixelCrop and optional rotation, flip, and resizing
 */
export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: PixelCrop,
    size: Size = { width: 0, height: 0 },
    outputType: "base64" | "blob" = "base64",
    rotation: number = 0,
    flip: Flip = { horizontal: false, vertical: false }
): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    const rotRad = getRadianAngle(rotation);

    // Calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation
    );

    // Set canvas size to match bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // Translate to center for rotation and flipping
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // Draw rotated image
    ctx.drawImage(image, 0, 0);

    // Crop the image
    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");
    if (!croppedCtx) return null;

    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // Resize the cropped image
    const outputCanvas = document.createElement("canvas");
    const outputCtx = outputCanvas.getContext("2d")!;
    outputCanvas.width = size.width;
    outputCanvas.height = size.height;

    outputCtx.drawImage(
        croppedCanvas,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        size.width,
        size.height
    );

    if (outputType === "base64") {
        return outputCanvas.toDataURL("image/webp");
    } else {
        return new Promise<string>((resolve, reject) => {
            croppedCanvas.toBlob((file) => {
                if (file) resolve(URL.createObjectURL(file));
                else reject(new Error("Blob creation failed"));
            }, "image/webp");
        });
    }
}
