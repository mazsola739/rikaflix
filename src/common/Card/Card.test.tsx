import { fallback } from 'assets'
import { render, screen } from 'test-utils'
import { BrowserRouter } from 'react-router-dom'
import { Card } from '.'

const testMovie = {
  id: '0',
  title: 'Test title',
  tagline: 'Test tag line',
  vote_average: 9.9,
  release_date: '2021-01-01',
  poster_path: fallback,
  backdrop_path: fallback,
  genres: ['Test genre'],
  runtime: 120,
  type: 'Movie',
  overview: 'Test overview'
}

describe('Card ', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Card media={testMovie} />
      </BrowserRouter>
    )
  })

  it('should have image', async () => {
    const imageElement = await screen.findByRole('img', {
      name: /Test title/i
    })

    expect(imageElement).toBeInTheDocument()
  })

  it('should have title', async () => {
    const titleElement = await screen.findByRole('heading')

    expect(titleElement).toBeInTheDocument()
  })

  it('should have tag line', async () => {
    const taglineRegExp = /Test tag line/i
    const taglineElement = await screen.findByText(taglineRegExp)

    expect(taglineElement).toBeInTheDocument()
  })

  it('should have genre', async () => {
    const genreRegexp = /Test genre/i
    const genreElement = await screen.findByText(genreRegexp)

    expect(genreElement).toBeInTheDocument()
  })

  it('should have release date', async () => {
    const dataRegExp = /2021/i
    const dateElement = await screen.findByText(dataRegExp)

    expect(dateElement).toBeInTheDocument()
  })

  it('should have rating', async () => {
    const ratingRegExp = /9.9/i
    const ratingElement = await screen.findByText(ratingRegExp)

    expect(ratingElement).toBeInTheDocument()
  })
})
