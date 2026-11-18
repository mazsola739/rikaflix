import { render, screen } from 'test-utils'
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from '.'

describe('Navigation ', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navigation type={'header'} />
      </BrowserRouter>
    )
  })

  it('renders without crashing', async () => {
    const navigationElement = await screen.findByRole('navigation')

    expect(navigationElement).toBeInTheDocument()
  })
})
