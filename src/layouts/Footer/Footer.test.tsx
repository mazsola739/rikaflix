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
    expect(await screen.findByText(/^© 2021–2022 by Rika\. Yes, I made this\. No pixels were harmed/)).toBeInTheDocument()
    expect(screen.getByText('Made in 2021, renovated in 2026')).toBeInTheDocument()
  })

  it('links to the portfolio and to GitHub', async () => {
    expect(await screen.findByRole('link', { name: 'mazsola739' })).toHaveAttribute('href', 'https://mazsola739.github.io/mazsola739')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/mazsola739')
  })
})
