import { defineConfig } from 'vite';

// base './' hace que las rutas de CSS, JS e imágenes sean relativas: funciona igual en local y en GitHub Pages.
export default defineConfig({
  base: './',
  server: { port: 5500 },
  build: { outDir: 'dist', sourcemap: false },
});
