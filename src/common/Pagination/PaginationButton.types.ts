import { Button } from 'common'
import { ComponentPropsWithoutRef } from 'react'

type Variant = 'color' | 'font' | 'size'

export interface PaginationButtonProps extends Omit<ComponentPropsWithoutRef<typeof Button>, Variant> {
  color?: 'active' | 'disabled' | false
}
