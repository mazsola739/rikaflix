import { render, screen } from 'test-utils'
import { Modal } from '.'

describe('Modal ', () => {
  beforeEach(() => {
    render(<Modal title="Test title" isShown hide={() => undefined} />)
  })

  it('renders without crashing', async () => {
    const modalElement = await screen.findByRole('heading', {
      name: /Test title/i
    })

    expect(modalElement).toBeInTheDocument()
  })
})
