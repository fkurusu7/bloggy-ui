/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // ✅ Add your custom env variable types here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
