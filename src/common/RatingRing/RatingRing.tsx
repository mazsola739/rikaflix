import { RatingWrapper, Rating } from './RatingRing.styles'
import { RatingRingProps } from './RatingRing.types'
import { ratingDeg, restDeg, rating } from './RatingRing.utils'

export const RatingRing = ({ vote_average }: RatingRingProps) => {
  return (
    <RatingWrapper vote_average={vote_average} ratingDeg={ratingDeg(vote_average)} restDeg={restDeg(vote_average)}>
      <Rating>{rating(vote_average)}</Rating>
    </RatingWrapper>
  )
}
