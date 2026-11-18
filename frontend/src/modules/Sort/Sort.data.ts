import { SortOrder, SortMenuItem, SortLabel } from './Sort.types'

export const sortOrder: SortOrder[] = ['desc', 'asc']

export const menuItems: SortMenuItem[] = [
  { label: 'Release date', type: 'numeric' },
  { label: 'Rating', type: 'numeric' },
  { label: 'Title', type: 'alphabetical' }
]

export const DEFAULT_SORT_OPTION: SortLabel = 'Release date'
