import { PLUS_ICON } from 'assets'
import styled from '@emotion/styled'
import { darkJungleGreen } from 'styles/variables'

export const HeaderWrapper = styled.header`
  position: relative;

  overflow: hidden;

  height: 400px;
`

export const HeaderContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;

  width: 100%;
  height: 400px;

  background: linear-gradient(90deg, ${darkJungleGreen} 0%, ${darkJungleGreen} 1%, transparent 50%, ${darkJungleGreen} 99%, ${darkJungleGreen} 100%);
  backdrop-filter: blur(3px) brightness(0.8);
`

export const StyledPlus = styled(PLUS_ICON)`
  font-size: 15px;
`

export const HeaderSearchContainer = styled.div`
  padding: 0 120px 0 120px;
`

export const Heading = styled.h2`
  margin: 40px 0;

  opacity: 0.9;

  font-size: 40px;
  font-weight: 300;
  text-transform: uppercase;
`
