import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    outDir: "dist", // The production folder you will load into Chrome
    rollupOptions: {
      input: {
        // Define your entry points
        content: resolve(import.meta.dirname, "src/main.tsx"),
        popup: resolve(import.meta.dirname, "popup.html"),
      },
      output: {
        // Enforce deterministic static bundle names instead of hashes like content-a8f23b.js
        entryFileNames: "[name].bundle.js",
        assetFileNames: "[name].bundle.[ext]",
        chunkFileNames: "[name].bundle.js",
      },
    },
  },
});
