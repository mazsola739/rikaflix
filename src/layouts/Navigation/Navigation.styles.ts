import { PLUS_ICON, LENS_ICON, RANDOM_ICON, MOVIES_ICON, SERIES_ICON } from 'assets'
import styled from '@emotion/styled'
import { phoneQuery, tabletQuery, watermelon } from 'styles/variables'

export const NavigationContainer = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 200px));
  grid-column-gap: 10px;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 70px;
  padding: 0 60px;

  /* The buttons share the width of their column instead of a fixed 200px. */
  & button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    width: 100%;
  }

  ${tabletQuery} {
    padding: 0 24px;
  }

  /* Narrow screens: the logo on the left, icon-only buttons on the right. */
  ${phoneQuery} {
    grid-template-columns: 1fr repeat(4, 48px);
    grid-column-gap: 8px;

    padding: 0 16px;

    & > a:first-of-type {
      justify-self: start;
    }

    & > a:first-of-type button {
      width: auto;
      padding: 0 16px;
    }
  }
`

/** The button text: hidden on narrow screens, but still read out by screen readers. */
export const NavLabel = styled.span`
  ${phoneQuery} {
    position: absolute;

    overflow: hidden;
    clip-path: inset(50%);

    width: 1px;
    height: 1px;

    white-space: nowrap;
  }
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
