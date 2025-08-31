/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_BASE_PATH: string
  readonly VITE_APP_TITLE: string
  readonly VITE_ENABLE_DEV_TOOLS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}