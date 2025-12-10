import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { removeBackground } from "@imgly/background-removal";
import { Check } from "lucide-react";

interface Thumb {
    label: string;
    width: number;
    height: number;
}

interface ImagePickerProps {
    done: (img: any) => void;
    image: any;
    width: number;
    height: number;
    cropShape?: "rect" | "round";
    thumbs?: Thumb[] | null;
    disableTransparent?: boolean;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
    done,
    image,
    width,
    height,
    cropShape = "rect",
    thumbs = null,
    disableTransparent = false,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [file, setFile] = useState<string | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [ratio, setRatio] = useState(1);
    const [transparent, setTransparent] = useState(false);
    const [cropping, setCropping] = useState(false);

    const readFile = (file: File): Promise<string> =>
        new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
        });

    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    const getRatio = (w: number, h: number) => {
        const r = gcd(w, h);
        setRatio(w / r / (h / r));
    };

    const onDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        done(null);
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length) {
            const imageUrl = await readFile(droppedFiles[0]);
            setFile(imageUrl);
        }
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            done(null);
            const imageUrl = await readFile(files[0]);
            setFile(imageUrl);
        }
    };

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const resizeImage = (
        blobURL: string,
        width: number,
        height: number
    ): Promise<string> =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.src = blobURL;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d")!;
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL("image/webp"));
            };
            img.onerror = reject;
        });

    const blobToDataUrl = (blob: Blob): Promise<string> =>
        new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target!.result as string);
            reader.readAsDataURL(blob);
        });

    const doneCropping = async () => {
        if (!file || !croppedAreaPixels) return;
        setCropping(true);
        try {
            // Explicitly type resType as "blob" | "base64"
            const resType: "blob" | "base64" = transparent ? "blob" : "base64";

            let croppedImage = await getCroppedImg(
                file,
                croppedAreaPixels,
                { width, height },
                resType
            );
            setFile(null);

            if (transparent) {
                const bgRemoved = await removeBackground(croppedImage);
                croppedImage = thumbs
                    ? URL.createObjectURL(bgRemoved)
                    : await blobToDataUrl(bgRemoved);
            }

            if (thumbs) {
                const resizeImages: { label: string; image: string }[] = [];
                for (const size of thumbs) {
                    const thumbImage = await resizeImage(
                        croppedImage as string,
                        size.width,
                        size.height
                    );
                    resizeImages.push({ label: size.label, image: thumbImage });
                }
                done(resizeImages); // pass thumbnails array directly
            } else {
                done(croppedImage); // pass single image
            }

            // done(croppedImage);
        } catch (error) {
            console.error("Cropping error:", error);
        } finally {
            setCropping(false);
        }
    };

    useEffect(() => {
        getRatio(width, height);
    }, [width, height]);

    return (
        <div>
            {!disableTransparent && (
                <div className="mb-3 flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="transparent"
                        checked={transparent}
                        onChange={(e) => setTransparent(e.target.checked)}
                        className="h-4 w-4 accent-blue-500"
                    />
                    <label htmlFor="transparent" className="text-gray-700">
                        Transparent
                    </label>
                </div>
            )}

            <label
                className="relative flex flex-col items-center justify-center w-full min-h-[200px] p-4 border-4 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-400 transition-colors"
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {cropping ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <svg
                            className="animate-spin h-8 w-8 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    </div>
                ) : (
                    <>
                        {file && (
                            <div className="relative w-full h-[200px] mb-4">
                                <Cropper
                                    image={file}
                                    crop={crop}
                                    zoom={zoom}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    cropShape={cropShape}
                                    aspect={ratio ?? 1}
                                />
                                <button
                                    type="button"
                                    onClick={doneCropping}
                                    className="absolute bottom-2 right-2 flex items-center gap-1 px-3 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    <Check /> Crop Image
                                </button>
                            </div>
                        )}

                        {image && (
                            <img
                                src={
                                    Array.isArray(image)
                                        ? image[image.length - 1].image
                                        : image
                                }
                                alt="preview"
                                className="w-24 h-24 object-contain rounded-2xl border-4 border-blue-500 mb-4"
                            />
                        )}

                        <div className="text-center text-gray-500 mb-2">
                            <strong>Click</strong> or{" "}
                            <strong>Drag & Drop</strong> files here
                            <div className="text-sm">
                                ({width} x {height})
                            </div>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFile}
                        />
                    </>
                )}
            </label>
        </div>
    );
};

export default ImagePicker;
