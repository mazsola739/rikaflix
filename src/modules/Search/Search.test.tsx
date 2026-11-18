import { render, screen } from 'test-utils'
import { Search } from '.'

describe('SearchBar ', () => {
  beforeEach(() => {
    render(<Search />)
  })

  it('renders without crashing', async () => {
    const searchBarElement = await screen.findByRole('form')

    expect(searchBarElement).toBeInTheDocument()
  })
})
