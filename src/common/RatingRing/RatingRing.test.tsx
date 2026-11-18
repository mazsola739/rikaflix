import { render, screen } from 'test-utils'
import { RatingRing } from '.'
import { rating } from './RatingRing.utils'

describe('RatingRing ', () => {
  it('shows the rating', async () => {
    render(<RatingRing vote_average={7.9} />)

    expect(await screen.findByText(String(rating(7.9)))).toBeInTheDocument()
  })
})
