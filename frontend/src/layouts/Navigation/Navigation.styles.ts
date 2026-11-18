import { PLUS_ICON, LENS_ICON, RANDOM_ICON, MOVIES_ICON, SERIES_ICON } from 'assets'
import styled from '@emotion/styled'
import { watermelon } from 'styles/variables'

export const NavigationContainer = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-column-gap: 10px;
  align-items: center;
  justify-content: space-between;

  width: 1200px;
  height: 70px;
  padding: 0 60px;
`
export const StyledMovie = styled(MOVIES_ICON)`
  width: 20px;
  height: 20px;

  color: ${watermelon};
`

export const StyledSeries = styled(SERIES_ICON)`
  width: 20px;
  height: 20px;

  color: ${watermelon};
`

export const StyledRandom = styled(RANDOM_ICON)`
  width: 22px;
  height: 22px;

  color: ${watermelon};
`

export const StyledLens = styled(LENS_ICON)`
  width: 20px;
  height: 20px;

  color: ${watermelon};
`

export const StyledPlus = styled(PLUS_ICON)`
  width: 15px;
  height: 15px;

  color: ${watermelon};
`
