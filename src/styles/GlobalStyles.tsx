import { Global, css } from '@emotion/react'
import { darkJungleGreen, watermelon } from './variables'

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background-color: ${darkJungleGreen};
    color: ${watermelon};
    font-family: Montserrat;
    margin: 0;
  }
`

export const GlobalStyles = () => <Global styles={globalStyles} />
