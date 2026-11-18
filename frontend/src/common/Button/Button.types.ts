import { ButtonHTMLAttributes } from 'react'

type ButtonColor = 'active' | 'basic' | 'blurred' | 'disabled' | 'empty' | 'full'
type ButtonVariant = 'large' | 'medium' | 'normal' | 'small'
type FontWeight = 'bold' | 'light' | 'tiny'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor
  font?: FontWeight
  size?: ButtonVariant
}
