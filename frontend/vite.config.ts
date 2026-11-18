import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

/**
 * Top-level folders of `src/` that are imported by bare name, e.g. `import { Card } from 'common'`.
 * Keep this list in sync with the folders (TypeScript resolves them through `baseUrl` in tsconfig.json).
 */
const SOURCE_FOLDERS = ['app', 'assets', 'common', 'constant', 'helper', 'hooks', 'layouts', 'modules', 'providers', 'store', 'styles', 'types', 'utils']

const fromHere = (relativePath: string) => fileURLToPath(new URL(relativePath, import.meta.url))

/** Repository name = sub-path of the GitHub Pages site (https://<user>.github.io/rika-netflix/). */
const PAGES_BASE = '/rika-netflix/'

export default defineConfig(({ mode }) => ({
  // `vite build --mode pages` builds the server-less GitHub Pages version (see .env.pages).
  base: mode === 'pages' ? PAGES_BASE : '/',
  plugins: [
    react({
      // Emotion's css prop + readable class names (component labels) in dev tools.
      jsxImportSource: '@emotion/react',
      babel: { plugins: ['@emotion/babel-plugin'] }
    })
  ],
  resolve: {
    alias: [
      ...SOURCE_FOLDERS.map(folder => ({ find: new RegExp(`^${folder}(?=/|$)`), replacement: fromHere(`./src/${folder}`) })),
      // Code shared with the backend (filtering/sorting, types).
      { find: /^shared\//, replacement: fromHere('../shared/') },
      // The data set, bundled only for browser mode.
      { find: 'shows-data', replacement: fromHere('../backend/data/shows.json') },
      { find: 'test-utils', replacement: fromHere('./src/test/render.tsx') }
    ]
  },
  build: {
    rollupOptions: {
      output: {
        // Libraries change rarely, so keep them in separate, long-cached chunks.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          forms: ['formik', 'yup'],
          emotion: ['@emotion/react', '@emotion/styled']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    // Allow importing ../shared and ../backend/data in dev.
    fs: { allow: [fromHere('..')] },
    // The backend runs on :5000 (override with API_PROXY_TARGET); the proxy keeps API calls same-origin in development.
    proxy: { '/api': process.env.API_PROXY_TARGET ?? 'http://localhost:5000' }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
    // Node's fetch needs absolute URLs, so tests talk to a fake origin that MSW intercepts.
    env: { VITE_API_URL: 'http://localhost/api/' }
  }
}))
