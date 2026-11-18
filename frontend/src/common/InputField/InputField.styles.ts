import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { white, charcoalGrey } from 'styles/variables'
import { InputProps } from './InputField.types'

const fieldOpacity = {
  white: {
    color: `${white}`
  },
  blurred: {
    color: `${white + '4D'}`
  }
}

export const StyledInput = styled.input<InputProps>(
  ({ colorVariant = 'white' }) => css`
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 54px;
    padding: 15px;

    background-color: ${charcoalGrey};

    font-size: 20px;
    font-weight: normal;
    font-family: Montserrat;
    color: ${fieldOpacity[colorVariant].color};

    &::placeholder {
      color: ${white + '4D'};
    }

    &::-webkit-input-placeholder {
      text-transform: capitalize;
    }

    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  `
)
