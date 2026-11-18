import { render, screen } from 'test-utils'
import { ResultCount } from '.'

describe('ResultCount ', () => {
  beforeEach(() => {
    render(<ResultCount foundShows={42} />)
  })

  it('renders without crashing', async () => {
    const resultRegExp = /42/i
    const resultElement = await screen.findByText(resultRegExp)

    expect(resultElement).toBeInTheDocument()
  })
})
