import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { white, watermelon, charcoalGrey, darkJungleGreen, phoneQuery } from 'styles/variables'
import { SelectHeaderProps } from './MultiSelect.types'

const fieldOpacity = {
  white: {
    color: `${white}`
  },
  blurred: {
    color: `${white + '4D'}`
  }
}

const Triangle = css`
  &:after {
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent ${watermelon} transparent;
  }
`

export const SelectContainer = styled.div`
  position: relative;
`

export const SelectHeader = styled.button<SelectHeaderProps>`
  position: relative;

  border: none;
  border-radius: 5px;
  width: 100%;
  height: 54px;
  padding: 15px;

  background-color: ${charcoalGrey};

  font-size: 20px;
  text-align: left;
  font-weight: 300;
  font-family: Montserrat;
  color: ${({ color }) => fieldOpacity[color].color};

  &:hover {
    cursor: pointer;
  }
  &:after {
    position: absolute;
    content: '';
    top: 22px;
    right: 8px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    border-color: ${watermelon} transparent transparent transparent;
  }
  ${({ isOpen }) => isOpen && Triangle}
`

export const SelectDropDown = styled.ul`
  position: absolute;
  z-index: 10;
  top: 100%;

  display: grid;
  grid-template-columns: 49% 49%;
  grid-column-gap: 2%;

  ${phoneQuery} {
    grid-template-columns: 100%;
  }

  list-style: none;

  border-radius: 4px;

  margin: 0;
  width: 100%;
  padding: 10px;

  background-color: ${darkJungleGreen};
`
