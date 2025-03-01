import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// @ts-ignore
import eslint from "vite-plugin-eslint";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5174",
        secure: false,
      },
    },
  },
  plugins: [react(), eslint()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
