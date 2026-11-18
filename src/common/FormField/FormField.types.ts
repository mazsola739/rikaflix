import { LabelHTMLAttributes } from 'react'

export interface FormFieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  labelName: string
  name: string
}
