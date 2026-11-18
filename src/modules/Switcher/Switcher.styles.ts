import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { watermelon } from 'styles/variables'
import { HorizontalPositionProps, SwitchSlideProps } from './Switcher.type'

export const SwitchOptions = styled.div`
  position: relative;

  display: inline-flex;
  gap: 15px;
`

export const SwitchLabel = styled.label`
  position: relative;

  cursor: pointer;
`

export const SwitchRadio = styled.input`
  position: absolute;
  top: 0;
  left: 0;

  visibility: hidden;
`

const getPositionStyle = ({ leftPosition, rightPosition, direction }: HorizontalPositionProps) => css`
  left: ${`${leftPosition}px`};
  right: ${`${rightPosition}px`};
  transition: ${direction === 'right' ? 'right 0.3s, left 0.3s 0.3s' : 'left 0.3s, right 0.3s 0.3s'};
`
export const SwitchSlide = styled.div<SwitchSlideProps>(
  ({ bottomPosition, horizontalPosition }) => css`
    position: absolute;
    z-index: 1;
    bottom: ${bottomPosition};

    border-radius: 2px;
    height: 3px;

    background-color: ${watermelon};
    ${getPositionStyle(horizontalPosition)}
  `
)
