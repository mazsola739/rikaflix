import { Show } from 'types'

export const getAllGenres = (shows: Show[]) => {
  if (!shows) return ['All']

  const allGenres = Object.values(shows.map(media => media.genres))
    .flat(1)
    .map(genre => genre.replaceAll(/[" ]/g, ''))

  const countGenres: {
    [name: string]: number
  } = {}
  for (const i in allGenres) {
    countGenres[allGenres[i]] = (countGenres[allGenres[i]] || 0) + 1
  }

  const sortedGenres = Object.keys(countGenres).sort((a, b) => countGenres[b] - countGenres[a])

  const genres = ['All'].concat(sortedGenres)

  return genres
}
