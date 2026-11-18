import type { ReactElement } from 'react'

export interface SwitcherProps<Option> {
  options: readonly Option[]
  defaultSelectedItem: Option
  renderItem: (option: Option) => ReactElement
  name: string
  slideVerticalPosition?: string
  /** How many options are shown (the first ones). */
  limit?: number
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
