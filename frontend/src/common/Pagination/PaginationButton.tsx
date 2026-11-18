import { Button } from 'common'
import { PaginationButtonProps } from './PaginationButton.types'

export const PaginationButton = ({ color, ...props }: PaginationButtonProps) => <Button color={color || 'basic'} font="tiny" size="small" {...props} />
