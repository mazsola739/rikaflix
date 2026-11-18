import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { charcoalGrey, darkJungleGreen, davyGrey, watermelon, white } from 'styles/variables'
import { ButtonProps } from './Button.types'

const buttonColors = {
  active: {
    border: 'none',
    background: `${watermelon}`,
    color: `${darkJungleGreen}`,
    hoverBackground: `${watermelon}`,
    hoverColor: `${darkJungleGreen}`,
    cursor: 'pointer'
  },
  basic: {
    border: 'none',
    background: `${charcoalGrey}`,
    color: `${white}`,
    hoverBackground: `${davyGrey}`,
    hoverColor: `${watermelon}`,
    cursor: 'pointer'
  },
  blurred: {
    border: 'none',
    background: `${davyGrey + 'D8'}`,
    color: `${watermelon}`,
    hoverBackground: `${davyGrey + 'D8'}`,
    hoverColor: `${watermelon}`,
    cursor: 'pointer'
  },
  disabled: {
    border: 'none',
    background: `${charcoalGrey}`,
    color: `${davyGrey}`,
    hoverBackground: `${charcoalGrey}`,
    hoverColor: `${davyGrey}`,
    cursor: 'auto'
  },
  empty: {
    border: `1.5px solid ${watermelon}`,
    background: 'transparent',
    color: `${watermelon}`,
    hoverBackground: 'transparent',
    hoverColor: `${watermelon}`,
    cursor: 'pointer'
  },
  full: {
    border: 'none',
    background: `${watermelon}`,
    color: `${white}`,
    hoverBackground: `${watermelon}`,
    hoverColor: `${white}`,
    cursor: 'pointer'
  }
}

const buttonFont = {
  bold: { fontSize: '20px', fontWeight: '600' },
  light: { fontSize: '20px', fontWeight: '500' },
  tiny: { fontSize: '14px', fontWeight: '400' }
}

const buttonSize = {
  large: {
    width: '230px',
    height: '55px'
  },
  medium: {
    width: '200px',
    height: '45px'
  },
  normal: {
    width: '200px',
    height: '55px'
  },
  small: {
    width: '36px',
    height: '36px'
  }
}

export const StyledButton = styled.button<ButtonProps>(
  ({ color = 'full', font = 'light', size = 'normal' }) => css`
    border: ${buttonColors[color].border};
    border-radius: 4px;
    padding: 0;
    width: ${buttonSize[size].width};
    height: ${buttonSize[size].height};

    background: ${buttonColors[color].background};

    font-size: ${buttonFont[font].fontSize};
    font-family: Montserrat;
    font-weight: ${buttonFont[font].fontWeight};
    font-style: normal;
    text-transform: uppercase;
    color: ${buttonColors[color].color};

    &:hover {
      cursor: ${buttonColors[color].cursor};
      background-color: ${buttonColors[color].hoverBackground};

      color: ${buttonColors[color].hoverColor};
    }
  `
)
