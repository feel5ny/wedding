import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

const stylesDir = path.resolve(__dirname, "./dist");

export default defineConfig({
  plugins: [tailwindcss()],
  css: { preprocessorOptions: { scss: { charset: false } } },
  build: {
    outDir: stylesDir,
  },
});
