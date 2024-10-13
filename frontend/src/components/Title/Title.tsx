import { StyledTitle } from './Title.styles'
import { TitleProps } from './Title.types'

export const Title = ({ title }: TitleProps) => (
  <StyledTitle>{title}</StyledTitle>
)
