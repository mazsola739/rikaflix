import { render, screen } from 'test-utils'
import { BrowserRouter } from 'react-router-dom'
import { Footer } from '.'

describe('Footer ', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )
  })

  it('renders without crashing', async () => {
    const footerElement = await screen.findByRole('contentinfo')

    expect(footerElement).toBeInTheDocument()
  })
})
