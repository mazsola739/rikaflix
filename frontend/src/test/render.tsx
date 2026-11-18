import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { ShowProvider } from 'helper'
import { ThemeProvider } from 'providers'
import { Provider } from 'react-redux'
import { store } from 'store'

const render = (ui: React.ReactElement, { ...renderOptions }: RenderOptions = {}) => {
  const wrapper = (ui: React.ReactElement) => {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <ShowProvider>{ui}</ShowProvider>
        </ThemeProvider>
      </Provider>
    )
  }
  return rtlRender(wrapper(ui), { ...renderOptions })
}

export * from '@testing-library/react'
export { render }

/** The data set the mocked API serves (see handlers.ts). */
export { testShows } from './handlers'
