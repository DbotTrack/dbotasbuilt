import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    // Off Vite's default 5173, which the client app's dev server needs — see
    // .env.development.
    server: {
        port: 3000,
    },
    build: {
        sourcemap: false,
        minify: "esbuild",
    },
});
