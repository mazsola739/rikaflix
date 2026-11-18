import { X_MARK_ICON } from 'assets'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { darkJungleGreen, white, watermelon } from 'styles/variables'

const MenuAnimation = keyframes`
  0% {
    top: -23px;

    opacity: 0;
  }
  100% {
    top: -3px;

    opacity: 0.8;
  }
`

export const CardMenuContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: -3px;
  right: -3px;

  display: flex;
  flex-direction: column;

  animation: ${MenuAnimation} 0.5s;

  box-shadow: 0 0 20px #000000aa;
  border-radius: 4px;
  border-top-right-radius: 0;
  width: 190px;
  height: 110px;

  background-color: ${darkJungleGreen};
`

export const CardMenuIconHolder = styled.div`
  display: flex;
  justify-content: end;

  margin: 4px;
`

export const StyledClose = styled(X_MARK_ICON)`
  font-size: 24px;
  color: ${white};
`

export const CardMenuOptionList = styled.ul`
  list-style-type: none;

  margin: 0;
  padding: 0;
`

export const CardMenuOptionItem = styled.li`
  display: flex;
  align-items: center;

  opacity: 0.8;

  height: 36px;
  padding-left: 20px;

  font-size: 16px;
  font-weight: 500;

  &:hover {
    opacity: 1;

    background-color: ${watermelon};
  }
`
