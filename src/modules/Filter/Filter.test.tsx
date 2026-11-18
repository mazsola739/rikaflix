import { render, screen } from 'test-utils'
import { Filter } from '.'

describe('Filter ', () => {
  beforeEach(() => {
    render(<Filter />)
  })

  it('renders without crashing', async () => {
    const filterElement = await screen.findByText(/all/i)

    expect(filterElement).toBeInTheDocument()
  })
})
