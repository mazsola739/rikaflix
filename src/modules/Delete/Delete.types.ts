import { Show } from 'types'

export type DeleteProps = {
  toggle: () => void
  title: string
  year: number
} & Pick<Show, 'id'>

export type ManageRequestProps<Type> = {
  request: (props: Type) => Promise<{ data: unknown } | { error: unknown }>
  props: Type
}
