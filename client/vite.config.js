import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Import the plugin

// https://vitejs.dev
export default defineConfig({
  define: {
    global: 'globalThis',
  },
  plugins: [
    react(),
    tailwindcss(), // Add the plugin here
  ],
});
