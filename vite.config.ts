import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
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
});
