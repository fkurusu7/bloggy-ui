/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROD: boolean;
  // Add other env variables you use
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
