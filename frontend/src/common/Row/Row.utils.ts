import { netflixLogos } from 'assets'
import { Show } from 'types'

export const netflixArray = [netflixLogos.netflix1, netflixLogos.netflix2, netflixLogos.netflix3, netflixLogos.netflix4, netflixLogos.netflix5]

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
