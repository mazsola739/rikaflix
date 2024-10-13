import { Genre, CardTagline, CardTitle, CardYear, Poster } from '..'
import { StyledCard } from './Card.styles'
import { CardProps } from './Card.types'

export const Card = ({ show }: CardProps) => {
  const { poster, title, tagline, released, genres } = show
  const year = released.split('.')[0]
  const genre = genres.join(', ')

  return (
    <StyledCard>
      <Poster poster={poster} title={title} />
      <CardTitle title={title} />
      <CardTagline tagline={tagline} />
      <CardYear year={year} />
      <Genre genre={genre} />
    </StyledCard>
  )
}
