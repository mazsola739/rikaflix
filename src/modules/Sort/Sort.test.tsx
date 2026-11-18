import { render, screen } from 'test-utils'
import { Sort } from '.'

describe('Sort ', () => {
  beforeEach(() => {
    render(<Sort changeMovieSorting={() => undefined} />)
  })

  it('renders without crashing', async () => {
    const sortElement = await screen.findByText(/sort by/i)

    expect(sortElement).toBeInTheDocument()
  })
})
