import { variables } from 'styles'
import { Theme, ThemeAgnosticStyles, ThemeObject } from 'types'

const shared: ThemeAgnosticStyles = {
  shape: {
    borderRadius: variables.borderRadius
  },
  typography: {
    fontFamily: variables.fontFamily,
    fontWeightRegular: 400,
    fontWeightSemiBold: 600,
    fontWeightBold: 700
  },
  shadows: {
    shadow1: variables.dropShadow
  },
  sizes: {
    selectorInitialHeight: variables.maxInitialHeightCalculation
  }
}

export const themeMap: Record<Theme, ThemeObject> = {
  Light: {
    theme: 'Light',
    colors: {
      primary: variables.watermelon,
      secondary: variables.charcoalGrey,
      background: variables.darkJungleGreen,
      border: variables.davyGrey,
      primaryText: variables.white
    },
    ...shared
  },
  Dark: {
    theme: 'Dark',
    colors: {
      primary: variables.watermelon,
      secondary: variables.charcoalGrey,
      background: variables.darkJungleGreen,
      border: variables.davyGrey,
      primaryText: variables.white
    },
    ...shared
  }
}
