import { ButtonHTMLAttributes } from 'react'

export type SelectValues = {
  setSelectValues: (values: string[]) => void
  selectValues: string[]
}

export type MultiSelectProps = SelectValues & {
  selectItems: {
    name: string
    labelName: string
  }[]
}

type ColorVariant = 'white' | 'blurred'

export interface SelectHeaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
  color: ColorVariant
}
