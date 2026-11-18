import { TextareaHTMLAttributes } from 'react'

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelName: string
}
