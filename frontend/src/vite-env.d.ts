/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend base URL (default `/api/`, proxied to the Express server in dev). */
  readonly VITE_API_URL?: string
  /** `browser` = run without a backend (GitHub Pages build); anything else uses the API. */
  readonly VITE_DATA_SOURCE?: 'api' | 'browser'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
