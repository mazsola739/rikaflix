import { StyledCardTitle } from './CardTitle.styles'
import { CardTitleProps } from './CardTitle.types'

export const CardTitle = ({ title }: CardTitleProps) => (
  <StyledCardTitle>{title}</StyledCardTitle>
)
