import { Show } from 'types'

/** Small, fixed data set the app uses in tests instead of the 614 bundled shows (see setup.ts). */
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
