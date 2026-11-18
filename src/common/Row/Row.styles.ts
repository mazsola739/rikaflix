import styled from '@emotion/styled'
import { LogoTileStyleProps, LogoTileVariant } from './Row.types'

const backgrounds: Record<LogoTileVariant, string> = {
  red: '#E50914',
  redStripes: 'repeating-linear-gradient(90deg, #000 0 7px, #7A0008 7px 15px, #E50914 15px 19px, #2B0003 19px 26px)',
  colorStripes:
    'repeating-linear-gradient(90deg, #E8703A 0 9px, #C2185B 9px 15px, #7B1FA2 15px 24px, #1E3A8A 24px 30px, #0F766E 30px 39px, #B45309 39px 45px)',
  white: '#FFFFFF',
  black: '#000000'
}

/** Same size as a poster (132 × 200), with the R in the middle. */
export const LogoTile = styled.div<LogoTileStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 132px;
  height: 200px;

  background: ${({ variant }) => backgrounds[variant]};
`
