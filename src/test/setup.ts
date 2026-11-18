// Global test setup (referenced from vite.config.ts → test.setupFiles).
import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { store } from 'store'
import { resetBrowserData, STORAGE_KEY } from 'store/service/browserBaseQuery'
import { mediaApi } from 'store/service/mediaApi'

import { testShows } from './testShows'

// jsdom lacks these browser APIs that some components use.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverStub
window.scrollTo = () => {}

beforeEach(() => {
  // Components read the small test data set: the data layer prefers the copy in localStorage.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(testShows))
})

afterEach(() => {
  cleanup()
  resetBrowserData()
  // The Redux store is a singleton, so drop cached results between tests.
  store.dispatch(mediaApi.util.resetApiState())
})
