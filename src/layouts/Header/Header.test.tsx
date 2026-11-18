import { render, screen } from 'test-utils'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '.'

describe('Header ', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
  })

  it('renders without crashing', async () => {
    const headerElement = await screen.findByRole('banner')

    expect(headerElement).toBeInTheDocument()
  })
})
