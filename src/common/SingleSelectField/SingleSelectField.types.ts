import { SelectHTMLAttributes } from 'react'

export interface SingleSelectFieldProps {
  labelName: string
  selectItems: string[]
  setSelectValues: (values: string) => void
  selectValues: string
}

type ColorVariant = 'white' | 'blurred'

export interface ColorProps extends SelectHTMLAttributes<HTMLSelectElement> {
  color: ColorVariant
}
