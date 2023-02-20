import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            domain: path.resolve(__dirname, './src/domain'),
            data: path.resolve(__dirname, './src/data'),
            presentation: path.resolve(__dirname, './src/presentation'),
            src: path.resolve(__dirname, './src'),
        },
    },
});
