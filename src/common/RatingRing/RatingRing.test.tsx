import { render, screen } from 'test-utils'
import { RatingRing } from '.'

describe('RatingRing ', () => {
  beforeEach(() => {
    render(<RatingRing vote_average={0} />)
  })

  it('renders without crashing', () => {
    const ratingRegExp = /0/i
    const ratingElement = screen.getByText(ratingRegExp)

    expect(ratingElement).toBeInTheDocument()
  })
})
