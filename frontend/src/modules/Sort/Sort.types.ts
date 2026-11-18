export type SortLabel = 'Release date' | 'Rating' | 'Title'
export type SortOrder = 'desc' | 'asc'
export type SortType = 'numeric' | 'alphabetical'

export interface SortMenuItem {
  label: SortLabel
  type: SortType
}

export type SortBy = `${SortLabel} ${SortOrder}`

export interface SortProps {
  changeMovieSorting: (props: SortBy) => void
}

export type ItemClickHandler = (params: { label: SortLabel; sortOrder: SortOrder }) => void

export interface SortOrderIconProps {
  sortOrder: 'asc' | 'desc'
  type: 'numeric' | 'alphabetical'
  className?: string
}
