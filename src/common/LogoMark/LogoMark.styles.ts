import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { LogoMarkStyleProps } from './LogoMark.types'

/** The outline is drawn along its path (pathLength is 1). */
const draw = keyframes`
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
`

/** Then the letter fills in. */
const fillIn = keyframes`
  from { fill-opacity: 0; }
  to { fill-opacity: 1; }
`

const drawnLetter = css`
  .outline {
    stroke-dasharray: 1;
    animation: ${draw} 0.9s cubic-bezier(0.6, 0, 0.3, 1) both;
  }

  .letter {
    animation: ${fillIn} 0.45s 0.75s ease-out both;
  }

  @media (prefers-reduced-motion: reduce) {
    .outline,
    .letter {
      animation: none;
    }

    .outline {
      stroke-dashoffset: 0;
    }
  }
`

export const LogoMarkSvg = styled.svg<LogoMarkStyleProps>`
  display: block;
  overflow: visible;

  ${({ animated }) => animated && drawnLetter}
`
