import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { Show as SharedShow, ShowQuery, SortBy, TypeFilter } from 'shared/show'
import { SORT_OPTIONS } from 'shared/show'
import { queryShows } from 'shared/showQuery'
import { Show } from 'types'

/**
 * "Browser mode" backend, used when the app is built without a server
 * (GitHub Pages, `VITE_DATA_SOURCE=browser`).
 *
 * It answers the same requests as the Express API (see backend/README.md) using
 * the bundled data set and the same filtering/sorting code (`shared/showQuery`).
 * Additions, edits and deletions are kept in this browser's localStorage, so every
 * visitor has their own copy; `resetBrowserData()` brings back the original list.
 */

const STORAGE_KEY = 'rika-netflix:shows'

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
  const bundled = (await import('shows-data')).default as Show[]
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

/** Same defaults as the backend's query validator. */
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
      if (!id) return { data: queryShows(data as SharedShow[], parseQuery(searchParams)) }
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
