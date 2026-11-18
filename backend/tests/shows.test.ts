import fs from 'fs'
import os from 'os'
import path from 'path'

import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createApp } from '../src/app'
import { createShowRepository } from '../src/repositories/showRepository'
import { Show } from '../../shared/show'

const fixture: Show[] = [
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
    type: 'Movie',
    title: 'Avengers: Endgame',
    tagline: 'Avenge the fallen.',
    vote_average: 8.3,
    release_date: '2019.04.24',
    poster_path: 'https://example.com/endgame.jpg',
    backdrop_path: '',
    overview: 'The Avengers assemble once more.',
    genres: ['Action', 'Adventure'],
    runtime: 181
  }
]

const newShow = {
  type: 'Movie',
  title: 'Black Widow',
  tagline: 'Her world. Her secrets. Her legacy.',
  vote_average: 7.3,
  release_date: '2021.07.07',
  poster_path: 'https://example.com/black-widow.jpg',
  overview: 'Natasha confronts her past.',
  genres: ['action', 'thriller'],
  runtime: 134
}

let dataFile: string
let app: ReturnType<typeof createApp>

// Every test works on its own temp copy of the data, so the real data/shows.json is never touched.
beforeEach(() => {
  dataFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'rika-netflix-')), 'shows.json')
  fs.writeFileSync(dataFile, JSON.stringify(fixture))
  app = createApp(createShowRepository(dataFile))
})

afterEach(() => {
  fs.rmSync(path.dirname(dataFile), { recursive: true, force: true })
})

const readData = (): Show[] => JSON.parse(fs.readFileSync(dataFile, 'utf-8'))

describe('GET /api/shows', () => {
  it('returns every show with defaults (newest first, 15 per page)', async () => {
    const res = await request(app).get('/api/shows')

    expect(res.status).toBe(200)
    expect(res.body.foundShows).toBe(3)
    expect(res.body.allShowOfType).toHaveLength(3)
    expect(res.body.showsOnPage.map((show: Show) => show.title)).toEqual(['Loki', 'Avengers: Endgame', 'Iron Man'])
  })

  it('filters by type', async () => {
    const res = await request(app).get('/api/shows').query({ type: 'TV show' })

    expect(res.body.allShowOfType.map((show: Show) => show.title)).toEqual(['Loki'])
    expect(res.body.foundShows).toBe(1)
  })

  it('combines title search and genre filter', async () => {
    const res = await request(app).get('/api/shows').query({ title: 'man', genres: 'Action' })

    expect(res.body.showsOnPage.map((show: Show) => show.title)).toEqual(['Iron Man'])
  })

  it('matches any of several genres, case-insensitively', async () => {
    const res = await request(app).get('/api/shows').query({ genres: 'fantasy,Adventure', sortBy: 'Title asc' })

    expect(res.body.showsOnPage.map((show: Show) => show.title)).toEqual(['Avengers: Endgame', 'Loki'])
  })

  it('sorts and paginates', async () => {
    const res = await request(app).get('/api/shows').query({ sortBy: 'Rating desc', limit: 2, page: 2 })

    expect(res.body.foundShows).toBe(3)
    expect(res.body.showsOnPage.map((show: Show) => show.title)).toEqual(['Iron Man'])
  })

  it('rejects an unknown sort option', async () => {
    const res = await request(app).get('/api/shows').query({ sortBy: 'Popularity' })

    expect(res.status).toBe(400)
    expect(res.body.errors[0].field).toBe('sortBy')
  })
})

describe('GET /api/shows/:id', () => {
  it('returns one show', async () => {
    const res = await request(app).get(`/api/shows/${fixture[1].id}`)

    expect(res.status).toBe(200)
    expect(res.body.title).toBe('Loki')
  })

  it('answers 404 for an unknown id', async () => {
    const res = await request(app).get('/api/shows/nope')

    expect(res.status).toBe(404)
  })
})

describe('POST /api/shows', () => {
  it('creates a show with a generated id and normalized genres', async () => {
    const res = await request(app)
      .post('/api/shows')
      .send({ ...newShow, id: 'client-id-is-ignored' })

    expect(res.status).toBe(201)
    expect(res.body.id).toMatch(/^[0-9a-f-]{36}$/)
    expect(res.body.genres).toEqual(['Action', 'Thriller'])
    expect(res.body.backdrop_path).toBe('')
    expect(readData()).toHaveLength(4)
  })

  it('accepts local image paths', async () => {
    const res = await request(app)
      .post('/api/shows')
      .send({ ...newShow, poster_path: 'images/posters/black-widow.jpg', backdrop_path: 'images/backdrops/black-widow.jpg' })

    expect(res.status).toBe(201)
    expect(res.body.poster_path).toBe('images/posters/black-widow.jpg')
  })

  it('rejects a poster that is neither a URL nor a local image path', async () => {
    const res = await request(app)
      .post('/api/shows')
      .send({ ...newShow, poster_path: '../secret.txt' })

    expect(res.status).toBe(400)
  })

  it('rejects an invalid show and saves nothing', async () => {
    const res = await request(app)
      .post('/api/shows')
      .send({ ...newShow, release_date: '2021-07-07', genres: [] })

    expect(res.status).toBe(400)
    expect(res.body.errors.map((error: { field: string }) => error.field)).toEqual(['release_date', 'genres'])
    expect(readData()).toHaveLength(3)
  })

  it('rejects malformed JSON', async () => {
    const res = await request(app).post('/api/shows').set('Content-Type', 'application/json').send('{"title":')

    expect(res.status).toBe(400)
  })
})

describe('PUT /api/shows/:id', () => {
  it('updates only the given fields and keeps the id', async () => {
    const res = await request(app).put(`/api/shows/${fixture[0].id}`).send({ id: 'other', vote_average: 9.1 })

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ id: fixture[0].id, title: 'Iron Man', vote_average: 9.1 })
    expect(readData()[0].vote_average).toBe(9.1)
  })

  it('answers 404 for an unknown id', async () => {
    const res = await request(app).put('/api/shows/nope').send({ vote_average: 5 })

    expect(res.status).toBe(404)
  })
})

describe('DELETE /api/shows/:id', () => {
  it('deletes a show', async () => {
    const res = await request(app).delete(`/api/shows/${fixture[2].id}`)

    expect(res.status).toBe(200)
    expect(readData().map(show => show.title)).toEqual(['Iron Man', 'Loki'])
  })

  it('answers 404 for an unknown id', async () => {
    const res = await request(app).delete('/api/shows/nope')

    expect(res.status).toBe(404)
  })
})

describe('unknown routes', () => {
  it('answer 404 JSON', async () => {
    const res = await request(app).get('/api/users')

    expect(res.status).toBe(404)
    expect(res.body).toEqual({ message: 'Not found' })
  })
})
