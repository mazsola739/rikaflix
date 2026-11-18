import { FC, PropsWithChildren } from 'react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { GlobalStyles } from 'styles'
import { themeMap } from './themeMap'

export const ThemeProvider: FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  const theme = 'Light'
  return (
    <EmotionThemeProvider theme={themeMap[theme]}>
      <GlobalStyles />
      {children}
    </EmotionThemeProvider>
  )
}
