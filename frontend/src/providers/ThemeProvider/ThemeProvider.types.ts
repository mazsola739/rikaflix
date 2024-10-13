import { ReactNode } from "react"
import { DefaultTheme } from "styled-components"

export type ThemeProviderProps = {
  children: ReactNode
  theme: DefaultTheme
}
