import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
// @ts-ignore
import eslint from "vite-plugin-eslint";

export default defineConfig(({ mode }) => {
  // Determine if we're in development mode
  const isDev = mode === "development";

  return {
    server: {
      proxy: {
        "/api": {
          target: isDev
            ? "http://localhost:5174"
            : "https://api.barudesu.codes",
          secure: !isDev,
          changeOrigin: true, // needed when proxying to external domains
        },
      },
    },
    plugins: [react(), eslint()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
    },
  };
});
