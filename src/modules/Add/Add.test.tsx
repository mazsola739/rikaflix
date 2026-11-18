import { render, screen } from 'test-utils'
import { Add } from '.'

describe('Add ', () => {
  beforeEach(() => {
    render(<Add closeModal={() => undefined} onAdded={() => undefined} />)
  })

  it('renders without crashing', async () => {
    const addShowElement = await screen.findByRole('form')

    expect(addShowElement).toBeInTheDocument()
  })
})
