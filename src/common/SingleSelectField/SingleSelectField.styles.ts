import styled from '@emotion/styled'
import { white, charcoalGrey } from 'styles/variables'
import { ColorProps } from './SingleSelectField.types'

const fieldOpacity = {
  white: {
    color: `${white}`
  },
  blurred: {
    color: `${white + '4D'}`
  }
}

export const StyledSelect = styled.select<ColorProps>`
  width: 100%;
  height: 54px;
  padding: 15px;

  background-color: ${charcoalGrey};

  border: none;
  border-radius: 4px;

  font-size: 20px;
  font-weight: normal;
  font-family: Montserrat;

  color: ${({ color }) => fieldOpacity[color].color};
`

export const StyledOption = styled.option<ColorProps>`
  color: ${({ color }) => fieldOpacity[color].color};
`
