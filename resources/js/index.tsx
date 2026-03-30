import React from "react";
import ReactDOM from "react-dom/client";
// Landing page entry point - admin app uses mrbakers-admin-router.tsx

const LandingApp = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Welcome to Mr Bakers
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Your premium bakery destination. Freshly baked goods
                    delivered daily.
                </p>
                <div className="space-x-4">
                    <a
                        href="/mrbakers-admin"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
                    >
                        Admin Login
                    </a>
                    <a
                        href="/products"
                        className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    );
};

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <LandingApp />
    </React.StrictMode>,
);
