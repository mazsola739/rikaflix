import { render, screen, testShows } from 'test-utils'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { MediaInfo } from '.'

const falcon = testShows[2]

describe('MediaInfo ', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={[`/shows/${falcon.id}`]}>
        <Routes>
          <Route path={'/shows/:id'} element={<MediaInfo />} />
        </Routes>
      </MemoryRouter>
    )
  })

  const titleRegExp = new RegExp(falcon.title, 'i')

  it('should have image', async () => {
    const imageElement = await screen.findByRole('img', { name: titleRegExp })

    expect(imageElement).toBeInTheDocument()
  })

  it('should have title', async () => {
    const titleElement = await screen.findByRole('heading', {
      name: titleRegExp
    })

    expect(titleElement).toBeInTheDocument()
  })

  it('should have tag line', async () => {
    const taglineRegExp = /Honor the shield./i
    const taglineElement = await screen.findByRole('heading', {
      name: taglineRegExp
    })

    expect(taglineElement).toBeInTheDocument()
  })

  it('should have overview', async () => {
    const overviewElement = await screen.findByRole('article')

    expect(overviewElement).toBeInTheDocument()
  })

  it('should have genre', async () => {
    const genreRegexp = /Drama, Action, Adventure, Sci-fi, Fantasy/i
    const genreElement = await screen.findByText(genreRegexp)

    expect(genreElement).toBeInTheDocument()
  })

  it('should have release date', async () => {
    const dataRegExp = /2021\.03\.19/i
    const dateElement = await screen.findByText(dataRegExp)

    expect(dateElement).toBeInTheDocument()
  })

  it('should display running time', async () => {
    const runningTimeRegExp = /00h 50 min/i
    const runningTimeElement = await screen.findByText(runningTimeRegExp)

    expect(runningTimeElement).toBeInTheDocument()
  })

  it('should have rating', async () => {
    const ratingRegExp = /7.3/i
    const ratingElement = await screen.findByText(ratingRegExp)

    expect(ratingElement).toBeInTheDocument()
  })
})
