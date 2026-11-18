import { fallback } from 'assets'
import { render, screen } from 'test-utils'
import { Edit } from '.'

describe('Delete ', () => {
  beforeEach(() => {
    render(
      <Edit
        closeModal={() => undefined}
        media={{
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
        }}
      />
    )
  })

  it('renders without crashing', async () => {
    const editShowElement = await screen.findByRole('form')

    expect(editShowElement).toBeInTheDocument()
  })
})
