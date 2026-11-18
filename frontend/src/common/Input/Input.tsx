import { StyledInput } from './Input.styles'
import { InputProps } from './Input.types'

export const Input = ({ name, placeholder, value, onChange }: InputProps) => {
  return <StyledInput name={name} placeholder={placeholder} value={value} onChange={onChange} />
}
