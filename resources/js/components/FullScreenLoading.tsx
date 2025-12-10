import React from "react";
import { Loader2 } from "lucide-react";

export default function FullScreenLoading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-linear-to-br from-pink-50 to-bakery-100 backdrop-blur-sm z-9999">
            {/* Animated Icon */}
            <div className="relative flex items-center justify-center">
                {/* Dough circle */}
                <div className="w-28 h-28 bg-bakery-200 rounded-full animate-pulse opacity-70"></div>

                {/* Spinning whisk icon */}
                <Loader2
                    size={48}
                    className="absolute text-bakery-600 animate-spin"
                />
            </div>

            {/* Text */}
            <p className="mt-6 text-bakery-700 font-semibold text-lg tracking-wide animate-pulse">
                Baking your dashboard...
            </p>

            {/* Small subtitle */}
            <p className="text-sm text-gray-500 mt-2">
                Please wait a moment ☕
            </p>
        </div>
    );
}
