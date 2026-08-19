import { defineConfig, type UserConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { resolve } from "node:path";

const plugins = [react(), babel({ presets: [reactCompilerPreset()] })];
const define = {
  "process.env.NODE_ENV": JSON.stringify("production"),
};

function createContentConfig(): UserConfig {
  return {
    plugins,
    define,
    build: {
      outDir: "dist",
      emptyOutDir: true,
      copyPublicDir: true,
      rollupOptions: {
        input: resolve(import.meta.dirname, "src/main.tsx"),
        output: {
          entryFileNames: "[name].bundle.js",
          assetFileNames: "[name].bundle.[ext]",
          chunkFileNames: "[name].bundle.js",
        },
      },
    },
  };
}

function createPopupConfig(): UserConfig {
  return {
    plugins,
    define,
    base: "./",
    build: {
      outDir: "dist",
      emptyOutDir: false,
      copyPublicDir: false,
      rollupOptions: {
        input: resolve(import.meta.dirname, "popup.html"),
        output: {
          entryFileNames: "[name].bundle.js",
          assetFileNames: "[name].bundle.[ext]",
          chunkFileNames: "[name].bundle.js",
        },
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return {
      plugins,
      define,
    };
  }

  if (mode === "popup") {
    return createPopupConfig();
  }

  return createContentConfig();
});
