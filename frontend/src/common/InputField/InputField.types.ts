import { InputHTMLAttributes } from 'react'

export interface InputFieldProps {
  labelName: string
  selectValues: string
}

export type ColorVariant = 'white' | 'blurred'

export type InputProps = {
  colorVariant: ColorVariant
} & InputHTMLAttributes<HTMLInputElement>
