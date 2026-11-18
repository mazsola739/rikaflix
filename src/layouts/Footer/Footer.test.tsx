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

  it('shows when the site was made and when it was renovated', async () => {
    expect(await screen.findByText(/© 2021–2022 by Rika/)).toBeInTheDocument()
    expect(screen.getByText('Originally made in 2021, renovated in 2026.')).toBeInTheDocument()
  })
})
