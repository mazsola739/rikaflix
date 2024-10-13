import { StyledGenre } from './Genre.styles'
import { GenreProps } from './Genre.types'

export const Genre = ({ genre }: GenreProps) => (
  <StyledGenre>{genre}</StyledGenre>
)
