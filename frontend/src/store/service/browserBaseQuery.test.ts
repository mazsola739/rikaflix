import type { BaseQueryApi } from '@reduxjs/toolkit/query'
import { browserBaseQuery, hasBrowserChanges, resetBrowserData } from './browserBaseQuery'

// browserBaseQuery ignores the RTK Query api/extraOptions arguments.
const call = (args: Parameters<typeof browserBaseQuery>[0]) => browserBaseQuery(args, {} as BaseQueryApi, {}) as Promise<{ data?: any; error?: any }> // eslint-disable-line @typescript-eslint/no-explicit-any

const newShow = {
  type: 'Movie',
  title: 'Rika: The Movie',
  tagline: 'Made with coffee.',
  vote_average: 9.9,
  release_date: '2026.11.18',
  poster_path: 'images/posters/rika.jpg',
  backdrop_path: '',
  overview: 'A developer merges three projects into one.',
  genres: ['comedy'],
  runtime: 90
}

beforeEach(() => {
  localStorage.clear()
  resetBrowserData()
})

describe('browserBaseQuery (GitHub Pages mode)', () => {
  it('lists the bundled shows with the backend defaults', async () => {
    const { data } = await call('shows/?type=All&title=&genres=All&sortBy=Release+date+desc&limit=15&page=1')

    expect(data.foundShows).toBe(614)
    expect(data.showsOnPage).toHaveLength(15)
  })

  it('filters by type and genre like the backend', async () => {
    const { data } = await call('shows/?type=TV+show&genres=Comedy&sortBy=Rating+desc&limit=3&page=1')

    expect(data.allShowOfType).toHaveLength(180)
    expect(data.showsOnPage.map((show: { title: string }) => show.title)).toEqual(['Friends', 'House', 'Archer'])
  })

  it('adds a show, keeps it in localStorage, and reset removes it', async () => {
    const { data: created } = await call({ url: 'shows', method: 'POST', body: { ...newShow, id: 'ignored' } })

    expect(created.id).not.toBe('ignored')
    expect(created.genres).toEqual(['Comedy'])
    expect(hasBrowserChanges()).toBe(true)
    expect((await call(`shows/${created.id}`)).data.title).toBe('Rika: The Movie')

    resetBrowserData()

    expect(hasBrowserChanges()).toBe(false)
    expect((await call(`shows/${created.id}`)).error.status).toBe(404)
  })

  it('edits and deletes a show', async () => {
    const { data } = await call('shows/?limit=1')
    const first = data.showsOnPage[0]

    const { data: updated } = await call({ url: `shows/${first.id}`, method: 'PUT', body: { ...first, id: 'other', vote_average: 1 } })
    expect(updated).toMatchObject({ id: first.id, vote_average: 1 })

    await call({ url: `shows/${first.id}`, method: 'DELETE' })
    expect((await call(`shows/${first.id}`)).error.status).toBe(404)
    expect((await call('shows/?limit=1')).data.foundShows).toBe(613)
  })

  it('keeps working after RTK Query freezes a returned result', async () => {
    const { data } = await call('shows/?limit=1')
    // RTK Query (Immer) deep-freezes cached results like this.
    Object.freeze(data.allShowOfType)
    data.allShowOfType.forEach(Object.freeze)

    await call({ url: `shows/${data.showsOnPage[0].id}`, method: 'DELETE' })

    expect((await call('shows/?limit=1')).data.foundShows).toBe(613)
  })

  it('answers 404 for unknown ids', async () => {
    expect((await call({ url: 'shows/nope', method: 'PUT', body: {} })).error.status).toBe(404)
    expect((await call({ url: 'shows/nope', method: 'DELETE' })).error.status).toBe(404)
  })
})
