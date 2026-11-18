import { fallback } from 'assets'
import { render, screen } from 'test-utils'
import { Poster } from '.'

describe('Poster ', () => {
  beforeEach(() => {
    render(<Poster data={fallback} title={''} />)
  })

  it('renders without crashing', async () => {
    const imageElement = await screen.findByRole('img', {
      name: /cover image/i
    })
    expect(imageElement).toBeInTheDocument()
  })
})
