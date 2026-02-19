import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import type { RuntimeCaching } from "workbox-build";

const apiCaching: RuntimeCaching = {
    urlPattern: ({ url, request }) => {
        return (
            request.method === 'GET' &&
            url.pathname.startsWith('/api') &&
            !url.pathname.startsWith('/api/login') &&
            !url.pathname.startsWith('/api/user')
        );
    },

    handler: 'NetworkFirst',

    options: {
        cacheName: 'api-cache',

        // If network does not respond in 3s → use cache
        networkTimeoutSeconds: 3,

        expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 5 // 5 minutes
        },

        cacheableResponse: {
            statuses: [0, 200]
        }
    }
};


export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "prompt", // 👈 change from autoUpdate
            injectRegister: "auto",
            includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],

            // 🔴 IMPORTANT: Disable aggressive caching
            strategies: "generateSW",

            workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: [],

                runtimeCaching: [
                    {
                        urlPattern: ({ request }) => request.destination === 'image',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 200,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                            }
                        }
                    },
                    apiCaching
                ],

                navigateFallback: null
            },
            manifest: {
                name: "Developments & Modules - Valueye",
                short_name: "Developments & Modules Valueye",
                description:
                    "Developments & Modules Valueye",
                theme_color: "#101010",
                background_color: "#ffffff",
                display: "standalone",
                start_url: "/",
                scope: "/",
                icons: [
                    {
                        src: "pwa-64x64.png",
                        sizes: "64x64",
                        type: "image/png"
                    },
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    },
                    {
                        src: "maskable-icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable"
                    }
                ]
            }
        })

    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true, // Enables buffer polyfill
                    process: true, // Enables process polyfill
                }),
            ],
            define: {
                global: 'globalThis', // Ensures global is replaced by globalThis
                process: JSON.stringify({ env: { NODE_ENV: '"development"' } }), // Explicit process.env polyfill
            },
        },
    },
    define: {
        global: 'globalThis', // Ensure globalThis is used instead of global
        process: JSON.stringify({ env: { NODE_ENV: '"development"' } }), // Ensures process is defined
    },
    build: {
        chunkSizeWarningLimit: 1500, // in kB
        sourcemap: false,
    },
});
