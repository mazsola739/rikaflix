import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { GlobalStyle } from '../../styles'
import { ThemeProviderProps } from './ThemeProvider.types'


export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  )
}
