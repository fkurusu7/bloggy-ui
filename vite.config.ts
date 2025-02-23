import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
// Use a named import instead of default import
import { EslintPlugin } from "vite-plugin-eslint";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5174",
        secure: false,
      },
    },
  },
  plugins: [react(), EslintPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
