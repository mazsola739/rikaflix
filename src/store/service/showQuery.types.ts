/** Kind of media a show can be. */
export const SHOW_TYPES = ['Movie', 'TV show'] as const
export type ShowType = (typeof SHOW_TYPES)[number]

/**
 * A movie or TV show as stored in `src/data/shows.json`.
 * Field names follow the TMDB naming the frontend uses.
 */
export interface Show {
  id: string
  type: ShowType
  title: string
  tagline: string
  /** Rating between 0 and 10. */
  vote_average: number
  /** Release date in `YYYY.MM.DD` format. */
  release_date: string
  poster_path: string
  /** Backdrop image URL, or an empty string when there is none. */
  backdrop_path: string
  overview: string
  genres: string[]
  /** Runtime in minutes. */
  runtime: number
}

/** Payload for creating a show: everything except the generated id. */
export type ShowInput = Omit<Show, 'id'>

/** Type filter accepted by the list endpoint (`All` disables the filter). */
export type TypeFilter = 'All' | ShowType

export const SORT_OPTIONS = ['Release date asc', 'Release date desc', 'Rating asc', 'Rating desc', 'Title asc', 'Title desc'] as const
export type SortBy = (typeof SORT_OPTIONS)[number]

/** Parsed list query (`GET shows/?…` in browserBaseQuery). */
export interface ShowQuery {
  type: TypeFilter
  title: string
  /** Genres to match (a show matches if it has any of them). Empty = no genre filter. */
  genres: string[]
  sortBy: SortBy
  limit: number
  page: number
}

/** Result of a list query. */
export interface ShowListResponse {
  /** Every show of the requested type (used for the header posters and the random pick). */
  allShowOfType: Show[]
  /** Every show matching type + title + genre filters (used to build the genre list). */
  filteredShows: Show[]
  /** The sorted shows on the requested page. */
  showsOnPage: Show[]
  /** Number of shows matching the filters. */
  foundShows: number
}
