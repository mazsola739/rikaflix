import { ReactNode } from 'react'

export interface ModalProps {
  title: string
  isShown: boolean
  hide: () => void
  children?: ReactNode
}
