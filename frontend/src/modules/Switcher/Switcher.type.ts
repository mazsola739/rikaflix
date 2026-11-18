import type { ReactElement } from 'react'

export interface SwitcherProps<Option> {
  options: readonly Option[]
  defaultSelectedItem: Option
  renderItem: (option: Option) => ReactElement
  name: string
  slideVerticalPosition?: string
}

export interface HorizontalPositionProps {
  leftPosition: number
  rightPosition: number
  direction: 'left' | 'right' | undefined
}

export interface SwitchSlideProps {
  horizontalPosition: HorizontalPositionProps
  bottomPosition: string
}
