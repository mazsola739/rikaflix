import { render, screen } from 'test-utils'
import { Loading } from '.'

describe('Loading ', () => {
  beforeEach(() => {
    render(<Loading />)
  })

  it('renders without crashing', () => {
    const loadingElement = screen.getByRole('img')

    expect(loadingElement).toBeInTheDocument()
  })
})
