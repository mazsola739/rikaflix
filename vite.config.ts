import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

/**
 * Top-level folders of `src/` that are imported by bare name, e.g. `import { Card } from 'common'`.
 * Keep this list in sync with the folders (TypeScript resolves them through `baseUrl` in tsconfig.json).
 */
const SOURCE_FOLDERS = ['app', 'assets', 'common', 'constant', 'helper', 'hooks', 'layouts', 'modules', 'providers', 'store', 'styles', 'types', 'utils']

const fromHere = (relativePath: string) => fileURLToPath(new URL(relativePath, import.meta.url))

/** Repository name = sub-path of the GitHub Pages site (https://<user>.github.io/rikaflix/). */
const PAGES_BASE = '/rikaflix/'

/** Local dev server and `yarn preview` both run here. */
const PORT = 2222

export default defineConfig(({ command }) => ({
  // The build is published under /rikaflix/ on GitHub Pages; the dev server stays on http://localhost:2222/.
  base: command === 'build' ? PAGES_BASE : '/',
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
  server: { port: PORT, open: true },
  preview: { port: PORT },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false
  }
}))
