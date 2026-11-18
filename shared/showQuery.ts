import { Show, ShowListResponse, ShowQuery, SortBy } from './show'

const byReleaseDate = (a: Show, b: Show) => a.release_date.localeCompare(b.release_date)
const byRating = (a: Show, b: Show) => a.vote_average - b.vote_average
const byTitle = (a: Show, b: Show) => a.title.localeCompare(b.title)

const comparators: Record<SortBy, (a: Show, b: Show) => number> = {
  'Release date asc': byReleaseDate,
  'Release date desc': (a, b) => byReleaseDate(b, a),
  'Rating asc': byRating,
  'Rating desc': (a, b) => byRating(b, a),
  'Title asc': byTitle,
  'Title desc': (a, b) => byTitle(b, a)
}

/**
 * Filters, sorts and paginates shows. Pure function: used by the backend (GET /api/shows)
 * and by the frontend in browser mode (GitHub Pages), so both behave the same.
 *
 * Filters are combined with AND: type, then title (case-insensitive substring),
 * then genres (a show matches if it has at least one of the requested genres).
 */
export const queryShows = (shows: Show[], query: ShowQuery): ShowListResponse => {
  const allShowOfType = query.type === 'All' ? shows : shows.filter(show => show.type === query.type)

  const title = query.title.trim().toLowerCase()
  const byTitleMatch = title ? allShowOfType.filter(show => show.title.toLowerCase().includes(title)) : allShowOfType

  const wanted = new Set(query.genres.map(genre => genre.toLowerCase()))
  const filteredShows = wanted.size ? byTitleMatch.filter(show => show.genres.some(genre => wanted.has(genre.toLowerCase()))) : byTitleMatch

  const start = (query.page - 1) * query.limit
  const showsOnPage = [...filteredShows].sort(comparators[query.sortBy]).slice(start, start + query.limit)

  return { allShowOfType, filteredShows, showsOnPage, foundShows: filteredShows.length }
}
