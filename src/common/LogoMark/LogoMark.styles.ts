import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { LogoMarkStyleProps } from './LogoMark.types'

/** The back ribbon rises from the floor. */
const growUp = keyframes`
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
`

/** The front ribbon is drawn along its path (pathLength is 1). */
const draw = keyframes`
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
`

/** The leg unrolls downwards from under the bowl. */
const unroll = keyframes`
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
`

const animatedRibbons = css`
  .stem,
  .leg {
    transform-box: fill-box;
  }

  .stem {
    transform-origin: bottom;
    animation: ${growUp} 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  .bowl {
    stroke-dasharray: 1;
    animation: ${draw} 0.6s 0.35s cubic-bezier(0.6, 0, 0.3, 1) both;
  }

  .leg {
    transform-origin: top;
    animation: ${unroll} 0.4s 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  @media (prefers-reduced-motion: reduce) {
    .stem,
    .bowl,
    .leg {
      animation: none;
      stroke-dashoffset: 0;
    }
  }
`

export const LogoMarkSvg = styled.svg<LogoMarkStyleProps>`
  display: block;
  overflow: visible;

  ${({ animated }) => animated && animatedRibbons}
`
