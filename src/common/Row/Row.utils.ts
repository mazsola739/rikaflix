import { Show } from 'types'
import { LogoTileVariant } from './Row.types'

/** One logo tile starts each group of posters. */
export const LOGO_TILES: LogoTileVariant[] = ['red', 'redStripes', 'colorStripes', 'white', 'black']

export const getAllPosters = (shows: Show[]) => shows.map(media => media.poster_path)

export const getRandomPoster = (allPosters: string[], numberOfPosters: number) => {
  const result = []
  for (let i = 0; i < numberOfPosters; i++) {
    const random = Math.floor(Math.random() * allPosters.length)
    if (result.indexOf(allPosters[random]) !== -1) {
      continue
    }
    result.push(allPosters[random])
  }
  return result
}
