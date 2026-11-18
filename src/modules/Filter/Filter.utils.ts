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

/** The space between two genres, and between the last genre and "...more" (see Filter.styles and Switcher.styles). */
export const GENRE_GAP = 15

/**
 * How many of the first genres fit in `available` pixels. When some don't fit, room is kept for "...more"
 * (`moreWidth` wide), which lists the rest. At least 1 and at most `max` genres are shown.
 */
export const countFittingGenres = (widths: number[], available: number, moreWidth: number, max: number) => {
  const rowWidth = (count: number) => widths.slice(0, count).reduce((sum, width) => sum + width, 0) + GENRE_GAP * (count - 1)

  if (widths.length <= max && rowWidth(widths.length) <= available) return widths.length

  let count = Math.min(widths.length, max)
  while (count > 1 && rowWidth(count) + GENRE_GAP + moreWidth > available) count--

  return count
}

/** Measures the width of a genre written in the font of `element` (upper case, with its letter spacing). */
export const createGenreMeasurer = (element: HTMLElement) => {
  const context = document.createElement('canvas').getContext('2d')
  if (!context) return undefined

  const style = getComputedStyle(element)
  context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  const letterSpacing = parseFloat(style.letterSpacing) || 0

  return (text: string) => Math.ceil(context.measureText(text.toUpperCase()).width + letterSpacing * text.length)
}
