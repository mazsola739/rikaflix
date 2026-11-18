import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { Show as QueryShow, ShowQuery, SortBy, TypeFilter } from './showQuery.types'
import { SORT_OPTIONS } from './showQuery.types'
import { queryShows } from './showQuery'
import { Show } from 'types'

/**
 * The app's "backend", running inside the browser: there is no server.
 *
 * RTK Query sends REST-style requests (`GET shows/?…`, `POST shows`, `PUT shows/:id`,
 * `DELETE shows/:id`) and this base query answers them from the data set bundled with
 * the app (`src/data/shows.json`), using `queryShows()` for filtering, sorting and paging.
 * Additions, edits and deletions are kept in this browser's localStorage, so every
 * visitor has their own copy; `resetBrowserData()` brings back the original list.
 */

/** localStorage key of the visitor's edited copy of the data set. */
export const STORAGE_KEY = 'rika-netflix:shows'

let shows: Show[] | undefined

const loadShows = async (): Promise<Show[]> => {
  if (shows) return shows
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return (shows = JSON.parse(saved) as Show[])
  } catch {
    // Storage disabled or corrupted: fall back to the bundled data.
  }
  // Loaded lazily so the ~370 KB data set is a separate chunk.
  const bundled = (await import('../../data/shows.json')).default as Show[]
  return (shows = structuredClone(bundled))
}

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shows))
  } catch {
    // Storage full or disabled: changes stay in memory until the page is reloaded.
  }
}

/** Forgets every local change and reloads the original data set. */
export const resetBrowserData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing stored.
  }
  shows = undefined
}

/** True when local changes exist (used to show the reset button). */
export const hasBrowserChanges = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null
  } catch {
    return false
  }
}

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

/** Reads the list query; missing or invalid values fall back to the defaults. */
const parseQuery = (params: URLSearchParams): ShowQuery => {
  const sortBy = params.get('sortBy') as SortBy
  const toNumber = (value: string | null, fallback: number) => (Number(value) > 0 ? Math.floor(Number(value)) : fallback)
  return {
    type: (params.get('type') || 'All') as TypeFilter,
    title: params.get('title') ?? '',
    genres: (params.get('genres') ?? '')
      .split(',')
      .map(genre => genre.trim())
      .filter(genre => genre && genre !== 'All'),
    sortBy: SORT_OPTIONS.includes(sortBy) ? sortBy : 'Release date desc',
    limit: Math.min(toNumber(params.get('limit'), 15), 100),
    page: toNumber(params.get('page'), 1)
  }
}

const normalize = (show: Partial<Show>): Partial<Show> => {
  const { id, ...rest } = show // the id never comes from the request body
  return rest.genres ? { ...rest, genres: [...new Set(rest.genres.map(capitalize))] } : rest
}

const notFound = { error: { status: 404, data: { message: 'Show not found' } } as FetchBaseQueryError }

export const browserBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async args => {
  const result = await handleRequest(args)
  // Always hand out copies: RTK Query (Immer) deep-freezes cached results, which
  // would otherwise freeze our own in-memory list and break later edits.
  return 'data' in result ? { data: structuredClone(result.data) } : result
}

const handleRequest = async (args: string | FetchArgs): Promise<{ data: unknown } | { error: FetchBaseQueryError }> => {
  const { url, method = 'GET', body } = typeof args === 'string' ? { url: args } : args
  const { pathname, searchParams } = new URL(url, 'http://browser-mode/')
  const [, id] = pathname.split('/').filter(Boolean) // "shows" or "shows/<id>"
  const data = await loadShows()
  const index = id ? data.findIndex(show => show.id === id) : -1

  switch (method.toUpperCase()) {
    case 'GET':
      if (!id) return { data: queryShows(data as QueryShow[], parseQuery(searchParams)) }
      return index === -1 ? notFound : { data: data[index] }

    case 'POST': {
      const show = { ...normalize(body as Show), id: crypto.randomUUID() } as Show
      data.push(show)
      persist()
      return { data: show }
    }

    case 'PUT':
      if (index === -1) return notFound
      data[index] = { ...data[index], ...normalize(body as Show), id: data[index].id }
      persist()
      return { data: data[index] }

    case 'DELETE':
      if (index === -1) return notFound
      data.splice(index, 1)
      persist()
      return { data: { id } }

    default:
      return { error: { status: 405, data: { message: `${method} not supported` } } as FetchBaseQueryError }
  }
}
