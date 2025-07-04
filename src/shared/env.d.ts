/// <reference types="vite/client" />

declare module "*.css" {
  const css: { [key: string]: string }
  export default css
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
