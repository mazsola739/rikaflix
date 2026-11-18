type Variant = 'header' | 'info'
type MediaVariant = 'movies' | 'series'
export interface NavigationProps {
  allShowOfType?: MediaVariant
  openModal?: (type: 'add') => () => void
  type: Variant
}
