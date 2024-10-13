import { StyledCardTagline } from './CardTagline.styles'
import { CardTaglineProps } from './CardTagline.types'

export const CardTagline = ({ tagline }: CardTaglineProps) => (
  <StyledCardTagline>{tagline}</StyledCardTagline>
)
