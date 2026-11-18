import { http, HttpResponse } from 'msw'
import { Show } from 'types'

/** Small, fixed data set the mocked API serves in tests. */
export const testShows: Show[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    type: 'Movie',
    title: 'Iron Man',
    tagline: "Heroes aren't born. They're built.",
    vote_average: 7.9,
    release_date: '2008.04.30',
    poster_path: 'https://example.com/iron-man.jpg',
    backdrop_path: '',
    overview: 'Tony Stark builds a suit.',
    genres: ['Action', 'Sci-fi'],
    runtime: 126
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    type: 'TV show',
    title: 'Loki',
    tagline: 'Glorious purpose.',
    vote_average: 8.2,
    release_date: '2021.06.09',
    poster_path: 'https://example.com/loki.jpg',
    backdrop_path: '',
    overview: 'The god of mischief.',
    genres: ['Fantasy', 'Drama'],
    runtime: 50
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    type: 'TV show',
    title: 'The Falcon and the Winter Soldier',
    tagline: 'Honor the shield.',
    vote_average: 7.3,
    release_date: '2021.03.19',
    poster_path: 'https://example.com/falcon.jpg',
    backdrop_path: '',
    overview: 'Sam Wilson and Bucky Barnes team up in a global adventure.',
    genres: ['Drama', 'Action', 'Adventure', 'Sci-fi', 'Fantasy'],
    runtime: 50
  }
]

/**
 * Mock of the backend API (replaces the old Mirage server in tests).
 * It returns the same response shape as `GET /api/shows`, without filtering:
 * component tests only need data to render, the real query logic is tested in the backend.
 */
export const handlers = [
  http.get('*/api/shows', () =>
    HttpResponse.json({
      allShowOfType: testShows,
      filteredShows: testShows,
      showsOnPage: testShows,
      foundShows: testShows.length
    })
  ),
  http.get('*/api/shows/:id', ({ params }) => {
    const show = testShows.find(item => item.id === params.id)
    return show ? HttpResponse.json(show) : HttpResponse.json({ message: 'Show not found' }, { status: 404 })
  }),
  http.post('*/api/shows', async ({ request }) => HttpResponse.json({ ...((await request.json()) as object), id: 'new-id' }, { status: 201 })),
  http.put('*/api/shows/:id', async ({ request, params }) => HttpResponse.json({ ...((await request.json()) as object), id: params.id })),
  http.delete('*/api/shows/:id', ({ params }) => HttpResponse.json({ id: params.id }))
]
