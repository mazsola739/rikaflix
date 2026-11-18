// Global test setup (referenced from vite.config.ts → test.setupFiles).
import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { store } from 'store'
import { mediaApi } from 'store/service/mediaApi'

import { handlers } from './handlers'

const server = setupServer(...handlers)

// jsdom lacks these browser APIs that some components use.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverStub
window.scrollTo = () => {}

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterEach(() => {
  cleanup()
  server.resetHandlers()
  // The Redux store is a singleton, so drop cached API responses between tests.
  store.dispatch(mediaApi.util.resetApiState())
})

afterAll(() => server.close())
