import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: path.resolve(__dirname, '/public'),
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'public/js/main.js'),
                styles: path.resolve(__dirname, 'public/css/styles.scss'),
            },
            output: {
                entryFileNames: 'public/js/[name].[hash].js',
                chunkFileNames: 'public/js/[name].[hash].js',
                assetFileNames: 'public/css/[name].[hash].[ext]',
            },
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
            },
        },
    },
});
