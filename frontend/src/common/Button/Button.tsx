import { StyledButton } from './Button.styles'
import { ButtonProps } from './Button.types'

export const Button = ({ color, font, size, onClick, children }: ButtonProps) => {
  return (
    <StyledButton color={color} font={font} size={size} onClick={onClick}>
      {children}
    </StyledButton>
  )
}
