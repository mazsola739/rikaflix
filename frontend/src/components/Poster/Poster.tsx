import { StyledPoster } from './Poster.styles'
import { PosterProps } from './Poster.types'

export const Poster = ({ poster, title }: PosterProps) => (
  <StyledPoster src={poster} alt={title} />
)
