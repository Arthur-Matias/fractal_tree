import { defineConfig } from "vite";

export default defineConfig({
    base: "/fractal_tree/",
    build: {
        modulePreload: {
            polyfill: false
        },
        rollupOptions: {
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "[name].js",
                assetFileNames: "[name].[ext]"
            }
        }
    }
})