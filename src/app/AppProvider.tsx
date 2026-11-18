import { ShowProvider } from 'helper'
import { ThemeProvider } from 'providers'
import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from 'store'

export const AppProvider: FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ShowProvider>{children}</ShowProvider>
      </Provider>
    </ThemeProvider>
  )
}
