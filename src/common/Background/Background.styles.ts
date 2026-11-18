import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { BackgroundProps } from './Background.types'

const moveInLeft = keyframes`
  0% {
    transform: translateX(0); 
  }
  100% {
    transform: translateX(-4740px);
  }
`

const moveInRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(4740px);
  }
`

const positionMap = {
  top: '-100px',
  middle: '100px',
  bottom: '300px'
}

export const BackgroundWrapper = styled.div`
  position: relative;
  z-index: 0;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  height: 600px;
`

export const AnimatedRow = styled.div<BackgroundProps>(
  ({ direction = 'left', position = 'middle', time }) => css`
    position: absolute;
    top: ${positionMap[position]};
    ${direction === 'left' ? 'left' : 'right'}: 0;

    animation: ${direction === 'left' ? moveInLeft : moveInRight} ${time}s linear infinite;

    width: 5940px;
    height: 200px;
  `
)
