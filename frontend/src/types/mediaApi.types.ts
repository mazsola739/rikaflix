import { SortBy } from 'modules/Sort/Sort.types'
import { Show } from './MediaTypes'

type Variant = 'All' | 'Movie' | 'TV show'

export type GetShowsProps = Partial<Pick<Show, 'title'>> & {
  type: Variant
  genres: string[]
  sortBy: SortBy
  limit: string
  page: string
}
