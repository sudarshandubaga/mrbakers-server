import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/index.tsx",
                "resources/js/mrbakers-admin-router.tsx",
            ],
            refresh: true,
        }),
        tailwindcss({
            config: "./tailwind.config.js",
        }),
        viteReact(),
    ],
});
