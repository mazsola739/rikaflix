import styled from '@emotion/styled'
import { watermelon, davyGrey, darkJungleGreen, white } from 'styles/variables'
import { RatingRingProps } from './RatingRing.types'

export const RatingWrapper = styled.div<RatingRingProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  width: 60px;
  height: 60px;

  background-image: ${({ ratingDeg, restDeg }) => `conic-gradient(${watermelon} 0deg, ${watermelon} ${ratingDeg}deg, ${davyGrey} 0deg, ${davyGrey} ${restDeg}deg)`};
`

export const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  width: 54px;
  height: 54px;

  background-color: ${darkJungleGreen};

  font-size: 20px;
  color: ${white + 'CC'};
`
