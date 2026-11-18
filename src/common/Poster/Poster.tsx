import { fallback } from 'assets'
import { imageUrl } from 'utils'
import { PosterObject } from './Poster.styles'
import { PosterProps } from './Poster.types'

export const Poster = ({ data, title }: PosterProps) => {
  return (
    <PosterObject data={imageUrl(data)} type="image/png" role="img" aria-label={`${title} cover image`}>
      <img src={fallback} alt={fallback} />
    </PosterObject>
  )
}
