export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  border: string
  primaryText: string
}

export interface ThemeAgnosticStyles {
  shape: {
    borderRadius: string
  }
  typography: {
    fontFamily: string
    fontWeightRegular: 400
    fontWeightSemiBold: 600
    fontWeightBold: 700
  }
  shadows: {
    shadow1: string
  }
  sizes: {
    selectorInitialHeight: string
  }
}

export type Theme = 'Light' | 'Dark'

export interface ThemeObject extends ThemeAgnosticStyles {
  theme: Theme
  colors: ThemeColors
}

export type Themed<T> = T & { theme: ThemeObject }
export type Styled<T> = T & {
  theme?: ThemeObject
  as?: React.ElementType<unknown>
}
